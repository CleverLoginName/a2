@extends('layouts.default')


@section('main-content')

    <div class="content_area clearfix">
    <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

        <div class="form_container clearfix">

            <div class="col-lg-3">
            <div class="col-md-9">
                <img src="{!! asset($user->profile_pic,null) !!}" class="img-responsive" alt=""/>
                <div class="product_desc">
                    <center><label for="_name" class="control-label">{!! $user->first_name.' '.$user->last_name !!}</label></center>

                </div>
                </div>
            </div>

            <div class="col-lg-9 product_details">
                <form class="form-horizontal">

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">First Name</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $user->first_name !!}</p>
                        </div>
                    </div>



                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Last Name</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $user->last_name !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">E-mail</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $user->email !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Mobile</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $user->mobile !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">User Role</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! \App\Role::find(DB::table('role_user')->where('user_id','=',$user->id)->first()->role_id)->display_name !!}</p>
                        </div>
                    </div>
                    <div class="wr_btn clearfix">
                        <a name="Save" type="button" class="btn_save" id="Save" href="{!! url('profile/edit') !!}">Edit Profile</a>
                    </div>
                </form>
            </div>
        </div>

    </div>
    </div>
@stop


@section('sub-content')
    <section class="details-outer-wrapper">
        <section class="details-inner-wrapper">
            <div class="info-img-wrapper"><img src="{{ URL::asset('resources/images/home.jpg') }}"
                                               class="img-responsive"/>
            </div>
            <div class="info-img-wrapper">
                <h3><img src="{{ URL::asset('resources/images/cus_logo.png') }}" class="img-responsive"
                         style="width:60%;margin:0 auto;"/></h3>
            </div>
        </section>
    </section>
@stop

@section('bread-crumb')
    <a href="{!! url('/logout') !!}" class="custom-login-button">
        <span>Logout</span>
    </a>
    <button data-ref="sub-menu-items" data-index="1" class="breadcrumb-btn cursor-normal" type="submit" id="1-bc">
            <span class="bc-img-wrap"><img class="breadcrumb-main-icon"
                                           src="{{ URL::asset('resources/images/home_ico_black.png') }}"></span><span
                class="breadcrumb-text">Users</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $user->first_name.' '.$user->last_name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop