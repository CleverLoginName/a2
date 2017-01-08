<?php

namespace App\Http\Controllers;

use App\Catalog;
use App\ProductCatalog;
use App\ProductSubCategory;
use App\SubCategory;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ExcelFormatExportsController extends Controller
{
    public function productsExport(){
        /*
         * Excel::create('Products', function($excel) {
            $subcategories = SubCategory::where('is_pack','=',false)->get();
            foreach ($subcategories as $subcategory){
                $excel->sheet($subcategory->name, function($sheet) use ($subcategory)  {
                    $products_custom_field_names = DB::table('custom_field_sub_categories')
                        ->where('custom_field_sub_categories.sub_category_id','=',$subcategory->id)
                        ->get();
                    $products_names_array = ['DO NOT EDIT'];
                    $products_ids_array = [''];
                   foreach ($products_custom_field_names as $products_custom_field_name){
                       $products_names_array[] = $products_custom_field_name->name;
                       $products_ids_array[] = $products_custom_field_name->id;
                    }
                    $sheet->row(1, function($cell) {
                        $cell->setBackground('#c8c8c8');
                    });

                    $sheet->row(2,$products_names_array);
                    $sheet->row(1,$products_ids_array);
                });
            }
        })->download('xls');
        */
        Excel::create('Products', function($excel) {
            $subcategories = ProductSubCategory::where('is_pack','=',false)->get();
            foreach ($subcategories as $subcategory){
                $excel->sheet($subcategory->name, function($sheet) use ($subcategory)  {
                    $sheet->loadView('excel_exports.products_import')->with('sub_category',$subcategory);
                });
            }
        })->download('xls');
    }
    public function allProductsExport(){

        Excel::create('Products List', function($excel) {
            $catalogs = ProductCatalog::all();
            foreach ($catalogs as $catalog){
                $excel->sheet($catalog->name, function($sheet) use ($catalog)  {
                    $sheet->loadView('excel_exports.products_list')->with('catalog',$catalog);
                });
            }
        })->download('xls');
    }


    public function compositeProductsExport(){
      
        Excel::create('Composite-Products', function($excel) {
            $subcategories = ProductSubCategory::where('is_pack','=',false)->get();
            foreach ($subcategories as $subcategory){
                $excel->sheet($subcategory->name, function($sheet) use ($subcategory)  {
                    $sheet->loadView('excel_exports.products_import')->with('sub_category',$subcategory);
                });
            }
        })->download('xls');
    }

    public function packsExport(){

        Excel::create('Packs', function($excel) {
            $catalogs = ProductCatalog::all();
            foreach ($catalogs as $catalog){
                $excel->sheet($catalog->name, function($sheet) use ($catalog)  {
                    $sheet->loadView('excel_exports.packs_import')->with('catalog',$catalog);
                });
            }
        })->download('xls');
    }
}
