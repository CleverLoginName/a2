<?php

namespace App\Http\Controllers;

use App\ProductCategory;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ProductCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return view('categories.index')
            ->with('categories', $categories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $catalogs = Catalog::all();
        return view('categories.create')->with('catalogs', $catalogs);
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
            'description'    => 'required',
            'catalog_id'    => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/categories/create')
                ->withErrors($validator);

        $category = new Category();
        $category->name = $request->get('name');
        $category->description = $request->get('description');
        $category->catalog_id = $request->get('catalog_id');
        $category->save();
        Flash::success('Category Added', 'Category has been added successfully.');
        return redirect()->action('CategoriesController@index');
    }


    public function ajaxStore(Request $request)
    {//dd($request->all());
        $rules = array(
            'category_name'   => 'required',
            'modal_catalog_id'   => 'required',
            'category_description'  => 'required',
            'category_type'    => 'required',
            'category_colour'    => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return $validator->errors();

        $category = new ProductCategory();
        $category->catalog_id = $request->get('modal_catalog_id');
        $category->name = $request->get('category_name');
        $category->description = $request->get('category_description');
        $category->type = $request->get('category_type');
        $category->colour = $request->get('category_colour');
        $category->save();
        $categories = ProductCategory::where('catalog_id','=',$category->catalog_id)->get();
        //return $catalogs;
        return Response::json(['categories'=>$categories, 'insert_id'=>$category->id]);
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
        $category = Category::find($id);
        return view('categories.show')
            ->with('category', $category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $catalogs = Catalog::all();
        $category = Category::find($id);
        return view('categories.edit')
            ->with('catalogs', $catalogs)
            ->with('category', $category);
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
            return Redirect::to('/categories/'.$id.'/edit')
                ->withErrors($validator);

        $category = Category::find($id);

        $category->name = $request->get('name');
        $category->description = $request->get('description');
        $category->catalog_id = $request->get('catalog_id');
        $category->save();
        Flash::success('Category Updated', 'Category has been updated successfully.');
        return view('categories.edit')
            ->with('category', $category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $category = Category::find($id);
        $category->delete();
        Flash::error('Category Deleted', 'Category has been deleted successfully.');
        return redirect()->action('CategoriesController@index');
    }

    public function categoriesByCatalogId(){
        $catalogId = Input::get('id');
        session(['catalog_id' => $catalogId ]);
        session(['category_id' => null ]);
        session(['sub_category_id' =>null ]);
        $categories = ProductCategory::where('catalog_id','=',$catalogId)->get();
        if(!$categories)session(['category_id'=>null]);
        return $categories;

    }
}
