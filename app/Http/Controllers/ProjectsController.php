<?php

namespace App\Http\Controllers;

use App\Address;
use App\Floor;
use App\Product;
use App\ProductCatalog;
use App\Project;
use App\ProjectCanvasData;
use App\ProjectFloor;
use App\ProjectFloorCatalog;
use App\ProjectFloorCatalogDesign;
use App\ProjectImage;
use App\ProjectPlan;
use App\Template;
use App\TemplateFloor;
use App\TemplateFloorCatalog;
use App\TemplateFloorCatalogDesign;
use App\TemplateImage;
use App\TemplatePlan;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Szykra\Notifications\Flash;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::all();
        return view('projects.index')
            ->with('projects', $projects);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $consultants = DB::table('users')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->where('role_id', '=', 2)
            ->get();
        $templates = Template::all();
        return view('projects.create')
            ->with('templates',$templates)
            ->with('consultants',$consultants);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function email_exists($email){
        $users = DB::table('users')->where('email','=',$email)->count();
        if ($users > 0){
            return true;
        }
        return false;
    }

    public function store(Request $request)
    {
      //  dd($request->all());


        $rules = array(
            'street_name'   => 'required',
            'town'    => 'required',
            'postal_code'    => 'required',
            'state'    => 'required',
            'title_1'    => 'required',
            'first_name_1'    => 'required',
            'last_name_1'    => 'required',
            'email_1'    => 'required',
            'mobile_1'    => 'required',
            'title_2'    => 'required',
            'job'    => 'required',
            'state'    => 'required',
            'consultant'    => 'required',
            'template'    => 'required',
            'energy_consumption'    => 'required',
            'street_name'    => 'required'
        );
        session([
            "email_1"=>$request->get('email_1'),
            "email_2"=>$request->get('email_2'),
            "lot"=>$request->get('lot'),
            "no_unit"=>$request->get('no_unit')
        ]);
        $validator = Validator::make($request->all(), $rules);

        $validator->after(function($validator) {
            if ($this->email_exists(session('email_1'))) {
                $validator->errors()->add('email_1', 'Email 1 Already in the DB');
            }
            if ($this->email_exists(session('email_2'))) {
                $validator->errors()->add('email_2', 'Email 2 Already in the DB');
            }
            if (empty(session('lot'))&empty(session('no_unit'))) {

                $validator->errors()->add('lot', 'Lot # or No/Unit is required');
            }
        });


        if ($validator->fails())
            return Redirect::to('/projects/create')
                ->withErrors($validator)
                ->withInput();
               // ->with('data',$request->all());
       // DB::transaction(function ($request) {
        $address = new Address();
        $address->no = $request->get('no_unit');
        $address->street_name = $request->get('street_name');
        $address->town = strtoupper($request->get('town'));
        $address->postal_code = $request->get('postal_code');
        $address->state = $request->get('state');
        $address->lot = $request->get('lot');
        $address->type = 'project';
        $address->save();

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $user_1 = new User();
        $user_1->first_name = $request->get('title_1').' '.$request->get('first_name_1');
        $user_1->last_name = $request->get('last_name_1');
        $user_1->email = $request->get('email_1');
        $user_1->mobile = $request->get('mobile_1');
        $user_1->password = Hash::make(str_random(10));
        $user_1->is_enabled = true;
        $user_1->profile_pic = '';
        $user_1->save();
        $user_1->attachRole(3);

        if(($request->get('first_name_2'))&&($request->get('email_2'))){
            $user_2 = new User();
            $user_2->first_name = $request->get('title_2').' '.$request->get('first_name_2');
            $user_2->last_name = $request->get('last_name_2');
            $user_2->email = $request->get('email_2');
            $user_2->mobile = $request->get('mobile_2');
            $user_2->password = Hash::make(str_random(10));
            $user_2->is_enabled = true;
            $user_2->profile_pic = '';
            $user_2->save();
            $user_2->attachRole(3);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $template = Template::find($request->get('template_id'));

        $project = new Project();
        $project->consultant_id = $request->get('consultant_id');
        $project->template_id = $request->get('template_id');
        $project->job = $request->get('job');
        $project->status_id = 1;
        $project->user_id_1 = $user_1->id;
        if(($request->get('first_name_2'))&&($request->get('email_2')))
            $project->user_id_2 = $user_2->id;
        $project->address_id = $address->id;
        $project->energy_consumption = $request->get('energy_consumption');
        $project->budget = $request->get('budget');
        $project->canvas_data = $template->canvas_data;
        $project->save();

        $project_canvas_data = new ProjectCanvasData();
        $project_canvas_data->project_id = $project->id;
        $project_canvas_data->save();

        $templateFloors = TemplateFloor::where('template_id', '=', $project->template_id)->get();
        $projectPlans = [];
        foreach ($templateFloors as $templateFloor){


            $templateImage = TemplateImage::find($templateFloor->template_image_id);
            $projectImagePath = str_replace("uploads/templates/".$request->get('template_id'),"uploads/projects/".$project->id,$templateImage->path);
            $projectImage = new ProjectImage();
            $projectImage->name = $templateImage->name;
            $projectImage->path = $projectImagePath;
            $projectImage->save();

            $projectFloor = new ProjectFloor();
            $projectFloor->project_image_id = $projectImage->id;
            $projectFloor->floor_id = $templateFloor->floor_id;
            $projectFloor->canvas_data = $templateFloor->canvas_data;
            $projectFloor->project_id = $project->id;
            $projectFloor->save();

            $destinationPath = 'uploads/projects/'.$project->id.'/originals/';
            $destinationPathThumb = 'uploads/projects/'.$project->id.'/300x200/';

            File::exists('uploads') or File::makeDirectory('uploads');
            File::exists('uploads/projects') or File::makeDirectory('uploads/projects');
            File::exists('uploads/projects/'.$project->id) or File::makeDirectory('uploads/projects/'.$project->id);
            File::exists(public_path().'/'.$destinationPath) or File::makeDirectory(public_path().'/'.$destinationPath);
            File::exists(public_path().'/'.$destinationPathThumb) or File::makeDirectory(public_path().'/'.$destinationPathThumb);

            //dd(public_path().'/'.$templateImage->path.'  '.public_path().'/'.$projectImagePath);
            if ( ! File::copy(public_path().'/'.$templateImage->path, public_path().'/'.$projectImagePath))
            {
                die("Couldn't copy file");
            }

            $templateFloorCatalogs = TemplateFloorCatalog::where('template_floor_id', '=', $templateFloor->id)->get();
            foreach ($templateFloorCatalogs as $templateFloorCatalog){

                $projectFloorCatalog = new ProjectFloorCatalog();
                $projectFloorCatalog->project_floor_id = $projectFloor->id;
                $projectFloorCatalog->catalog_id = $templateFloorCatalog->catalog_id;
                $projectFloorCatalog->save();

                $templateFloorCatalogDesigns = TemplateFloorCatalogDesign::where('template_floor_catalog_id', '=', $templateFloorCatalog->id)->get();
                foreach ($templateFloorCatalogDesigns as $templateFloorCatalogDesign){

                    $projectFloorCatalogDesign = new ProjectFloorCatalogDesign();
                    $projectFloorCatalogDesign->canvas_data = $templateFloorCatalogDesign->canvas_data;
                    $projectFloorCatalogDesign->name = $templateFloorCatalogDesign->name;
                    $projectFloorCatalogDesign->project_floor_catalog_id = $projectFloorCatalog->id;
                    $projectFloorCatalogDesign->is_active = $templateFloorCatalogDesign->is_active;
                    $projectFloorCatalogDesign->save();
                    $projectPlans[] = ['id'=>$projectFloorCatalogDesign->id,'img'=>$projectImage->path];

                    //$templateFloorCatalogDesigns = TemplateFloorCatalogDesign::where('template_floor_catalog_id', '=', $templateFloorCatalog->id)->get();
                }
            }
        }

       // $projectPlans = ProjectFloorCatalogDesign::where('template_floor_catalog_id','=',$projectFloorCatalog->id)->get();

        Flash::success('Project Added', 'Project has been added successfully.');
/*
       return redirect()->action(
            'ProjectsController@editPlanInCanvas', ['id' => $projectPlans[0]->id]
        );
*/

    return Redirect::to('/projects/'.$project->id.'/plans/0/canvas');
    }

    public function addProjectPlansImage(Project $project,Request $request)
    {
        $file = $request->file('file');
        $randStr = Str::random(16);
        $randFileName = $randStr.'.'.$file->getClientOriginalExtension();
        //Move Uploaded File
        $destinationPath = 'uploads/projects/'.$request->get('project_id').'/originals/';
        $destinationPathThumb = 'uploads/projects/'.$request->get('project_id').'/300x200/';//dd(public_path().'/'.$destinationPath);
        $destinationPathPdf = 'uploads/projects/'.$request->get('project_id').'/pdf/';//dd(public_path().'/'.$destinationPath);

        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/projects') or File::makeDirectory('uploads/projects');
        File::exists('uploads/projects/'.$request->get('project_id')) or File::makeDirectory('uploads/projects/'.$request->get('project_id'));
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
        $project = Project::find($request->get('project_id'));
        $project->canvas_data = json_encode([
            'data'=>[],
            'proj_comments'=>[],
            'bom'=>null,
            'unassignedProducts'=>[]
        ]);
        $project->save();



        $projectImage = new ProjectImage();
        $projectImage->name = $file->getClientOriginalName();
        $projectImage->path = $destinationPath.$randFileName;
        $projectImage->save();

        $projectFloor = new ProjectFloor();
        $projectFloor->project_image_id = $projectImage->id;
        $projectFloor->floor_id = 1;
        $projectFloor->canvas_data = json_encode([
            'data'=>[]
        ]);
        $projectFloor->project_id = $request->get('project_id');
        $projectFloor->save();

        $projectFloorCatalog = new ProjectFloorCatalog();
        // $projectFloorCatalog->canvas_data = '';
        $projectFloorCatalog->project_floor_id = $projectFloor->id;
        $projectFloorCatalog->catalog_id = 1;
        //  $projectFloorCatalog->is_active = true;
        $projectFloorCatalog->save();


        $projectFloorCatalogDesign = new ProjectFloorCatalogDesign();
        $projectFloorCatalogDesign->canvas_data = json_encode([
            'data'=>[],
            'lastCommentIndex'=>[]
        ]);
        $projectFloorCatalogDesign->project_floor_catalog_id = $projectFloorCatalog->id;
        $projectFloorCatalogDesign->name = '';
        $projectFloorCatalogDesign->is_active = true;
        $projectFloorCatalogDesign->save();

        Flash::success('Image Added', 'Image has been added successfully.');


    }

    public function addPlan(Project $project, Request $request){//dd($project);
        //$templatesFloors = TemplateFloor::where('template_id','=',session('template')->id)->get();
        //$tempalateFloorCatalogs = TemplateFloorCatalog::where('template_floor_id')
        //dd($template);

        $projectCatalogs = ProductCatalog::lists('name','id');
        $projectFloors = Floor::lists('name','id');
        $project_floor_catalog_designs = DB::table('project_floor_catalog_designs')
            ->join('project_floor_catalogs','project_floor_catalogs.id','=','project_floor_catalog_designs.project_floor_catalog_id')
            ->join('project_floors','project_floors.id','=','project_floor_catalogs.project_floor_id')
            ->join('projects','projects.id','=','project_floors.project_id')
            ->join('project_images','project_floors.project_image_id','=','project_images.id')
            ->join('floors','project_floors.floor_id','=','floors.id')
            ->join('product_catalogs','project_floor_catalogs.catalog_id','=','product_catalogs.id')
            ->select([
                'project_images.path as image_path',
                'project_images.name as image_name',
                'floors.name as floor_name',
                'project_floors.id as project_floor_id',
                'project_floor_catalog_designs.id as project_floor_catalog_design_id',
                'project_floor_catalog_designs.name as project_floor_catalog_design',
                'product_catalogs.name as catalog_name',
                'product_catalogs.id as catalog_id',
                'project_floor_catalog_designs.name as project_name'
            ])
            ->where('project_floor_catalog_designs.is_active', '=', true)
            ->where('projects.id', '=',$project->id)
            ->orderBy('project_floor_catalog_designs.id', 'desc')
            ->get();
        if($project_floor_catalog_designs)
            return  view('projects.addPlans')
                ->with('project',$project)
                ->with('projectCatalogs',$projectCatalogs)
                ->with('projectFloors',$projectFloors)
                ->with('projectFloorCatalogDesigns',$project_floor_catalog_designs);

        return  view('projects.addPlans')
            ->with('project',$project)
            ->with('projectCatalogs',$projectCatalogs)
            ->with('projectFloors',$projectFloors)
            ->with('projectFloorCatalogDesigns',$project_floor_catalog_designs);

    }


    /*public function editPlansInProject($id){
        $project = Project::find($id);
        //session(['template' => $template]);
        return Redirect::to('projects/create/'.$project->id.'/add-plans');
    }*/


    public function editPlanInCanvas(Project $project, $id)
    {
        $projectFloorCatalogDesignArray = [];
        $bgImg = '';
        $projectFloors = DB::table('project_floors')->where('project_id','=',$project->id)->get();
        foreach ($projectFloors as $projectFloor){
            $projectImage = ProjectImage::where('id', '=', $projectFloor->project_image_id)->first();
            $projectFloorCatalogs = DB::table('project_floor_catalogs')->where('project_floor_id','=',$projectFloor->id)->get();
            foreach ($projectFloorCatalogs as $projectFloorCatalog){
                $projectFloorCatalogDesigns = DB::table('project_floor_catalog_designs')->where('project_floor_catalog_id','=',$projectFloorCatalog->id)->get();
                foreach ($projectFloorCatalogDesigns as $projectFloorCatalogDesign){
                    $projectFloorCatalogDesignArray[] = ['id'=>$projectFloorCatalogDesign->id, 'img'=>$projectImage->path,'name'=>$projectFloorCatalogDesign->name];
                }
            }
        }
        if($id == 0){
            $tempPlan = DB::table('project_floors')->where('project_id','=',$project->id)->first();
            $projectImage = ProjectImage::where('id','=',$tempPlan->project_image_id)->first();
            $projectFloorCatalog = ProjectFloorCatalog::where('project_floor_id','=',$tempPlan->id)->first();
            $projectFloorCatalogDesign = ProjectFloorCatalogDesign::where('project_floor_catalog_id','=',$projectFloorCatalog->id)->first();
            if($projectFloorCatalogDesign){
                return view('canvas.index_project')
                    ->with('bgImg', $projectImage->path)
                    ->with('floors', $projectFloors)
                    ->with('floor', $tempPlan)
                    ->with('floorCatalog', $projectFloorCatalog)
                    ->with('floorCatalogDesign', $projectFloorCatalogDesign)
                    ->with('project', $project)
                    ->with('showPop', true)
                    ->with('plans', $projectFloorCatalogDesignArray);
            }
        }

        $projectFloorCatalogDesign = ProjectFloorCatalogDesign::where('id','=',$id)->first();
        $projectFloorCatalog = ProjectFloorCatalog::where('id','=',$projectFloorCatalogDesign->project_floor_catalog_id)->first();
        $projectFloor = DB::table('project_floors')->where('id','=',$projectFloorCatalog->project_floor_id)->first();
        $projectImage = ProjectImage::where('id','=',$projectFloor->project_image_id)->first();

        if($projectFloor){
            return view('canvas.index_project')
                ->with('bgImg', $projectImage->path)
                ->with('floors', $projectFloors)
                ->with('floor', $projectFloor)
                ->with('floorCatalog', $projectFloorCatalog)
                ->with('floorCatalogDesign', $projectFloorCatalogDesign)
                ->with('project', $project)
                ->with('showPop', false)
                ->with('plans', $projectFloorCatalogDesignArray);
        }
    }

    public function updatePlanDataInCanvas(Request $request,$project, $projectFloorCatalogDesign_id)
    {
        $fileData = $request->get('file_data');
        $fileData = (array)json_decode($fileData,true);

        $project = Project::find($project);//dd($project);
        $projectFloorCatalogDesign = ProjectFloorCatalogDesign::find($projectFloorCatalogDesign_id);//
        $projectFloorCatalog = ProjectFloorCatalog::find($projectFloorCatalogDesign->project_floor_catalog_id);
        $projectFloor = ProjectFloor::find($projectFloorCatalog->project_floor_id);

        if (array_key_exists("products",$fileData))
        {
            $projectFloorCatalogDesign->canvas_data = json_encode([
                'data'=>$fileData['products']['data'],
                'lastCommentIndex'=>$fileData['products']['lastCommentIndex'],
            ]);
            $projectFloorCatalogDesign->save();
        }

        if (array_key_exists("floorplan",$fileData)) {
            $projectFloor->canvas_data = json_encode([
                'data'=>$fileData['floorplan']['data']
            ]);

            /*****************************************************************************************************/
            $printable_image_path =  $fileData['floorplan']['printable_plan'];
          /* list($type, $printable_image_path) = explode(';', $printable_image_path);
            list(, $printable_image_path)      = explode(',', $printable_image_path);*/

           // $printable_image_path = explode(';', $printable_image_path);//dd($printable_image_path[1]);
            //$printable_image_path = base64_decode($printable_image_path[1]);


            File::exists('printable_plans') or File::makeDirectory('printable_plans');
            File::exists('printable_plans/projects') or File::makeDirectory('printable_plans/projects');
            File::exists('printable_plans/projects/'.$projectFloorCatalogDesign_id) or File::makeDirectory('printable_plans/projects/'.$projectFloorCatalogDesign_id);


            $img = str_replace('data:image/png;base64,', '', $printable_image_path);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            file_put_contents('printable_plans/projects/'.$projectFloorCatalogDesign_id.'/'.'original.png', $data);

            /*****************************************************************************************************/
            $projectFloor->printable_image_path = 'printable_plans/projects/'.$projectFloorCatalogDesign_id.'/'.'original.png';
            $projectFloor->save();


            /*$x = $this->base64_to_jpeg($fileData['floorplan']['printable_plan'], 'bar.jpg');
            $img = Image::make(imagecreatefromstring(base64_decode($fileData['floorplan']['printable_plan'])));
            $img->resize(320, 240);
            $img->save('bar.jpg');*/

            //$this->saveImage($fileData['floorplan']['printable_plan'] , 'x.png');
            /**************************************************************************************************************/

            $tfloors = ProjectFloor::where('project_id', '=',$project->id)->
            where('floor_id', '=',$projectFloor->floor_id)->
            get();
            //  dd($tfloors);
            foreach ($tfloors as $tfloor){
                $t = ProjectFloor::find($tfloor->id);
                $t->canvas_data = json_encode([
                    'data'=>$fileData['floorplan']['data']
                ]);
                $t->save();
            }




            /**************************************************************************************************************/


        }
        if (array_key_exists("project",$fileData)) {
            $project->canvas_data = json_encode([
                'data'=>$fileData['project']['data'],
                'proj_comments'=>$fileData['project']['proj_comments'],
                'bom'=>$fileData['project']['bom'],
                'unassignedProducts'=>$fileData['project']['unassignedProducts']
            ]);
            $project->save();
        }

    }

    public function loadPlanDataInCanvas(Request $request,$project, $projectFloorCatalogDesign_id)
    {
        $project = Project::find($project);//dd($project);
        $projectFloorCatalogDesign = ProjectFloorCatalogDesign::find($projectFloorCatalogDesign_id);//
        $projectFloorCatalog = ProjectFloorCatalog::find($projectFloorCatalogDesign->project_floor_catalog_id);
        $projectFloor = ProjectFloor::find($projectFloorCatalog->project_floor_id);
        /*$response = [
            'products'=>['data'=>$projectFloorCatalogDesign->canvas_data],
            'floorplan'=>['data'=>$projectFloor->canvas_data],
            'project'=>['data'=>$project->canvas_data],
        ];*///dd($response);

        $project = (array)json_decode($project->canvas_data);
        $products = (array)json_decode($projectFloorCatalogDesign->canvas_data);
        $floorplan = (array)json_decode($projectFloor->canvas_data);
//dd($project);
        $response = [
            'products'=>[
                'data'=>json_encode($products['data']),
                'lastCommentIndex'=>json_encode($products['lastCommentIndex'])
            ],
            'floorplan'=>['data'=>json_encode($floorplan['data'])],
            'project'=>[
                'data'=>json_encode($project['data']),
                'proj_comments'=>json_encode($project['proj_comments']),
                'bom'=>json_encode($project['bom']),
                'unassignedProducts'=>json_encode($project['unassignedProducts'])
            ],
        ];


        return $response;
        //return view('canvas.index_new');

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $plans = [];
        $project = Project::find($id);
        $projectFloors = DB::table('project_floors')->where('project_id', '=', $project->id)->get();
        foreach ($projectFloors as $projectFloor){
            $projectFloorCatalogs = DB::table('project_floor_catalogs')->where('project_floor_id', '=', $projectFloor->id)->get();
            foreach ($projectFloorCatalogs as $projectFloorCatalog){
                $projectFloorCatalogDesigns = DB::table('project_floor_catalog_designs')->where('project_floor_catalog_id', '=', $projectFloorCatalog->id)->get();
                foreach ($projectFloorCatalogDesigns as $projectFloorCatalogDesign){
                    $plans[] = [
                        'design'=>$projectFloorCatalogDesign->name,
                        'catalog'=>ProductCatalog::find($projectFloorCatalog->catalog_id)->name,
                        'floor'=>Floor::find($projectFloor->floor_id)->name,
                        'img'=>ProjectImage::find($projectFloor->project_image_id)->path,
                        'projectFloorCatalogDesignId'=>$projectFloorCatalogDesign->id,
                    ];
                }
            }
        }


        return view('projects.show')
            ->with('plans', $plans)
            ->with('project', $project);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $project = Project::find($id);

        $consultants = DB::table('users')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->where('role_id', '=', 2)
            ->get();
        $templates = Template::all();
        return view('projects.edit')
            ->with('templates',$templates)
            ->with('project', $project)
            ->with('consultants',$consultants);
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
            'street_name'   => 'required',
            'town'    => 'required',
            'postal_code'    => 'required',
            'state'    => 'required',
            'lot'    => 'required',
            'title_1'    => 'required',
            'first_name_1'    => 'required',
            'last_name_1'    => 'required',
            'email_1'    => 'required',
            'mobile_1'    => 'required',
            'title_2'    => 'required',
            'job'    => 'required',
            'consultant'    => 'required',
            'template'    => 'required',
            'energy_consumption'    => 'required',
            'street_name'    => 'required'
        );

        session([
            "email_1"=>$request->get('email_1'),
            "email_2"=>$request->get('email_2'),
            "lot"=>$request->get('lot'),
            "no_unit"=>$request->get('no_unit')
        ]);

        $validator = Validator::make($request->all(), $rules);

        if (empty(session('lot'))&empty(session('no_unit'))) {
            $validator->errors()->add('lot', 'Lot # or No/Unit is required');
        }

        if ($validator->fails())
            return Redirect::to('/projects/'.$id.'/edit')
                ->withErrors($validator)
                ->withInput();


        $address = Address::find($request->get('address_id'));
        $address->no = $request->get('no_unit');
        $address->street_name = $request->get('street_name');
        $address->town = $request->get('town');
        $address->postal_code = $request->get('postal_code');
        $address->state = $request->get('state');
        $address->lot = $request->get('lot');
        $address->type = 'project';
        $address->save();

       // DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $user_1 = User::find($request->get('user_id_1'));
        $user_1->first_name = $request->get('first_name_1');
        $user_1->last_name = $request->get('last_name_1');
        $user_1->email = $request->get('email_1');
        $user_1->mobile = $request->get('mobile_1');
        $user_1->password = Hash::make(str_random(10));
        $user_1->is_enabled = true;
        $user_1->profile_pic = '';
        $user_1->save();
        //$user_1->attachRole(3);
        if(($request->get('first_name_2'))&&($request->get('email_2'))) {
            $user_2 = User::find($request->get('user_id_2'));
            $user_2->first_name = $request->get('first_name_2');
            $user_2->last_name = $request->get('last_name_2');
            $user_2->email = $request->get('email_2');
            $user_2->mobile = $request->get('mobile_2');
            $user_2->password = Hash::make(str_random(10));
            $user_2->is_enabled = true;
            $user_2->profile_pic = '';
            $user_2->save();
        }
        ////$user_2->attachRole(3);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $project = Project::find($id);
        $project->consultant_id = $request->get('consultant_id');
        $project->template_id = $request->get('template_id');
        $project->job = $request->get('job');
        $project->status_id = 1;
        $project->user_id_1 = $user_1->id;
        if(($request->get('first_name_2'))&&($request->get('email_2'))) {
            $project->user_id_2 = $user_2->id;
        }
        $project->address_id = $address->id;
        $project->energy_consumption = $request->get('energy_consumption');
        $project->budget = $request->get('budget');
        $project->save();



        $consultants = DB::table('users')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->where('role_id', '=', 2)
            ->get();
        $templates = Template::all();
        Flash::success('Project Updated', 'Project has been updated successfully.');
        return view('projects.edit')
            ->with('templates',$templates)
            ->with('project', $project)
            ->with('consultants',$consultants);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        $project->delete();
        Flash::error('Project Deleted', 'Project has been deleted successfully.');
        return redirect()->action('ProjectsController@index');
    }



    public function addProjectPlansData(Project $project,Request $request){
        //dd($request->all());

        /**************************************************************************************************************/
        $exists = DB::table('project_floor_catalog_designs')
            ->join('project_floor_catalogs', 'project_floor_catalogs.id', '=', 'project_floor_catalog_designs.project_floor_catalog_id')
            ->join('project_floors', 'project_floors.id', '=', 'project_floor_catalogs.project_floor_id')
            ->where('project_floors.floor_id', '=', $request->get('level'))
            ->where('project_floor_catalogs.catalog_id', '=',  $request->get('catalog_id'))
            ->where('project_floor_catalog_designs.name', '=',  $request->get('design'))
            ->where('project_floor_catalog_designs.id', '!=' , $request->get('id'))
            ->orWhereNull('project_floor_catalog_designs.id')
            ->select('project_floors.id')
            ->get();


        $rules = array(
            'street_name'   => 'required'
        );

        if($exists){
            $validator = Validator::make($request->all(), $rules);

            $validator->after(function($validator) {
                $validator->errors()->add('exists', 'Floor & Catalog Already Exists');
            });
            return Redirect::to('/projects/create/'.$project->id.'/add-plans')
                ->withErrors($validator);
        }



        $projectFloorCatalogDesign = ProjectFloorCatalogDesign::find($request->get('id'));
        $projectFloorCatalog = ProjectFloorCatalog::find($projectFloorCatalogDesign->project_floor_catalog_id);
        $projectFloor = ProjectFloor::find($projectFloorCatalog->project_floor_id);
        $projectImage = ProjectImage::find($projectFloor->project_image_id);
        $project = Project::find($projectFloor->project_id);


        /**************************************************************************************************************/
        if($request->file('image') != null){

            $file = $request->file('image');

            $path = $projectImage->path;
            $project_image_path = 'uploads/projects/'.$project->id.'/originals/';
            $project_image_name = explode($project_image_path, $path);
            $project_image_name = $project_image_name[1];

            $randFileName = $project_image_name;
            //Move Uploaded File
            $destinationPath = 'uploads/projects/'.$project->id.'/originals/';
            $destinationPathThumb = 'uploads/projects/'.$project->id.'/300x200/';//dd(public_path().'/'.$destinationPath);
            $destinationPathPdf = 'uploads/projects/'.$project->id.'/pdf/';//dd(public_path().'/'.$destinationPath);

            File::exists('uploads') or File::makeDirectory('uploads');
            File::exists('uploads/projects') or File::makeDirectory('uploads/projects');
            File::exists('uploads/projects/'.$project->id) or File::makeDirectory('uploads/projects/'.$project->id);
            File::exists(public_path().'/'.$destinationPath) or File::makeDirectory(public_path().'/'.$destinationPath);
            File::exists(public_path().'/'.$destinationPathThumb) or File::makeDirectory(public_path().'/'.$destinationPathThumb);

            File::delete($project_image_path.$project_image_name);
            if('pdf' === $file->getClientOriginalExtension()){

                $pdf_path = public_path().'/'.$destinationPath.'pdf/';
                File::exists($pdf_path) or File::makeDirectory($pdf_path);
                $file->move($pdf_path,$randFileName);

                $pdf = new Pdf($pdf_path.$randFileName);
                $pdf->setOutputFormat('png')
                    ->saveImage($destinationPath.$randFileName);

                $randFileName = $project_image_name;

                $img_path = $project_image_path.$project_image_name;

                $img = Image::make($img_path);
                $width = $img->width();
                $height = $img->height();
                $canvas = Image::canvas($width, $height, '#ffffff');
                $canvas->insert($img_path);
                $canvas->save($img_path);


            }else{
                $file->move($destinationPath,$randFileName);
            }


            //$projectImage = ProjectImage::find($projectImage->id);
            //$projectImage->name = $file->getClientOriginalName();
            $projectImage->path = $destinationPath.$randFileName;
            $projectImage->save();


            $updateProjectFloors  = ProjectFloor::where('project_id', '=',$project->id)->
            where('floor_id', '=',$request->get('level'))->
            get();

            foreach ($updateProjectFloors as $updateProjectFloor){
                $tmp_ = ProjectFloor::where('id', '=',$updateProjectFloor->id)->first();
                $tmp_->project_image_id = $projectImage->id;
                $tmp_->save();//
            }

        }




        /**************************************************************************************************************/



        /**************************************************************************************************************/


        $projectFloorCatalog->catalog_id = $request->get('catalog_id');
        $projectFloorCatalogDesign->name = $request->get('design');
        $projectFloorCatalogDesign->save();
        $projectFloorCatalog->save();

        $projectFloor->floor_id = $request->get('level');
        // $img_parent = $templateFloor->template_image_id;
        //$canvas_data_parent = $templateFloor->canvas_data;



        /**************************************************************************************************************/

        $tfloors = ProjectFloor::where('project_id', '=',$project->id)->
        where('floor_id', '=',$projectFloor->floor_id)->
        get();
        //dd($tfloors);
        // foreach ($tfloors as $tfloor){
        if(($tfloors)&&(count($tfloors)>0)){
            $t = ProjectFloor::find($tfloors[0]->id);
            //$t->template_image_id = $img_parent;
            $projectFloor->canvas_data= $t->canvas_data;
        }
        //$t->save();
        //}


        $projectFloor->save();

        /**************************************************************************************************************/

        $projectFloors = ProjectPlan::where('project_id','=',$project->id)->get();

        Flash::success('Updated successfully', 'Updated successfully.');
        return Redirect::to('/projects/create/'.$project->id.'/add-plans');

    }

    public function deletePlanInCanvas(Project $project, $id){
        $projectFloorCatalogDesign = ProjectFloorCatalogDesign::find($id);
        if($projectFloorCatalogDesign){
            $projectFloorCatalogDesign->delete();
            Flash::success('Plan Deleted', 'Plan has been deleted successfully.');
            return Redirect::to('/projects/create/'.$project->id.'/add-plans');
        }

        Flash::success('Plan Not Deleted', 'Plan not deleted.');
        return Redirect::to('/projects/create/'.$project->id.'/add-plans');
    }


    public function cropPlanImage(Project $project, $id)
    {
        $projectFloorCatalogDesign = ProjectFloorCatalogDesign::find($id);
        $projectFloorCatalog = ProjectFloorCatalog::find($projectFloorCatalogDesign->project_floor_catalog_id);

        $projectFloor= ProjectFloor::find($projectFloorCatalog->project_floor_id);
        if($projectFloor){
            $projectImage  = DB::table('project_images')->where('id','=',$projectFloor->project_image_id)->first();
            $img_path = $projectImage->path;
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


            $projectsFloors = ProjectFloor::where('project_id','=',$project->id)->get();

            Flash::success('Updated Successfully', 'Updated Successfully');
            return Redirect::to('/projects/create/'.$project->id.'/add-plans');
            return  view('projects.addPlans')
                ->with('project',$project)
                ->with('projectsFloors',$projectsFloors)
                ->with('empty_form',false);
        }
    }


    private function saveImage($data, $path){

       /*
       // dd($data);
        $img = Image::make(imagecreatefromstring($data));
        $img->resize(320, 240);
        $img->save('bar.jpg');


        file_put_contents($path, $data);*/
    }
}
