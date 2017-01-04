<?php

namespace App\Http\Controllers;

use App\ProductCustomField;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;

class ProductCustomFieldsController extends Controller
{
    public function fieldsBySubCategoryId(){

        $sub_category_id = Input::get('sub_category_id');
        session(['sub_category_id' => $sub_category_id ]);

        return $sub_category_id;


        $customFields = ProductCustomField::where('sub_category_id','=',$sub_category_id)->get();
        $out = [];
        foreach ($customFields as $customField){
            $out[] = [
                'name'=>$customField->name,
                'type'=>CustomFieldType::find($customField->custom_field_type_id)->name,
                'is_mandatory'=>$customField->is_mandatory
            ];

        }
        return $out;

    }
}
