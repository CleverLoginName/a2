<?php

namespace App\Http\Controllers;

use App\ImportRawProductData;
use App\Product;
use App\ProductCategory;
use App\ProductCustomData;
use App\ProductCustomField;
use App\ProductIcon;
use App\ProductSubCategoryMap;
use App\ProductSupplier;
use App\Project;
use Illuminate\Http\Request;

use App\Catalog;
use App\ProductCatalog;
use App\ProductSubCategory;
use App\SubCategory;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;


class ImportRawProductDataController extends Controller
{

    public function productImport(Request $request){

        $raw_excel_file = $request->file('raw_excel_file');

        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/excel') or File::makeDirectory('uploads/excel');
        $randStr     = Str::random(16);
        $destinationPath = 'uploads/excel/';

        if ($request->hasFile('raw_excel_file')) {
            $randFileName = $randStr.'.'.$raw_excel_file->getClientOriginalExtension();
            $raw_excel_file->move($destinationPath, $randFileName);
        }

        Excel::load($destinationPath.$randFileName, function($reader) {
            // $results = $reader->all();
            // Loop through all sheets
            $reader->each(function($sheet) {
                $row_no = 1;
                // Loop through all rows
                $sheet->each(function($row,$row_no){

                    if($row_no>0){
                        $importRawProductData = new ImportRawProductData();
                        $importRawProductData->catalog = $row[1];
                        $importRawProductData->category = $row[2];
                        $importRawProductData->sub_category = $row[3];
                        $importRawProductData->name = $row[4];
                        $importRawProductData->description = $row[5];
                        $importRawProductData->type = $row[6];
                        $importRawProductData->builder_code = $row[7];
                        $importRawProductData->supplier_code = $row[8];
                        $importRawProductData->contractor_code = $row[9];
                        $importRawProductData->supplier_name = $row[10];
                        $importRawProductData->contractor_name = $row[11];
                        $importRawProductData->builder_price = $row[12];
                        $importRawProductData->supplier_price = $row[13];
                        $importRawProductData->contractor_price = $row[14];
                        $importRawProductData->image = $row[15];
                        $importRawProductData->icon = $row[16];
                        $importRawProductData->watts = $row[17];
                        $importRawProductData->lumen = $row[18];
                        $importRawProductData->style = $row[19];
                        $importRawProductData->colour = $row[20];
                        $importRawProductData->discount = $row[21];
                        $importRawProductData->width = $row[22];
                        $importRawProductData->height = $row[23];
                        $importRawProductData->depth = $row[24];
                        $importRawProductData->save();
                    }
                    $row_no++;
                });

            });
        })->get();

        return Redirect::to('/advanced/data-import/products');
    }

