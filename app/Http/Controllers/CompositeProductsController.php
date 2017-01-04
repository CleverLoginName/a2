<?php

namespace App\Http\Controllers;

use App\CustomFieldType;
use App\Product;
use App\ProductCatalog;
use App\ProductCategory;
use App\ProductCategoryType;
use App\ProductCompositeMap;
use App\ProductCustomData;
use App\ProductCustomField;
use App\ProductIcon;
use App\ProductSubCategory;
use App\ProductSubCategoryMap;
use App\ProductSupplier;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Szykra\Notifications\Flash;

class CompositeProductsController extends ProductsController
{
    public function show($id)
    {
        $compositeProduct = Product::find($id);
        return view('products.composite-products.show')
            ->with('composite_product', $compositeProduct);
    }

    public function create()
    {

        $subCategories = ProductSubCategory::where('is_pack','=',0)->get();
        $categories = ProductCategory::all();
        $catalogs = ProductCatalog::all();
        $symbols = ProductIcon::all();
        $suppliers = ProductSupplier::all();
        $categoryTypes = ProductCategoryType::all();
        $icons = ProductIcon::all();
        $categories = ProductCategory::all();
        $catalogs = ProductCatalog::all();
        $symbols = ProductIcon::all();
        $suppliers = ProductSupplier::all();
        $categoryTypes = ProductCategoryType::all();
        $icons = ProductIcon::all();

        if((session('catalog_id') != null)&&(session('category_id') != null)&&(session('sub_category_id') != null))
        {
            $customFields = ProductCustomField::where('product_sub_category_id','=',session('sub_category_id'))->get();
            $symbols = ProductIcon::where('category_id','=',session('category_id'))->get();
            $out = [];
            foreach ($customFields as $customField){
                $out[] = [
                    'id'=>$customField->id,
                    'name'=>$customField->name,
                    'type'=>CustomFieldType::find($customField->custom_field_type_id)->name,
                    'is_mandatory'=>$customField->is_mandatory
                ];

            }
            $symbols = ProductIcon::where('category_id','=',session('category_id'))->get();
            return view('products.composite-products.create')
                ->with('catalogs', $catalogs)
                ->with('categories', $categories)
                ->with('fields', $out)
                ->with('suppliers', $suppliers)
                ->with('categoryTypes', $categoryTypes)
                ->with('symbols',  $symbols)
                ->with('is_composite',  false)
                ->with('symbols', $symbols)
                ->with('icons',  $icons)
                ->with('subCategories', $subCategories);
        }

        session(['catalog_id'=>null]);
        session(['category_id'=>null]);
        return view('products.composite-products.create')
            ->with('catalogs', $catalogs)
            ->with('categories', $categories)
            ->with('symbols',  $symbols)
            ->with('fields', [])
            ->with('suppliers', $suppliers)
            ->with('categoryTypes', $categoryTypes)
            ->with('is_composite',  false)
            ->with('icons',  $icons)
            ->with('subCategories', $subCategories);


    }

