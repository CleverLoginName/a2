<?php

namespace App\Http\Controllers;

use App\Catalog;
use App\Category;
use App\CategoryType;
use App\ProductCatalog;
use App\ProductCategory;
use App\ProductCategoryType;
use App\ProductSubCategory;
use App\ProductSupplier;
use App\SubCategory;
use App\Supplier;
use App\Temp;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Psy\Util\Json;

class TempController extends Controller
{
    public function index()
    {
        //$temp = Temp::all()->last();
        return view('tmp.index');
        // ->with('catalogs', $catalogs);
    }

    public function products()
    {
        $out = [];
        $catalogs = ProductCatalog::all();
        foreach ($catalogs as $catalog) {

            $catalog_array = [];
            $catalog_array['catalog_id'] = $catalog->id;
            $catalog_array['catalog_name'] = $catalog->name;

            $categories = ProductCategory::where('catalog_id', '=', $catalog->id)->get();
            foreach ($categories as $category) {
                $category_array = [];
                $category_array['category_id'] = $category->id;
                $category_array['category_name'] = $category->name;
                $category_type = ProductCategoryType::where('id','=',$category->type)->first();
                if($category_type){
                    $category_array['category_type'] = $category_type->name;
                }else{
                    $category_array['category_type'] = null;
                }
                $category_array['category_colour'] = $category->colour;


                $subCategories = ProductSubCategory::where('category_id', '=', $category->id)->get();
                foreach ($subCategories as $subCategory) {
                    $sub_category_array = [];
                    $sub_category_array['sub_category_id'] = $subCategory->id;
                    $sub_category_array['sub_category_name'] = $subCategory->name;
                    $sub_category_array['is_pack'] = $subCategory->is_pack;
                    $sub_category_array['builder_price'] = $subCategory->builder_price;
                    $sub_category_array['supplier_price'] = $subCategory->supplier_price;
                    $sub_category_array['contractor_price'] = $subCategory->contractor_price;

                    //foreach
                    $products = DB::table('products')
                        ->join('product_sub_category_maps', 'product_sub_category_maps.product_id', '=', 'products.id')
                        ->join('product_sub_categories', 'product_sub_category_maps.sub_category_id', '=', 'product_sub_categories.id')
                        ->join('product_icons', 'products.icon', '=', 'product_icons.id')
                        ->select('products.*', 'product_icons.path', 'product_icons.name as symbol_name')
                        ->where('product_sub_categories.id', '=', $subCategory->id)
                        ->get();
                    foreach ($products as $product) {
                        //custom Fields
                        $custom_fields = DB::table('product_custom_datas')
                            ->join('product_custom_fields', 'product_custom_datas.product_custom_field_id', '=', 'product_custom_fields.id')
                            ->select('product_custom_datas.value', 'product_custom_fields.name')
                            ->where('product_custom_datas.product_id', '=', $product->id)
                            ->get();
                        $product_array = [];
                        $product_array['id'] = $product->id;
                        $product_array['name'] = $product->name;
                        $product_array['description'] = $product->description;
                        $product_array['icon'] = $product->path;
                        $product_array['path'] = $product->image;
                        $product_array['contractor_price'] = $product->contractor_price;
                        $product_array['builder_price'] = $product->builder_price;
                        $product_array['supplier_price'] = $product->supplier_price;
                        $product_array['sale_price'] = $product->supplier_price; // To Del
                        $product_array['productCode'] = $product->symbol_name;
                        if(ProductSupplier::find($product->supplier_id)){
                            $product_array['supplier'] = ProductSupplier::find($product->supplier_id)->name;
                        }else{
                            $product_array['supplier'] = null;
                        }

                        if($category_type){
                            $product_array['type'] = $category_type->name;
                        }else{
                            $product_array['type'] = null;
                        }

                        foreach ($custom_fields as $key => $value) {
                            $product_array[$value->name] = $value->value;
                        }

                        $sub_category_array['data'][] = $product_array;
                    }

                    $category_array['data'][] = $sub_category_array;


                }
                $catalog_array['data'][] = $category_array;
            }
            $out[] = $catalog_array;
        }


        return $out;
        return '[
	{
		"catalog_id": 1,
		"catalog_name": "Electrical",
		"data": [
			{
				"catagory_id": 1,
				"category_name": "Lights",
				"data": [
					{
						"sub_catagory_id": 1,
						"sub_category_name": "LED",
						"data": [
							{
								"description": "Chandelier Lamp",
								"name": "product 1",
								"icon":"/img/symbols/AUT-039.png",
								"price": 200,
								"path": "/img/chandelier-lamp.png",
								"wattage": 100,
								"productCode": "PHL-001",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							},
							{
								"description": "Desk Lamp",
								"name": "product 2",
								"icon":"/img/symbols/HN-024.png",
								"price": 300,
								"path": "/img/deskLamp1.png",
								"wattage": 75,
								"productCode": "PHL-002",
								"catalogue": "Lights",
								"category": "Desk_Lamp"
							},
							{
								"description": "Hanging Linght",
								"name": "product 3",
								"icon":"/img/symbols/AUT-039.png",
								"price": 400,
								"path": "/img/hangingLight.png",
								"wattage": 150,
								"productCode": "PHL-003",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							}
						]
					},
					{
						"sub_catagory_id": 2,
						"sub_category_name": "Fluorescent",
						"data": [
							{
								"description": "Chandelier Lamp",
								"name": "product 4",
								"icon":"/img/symbols/AUT-039.png",
								"price": 200,
								"path": "/img/chandelier-lamp.png",
								"wattage": 100,
								"productCode": "PHL-001",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							},
							{
								"description": "Desk Lamp",
								"name": "product 5",
								"icon":"/img/symbols/HN-024.png",
								"price": 300,
								"path": "/img/deskLamp1.png",
								"wattage": 75,
								"productCode": "PHL-002",
								"catalogue": "Lights",
								"category": "Desk_Lamp"
							},
							{
								"description": "Hanging Linght",
								"name": "product 6",
								"icon":"/img/symbols/AUT-039.png",
								"price": 400,
								"path": "/img/hangingLight.png",
								"wattage": 150,
								"productCode": "PHL-003",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							}
						]
					}
				]
			},
			{
				"catagory_id": 2,
				"category_name": "Air conditioning",
				"data": [
					{
						"sub_catagory_id": 3,
						"sub_category_name": "Inverter",
						"data": [
							{
								"description": "Chandelier Lamp",
								"name": "product 7",
								"icon":"/img/symbols/AUT-039.png",
								"price": 200,
								"path": "/img/chandelier-lamp.png",
								"wattage": 100,
								"productCode": "PHL-001",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							},
							{
								"description": "Desk Lamp",
								"name": "product 8",
								"icon":"/img/symbols/AUT-039.png",
								"price": 300,
								"path": "/img/deskLamp1.png",
								"wattage": 75,
								"productCode": "PHL-002",
								"catalogue": "Lights",
								"category": "Desk_Lamp"
							},
							{
								"description": "Hanging Linght",
								"name": "product 9",
								"icon":"/img/symbols/AUT-039.png",
								"price": 400,
								"path": "/img/hangingLight.png",
								"wattage": 150,
								"productCode": "PHL-003",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							}
						]
					},
					{
						"sub_catagory_id": 4,
						"sub_category_name": "Non Inverter",
						"data": [
							{
								"description": "Chandelier Lamp",
								"name": "product 10",
								"icon":"/img/symbols/AUT-039.png",
								"price": 200,
								"path": "/img/chandelier-lamp.png",
								"wattage": 100,
								"productCode": "PHL-001",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							},
							{
								"description": "Desk Lamp",
								"name": "product 11",
								"icon":"/img/symbols/AUT-039.png",
								"price": 300,
								"path": "/img/deskLamp1.png",
								"wattage": 75,
								"productCode": "PHL-002",
								"catalogue": "Lights",
								"category": "Desk_Lamp"
							},
							{
								"description": "Hanging Linght",
								"name": "product 12",
								"icon":"/img/symbols/AUT-039.png",
								"price": 400,
								"path": "/img/hangingLight.png",
								"wattage": 150,
								"productCode": "PHL-003",
								"catalogue": "Lights",
								"category": "Hanging_Lights"
							}
						]
					}
				]
			}
		]
	}
]';
    }

    public function products1()
    {
        return '[{
"description": "Chandelier Lamp",
"name": "chandelier",
"price": 200,
"path": "img/chandelier-lamp.png",
"wattage": 100,
"productCode": "PHL-001",
"catalogue": "Lights",
"category": "Hanging_Lights"
},
  {
"description": "Desk Lamp",
"name": "deskLamp1",
"price": 300,
"path": "img/deskLamp1.png",
"wattage": 75,
"productCode": "PHL-002",
"catalogue": "Lights",
"category": "Desk_Lamp"
},
  {
"description": "Hanging Linght",
"name": "hangingLight",
"price": 400,
"path": "img/hangingLight.png",
"wattage": 150,
"productCode": "PHL-003",
"catalogue": "Lights",
"category": "Hanging_Lights"
},
  {
"description": "Light Switch",
"name": "Light Switch",
"price": 100,
"path": "img/lightSwitch.png",
"wattage": 0,
"productCode": "PHL-004",
"catalogue": "Switch",
"category": "Light_Switch"
},
  {
"description": "Prise Telephonique",
"name": "Prise Telephonique",
"price": 100,
"path": "img/priseTelephonique.png",
"wattage": 0,
"productCode": "PHL-005",
"catalogue": "Prise",
"category": "Prise_tele"
},
  {
"description": "Prise TV",
"name": "Price TV",
"price": 100,
"path": "img/priseTV.png",
"wattage": 0,
"productCode": "PHL-006",
"catalogue": "Prise",
"category": "Prise_TV"
}]';
    }

    public function save(Request $request)
    {
        $temp = new Temp();
        $temp->data = $request->get('file_data');
        $temp->save();
        return $temp->id;
    }

    public function load()
    {
        return DB::table('temps')->orderBy('id', 'desc')->first()->data;
    }

    public function loadOne($id)
    {
        return DB::table('temps')->where('id', '=', $id)->first()->data;
    }
}