    public function mergeData(){
        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/products') or File::makeDirectory('uploads/products');

        $importRawProductDatas = ImportRawProductData::all();

        foreach ($importRawProductDatas as $importRawProductData){
            $catalog_id = 0;
            $category_id = 0;
            $sub_category_id = 0;
            $icon_id = 0;
            $supplier_id = 0;

            $catalog = ProductCatalog::where('name','=',$importRawProductData->catalog)->first();
            if(!$catalog){
                $catalog = new ProductCatalog();
                $catalog->name = $importRawProductData->catalog;
                $catalog->description = ' ';
                $catalog->save();
                $catalog_id = $catalog->id;
            }else{
                $catalog_id = $catalog->id;
            }

            $category = ProductCategory::where('name','=',$importRawProductData->category)->first();

            /**************************************************************************/
            $type = '';
                if (strpos($importRawProductData->category, 'Lighting') !== false) {
                    $type = 1;
                }
                if (strpos($importRawProductData->category, 'Switches') !== false) {
                    $type = 2;
                }
            /**************************************************************************/

            if(!$category){
                $category = new ProductCategory();
                $category->name = $importRawProductData->category;
                $category->description = ' ';
                $category->colour = ' ';
                $category->type = $type;
                $category->catalog_id = $catalog_id;
                $category->save();
                $category_id = $category->id;
            }else{//var_dump($category);echo '<br><br>';
                $category_id = $category->id;
            }

            $sub_category = ProductSubCategory::where('name','=',$importRawProductData->sub_category)->first();

            if(!$sub_category){
                $sub_category = new ProductSubCategory();
                $sub_category->name = $importRawProductData->sub_category;
                $sub_category->description = ' ';
                $sub_category->category_id = $category_id;
                $sub_category->is_pack = false;
                $sub_category->is_pack = 0;
                $sub_category->supplier_price = 0;
                $sub_category->contractor_price = 0;
                $sub_category->save();
                $sub_category_id = $sub_category->id;
            }else{
                $sub_category_id = $sub_category->id;
            }


            $icon = ProductIcon::where('name','=',$importRawProductData->icon)->first();

            if(!$icon){
                $icon = new ProductIcon();
                $icon->name = $importRawProductData->icon;
                $icon->path = '/img/icons/'.$importRawProductData->icon.'.png';
                $icon->category_id = $category_id;
                $icon->save();
                $icon_id = $icon->id;
            }else{//var_dump($category);echo '<br><br>';
                $icon_id = $icon->id;
            }
            
            
            $supplier = ProductSupplier::where('name','=',$importRawProductData->supplier_name)->first();

            if(!$supplier){
                $supplier = new ProductSupplier();
                $supplier->name = $importRawProductData->supplier_name;
                $supplier->save();
                $supplier_id = $supplier->id;
            }else{//var_dump($category);echo '<br><br>';
                $supplier_id = $supplier->id;
            }


            $product = new Product();
            $product->name = $importRawProductData->name;
            $product->description = $importRawProductData->description;
            $product->builder_code = $importRawProductData->builder_code;
            $product->discount = $importRawProductData->discount;
            $product->is_composite = false;
            $product->image = $importRawProductData->image;
            $product->builder_price = $importRawProductData->builder_price;
            $product->supplier_price = $importRawProductData->supplier_price;
            $product->contractor_price = $importRawProductData->contractor_price;
        /**/    $product->pronto_code = $importRawProductData->supplier_code;
        /**/    $product->manufacturing_product_code = $importRawProductData->contractor_code;
            $product->icon = $icon_id;
            $product->supplier_id = $supplier_id;
            $product->save();
/*********************************************************************************************************/
            if($importRawProductData->watts != 'NA') {
                $productCustomFild = new ProductCustomField();
                $productCustomFild->name = 'Watts';
                $productCustomFild->custom_field_type_id = 1;
                $productCustomFild->is_mandatory = true;
                $productCustomFild->product_sub_category_id = $sub_category_id;
                $productCustomFild->save();

                $productCustomData = new ProductCustomData();
                $productCustomData->product_id = $product->id;
                $productCustomData->product_custom_field_id = $productCustomFild->id;
                $productCustomData->value = $importRawProductData->watts;
                $productCustomData->save();
            }
            if($importRawProductData->lumen != 'NA') {
                $productCustomFild = new ProductCustomField();
                $productCustomFild->name = 'Lumens';
                $productCustomFild->custom_field_type_id = 1;
                $productCustomFild->is_mandatory = true;
                $productCustomFild->product_sub_category_id = $sub_category_id;
                $productCustomFild->save();

                $productCustomData = new ProductCustomData();
                $productCustomData->product_id = $product->id;
                $productCustomData->product_custom_field_id = $productCustomFild->id;
                $productCustomData->value = $importRawProductData->lumen;
                $productCustomData->save();
            }
            if($importRawProductData->style != 'NA') {
            $productCustomFild = new ProductCustomField();
            $productCustomFild->name = 'Style';
            $productCustomFild->custom_field_type_id = 1;
            $productCustomFild->is_mandatory = true;
            $productCustomFild->product_sub_category_id = $sub_category_id;
            $productCustomFild->save();

            $productCustomData = new ProductCustomData();
            $productCustomData->product_id = $product->id;
            $productCustomData->product_custom_field_id = $productCustomFild->id;
            $productCustomData->value = $importRawProductData->style;
            $productCustomData->save();
            }

            if($importRawProductData->colour != 'NA') {
            $productCustomFild = new ProductCustomField();
            $productCustomFild->name = 'Colour';
            $productCustomFild->custom_field_type_id = 1;
            $productCustomFild->is_mandatory = true;
            $productCustomFild->product_sub_category_id = $sub_category_id;
            $productCustomFild->save();

            $productCustomData = new ProductCustomData();
            $productCustomData->product_id = $product->id;
            $productCustomData->product_custom_field_id = $productCustomFild->id;
            $productCustomData->value = $importRawProductData->colour;
            $productCustomData->save();
            }

            if($importRawProductData->discount != 'NA') {
            $productCustomFild = new ProductCustomField();
            $productCustomFild->name = 'Discount %';
            $productCustomFild->custom_field_type_id = 1;
            $productCustomFild->is_mandatory = true;
            $productCustomFild->product_sub_category_id = $sub_category_id;
            $productCustomFild->save();

            $productCustomData = new ProductCustomData();
            $productCustomData->product_id = $product->id;
            $productCustomData->product_custom_field_id = $productCustomFild->id;
            $productCustomData->value = $importRawProductData->discount;
            $productCustomData->save();
            }

            if($importRawProductData->width != 'NA') {
            $productCustomFild = new ProductCustomField();
            $productCustomFild->name = 'Width ';
            $productCustomFild->custom_field_type_id = 1;
            $productCustomFild->is_mandatory = true;
            $productCustomFild->product_sub_category_id = $sub_category_id;
            $productCustomFild->save();

            $productCustomData = new ProductCustomData();
            $productCustomData->product_id = $product->id;
            $productCustomData->product_custom_field_id = $productCustomFild->id;
            $productCustomData->value = $importRawProductData->width;
            $productCustomData->save();
            }

            if($importRawProductData->height != 'NA') {
            $productCustomFild = new ProductCustomField();
            $productCustomFild->name = 'Height';
            $productCustomFild->custom_field_type_id = 1;
            $productCustomFild->is_mandatory = true;
            $productCustomFild->product_sub_category_id = $sub_category_id;
            $productCustomFild->save();

            $productCustomData = new ProductCustomData();
            $productCustomData->product_id = $product->id;
            $productCustomData->product_custom_field_id = $productCustomFild->id;
            $productCustomData->value = $importRawProductData->height;
            $productCustomData->save();
            }

            if($importRawProductData->depth != 'NA') {
                $productCustomFild = new ProductCustomField();
                $productCustomFild->name = 'Depth';
                $productCustomFild->custom_field_type_id = 1;
                $productCustomFild->is_mandatory = true;
                $productCustomFild->product_sub_category_id = $sub_category_id;
                $productCustomFild->save();

                $productCustomData = new ProductCustomData();
                $productCustomData->product_id = $product->id;
                $productCustomData->product_custom_field_id = $productCustomFild->id;
                $productCustomData->value = $importRawProductData->depth;
                $productCustomData->save();
            }
            /****************************************************************************************/

            File::exists('uploads/products/'.$product->id) or File::makeDirectory('uploads/products/'.$product->id);
            File::exists('uploads/products/'.$product->id.'/originals') or File::makeDirectory('uploads/products/'.$product->id.'/originals');
            $randStr = Str::random(16);


            //$ext = pathinfo(asset("/temp/".$importRawProductData->image), PATHINFO_EXTENSION);
            $new_path = 'uploads/products/'.$product->id.'/originals';
            $new_img_path = false;
            if(File::exists('temp/'.$importRawProductData->image.'.png')){
                File::copy("temp/".$importRawProductData->image.'.png', $new_path.'/'.$randStr.'.png');
                $new_img_path = '/'.$new_path.'/'.$randStr.'.png';
            }
            if(File::exists('temp/'.$importRawProductData->image.'.jpg')){

                File::copy("temp/".$importRawProductData->image.'.jpg', $new_path.'/'.$randStr.'.jpg');
                $new_img_path = '/'.$new_path.'/'.$randStr.'.jpg';
            }
            if(File::exists('temp/'.$importRawProductData->image.'.tif')){

                File::copy("temp/".$importRawProductData->image.'.tif', $new_path.'/'.$randStr.'.tif');
                $new_img_path = '/'.$new_path.'/'.$randStr.'.tif';
            }

            if(!$new_img_path){
                $new_img_path = '/img/NoImageAvailible.png';
            }

            $product = Product::find($product->id);
            $product->image = $new_img_path;
            $product->save();

            $product_sub_category_map = new ProductSubCategoryMap();
            $product_sub_category_map->sub_category_id =$sub_category_id;
            $product_sub_category_map->product_id = $product->id;
            $product_sub_category_map->save();

           // Cache::tags('product_categories')->flush();

        }
        DB::table('import_raw_product_datas')->truncate();
        return Redirect::to('/advanced/data-import/products');
    }
}
