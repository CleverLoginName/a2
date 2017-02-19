<?php

namespace App\Http\Controllers;

use App\Address;
use App\Product;
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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
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
        $project->save();

        $project_canvas_data = new ProjectCanvasData();
        $project_canvas_data->project_id = $project->id;
        $project_canvas_data->save();

        $templateFloors = TemplateFloor::where('template_id', '=', $project->template_id)->get();
        $projectPlans = [];
        foreach ($templateFloors as $templateFloor){
            $projectFloor = new ProjectFloor();
            $projectFloor->project_image_id = $templateFloor->template_image_id;
            $projectFloor->floor_id = $templateFloor->floor_id;
            $projectFloor->canvas_data = $templateFloor->canvas_data;
            $projectFloor->project_id = $project->id;
            $projectFloor->save();
            
            $templateImage = TemplateImage::find($templateFloor->template_image_id);
            $projectImage = new ProjectImage();
            $projectImage->name = $templateImage->name;
            $projectImage->path = $templateImage->path;
            $projectImage->save();
            

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
        return view('canvas.index_project')
            ->with('showPop', true)
            ->with('bgImg', '')
            ->with('plans', $projectPlans);
      //  });
    }


    public function editPlanInCanvas($id)
    {
        $projectPlan = DB::table('project_plans')->where('id','=',$id)->first();
        if($projectPlan){
            $allPlans = DB::table('project_plans')->where('project_id','=',$projectPlan->project_id)->get();
            session(['project_plan_id' => $projectPlan->id ]);
            session(['plan_id' => $id ]);
            session(['project_id' => $projectPlan->project_id ]);
            return view('canvas.index_project')
                ->with('bgImg', $projectPlan->img)
                ->with('showPop', false)
                ->with('plans', $allPlans);
        }

    }

    public function updatePlanDataInCanvas(Request $request)
    {

        $projectPlan = ProjectPlan::find(session('project_plan_id'));
        $projectPlan->template_data = $request->get('file_data') ;
        $projectPlan->save();
        //return view('canvas.index_new');

    }

    public function loadPlanDataInCanvas()
    {

        $projectPlan = ProjectPlan::find(session('plan_id'));
        return $projectPlan->template_data;
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
        $project = Project::find($id);
        return view('projects.show')
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
        //
    }
}
