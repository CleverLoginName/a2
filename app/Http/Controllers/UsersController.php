<?php

namespace App\Http\Controllers;

use App\Permission;
use App\Role;
use App\User;
use Creativeorange\Gravatar\Facades\Gravatar;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Szykra\Notifications\Flash;

class UsersController extends Controller
{

    public function create()
    {
        $roles = Role::all();
        return  view('users.create')
            ->with('roles', $roles);
    }

    public function index()
    {
        $users = User::all();
        return  view('users.index')
            ->with('users', $users);
    }

    public function show($id)
    {
        $user = User::find($id);
        return view('users.show')
            ->with('user', $user);
    }
    public function profile()
    {
        $user = Auth::user();
        return view('users.show')
            ->with('user', $user);
    }

    public function store(Request $request)
    {

        $rules = array(
            'first_name'   => 'required',
            'last_name'    => 'required',
            'mobile'       => 'required',
            'role_id'    => 'required',
            'email'        => 'required|email|unique:users',
            'password'     => 'required',
            'password_confirm' => 'required|same:password'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Redirect::to('/users/create')
                ->withErrors($validator);
        }

        $user = new User();
        $user->first_name = $request->get('first_name');
        $user->last_name = $request->get('last_name');
        $user->email = $request->get('email');
        $user->mobile = $request->get('mobile');
        $user->password = Hash::make($request->get('password'));
        $user->created_by = Auth::user()->id;

        $user->save();
        $role = DB::table('roles')->where('id', $request->get('role_id'))->first()->name;
        $role = $request->get('role_id');
        $user->roles()->attach($role);


        File::exists('uploads') or File::makeDirectory('uploads');
        File::exists('uploads/profile_pics') or File::makeDirectory('uploads/profile_pics');
        File::exists('uploads/profile_pics/'.$user->id) or File::makeDirectory('uploads/profile_pics/'.$user->id);
        File::exists('uploads/profile_pics/'.$user->id.'/originals/') or
        File::makeDirectory('uploads/profile_pics/'.$user->id.'/originals/');

        $user_ = User::find($user->id);
        $profile_pic = $request->file('profile_pic');
        $randStr = Str::random(16);

        //Move Uploaded File
        $destinationPath = 'uploads/profile_pics/'.$user->id.'/originals/';
        if ($profile_pic) {
            $randFileName = $randStr.'.'.$profile_pic->getClientOriginalExtension();
            $profile_pic->move($destinationPath, $randFileName);
        } else {
            $img = Image::make(Gravatar::fallback('/uploads/profile_pics/default.jpg')->get($user->email));
            $randFileName = $randStr.'.png';
            $img->save($destinationPath.$randFileName);
        }

        $user_->profile_pic = $destinationPath.$randFileName;

        $user_->save();


        Flash::success('User Added', 'User has been added successfully.');

        return redirect()->action('UsersController@index');
    }
    public function update(Request $request, $id)
    {
        $rules = array(
            'first_name'   => 'required',
            'last_name'    => 'required',
            'mobile'       => 'required',
            'role_id'    => 'required',
            'email'        => 'required|email'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return Redirect::to('/users/'.$id.'/edit')
                ->withErrors($validator);
        }

        $user = User::find($id);
        $user->first_name = $request->get('first_name');
        $user->last_name = $request->get('last_name');
        $user->email = $request->get('email');
        $user->mobile = $request->get('mobile');
       // $user->password = Hash::make($request->get('password'));

        $user->save();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $role = DB::table('role_user')
            ->where('user_id', '=', $user->id)
            ->update(['role_id' => $request->get('role_id')]);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        Flash::success('User Updated', 'User has been updated successfully.');
        return redirect()->action('UsersController@index');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        Flash::error('User Deleted', 'User has been deleted successfully.');
        return redirect()->action('UsersController@index');
    }

    public function edit($id)
    {
        $user = User::find($id);
        $roles = Role::all();
        return view('users.edit')
            ->with('user', $user)
            ->with('roles', $roles);
    }

    public function logout()
    {
        Auth::logout();
        Session::flush();
        return redirect()->action('UserController@login');
    }

    public function login()
    {
        return  view('auth.login');
    }

    public function rolesNPermissions()
    {
        $roles = Role::all();
        $permissions = Permission::all();
        $activePermissions = DB::table('permission_role')->get();
        return view('users.roles.roles_permissions')
            ->with('roles', $roles)
            ->with('activePermissions', $activePermissions)
            ->with('permissions', $permissions);
    }
    public function updateRolesNPermissions(Request $request)
    {
        if ($request->get('permissions')) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('permission_role')->truncate();
            foreach ($request->get('permissions') as $permission) {
                $rolePermission = explode(",", $permission);
                DB::table('permission_role')->insert(
                    ['permission_id' => $rolePermission[1], 'role_id' => $rolePermission[0]]
                );
            }DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
        Flash::success('Permissions Updated', 'Permissions has been updated successfully.');
        return redirect()->action('UsersController@rolesNPermissions');
    }
    public function rolesNUsers()
    {
        $roles = Role::all();
        $users = User::all();
        $activeUsers = DB::table('role_user')->get();
        return view('users.roles.user_roles')
            ->with('roles', $roles)
            ->with('activeUsers', $activeUsers)
            ->with('users', $users);
    }
    
    public function updateRolesNUsers(Request $request)
    {
        $users = array_except($request->all(), ['_token']);
        if ($users) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('role_user')->truncate();
            foreach ($users as $user) {
                $userRole = explode(",", $user);
                DB::table('role_user')->insert(
                    ['role_id' => $userRole[0], 'user_id' => $userRole[1]]
                );
            }DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
        Flash::success('User Roles Updated', 'User Roles has been updated successfully.');
        return redirect()->action('UsersController@rolesNUsers');
    }
}
