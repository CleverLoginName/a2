<?php

namespace App\Http\Controllers;

use App\CustomFieldType;
use App\ProductCustomField;
use App\ProductSubCategory;
use App\Http\Requests;
use Illuminate\Support\Facades\Redirect;


class CustomFieldsController extends Controller
{
    public function index(){
        return view('advanced.custom_fields.index');
    }
    
    public function productsCustomFields(){
        $subCategories = ProductSubCategory::where('is_pack', '=', false)->get();
        $customFieldTypes = CustomFieldType::lists('name','id');
        if($subCategories)
        {
            $customFields = ProductCustomField::where('product_sub_category_id', '=', $subCategories[0]->id)->get();
            return view('advanced.custom_fields.products')
                ->with('customFields',$customFields)
                ->with('customFieldTypes',$customFieldTypes)
                ->with('subCategories',$subCategories);
        }
        return view('advanced.custom_fields.products');
    }

    public function store(Request $request)
    {
        $productCustomField = new ProductCustomField();
        $productCustomField->name = $request->get();
        $productCustomField->name = $request->get();
        $productCustomField->save();


        return Redirect::to('advanced/custom-fields/products');
    }

}
