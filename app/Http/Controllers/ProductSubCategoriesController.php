<?php

namespace App\Http\Controllers;

use App\ProductCustomField;
use App\ProductSubCategory;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ProductSubCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subCategories = SubCategory::where('is_pack','=',0)->get();
        return view('sub-categories.index')
            ->with('subCategories', $subCategories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        return view('sub-categories.create')->with('categories', $categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $rules = array(
            'name'   => 'required',
            'description'    => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/sub-categories/create')
                ->withErrors($validator);

        $subCategories = new SubCategory();
        $subCategories->name = $request->get('name');
        $subCategories->description = $request->get('description');
        $subCategories->category_id = $request->get('category_id');
        $subCategories->is_pack = 0;
        $subCategories->save();
        $sub_category_id = $subCategories->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Watts';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $watt_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Lumens';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $lumens_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Style';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $style_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Colour';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $colour_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Discount %';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $discount_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Width';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $width_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Height';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $height_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Depth';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $depth_productCustomField_id = $productCustomFild->id;



        Flash::success('Sub-Category Added', 'Sub-Category has been added successfully.');

        return redirect()->action('SubCategoriesController@index');
    }


    public function ajaxStore(Request $request)
    {//dd($request->all());
        $rules = array(
            'modal_category_id' => 'required',
            'sub_category_name'   => 'required',
            'sub_category_description'    => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return $validator->errors();

        $subCategory = new ProductSubCategory();
        $subCategory->name = $request->get('sub_category_name');
        $subCategory->category_id = $request->get('modal_category_id');
        $subCategory->description = $request->get('sub_category_description');
        $subCategory->is_pack = 0;
        $subCategory->save();
        $sub_category_id = $subCategory->id;
/*
        $subCategories = new ProductSubCategory();
        $subCategories->name = $request->get('name');
        $subCategories->description = $request->get('description');
        $subCategories->category_id = $request->get('category_id');
        $subCategories->is_pack = 0;
        $subCategories->save();
        $sub_category_id = $subCategories->id;*/


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Watts';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $watt_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Lumens';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $lumens_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Style';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $style_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Colour';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $colour_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Discount %';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $discount_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Width';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $width_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Height';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $height_productCustomField_id = $productCustomFild->id;


        $productCustomFild = new ProductCustomField();
        $productCustomFild->name = 'Depth';
        $productCustomFild->custom_field_type_id = 1;
        $productCustomFild->is_mandatory = true;
        $productCustomFild->product_sub_category_id = $sub_category_id;
        $productCustomFild->save();
        $depth_productCustomField_id = $productCustomFild->id;

        $subCategories = ProductSubCategory::where('category_id','=',$subCategory->category_id)->get();
        //return $catalogs;
        return Response::json(['sub_categories'=>$subCategories, 'insert_id'=>$subCategory->id]);
        //Flash::success('Catalog Added', 'Catalog has been added successfully.');
        // return redirect()->action('CatalogsController@index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subCategory = SubCategory::find($id);
        return view('sub-categories.show')
            ->with('subCategory', $subCategory);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $subCategory = SubCategory::find($id);
        $categories = Category::all();
        return view('sub-categories.edit')
            ->with('subCategory', $subCategory)
            ->with('categories', $categories);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $rules = array(
            'name'   => 'required',
            'description'    => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/sub-categories/create')
                ->withErrors($validator);

        $subCategory = SubCategory::find($id);
        $categories = Category::all();

        $subCategory->name = $request->get('name');
        $subCategory->description = $request->get('description');
        $subCategory->category_id = $request->get('category_id');
        $subCategory->save();

        Flash::success('Sub-Category Updated', 'Sub-Category has been updated successfully.');
        return view('sub-categories.edit')
            ->with('subCategory', $subCategory)
            ->with('categories', $categories);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $subCategory = SubCategory::find($id);
        $subCategory->delete();
        Flash::success('Sub-Category Deleted', 'Sub-Category has been deleted successfully.');
        return redirect()->action('SubCategoriesController@index');
    }



    public function subCategoriesByCategoryId(){
        $categoryId = Input::get('id');
        session(['category_id' => $categoryId ]);
        session(['sub_category_id' =>null ]);
        $subCategories = ProductSubCategory::where('category_id','=',$categoryId)->where('is_pack','=',0)->get();
        if(!$subCategories)session(['sub_category_id'=>null]);
        return $subCategories;

    }
}
