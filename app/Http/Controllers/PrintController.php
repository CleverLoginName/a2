<?php

namespace App\Http\Controllers;

use App\Product;
use App\Project;
use App\ProjectFloor;
use App\ProjectFloorCatalog;
use App\ProjectFloorCatalogDesign;
use App\Template;
use App\TemplateFloor;
use App\TemplateFloorCatalog;
use iio\libmergepdf\Merger;
use Illuminate\Http\Request;

use App\Http\Requests;
class PrintController extends Controller
{
    public function  test(){
        //$this->getAllProducts(2);
        $m = new Merger();
/*
        $data = $this->getAllProducts(5);
        $pdf = \PDF::loadView('print.test', compact('data'));
        $pdf = $pdf
            ->setPaper('A4', 'portrait')
            //->setPaper(array(0, 0, 594, 1520), 'portrait')
            ->setOptions(['dpi' => 150,'isRemoteEnabled'=>true]);
            //->setWarnings(false);
        //$pdf->render();
        $m->addRaw($pdf->output());
*//*
        $pdf = \PDF::loadView('print.test2', compact('data'));
        $pdf = $pdf->setPaper('a4', 'portrait')
            ->setOptions(['dpi' => 150,'isRemoteEnabled'=>true])
            ->setWarnings(false);
        //$pdf->render();
        $m->addRaw($pdf->output());

        return file_put_contents('combined.pdf', $m->merge());*/


        $data = $this->getAllProducts(5);
        $data0 = $data[0];
        $data1 = $data[1];
        //dd($data1);
        session(['products'=>$data0,'qty'=>$data1]);
        $pdf = \PDF::loadView('print.test', ['a'=>$data])->setPaper('a4');
        $m->addRaw($pdf->output());
        $pdf = \PDF::loadView('print.test2', ['a'=>$data])->setPaper('a4');
        $m->addRaw($pdf->output());
        return file_put_contents('combined.pdf', $m->merge());
        return $pdf->download('invoice.pdf');
    }
    public function  a3(){
        //$this->getAllProducts(2);
        $m = new Merger();
        $project = Project::find(5);
        $projectFloors = ProjectFloor::where('project_id','=',$project->id)->get();

        session(['projectFloors'=>$projectFloors]);
        $pdf = \PDF::loadView('print.plan', ['a'=>$projectFloors])->setPaper('a3')->setOrientation('landscape');
        $m->addRaw($pdf->output());
        return file_put_contents('combined.pdf', $m->merge());
    }

    private function getAllProducts($project_id){
        $canvas_data = [];
        $project = Project::find($project_id);
        $projectFloors = ProjectFloor::where('project_id','=',$project->id)->get();
        foreach ($projectFloors as $projectFloor){
            $projectFloorCatalogs = ProjectFloorCatalog::where('project_floor_id','=',$projectFloor->id)->get();
            $data = [];
            foreach ($projectFloorCatalogs as $projectFloorCatalog){

                $projectFloorCatalogDesigns = ProjectFloorCatalogDesign::where('project_floor_catalog_id','=',$projectFloorCatalog->id)->get();
                foreach ($projectFloorCatalogDesigns as $projectFloorCatalogDesign){
                $data[] = json_decode($projectFloorCatalogDesign->canvas_data, true);
                foreach ($data[0] as $data_item){

                    $product = Product::find($data_item['id']);
                    $canvas_id_data[] = $product->id;
                    $canvas_data[$product->id] = $product;

                   /* foreach ($canvas_data as $tmp){

                        if(array_key_exists($data_item['id'], $canvas_data))
                        $item = [];
                        $item['product_id'] = $product->id;
                        $item['count'] = 1;
                        $item['data'] = $product;
                        $canvas_data[$data_item['id']] = $item;
                        $canvas_data[$data_item['id']]['count'] =  $canvas_data[$data_item['id']]['count'] + 1;

                    }*/



                }
                }
            }
        }
        $canvas_id_data = array_count_values($canvas_id_data);

        return [$canvas_data,$canvas_id_data];

    }
    public function  test1(){
        return view('print.test');

    }
    public function  test2(){
        return view('print.test2');

    }
}
