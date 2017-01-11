@extends('layouts.default')


@section('main-content')
    <section class="content padding-top-0" id="asa-dashboard-content">
        <section class="title-wrapper"><h4 class="dashboard-title">Select a Type</h4></section>
        <section id="aeda35c3-bad5-70bc-697f-d3f05bec1dbb-widget-wrapper">
            <section class="row" style="margin-bottom:10px;">
                <a href="{!! url('/advanced/data-import/products') !!}">
                    <section class="col-md-4 dashboard-widget-col">
                        <section class="dashboard-widget"><span
                                    class="dahsboard-item-icon dashboard-item-user"></span><span
                                    class="dashboard-item-name">Products</span><span
                                    class="dashboard-item-count"></span></section>
                    </section>
                </a>
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
    <button data-ref="sub-menu-items" data-index="1" class="breadcrumb-btn cursor-normal" type="submit" id="1-bc">
            <span class="bc-img-wrap"><img class="breadcrumb-main-icon"
                                           src="{{ URL::asset('resources/images/products_ico_black.png') }}"></span><span
                class="breadcrumb-text">Data-Import</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

@stop