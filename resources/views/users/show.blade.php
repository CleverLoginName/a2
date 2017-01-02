@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/users') !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>First Name</label></section>
                    <section class="col-md-6">{!! $user->first_name !!}</section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Last Name</label></section>
                    <section class="col-md-6">{!! $user->last_name !!}</section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>E-mail</label></section>
                    <section class="col-md-6">{!! $user->email !!}</section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Mobile</label></section>
                    <section class="col-md-6">{!! $user->mobile !!}</section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>User Role</label></section>
                    <section class="col-md-6">
                        {!! \App\Role::find(DB::table('role_user')->where('user_id','=',$user->id)->first()->role_id)->display_name !!}
                    </section>
                    <section class="col-md-2"></section>
                </section>

            </form>
        </section>
    </section>
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