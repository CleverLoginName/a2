<?php

namespace App\Http\Controllers;

use App\Address;
use App\Product;
use App\Project;
use App\ProjectPlan;
use App\Template;
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
            'lot'    => 'required',
            'title_1'    => 'required',
            'first_name_1'    => 'required',
            'last_name_1'    => 'required',
            'email_1'    => 'required',
            'mobile_1'    => 'required',
            'title_2'    => 'required',
            'job'    => 'required',
            'energy_consumption'    => 'required'
        );
        session(["email_1"=>$request->get('email_1'),"email_2"=>$request->get('email_2')]);
        $validator = Validator::make($request->all(), $rules);

        $validator->after(function($validator) {
            if ($this->email_exists(session('email_1'))) {
                $validator->errors()->add('email_1', 'Email 1 Already in the DB');
            }
            if ($this->email_exists(session('email_2'))) {
                $validator->errors()->add('email_2', 'Email 2 Already in the DB');
            }
        });


        if ($validator->fails())
            return Redirect::to('/projects/create')
                ->withErrors($validator)
                ->withInput();
               // ->with('data',$request->all());

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

        $templatePlans = TemplatePlan::where('template_id', '=', $project->template_id)->get();
        foreach ($templatePlans as $templatePlan){
            $projectPlan = new ProjectPlan();
            $projectPlan->design = $templatePlan->design;
            $projectPlan->level = $templatePlan->level;
            $projectPlan->img = $templatePlan->img;
            $projectPlan->img_300x200 = $templatePlan->img_300x200;
            $projectPlan->project_id = $project->id;
            $projectPlan->catalog_id = $templatePlan->catalog_id;
            $projectPlan->template_data = $templatePlan->template_data;
            $projectPlan->save();
        }

        $projectPlans = ProjectPlan::where('project_id','=',$project->id)->get();
        $projectPlansCount = ProjectPlan::where('project_id','=',$project->id)->count();
        if($projectPlansCount > 0){
            session(['project_id' => $project->id ]);
            session(['project_plan_id' => $projectPlans[0]->id ]);
        }

        Flash::success('Project Added', 'Project has been added successfully.');
        return view('canvas.index_project')
            ->with('showPop', true)
            ->with('bgImg', '')
            ->with('plans', $projectPlans);

    }


    public function editPlanInCanvas($id)
    {
        $projectPlan = DB::table('project_plans')->where('id','=',$id)->first();
        $allPlans = DB::table('project_plans')->where('project_id','=',$projectPlan->project_id)->get();
        session(['project_plan_id' => $projectPlan->id ]);
        session(['plan_id' => $id ]);
        return view('canvas.index_project')
            ->with('bgImg', $projectPlan->img)
            ->with('showPop', false)
            ->with('plans', $allPlans);
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
            'first_name_2'    => 'required',
            'last_name_2'    => 'required',
            'email_2'    => 'required',
            'mobile_2'    => 'required',
            'job'    => 'required',
            'energy_consumption'    => 'required',
            'budget'    => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
            return Redirect::to('/projects/create')
                ->withErrors($validator);

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

        $user_2 = User::find($request->get('user_id_2'));
        $user_2->first_name = $request->get('first_name_2');
        $user_2->last_name = $request->get('last_name_2');
        $user_2->email = $request->get('email_2');
        $user_2->mobile = $request->get('mobile_2');
        $user_2->password = Hash::make(str_random(10));
        $user_2->is_enabled = true;
        $user_2->profile_pic = '';
        $user_2->save();
        ////$user_2->attachRole(3);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $project = Project::find($id);
        $project->consultant_id = $request->get('consultant_id');
        $project->template_id = $request->get('template_id');
        $project->job = $request->get('job');
        $project->status_id = 1;
        $project->user_id_1 = $user_1->id;
        $project->user_id_2 = $user_2->id;
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
