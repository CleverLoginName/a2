<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductSubCategory;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class ProductsController extends Controller
{


    public function index()
    {
        $products          = Product::where('is_composite', '=', 0)->get();
        $compositeProducts = Product::where('is_composite', '=', 1)->get();
        $packs             = DB::table('products')->join('product_sub_category_maps', 'products.id', '=', 'product_sub_category_maps.product_id')->join(
            'product_sub_categories',
            'product_sub_categories.id',
            '=',
            'product_sub_category_maps.sub_category_id'
        )->select('product_sub_categories.*')->where('product_sub_categories.is_pack', '=', true)->groupBy('product_sub_categories.id')->get();

        $out = [];

        foreach ($products as $product) {
            $subCategory = DB::table('product_sub_categories')->join('product_sub_category_maps', 'products.id', '=', 'product_sub_category_maps.product_id')->where('products.id', '=', $product->id)->where('product_sub_categories.is_pack', '=', false)->first();
            $category    = DB::table('product_categories')->where('product_categories.id', '=', $subCategory->category_id)->first();

            if ($category) {
                $category_name = $category->name;
            } else {
                $category_name = 'Deleted';
            }

            if ($subCategory) {
                $subCategory_name = $subCategory->name;
            } else {
                $subCategory_name = 'Deleted';
            }

            $tmp                  = [];
            $tmp['name']          = $product->name;
            $tmp['description']   = $product->description;
            $tmp['type']          = 'Single-Product';
            $tmp['category']      = $category_name;
            $tmp['sub_category']  = $subCategory_name;
            $tmp['builder_price'] = $product->builder_price;
            $tmp['image']         = $product->image;
            $tmp['more_url']      = 'products/'.$product->id;
            $tmp['edit_url']      = 'products/'.$product->id.'/edit';
            $tmp['delete_url']    = 'products/'.$product->id.'/delete';
            $out[]                = $tmp;
        }//end foreach

        foreach ($compositeProducts as $compositeProduct) {
            $subCategory = DB::table('product_sub_categories')->join('product_sub_category_maps', 'products.id', '=', 'product_sub_category_maps.product_id')->where('products.id', '=', $product->id)->where('product_sub_categories.is_pack', '=', false)->first();
            $category    = DB::table('product_categories')->where('product_categories.id', '=', $subCategory->category_id)->first();

            if ($category) {
                $category_name = $category->name;
            } else {
                $category_name = 'Deleted';
            }

            if ($subCategory) {
                $subCategory_name = $subCategory->name;
            } else {
                $subCategory_name = 'Deleted';
            }

            $tmp                  = [];
            $tmp['name']          = $compositeProduct->name;
            $tmp['description']   = $compositeProduct->description;
            $tmp['type']          = 'Composite Product';
            $tmp['category']      = $category_name;
            $tmp['sub_category']  = $subCategory_name;
            $tmp['builder_price'] = $compositeProduct->builder_price;
            $tmp['image']         = $compositeProduct->image;
            $tmp['more_url']      = 'products/'.$compositeProduct->id;
            $tmp['edit_url']      = 'products/'.$compositeProduct->id.'/edit';
            $tmp['delete_url']    = 'products/'.$compositeProduct->id.'/delete';
            $out[]                = $tmp;
        }//end foreach

        foreach ($packs as $pack) {
            $tmp = [];
            if (ProductSubCategory::find($pack->id)) {
                $tmp['name']        = $pack->name;
                $tmp['description'] = $pack->description;
                $tmp['type']        = 'Pack';
                $tmp['more_url']    = 'packs/'.$pack->id;
                $tmp['edit_url']    = 'packs/'.$pack->id.'/edit';
                $tmp['delete_url']  = 'packs/'.$pack->id.'/delete';
                $out[]              = $tmp;
            }
        }

        return view('products.index')->with('products', $out);
    }//end index()


    public function allData()
    {
        $products          = Product::where('is_composite', '=', 0)->get();
        $compositeProducts = Product::where('is_composite', '=', 1)->get();
        $packs             = DB::table('products')->join('product_sub_category_maps', 'products.id', '=', 'product_sub_category_maps.product_id')->join(
            'product_sub_categories',
            'product_sub_categories.id',
            '=',
            'product_sub_category_maps.sub_category_id'
        )->select('product_sub_categories.*')->where('product_sub_categories.is_pack', '=', true)->groupBy('product_sub_categories.id')->get();

        $out = [];

        foreach ($products as $product) {
            $subCategory = DB::table('product_sub_categories')->join('product_sub_category_maps', 'products.id', '=', 'product_sub_category_maps.product_id')->where('products.id', '=', $product->id)->where('product_sub_categories.is_pack', '=', false)->first();
            $category    = DB::table('product_categories')->where('product_categories.id', '=', $subCategory->category_id)->first();

            if ($category) {
                $category_name = $category->name;
            } else {
                $category_name = 'Deleted';
            }

            if ($subCategory) {
                $subCategory_name = $subCategory->name;
            } else {
                $subCategory_name = 'Deleted';
            }

            $tmp                  = [];
            $tmp['name']          = $product->name;
            $tmp['description']   = $product->description;
            $tmp['type']          = 'Single-Product';
            $tmp['category']      = $category_name;
            $tmp['sub_category']  = $subCategory_name;
            $tmp['builder_price'] = $product->builder_price;
            $tmp['image']         = $product->image;
            $tmp['more_url']      = 'products/'.$product->id;
            $tmp['edit_url']      = 'products/'.$product->id.'/edit';
            $tmp['delete_url']    = 'products/'.$product->id.'/delete';
            $out[]                = $tmp;
        }//end foreach

        foreach ($compositeProducts as $compositeProduct) {
            $subCategory = DB::table('product_sub_categories')->join('product_sub_category_maps', 'products.id', '=', 'product_sub_category_maps.product_id')->where('products.id', '=', $product->id)->where('product_sub_categories.is_pack', '=', false)->first();
            $category    = DB::table('product_categories')->where('product_categories.id', '=', $subCategory->category_id)->first();

            if ($category) {
                $category_name = $category->name;
            } else {
                $category_name = 'Deleted';
            }

            if ($subCategory) {
                $subCategory_name = $subCategory->name;
            } else {
                $subCategory_name = 'Deleted';
            }

            $tmp                  = [];
            $tmp['name']          = $compositeProduct->name;
            $tmp['description']   = $compositeProduct->description;
            $tmp['type']          = 'Composite Product';
            $tmp['category']      = $category_name;
            $tmp['sub_category']  = $subCategory_name;
            $tmp['builder_price'] = $compositeProduct->builder_price;
            $tmp['image']         = $compositeProduct->image;
            $tmp['more_url']      = 'products/'.$compositeProduct->id;
            $tmp['edit_url']      = 'products/'.$compositeProduct->id.'/edit';
            $tmp['delete_url']    = 'products/'.$compositeProduct->id.'/delete';
            $out[]                = $tmp;
        }//end foreach

        foreach ($packs as $pack) {
            $tmp = [];
            if (ProductSubCategory::find($pack->id)) {
                $tmp['name']        = $pack->name;
                $tmp['description'] = $pack->description;
                $tmp['type']        = 'Pack';
                $tmp['more_url']    = 'packs/'.$pack->id;
                $tmp['edit_url']    = 'packs/'.$pack->id.'/edit';
                $tmp['delete_url']  = 'packs/'.$pack->id.'/delete';
                $out[]              = $tmp;
            }
        }

        return Response::json($out);
    }//end allData()
}//end class
