@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/templates') !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-4"><label>Name</label></section>
                    <section class="col-md-6">{!! $template->name !!}</section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-4"><label>Watt Per SQM - House</label></section>
                    <section class="col-md-6">{!! $template->sqm_house !!}</section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-4"><label>Watt Per SQM - Garage</label></section>
                    <section class="col-md-6">{!! $template->sqm_garage !!}</section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-4"><label>Watt Per SQM - Porch</label></section>
                    <section class="col-md-6">{!! $template->sqm_porch !!}</section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-4"><label>Scale</label></section>
                    <section class="col-md-6">1 : {!! $template->scale !!}</section>
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
                class="breadcrumb-text">Templates</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $template->name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop