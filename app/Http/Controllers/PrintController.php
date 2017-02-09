<?php

namespace App\Http\Controllers;

use App\Product;
use App\Template;
use App\TemplateFloor;
use App\TemplateFloorCatalog;
use Barryvdh\DomPDF\PDF;
use iio\libmergepdf\Merger;
use Illuminate\Http\Request;

use App\Http\Requests;

class PrintController extends Controller
{
    public function  test(){
        $this->getAllProducts(2);
        $m = new Merger();

        $data = $this->getAllProducts(2);
        $pdf = \PDF::loadView('print.test', compact('data'));
        $pdf = $pdf->setPaper('a4', 'portrait')
            ->setWarnings(false);
        //$pdf->render();
        $m->addRaw($pdf->output());

        $pdf = \PDF::loadView('print.test2', $data);
        $pdf = $pdf->setPaper('a4', 'portrait')
            ->setOptions(['dpi' => 300])
            ->setWarnings(false);
        //$pdf->render();
        $m->addRaw($pdf->output());

        return file_put_contents('combined.pdf', $m->merge());
    }

    private function getAllProducts($template_id){
        $canvas_data = [];
        $template = Template::find($template_id);
        $templateFloors = TemplateFloor::where('template_id','=',$template->id)->get();
        foreach ($templateFloors as $templateFloor){
            $templateFloorCatalogs = TemplateFloorCatalog::where('template_floor_id','=',$templateFloor->id)->get();
            $data = [];
            foreach ($templateFloorCatalogs as $templateFloorCatalog){
                $data[] = json_decode($templateFloorCatalog->canvas_data, true);
                foreach ($data[0] as $data_item){
                    //dd($data_item);
                    $canvas_data[] = Product::find($data_item['id']);
                    //$canvas_data[] = $data_item;
                }
            }
        }

        //dd($canvas_data);
        return $canvas_data;

    }
    public function  test1(){
        return view('print.test');

    }
    public function  test2(){
        return view('print.test2');

    }
}
