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

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class PrintController extends Controller
{
    public function  test($projectid){
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

        $project = Project::find($projectid);
        $data = $this->getAllProducts($projectid);
        $data0 = $data[0];
        $data1 = $data[1];
        //dd($data1);
        session(['products'=>$data0,'qty'=>$data1,'project'=>$project]);
        /*$pdf = \PDF::loadView('print.test', ['a'=>$data])->setPaper('a4');
        $m->addRaw($pdf->output());*/
        $pdf = \PDF::loadView('print.test2', ['a'=>$data])->setPaper('a4');
        $m->addRaw($pdf->output());
        return file_put_contents('a4.pdf', $m->merge());
        //return $pdf->download('invoice.pdf');
    }
    public function  a3($projectid){
        //$this->getAllProducts(2);
        $m = new Merger();
        $projectFloorCatalogDesigns = [];
        $loop = [];
        $project = Project::find($projectid);
        $projectFloors = ProjectFloor::where('project_id','=',$project->id)->get();
        foreach ($projectFloors as $projectFloor){
            $loop[] = ['printable_image_path'=>$projectFloor->printable_image_path];
            $projectFloorCatalogs = ProjectFloorCatalog::where('project_floor_id','=',$projectFloor->id)->get();
            foreach ($projectFloorCatalogs as $projectFloorCatalog){
                $projectFloorCatalogDesigns[] = ProjectFloorCatalogDesign::where('project_floor_catalog_id','=',$projectFloorCatalog->id)->get();
            }
        }

        $data = [
            'projectFloorCatalogDesigns' => $projectFloorCatalogDesigns,
            'project' => $project,
            'loop' => $loop
        ];
        session(['data'=>$data]);
        $pdf = \PDF::loadView('print.plan', ['a'=>$projectFloors])
            ->setPaper('a3')
           // ->setOption('footer-html',$request->root().'/print/footers/a3')
            ->setOrientation('landscape');




        $m->addRaw($pdf->output());
        return file_put_contents('a3.pdf', $m->merge());
    }

    public function a3footer(){
        return view('print.a3_footer');
    }

    private function getAllProducts($project_id){
        $canvas_id_data = [];
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


    public function downloadA4($projectid)
    {
        $this->test($projectid);
        $file= public_path(). "/a4.pdf";

        $headers = array(
            'Content-Type: application/pdf',
        );

        return Response::download($file, 'A4.pdf', $headers);
    }
    public function downloadA3($projectid)
    {
        $this->a3($projectid);
        $file= public_path(). "/a3.pdf";

        $headers = array(
            'Content-Type: application/pdf',
        );

        return Response::download($file, 'A3.pdf', $headers);
    }
}
