<?php

namespace App\Http\Controllers;

use App\ProductSubCategory;
use Illuminate\Http\Request;

use App\Http\Requests;

class PacksController extends ProductsController
{
    public function show($id)
    {
        $pack = ProductSubCategory::find($id);
        return view('products.packs.show')
            ->with('pack', $pack);
    }
}