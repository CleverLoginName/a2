@extends('layouts.default')


@section('main-content')
    <section class="content padding-top-0" id="asa-dashboard-content">
        <section class="title-wrapper"><h4 class="dashboard-title">Summary</h4></section>
        <section id="db7ebd7e-bfc8-014d-eeaa-be8f2ea17f38-widget-wrapper">
            <section class="row" style="margin-bottom:10px;">
                @foreach(DB::table('roles')->get() as $role)
                <a href="{!! url('/users') !!}"> <section class="col-md-4 dashboard-widget-col">
                    <section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-user"></span><span
                                class="dashboard-item-name">{!! $role->display_name !!} </span><span
                                class="dashboard-item-count">{!! DB::table('role_user')->join('roles', 'roles.id', '=', 'role_user.role_id')->where('roles.name','=',$role->name)->count() !!}</span></section>
                </section>
                </a>
                @endforeach
            </section>
            <section class="row" style="margin-bottom:10px;">
                <a href="{!! url('/products') !!}">  <section class="col-md-4 dashboard-widget-col">
                    <section class="dashboard-widget"><span
                                class="dahsboard-item-icon dashboard-item-products"></span><span
                                class="dashboard-item-name">Products </span><span
                                class="dashboard-item-count">{!! DB::table('products')->count() !!} </span></section>
                </section></a>
                <a href="{!! url('/categories') !!}">
                <section class="col-md-4 dashboard-widget-col">
                    <section class="dashboard-widget"><span class="dahsboard-item-icon dashboard-item-cat"></span><span
                                class="dashboard-item-name">Categories </span><span
                                class="dashboard-item-count">{!! DB::table('categories')->count() !!} </span></section>
                </section></a>
            </section>
            <section class="row" style="margin-bottom:10px;">
                <a href="{!! url('/projects') !!}">
                <section class="col-md-4 dashboard-widget-col">
                    <section class="dashboard-widget"><span
                                class="dahsboard-item-icon dashboard-item-projects"></span><span
                                class="dashboard-item-name">Projects </span><span
                                class="dashboard-item-count">{!! DB::table('projects')->count() !!} </span></section>
                </section>
                    </a><a href="{!! url('/projects') !!}">
                <section class="col-md-4 dashboard-widget-col">
                    <section class="dashboard-widget"><span
                                class="dahsboard-item-icon dashboard-item-projects"></span><span
                                class="dashboard-item-name">Floor Plans </span><span
                                class="dashboard-item-count">{!! DB::table('project_plans')->count() !!} </span></section>
                </section></a>
            </section>
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
    <button data-ref="asa-dashboard-content" data-index="1" class="breadcrumb-btn cursor-normal" type="submit"
            id="1-bc"><span class="bc-img-wrap"><img class="breadcrumb-main-icon"
                                                     src="{{ URL::asset('resources/images/home_ico_black.png') }}"></span><span
                class="breadcrumb-text">Home</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>
@stop