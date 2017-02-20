<?php

namespace App\Http\Controllers;

use App\Floor;
use App\ProductCatalog;
use App\Template;
use App\TemplateFloor;
use App\TemplateFloorCatalog;
use App\TemplateFloorCatalogDesign;
use App\TemplateImage;
use App\TemplatePlan;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
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
        $template->canvas_data = '[]';
        $template->save();

        Flash::success('Template Added', 'Template has been added successfully.');
        //session(['template' => $template]);
        return Redirect::to('/templates/create/'.$template->id.'/add-plans')
            ->with('template', $template);
            

    }

    public function addPlan(Template $template, Request $request){//dd(session('template'));
        //$templatesFloors = TemplateFloor::where('template_id','=',session('template')->id)->get();
        //$tempalateFloorCatalogs = TemplateFloorCatalog::where('template_floor_id')
        //dd($template);

        $templateCatalogs = ProductCatalog::lists('name','id');
        $templateFloors = Floor::lists('name','id');
        $template_floor_catalog_designs = DB::table('template_floor_catalog_designs')
            ->join('template_floor_catalogs','template_floor_catalogs.id','=','template_floor_catalog_designs.template_floor_catalog_id')
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
                'template_floor_catalog_designs.id as template_floor_catalog_design_id',
                'template_floor_catalog_designs.name as template_floor_catalog_design',
                'product_catalogs.name as catalog_name',
                'product_catalogs.id as catalog_id',
                'templates.name as template_name'
            ])
            ->where('template_floor_catalog_designs.is_active', '=', true)
            ->where('templates.id', '=',$template->id)
            ->get();
         if($template_floor_catalog_designs)
            return  view('templates.addPlans')
                ->with('template',$template)
                ->with('templateCatalogs',$templateCatalogs)
                ->with('templateFloors',$templateFloors)
                ->with('templateFloorCatalogDesigns',$template_floor_catalog_designs);

            return  view('templates.addPlans')
                ->with('template',$template)
                ->with('templateCatalogs',$templateCatalogs)
                ->with('templateFloors',$templateFloors)
                ->with('templateFloorCatalogDesigns',$template_floor_catalog_designs);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function addTemplatePlansImage(Template $template,Request $request)
    {//dd($request->all());
        $file = $request->file('file');

        /**************************************************************************************************************/
       /* $exists = DB::table('template_floor_catalogs')
            ->join('template_floors', 'template_floors.id', '=', 'template_floor_catalogs.template_floor_id')
            ->where('template_floors.floor_id', '=', 1)
            ->where('template_floor_catalogs.catalog_id', '=',  1)
            ->select('template_floors.id')
            ->get();
//dd($exists);

        $rules = array(
            'street_name'   => 'required'
        );

        if($exists){
            $validator = Validator::make($request->all(), $rules);

            $validator->after(function($validator) {
                $validator->errors()->add('empty_exists', 'Please Select Floor and Catalog for existing Design Plans');
            });
            Flash::error('Error', 'Please Select Floor and Catalog for existing Design Plans');
            return 0;
        }*/


        /**************************************************************************************************************/

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
        $templateFloor->canvas_data = '[]';
        $templateFloor->template_id = $request->get('template_id');
        $templateFloor->save();

        $templateFloorCatalog = new TemplateFloorCatalog();
       // $templateFloorCatalog->canvas_data = '';
        $templateFloorCatalog->template_floor_id = $templateFloor->id;
        $templateFloorCatalog->catalog_id = 1;
      //  $templateFloorCatalog->is_active = true;
        $templateFloorCatalog->save();


        $templateFloorCatalogDesign = new TemplateFloorCatalogDesign();
        $templateFloorCatalogDesign->canvas_data = '[]';
        $templateFloorCatalogDesign->template_floor_catalog_id = $templateFloorCatalog->id;
        $templateFloorCatalogDesign->name = $template->name;
        $templateFloorCatalogDesign->is_active = true;
        $templateFloorCatalogDesign->save();


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


    public function addTemplatePlansData(Template $template,Request $request){
     //   dd($request->all());

        /**************************************************************************************************************/
         $exists = DB::table('template_floor_catalog_designs')
            ->join('template_floor_catalogs', 'template_floor_catalogs.id', '=', 'template_floor_catalog_designs.template_floor_catalog_id')
            ->join('template_floors', 'template_floors.id', '=', 'template_floor_catalogs.template_floor_id')
             ->where('template_floors.floor_id', '=', $request->get('level'))
             ->where('template_floor_catalogs.catalog_id', '=',  $request->get('catalog_id'))
             ->where('template_floor_catalog_designs.name', '=',  $request->get('design'))
             ->where('template_floor_catalog_designs.id', '!=' , $request->get('id'))
             ->orWhereNull('template_floor_catalog_designs.id')
            ->select('template_floors.id')
            ->get();


        $rules = array(
            'street_name'   => 'required'
        );

        if($exists){
            $validator = Validator::make($request->all(), $rules);

            $validator->after(function($validator) {
                    $validator->errors()->add('exists', 'Floor & Catalog Already Exists');
            });
            return Redirect::to('/templates/create/'.$template->id.'/add-plans')
                ->withErrors($validator);
        }


        /**************************************************************************************************************/

        $templateFloorCatalogDesign = TemplateFloorCatalogDesign::find($request->get('id'));
        $templateFloorCatalog = TemplateFloorCatalog::find($templateFloorCatalogDesign->template_floor_catalog_id);
        $templateFloor = TemplateFloor::find($templateFloorCatalog->template_floor_id);
        $template = Template::find($templateFloor->template_id);

        $templateFloorCatalog->catalog_id = $request->get('catalog_id');
        $templateFloorCatalogDesign->name = $request->get('design');
        $templateFloorCatalogDesign->save();
        $templateFloorCatalog->save();

        $templateFloor->floor_id = $request->get('level');
       // $img_parent = $templateFloor->template_image_id;
        //$canvas_data_parent = $templateFloor->canvas_data;



        /**************************************************************************************************************/

        $tfloors = TemplateFloor::where('template_id', '=',$template->id)->
                    where('floor_id', '=',$templateFloor->floor_id)->
                    get();
                  //dd($tfloors);
       // foreach ($tfloors as $tfloor){
            if(($tfloors)&&(count($tfloors)>0)){
            $t = TemplateFloor::find($tfloors[0]->id);
            //$t->template_image_id = $img_parent;
            $templateFloor->canvas_data= $t->canvas_data;
        }
             //$t->save();
        //}


        $templateFloor->save();

        /**************************************************************************************************************/

        $templatesFloors = TemplatePlan::where('template_id','=',$template->id)->get();

        Flash::success('Updated successfully', 'Updated successfully.');
        return Redirect::to('/templates/create/'.$template->id.'/add-plans');

    }

    public function deletePlanInCanvas(Template $template, $id){
        $templateFloorCatalogDesign = TemplateFloorCatalogDesign::find($id);
        $templateFloorCatalogDesign->delete();
        Flash::success('Plan Deleted', 'Plan has been deleted successfully.');
        return Redirect::to('/templates/create/'.$template->id.'/add-plans');
    }

    public function show($id)
    {
        $template = Template::find($id);
        $templateFloors = TemplateFloor::where('template_id','=',$id)->get();
        //session(['template' => $template]);
        return view('templates.show')
            ->with('templateFloors', $templateFloors)
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
        return view('templates.edit')
            ->with('template', $template);
    }

    public function editPlanInCanvas(Template $template, $id)
    {
        //$template = DB::table('template_plans')->where('id','=',$id)->first();
        //$allPlans = DB::table('template_plans')->where('template_id','=',$template->template_id)->get();

        $templateFloorCatalogDesign  = DB::table('template_floor_catalog_designs')->where('id','=',$id)->first();
        $templateFloorCatalog  = DB::table('template_floor_catalogs')->where('id','=',$templateFloorCatalogDesign->template_floor_catalog_id)->first();
        $templateFloor  = DB::table('template_floors')->where('id','=',$templateFloorCatalog->template_floor_id)->first();
        $template  = DB::table('templates')->where('id','=',$templateFloor->template_id)->first();
        $templateFloors  = DB::table('template_floors')->where('template_id','=',$template->id)->get();
        $templateImage  = DB::table('template_images')->where('id','=',$templateFloor->template_image_id)->first();
        //session(['template_id' => $template->id ]);
        return view('canvas.index_new')
            ->with('template', $template)
            ->with('bgImg', $templateImage->path)
            ->with('template_floor_catalog_design_id', $id)
            ->with('templateFloor', $templateFloor)
            ->with('templateFloorCatalog', $templateFloorCatalog)
            ->with('templateFloors', $templateFloors);
    }


    public function updatePlanDataInCanvas(Request $request)
    {
        $fileData = $request->get('file_data');
        $fileData = (array)json_decode($fileData,true);
        //dd($fileData['products']);
        $templateFloorCatalogDesign = TemplateFloorCatalogDesign::find($fileData['template_floor_catalog_design_id']);
        $templateFloorCatalog = TemplateFloorCatalog::find($templateFloorCatalogDesign->template_floor_catalog_id);
        $templateFloor = TemplateFloor::find($templateFloorCatalog->template_floor_id);
        $template = Template::find($templateFloor->template_id);
        if (array_key_exists("products",$fileData))
        {
            $templateFloorCatalogDesign->canvas_data = json_encode($fileData['products']['data']);
            $templateFloorCatalogDesign->save();
        }

        if (array_key_exists("floorplan",$fileData)) {
            $templateFloor->canvas_data = json_encode($fileData['floorplan']['data']);
            $templateFloor->save();

            /**************************************************************************************************************/

            $tfloors = TemplateFloor::where('template_id', '=',$template->id)->
            where('floor_id', '=',$templateFloor->floor_id)->
            get();
            //  dd($tfloors);
            foreach ($tfloors as $tfloor){
                $t = TemplateFloor::find($tfloor->id);
                $t->canvas_data = json_encode($fileData['floorplan']['data']);
                $t->save();
            }




            /**************************************************************************************************************/


        }
        if (array_key_exists("project",$fileData)) {
            $template->canvas_data = json_encode($fileData['project']['data']);
            $template->save();
        }

        //return view('canvas.index_new');
    }

    public function loadPlanDataInCanvas(Request $request)
    {

        $templateFloorCatalogDesign = TemplateFloorCatalogDesign::find($request->get('template_floor_catalog_design_id'));
        $templateFloorCatalog = TemplateFloorCatalog::find($templateFloorCatalogDesign->template_floor_catalog_id);
        $templateFloor  = DB::table('template_floors')->where('id','=',$templateFloorCatalog->template_floor_id)->first();
        $template  = DB::table('templates')->where('id','=',$templateFloor->template_id)->first();

        $response = [
            'products'=>['data'=>$templateFloorCatalogDesign->canvas_data],
            'floorplan'=>['data'=>$templateFloor->canvas_data],
            'project'=>['data'=>$template->canvas_data],
        ];

        return $response;
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
            'terrace_watts_per_sqm'    => 'required',
            'balcony_watts_per_sqm'    => 'required',
            'alfresco_watts_per_sqm'    => 'required',
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
        $template->sqm_alfresco = $request->get('porch_watts_per_sqm');
        $template->save();

        Flash::success('Template Updated', 'Template has been updated successfully.');

        $templatesFloors = TemplatePlan::where('template_id','=',$id)->get();

           /* return  view('templates.addPlans')
                ->with('template',$template)
                ->with('templatesFloors',$templatesFloors)
                ->with('empty_form',true);*/
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

    public function cropPlanImage(Template $template, $id)
    {   $templateFloorCatalogDesign = TemplateFloorCatalogDesign::find($id);
        $templateFloorCatalog = TemplateFloorCatalog::find($templateFloorCatalogDesign->template_floor_catalog_id);

        $templateFloor= TemplateFloor::find($templateFloorCatalog->template_floor_id);
        if($templateFloor){
            $templateImage  = DB::table('template_images')->where('id','=',$templateFloor->template_image_id)->first();
            $img_path = $templateImage->path;
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


            $templatesFloors = TemplateFloor::where('template_id','=',$template->id)->get();

            Flash::success('Updated Successfully', 'Updated Successfully');
            return Redirect::to('/templates/create/'.$template->id.'/add-plans');
            return  view('templates.addPlans')
                ->with('template',$template)
                ->with('templatesFloors',$templatesFloors)
                ->with('empty_form',false);
        }
    }
    
    public function editPlansInTemplate($template_id){
        $template = Template::find($template_id);
        //session(['template' => $template]);
        return Redirect::to('templates/create/'.$template->id.'/add-plans');
    }
}
