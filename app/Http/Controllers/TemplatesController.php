<?php

namespace App\Http\Controllers;

use App\Floor;
use App\ProductCatalog;
use App\Template;
use App\TemplateFloor;
use App\TemplateFloorCatalog;
use App\TemplateImage;
use App\TemplatePlan;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Spatie\PdfToImage\Pdf;
use Szykra\Notifications\Flash;

class TemplatesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::all();
        return view('templates.index')
            ->with('templates', $templates);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('templates.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $rules = array(
            'name'   => 'required',
            'scale'    => 'required',
            'energy_rating'    => 'required',
            'house_watts_per_sqm'    => 'required',
            'garage_watts_per_sqm'    => 'required',
            'porch_watts_per_sqm'    => 'required',
            'terrace_watts_per_sqm'    => 'required',
            'balcony_watts_per_sqm'    => 'required',
            'alfresco_watts_per_sqm'    => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/templates/create')
                ->withErrors($validator);

        $template = new Template();
        $template->name = $request->get('name');
        $template->scale = $request->get('scale');
        $template->energy_rating = $request->get('energy_rating');
        $template->sqm_house = $request->get('house_watts_per_sqm');
        $template->sqm_porch = $request->get('porch_watts_per_sqm');
        $template->sqm_garage = $request->get('garage_watts_per_sqm');
        $template->sqm_terrace = $request->get('terrace_watts_per_sqm');
        $template->sqm_balcony = $request->get('balcony_watts_per_sqm');
        $template->sqm_porch = $request->get('porch_watts_per_sqm');
        $template->canvas_data = '';
        $template->save();

        Flash::success('Template Added', 'Template has been added successfully.');
        session(['template' => $template]);
        return Redirect::to('/templates/create/add-plans');

    }

    public function addPlan(Request $request){
        //$templatesFloors = TemplateFloor::where('template_id','=',session('template')->id)->get();
        //$tempalateFloorCatalogs = TemplateFloorCatalog::where('template_floor_id')

        $templateCatalogs = ProductCatalog::lists('name','id');
        $templateFloors = Floor::lists('name','id');
        $templateFloorCatalogs = DB::table('template_floor_catalogs')
            ->join('template_floors','template_floors.id','=','template_floor_catalogs.template_floor_id')
            ->join('templates','templates.id','=','template_floors.template_id')
            ->join('template_images','template_floors.template_image_id','=','template_images.id')
            ->join('floors','template_floors.floor_id','=','floors.id')
            ->join('product_catalogs','template_floor_catalogs.catalog_id','=','product_catalogs.id')
            ->select([
                'template_images.path as image_path',
                'template_images.name as image_name',
                'floors.name as floor_name',
                'template_floors.id as template_floor_id',
                'template_floor_catalogs.id as template_floor_catalog_id',
                'template_floor_catalogs.design as template_floor_catalog_design',
                'product_catalogs.name as catalog_name',
                'product_catalogs.id as catalog_id',
                'templates.name as template_name'
            ])
            ->where('template_floor_catalogs.is_active', '=', true)
            ->where('templates.id', '=', session('template')->id)
            ->get();
         if($templateFloorCatalogs)
            return  view('templates.addPlans')
                ->with('template',session('template'))
                ->with('templateCatalogs',$templateCatalogs)
                ->with('templateFloors',$templateFloors)
                ->with('templateFloorCatalogs',$templateFloorCatalogs);

            return  view('templates.addPlans')
                ->with('template',session('template'))
                ->with('templateCatalogs',$templateCatalogs)
                ->with('templateFloors',$templateFloors)
                ->with('templateFloorCatalogs',$templateFloorCatalogs);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addTemplatePlansImage(Request $request)
    {//dd($request->all());
        $file = $request->file('file');
/*
        //Display File Name
        echo 'File Name: '.$file->getClientOriginalName();
        echo '<br>';

        //Display File Extension
        echo 'File Extension: '.$file->getClientOriginalExtension();
        echo '<br>';

        //Display File Real Path
        echo 'File Real Path: '.$file->getRealPath();
        echo '<br>';

        //Display File Size
        echo 'File Size: '.$file->getSize();
        echo '<br>';

        //Display File Mime Type
        echo 'File Mime Type: '.$file->getMimeType();
*/
        $randStr = Str::random(16);
        $randFileName = $randStr.'.'.$file->getClientOriginalExtension();
        //Move Uploaded File
        $destinationPath = 'uploads/templates/'.$request->get('template_id').'/originals/';
        $destinationPathThumb = 'uploads/templates/'.$request->get('template_id').'/300x200/';//dd(public_path().'/'.$destinationPath);
        $destinationPathPdf = 'uploads/templates/'.$request->get('template_id').'/pdf/';//dd(public_path().'/'.$destinationPath);

        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/templates') or File::makeDirectory('uploads/templates');
        File::exists('uploads/templates/'.$request->get('template_id')) or File::makeDirectory('uploads/templates/'.$request->get('template_id'));
        File::exists(public_path().'/'.$destinationPath) or File::makeDirectory(public_path().'/'.$destinationPath);
        File::exists(public_path().'/'.$destinationPathThumb) or File::makeDirectory(public_path().'/'.$destinationPathThumb);


        if('pdf' === $file->getClientOriginalExtension()){

            $pdf_path = public_path().'/'.$destinationPath.'pdf/';
            File::exists($pdf_path) or File::makeDirectory($pdf_path);
            $file->move($pdf_path,$randFileName);

            $pdf = new Pdf($pdf_path.$randFileName);
            $pdf->setOutputFormat('png')
                ->saveImage($destinationPath.$randStr.'.png');

            $randFileName = $randStr.'.png';
        }else{
            $file->move($destinationPath,$randFileName);
        }

        $templateImage = new TemplateImage();
        $templateImage->name = $file->getClientOriginalName();
        $templateImage->path = $destinationPath.$randFileName;
        $templateImage->save();

        $templateFloor = new TemplateFloor();
        $templateFloor->template_image_id = $templateImage->id;
        $templateFloor->floor_id = 1;
        $templateFloor->canvas_data = '';
        $templateFloor->template_id = session('template')->id;
        $templateFloor->save();

        $templateFloorCatalog = new TemplateFloorCatalog();
        $templateFloorCatalog->canvas_data = '';
        $templateFloorCatalog->template_floor_id = $templateFloor->id;
        $templateFloorCatalog->catalog_id = 1;
        $templateFloorCatalog->is_active = true;
        $templateFloorCatalog->save();


//        //if($request->get('save_plan')=='Y'){
//            $templatePlan = new TemplatePlan();
//            $templatePlan->design = '';
//            $templatePlan->level = 1;
//            $templatePlan->catalog_id =  1;
//            $templatePlan->template_data =  1;
//            $templatePlan->img = $destinationPath.$randFileName;
//            $templatePlan->img_300x200 = $destinationPath.$randFileName;
//            $templatePlan->template_id = session('template')->id;
//            $templatePlan->client_file_name = $file->getClientOriginalName();
//            $templatePlan->client_file_size = 0;
//           // $templatePlan->client_file_size = $file->getSize();
//            $templatePlan->save();
//        //}

//        $img = Image::make($templatePlan->img);
//        $img->resize(300, 200);
//        $img->save($destinationPathThumb.$randFileName, 75);
/*
        return  view('templates.addPlans')
            ->with('template',session('template'))
            ->with('empty_form',true);*/
        Flash::success('Image Added', 'Image has been added successfully.');


    }


    public function addTemplatePlansData(Request $request){

/*
 * array:6 [▼
  "_token" => "68kaUdMOTcisRn3SDzNmJ0176qMZpqM665t900gj"
  "id" => "4"
  "design" => "CSSC"
  "level" => "4"
  "catalog_id" => "4"
  "Save" => "Save"
]
 */

        //dd($request->all());

        $templateFloorCatalog = TemplateFloorCatalog::find($request->get('id'));
        $templateFloor = TemplateFloor::find($templateFloorCatalog->template_floor_id);
        $template = Template::find($templateFloor->template_id);

        $templateFloorCatalog->catalog_id = $request->get('catalog_id');
        $templateFloorCatalog->design = $request->get('design');
        $templateFloorCatalog->save();

        $templateFloor->floor_id = $request->get('level');
        $templateFloor->save();

        $templatesFloors = TemplatePlan::where('template_id','=',session('template')->id)->get();

        Flash::success('Updated successfully', 'Updated successfully.');
        return Redirect::to('/templates/create/add-plans');

    }

    public function deletePlanInCanvas($id){
        $templateFloorCatalog = TemplateFloorCatalog::find($id);
        $templateFloorCatalog->delete();
        Flash::success('Plan Deleted', 'Plan has been deleted successfully.');
        return Redirect::to('/templates/create/add-plans');
    }

    public function show($id)
    {
        $template = Template::find($id);
        $plans = TemplatePlan::where('template_id','=',$id)->get();
        session(['template' => $template]);
        return view('templates.show')
            ->with('plans', $plans)
            ->with('template', $template);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $template = Template::find($id);
        session(['template' => $template]);
        return view('templates.edit')
            ->with('template', $template);
    }

    public function editPlanInCanvas($id)
    {
        $template = DB::table('template_plans')->where('id','=',$id)->first();
        $allPlans = DB::table('template_plans')->where('template_id','=',$template->template_id)->get();
        session(['template_id' => $template->id ]);
        session(['plan_id' => $id ]);
        return view('canvas.index_new')
            ->with('bgImg', $template->img)
            ->with('plans', $allPlans);
    }


    public function updatePlanDataInCanvas(Request $request)
    {
        $fileData = $request->get('file_data') ;
        //dd($fileData);
        $templateFloorCatalog = TemplateFloorCatalog::find(session('plan_id'));
        $templateFloor = TemplateFloor::find($templateFloorCatalog->template_floor_id);
        $template = Template::find($templateFloor->template_id);

        $templateFloorCatalog->canvas_data = $fileData['products'];
        $templateFloorCatalog->save();

        $templateFloor->canvas_data = $fileData['floorplan'];
        $templateFloor->save();

        $template->canvas_data = $fileData['project'];
        $template->save();

        //return view('canvas.index_new');
    }

    public function loadPlanDataInCanvas()
    {
        $templatePlan = TemplatePlan::find(session('plan_id'));
        return $templatePlan->template_data;
        //return view('canvas.index_new');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rules = array(
            'name'   => 'required',
            'scale'    => 'required',
            'energy_rating'    => 'required',
            'house_watts_per_sqm'    => 'required',
            'garage_watts_per_sqm'    => 'required',
            'porch_watts_per_sqm'    => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/templates/create')
                ->withErrors($validator);

        $template = Template::find($id);
        $template->name = $request->get('name');
        $template->scale = $request->get('scale');
        $template->energy_rating = $request->get('energy_rating');
        $template->sqm_house = $request->get('house_watts_per_sqm');
        $template->sqm_porch = $request->get('porch_watts_per_sqm');
        $template->sqm_garage = $request->get('garage_watts_per_sqm');
        $template->sqm_terrace = $request->get('terrace_watts_per_sqm');
        $template->sqm_balcony = $request->get('balcony_watts_per_sqm');
        $template->sqm_porch = $request->get('porch_watts_per_sqm');
        $template->save();

        Flash::success('Template Updated', 'Template has been updated successfully.');

        $templatesFloors = TemplatePlan::where('template_id','=',$id)->get();

            return  view('templates.addPlans')
                ->with('template',$template)
                ->with('templatesFloors',$templatesFloors)
                ->with('empty_form',true);
        return view('templates.edit')
            ->with('template', $template);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $template = Template::find($id);
        $template->delete();
        Flash::error('Template Deleted', 'Template has been deleted successfully.');
        return redirect()->action('TemplatesController@index');
    }

    public function cropPlanImage($id)
    {
        $templatePlan = TemplatePlan::find($id);
        if($templatePlan){
            $img_path = $templatePlan->img;
            $img = Image::make($img_path);
            $width = number_format(Input::get('width'), 0, '.', '');
            $height = number_format(Input::get('height'), 0, '.', '');
            $x = number_format(Input::get('x'), 0, '.', '');
            $y = number_format(Input::get('y'), 0, '.', '');
            $rotate = number_format(Input::get('rotate'), 0, '.', '');
            $rotate = $rotate* -1;

            $img->rotate($rotate);
            $img->crop($width,$height,$x,$y );
            $img->save($img_path);


            $templatesFloors = TemplatePlan::where('template_id','=',session('template')->id)->get();

            Flash::success('Updated Successfully', 'Updated Successfully');
            return Redirect::to('/templates/create/add-plans');
            return  view('templates.addPlans')
                ->with('template',session('template'))
                ->with('templatesFloors',$templatesFloors)
                ->with('empty_form',false);
        }
    }
}