    public function store(Request $request)
    {//dd($request->all());

        $rules = array(
            'catalog_id'   => 'required',
            'category_id'   => 'required',
            'symbol'   => 'required',
            'sub_category_id'   => 'required',
            'name'   => 'required',
            'image'      => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/products/composite-products/create')
                ->withErrors($validator)
                ->withInput();


        $product = new Product();
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->manufacturing_product_code = $request->get('manufacturing_product_code');
        $product->builder_code = $request->get('builder_code');
        $product->pronto_code = $request->get('pronto_code');
        $product->builder_price = $request->get('builder_price');
        $product->supplier_price = $request->get('supplier_price');
        $product->contractor_price = $request->get('contractor_price');
        $product->discount = $request->get('discount');
        $product->supplier_id = $request->get('supplier_id');
        $product->icon = $request->get('symbol');
        $product->is_composite = true;
        $product->save();

        foreach ($request->all() as $key => $value) {
            if (strpos($key, 'custom_field') !== false) {
                $custom_field_sub_category_id = substr($key, 13);
                $customData = new ProductCustomData();
                $customData->product_id = $product->id;
                $customData->custom_field_sub_category_id = $custom_field_sub_category_id;
                $customData->value = $value;
                $customData->save();
            }
        }

        $subcategoeyProduct = new ProductSubCategoryMap();
        $subcategoeyProduct->sub_category_id =$request->get('sub_category_id');
        $subcategoeyProduct->product_id = $product->id;
        $subcategoeyProduct->save();



        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/products') or File::makeDirectory('uploads/products');
        File::exists('uploads/products/'.$product->id) or File::makeDirectory('uploads/products/'.$product->id);
        File::exists('uploads/products/'.$product->id.'/originals') or File::makeDirectory('uploads/products/'.$product->id.'/originals');


        $randStr = Str::random(16);
        $destinationPath = 'uploads/products/'.$product->id.'/originals/';
        $productImage = $request->file('image');
        if($productImage){
            $randFileName = $randStr.'.'.$productImage->getClientOriginalExtension();
            $productImage->move($destinationPath,$randFileName);
        }

        $product->image = $destinationPath.$randFileName;
        $product->save();

        $products = Product::all();

        session(['catalog_id' => null ]);
        session(['category_id' => null ]);
        session(['sub_category_id' =>null ]);

         //   Flash::success('Composite Product Added', 'Composite Product has been added successfully.');
            return view('products.composite-products.drag_n_drop')
                ->with('product_id',$product->id )
                ->with('existingComposites',[] )
                ->with('products',$products );
        

    }

    public function updateDragndrop(){
        $compositeProductMap = new ProductCompositeMap();
        $compositeProductMap->parent = Input::get('parent');
        $compositeProductMap->child = Input::get('child');
        $compositeProductMap->save();
    }
    public function removeDragndrop(){
        $compositeProductMap = ProductCompositeMap::where('parent','=',Input::get('parent'))
            ->where('child','=',Input::get('child'))
            ->first();
        $compositeProductMap->delete();
    }
    public function done(){
        Flash::success('Composite Product Added', 'Composite Product has been added successfully.');
        return Redirect::to('/products/create');
    }
    public function editDone(){
        Flash::success('Composite Product Updated', 'Composite Product has been updated successfully.');
        return Redirect::to('/products/create');
    }

    public function edit($id){

        $subCategories = ProductSubCategory::where('is_pack','=',0)->get();
        $categories = ProductCategory::all();
        $catalogs = ProductCatalog::all();
        $symbols = ProductIcon::all();
        $suppliers = ProductSupplier::all();
        $categoryTypes = ProductCategoryType::all();
        $icons = ProductIcon::all();
        $product = Product::find($id);
        $subCategoryId = null;
        $categoryId = null;
        $catalogId = null;
        $subCategory = DB::table('product_sub_categories')
            ->join('product_sub_category_maps','product_sub_category_maps.sub_category_id','=','product_sub_categories.id')
            ->select('product_sub_categories.id as product_sub_category_id','product_sub_categories.category_id')
            ->where('is_pack','=',false)
            ->where('product_sub_category_maps.product_id','=',$id)
            ->first();
        if($subCategory){//dd($subCategory);
            $subCategoryId = $subCategory->product_sub_category_id;
            $category = ProductCategory::where('id','=',$subCategory->category_id)->first();
            if($category){
                $categoryId = $category->id;
                $catalog = ProductCatalog::where('id','=',$category->catalog_id)->first();
                if($catalog){
                    $catalogId = $catalog->id;
                }
            }
        }

        $customFields = ProductCustomField::where('product_sub_category_id','=',session('sub_category_id'))->get();
        $symbols = ProductIcon::where('category_id','=',session('category_id'))->get();
        $out = [];
        foreach ($customFields as $customField){
            $out[] = [
                'id'=>$customField->id,
                'name'=>$customField->name,
                'type'=>CustomFieldType::find($customField->custom_field_type_id)->name,
                'is_mandatory'=>$customField->is_mandatory
            ];

        }
        $symbols = ProductIcon::where('category_id','=',session('category_id'))->get();

        session(['catalog_id'=>$catalogId]);
        session(['category_id'=>$categoryId]);
        session(['sub_category_id'=>$subCategoryId]);
        return view('products.composite-products.edit')
            ->with('catalogs', $catalogs)
            ->with('categories', $categories)
            ->with('fields', $out)
            ->with('suppliers', $suppliers)
            ->with('categoryTypes', $categoryTypes)
            ->with('symbols',  $symbols)
            ->with('is_composite',  false)
            ->with('symbols', $symbols)
            ->with('icons',  $icons)
            ->with('product',  $product)
            ->with('subCategories', $subCategories);



    }
    
    public function update(Request $request){

        $rules = array(
            'catalog_id'   => 'required',
            'category_id'   => 'required',
            'symbol'   => 'required',
            'sub_category_id'   => 'required',
            'name'   => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/products/composite-products/create')
                ->withErrors($validator)
                ->withInput();


        $product = Product::find($request->product_id);
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->manufacturing_product_code = $request->get('manufacturing_product_code');
        $product->builder_code = $request->get('builder_code');
        $product->pronto_code = $request->get('pronto_code');
        $product->builder_price = $request->get('builder_price');
        $product->supplier_price = $request->get('supplier_price');
        $product->contractor_price = $request->get('contractor_price');
        $product->discount = $request->get('discount');
        $product->supplier_id = $request->get('supplier_id');
        $product->icon = $request->get('symbol');
        $product->is_composite = true;
        $product->save();

        foreach ($request->all() as $key => $value) {
            if (strpos($key, 'custom_field') !== false) {
                $custom_field_sub_category_id = substr($key, 13);
                $customData = new ProductCustomData();
                $customData->product_id = $product->id;
                $customData->custom_field_sub_category_id = $custom_field_sub_category_id;
                $customData->value = $value;
                $customData->save();
            }
        }

        $subcategoeyProduct = new ProductSubCategoryMap();
        $subcategoeyProduct->sub_category_id =$request->get('sub_category_id');
        $subcategoeyProduct->product_id = $product->id;
        $subcategoeyProduct->save();


        if (array_key_exists("image",$request->all())) {
            File::exists('uploads') or File::makeDirectory('uploads');
            File::exists('uploads/products') or File::makeDirectory('uploads/products');
            File::exists('uploads/products/' . $product->id) or File::makeDirectory('uploads/products/' . $product->id);
            File::exists('uploads/products/' . $product->id . '/originals') or File::makeDirectory('uploads/products/' . $product->id . '/originals');


            $randStr = Str::random(16);
            $destinationPath = 'uploads/products/' . $product->id . '/originals/';
            $productImage = $request->file('image');
            if ($productImage) {
                $randFileName = $randStr . '.' . $productImage->getClientOriginalExtension();
                $productImage->move($destinationPath, $randFileName);
            }

            $product->image = $destinationPath . $randFileName;
        }
        $product->save();

        $existingComposites = ProductCompositeMap::where('parent','=',$request->product_id)->get();
        $products = Product::all();
        //   Flash::success('Composite Product Added', 'Composite Product has been added successfully.');
        return view('products.composite-products.drag_n_drop_edit')
            ->with('product_id',$product->id )
            ->with('existingComposites',$existingComposites )
            ->with('products',$products );
    }


}
