<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

use App\Http\Requests;

class CompositeProductsController extends ProductsController
{
    public function show($id)
    {
        $compositeProduct = Product::find($id);
        return view('products.composite-products.show')
            ->with('composite_product', $compositeProduct);
    }
}
