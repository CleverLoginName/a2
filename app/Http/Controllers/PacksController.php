<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductCatalog;
use App\ProductCategory;
use App\ProductCategoryType;
use App\ProductIcon;
use App\ProductSubCategory;
use App\ProductSubCategoryMap;
use App\ProductSupplier;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Szykra\Notifications\Flash;

class PacksController extends ProductsController
{
    public function show($id)
    {
        $pack = ProductSubCategory::find($id);
        return view('products.packs.show')
            ->with('pack', $pack);
    }
    
    public function create()
    {
        $categories = ProductCategory::all();
        $catalogs = ProductCatalog::all();
        $suppliers = ProductSupplier::all();
        $symbols = ProductIcon::all();
        $categoryTypes = ProductCategoryType::all();
        $subCategories = ProductSubCategory::all();

        return view('products.packs.create')
            ->with('catalogs', $catalogs)
            ->with('categoryTypes', $categoryTypes)
            ->with('subCategories', $subCategories)
            ->with('categories', $categories)
            ->with('suppliers', $suppliers)
            ->with('symbols', $symbols);


    }
    
    public function store(Request $request)
    {// dd($request->all());

        $rules = array(
            'name'   => 'required',
            'description'    => 'required',
            'catalog_id'    => 'required',
            'category_id'    => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/products/packs/create')
                ->withErrors($validator);


        $subCategory = new ProductSubCategory();
        $subCategory->name = $request->get('name');
        $subCategory->description = $request->get('description');
        $subCategory->is_pack = true;
        $subCategory->builder_price = $request->get('builder_price');
        $subCategory->supplier_price = $request->get('supplier_price');
        $subCategory->contractor_price = $request->get('contractor_price');
        $subCategory->category_id = $request->get('category_id');
        $subCategory->save();


        $products = Product::all();

        //Flash::success('Pack Added', 'Pack has been added successfully.');
        return view('products.packs.drag_n_drop')
            ->with('pack_id',$subCategory->id )
            ->with('products',$products );



    }

    public function done(){
        Flash::success('Pack Added', 'Pack has been added successfully.');
        return Redirect::to('/products/create');
    }
    public function editDone(){
        Flash::success('Pack Updated', 'Pack has been updated successfully.');
        return Redirect::to('/products/create');
    }

    public function updateDragndrop(){
        $subCategoryProduct = new ProductSubCategoryMap();
        $subCategoryProduct->sub_category_id = Input::get('parent');
        $subCategoryProduct->product_id = Input::get('child');
        $subCategoryProduct->save();
    }
    public function removeDragndrop(){
        $subCategoryProduct = ProductSubCategoryMap::where('sub_category_id','=',Input::get('parent'))
            ->where('product_id','=',Input::get('child'))
            ->first();
        $subCategoryProduct->delete();
    }

    public function edit($id){
        $categories = ProductCategory::all();
        $catalogs = ProductCatalog::all();
        $suppliers = ProductSupplier::all();
        $symbols = ProductIcon::all();
        $categoryTypes = ProductCategoryType::all();
        $subCategories = ProductSubCategory::all();
        $pack = ProductSubCategory::find($id);
        $categoryId = null;
        $catalogId = null;

        if($pack){//dd($subCategory);
            $category = ProductCategory::where('id','=',$pack->category_id)->first();
            if($category){
                $categoryId = $category->id;
                $catalog = ProductCatalog::where('id','=',$category->catalog_id)->first();
                if($catalog){
                    $catalogId = $catalog->id;
                }
            }
        }//dd($categoryId);
        session(['catalog_id'=>$catalogId]);
        session(['category_id'=>$categoryId]);

        return view('products.packs.edit')
            ->with('catalogs', $catalogs)
            ->with('categoryTypes', $categoryTypes)
            ->with('subCategories', $subCategories)
            ->with('categories', $categories)
            ->with('suppliers', $suppliers)
            ->with('pack', $pack)
            ->with('symbols', $symbols);

    }

    public function update(Request $request){
        $rules = array(
            'name'   => 'required',
            'description'    => 'required',
            'catalog_id'    => 'required',
            'category_id'    => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/products/packs/create')
                ->withErrors($validator);

        $subCategory = ProductSubCategory::find($request->pack_id);
        $subCategory->name = $request->get('name');
        $subCategory->description = $request->get('description');
        $subCategory->is_pack = true;
        $subCategory->builder_price = $request->get('builder_price');
        $subCategory->supplier_price = $request->get('supplier_price');
        $subCategory->contractor_price = $request->get('contractor_price');
        $subCategory->category_id = $request->get('category_id');
        $subCategory->save();


        $products = Product::all();
        $existingProductsSubCategoryMaps = ProductSubCategoryMap::where('sub_category_id','=',$request->pack_id)->get();
        //Flash::success('Pack Added', 'Pack has been added successfully.');
        $existingProducts = [];
        foreach ($existingProductsSubCategoryMaps as $existingProductsSubCategoryMap){
            $existingProducts[] = Product::find($existingProductsSubCategoryMap->product_id);
        }
        //dd($existingProducts);
        return view('products.packs.drag_n_drop_edit')
            ->with('existingProducts',$existingProducts )
            ->with('pack_id',$subCategory->id )
            ->with('products',$products );


    }

    public function destroy($id)
    {
        $product = ProductSubCategory::find($id);
        $product->delete();
        Flash::error('Pack Deleted', 'Pack has been deleted successfully.');
        return redirect()->action('ProductsController@index');
    }
}