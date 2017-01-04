<?php

namespace App\Http\Controllers;

use App\ProductCatalog;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ProductCatalogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $catalogs = Catalog::all();
        return view('catalogs.index')
            ->with('catalogs', $catalogs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('catalogs.create');
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
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/catalogs/create')
                ->withErrors($validator);

        $catalog = new Catalog();
        $catalog->name = $request->get('name');
        $catalog->description = $request->get('description');
        $catalog->save();
        Flash::success('Catalog Added', 'Catalog has been added successfully.');
        return redirect()->action('CatalogsController@index');
    }

    public function ajaxStore(Request $request)
    {
        $rules = array(
            'catalog_name'   => 'required',
            'catalog_description'    => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return $validator->errors();

        $catalog = new ProductCatalog();
        $catalog->name = $request->get('catalog_name');
        $catalog->description = $request->get('catalog_description');
        $catalog->save();
        $catalogs = ProductCatalog::all();
        //return $catalogs;
        return Response::json(['catalogs'=>$catalogs, 'insert_id'=>$catalog->id]);
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
        $catalog = Catalog::find($id);
        return view('catalogs.show')
            ->with('catalog', $catalog);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $catalog = Catalog::find($id);
        return view('catalogs.edit')
            ->with('catalog', $catalog);
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
            'description'    => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/catalogs/'.$id.'/edit')
                ->withErrors($validator);

        $catalog = Catalog::find($id);

        $catalog->name = $request->get('name');
        $catalog->description = $request->get('description');
        $catalog->save();
        Flash::success('Catalog Updated', 'Catalog has been updated successfully.');
        return view('catalogs.edit')
            ->with('catalog', $catalog);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $catalog = Catalog::find($id);
        $catalog->delete();
        Flash::error('Catalog Deleted', 'Catalog has been deleted successfully.');
        return redirect()->action('CatalogsController@index');
    }
}
