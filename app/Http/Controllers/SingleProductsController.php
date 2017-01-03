<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

use App\Http\Requests;

class SingleProductsController extends ProductsController
{
    public function show($id)
    {
        $product = Product::find($id);
        return view('products.single-products.show')
            ->with('single_product', $product);
    }
}
