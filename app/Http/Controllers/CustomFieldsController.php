<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class CustomFieldsController extends Controller
{
    public function index(){
        return view('custom_fields.index');
    }
}
