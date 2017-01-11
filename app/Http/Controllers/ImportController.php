<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ImportController extends Controller
{
    public function index(){
        return view('advanced.data_import.index');
    }
}
