<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductSubCategoryMap;
use App\Project;
use Illuminate\Http\Request;

use App\Catalog;
use App\ProductCatalog;
use App\ProductSubCategory;
use App\SubCategory;
use Illuminate\Support\Facades\File;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;

class ImportProductsController extends ImportController
{
    public function index(){
        return view('advanced.data_import.products.index');
    }

    public function productExport(){

        Excel::create('Products', function($excel) {
            $subcategories = ProductSubCategory::where('is_pack','=',false)->get();
            foreach ($subcategories as $subcategory){
                $excel->sheet($subcategory->name, function($sheet) use ($subcategory)  {
                    $sheet->loadView('advanced.data_import.products.products_format_export')->with('sub_category',$subcategory);
                });
            }
        })->download('xls');

        return Redirect::to('/advanced/data-import/products');

    }
    public function productImport(Request $request){

        $excel_file = $request->file('excel_file');

        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/excel') or File::makeDirectory('uploads/excel');
        $randStr     = Str::random(16);
        $destinationPath = 'uploads/excel/';

        if ($request->hasFile('excel_file')) {
            $randFileName = $randStr.'.'.$excel_file->getClientOriginalExtension();
            $excel_file->move($destinationPath, $randFileName);
        }

        Excel::load($destinationPath.$randFileName, function($reader) {
           // $results = $reader->all();
            // Loop through all sheets
            $reader->each(function($sheet) {
                $row_no = 1;
                session(['subCat'=>$sheet->getTitle()]) ;
                // Loop through all rows
                $sheet->each(function($row,$row_no){
                    $sub_category = new ProductSubCategoryMap();
                    if($row_no == 3){
                       if( count($row)>3){
                           $sub_category = $row[3];
                           $sub_category = ProductSubCategory::where('name', '=',session('subCat'))
                               ->where('is_pack', '=',false)
                               ->first();
                           session(['subCat'=>$sub_category]) ;
                          // var_dump($sub_category->id);echo '<br><br>';

                       }
                         }
                    if($row_no>5){
//                        dd($row);
                        $product = new Product();
                        $product->name = $row[1];
                        $product->description = $row[2];
                        $product->manufacturing_product_code = $row[6];
                        $product->builder_code = '';
                        $product->pronto_code = $row[4];
                        $product->builder_price = $row[7];
                        $product->supplier_price = $row[8];
                        $product->contractor_price = $row[9];
                        $product->discount = $row[10];
                        $product->supplier_id = $row[13];
                        $product->icon = $row[12];
                        $product->is_composite = false;
                        $product->save();
/*
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
*/
                        $subcategoeyProduct = new ProductSubCategoryMap();

                        if($sub_category != null){
                            $subcategoeyProduct->sub_category_id =session('subCat')->id;
                        }else{
                            $subcategoeyProduct->sub_category_id =0;
                        }
                        $subcategoeyProduct->product_id = $product->id;
                        $subcategoeyProduct->save();
                    }
                    $row_no++;
                });

            });
        })->get();

        return Redirect::to('/advanced/data-import/products');
    }
}
