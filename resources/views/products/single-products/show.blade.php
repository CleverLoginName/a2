@extends('layouts.default')


@section('main-content')

    <div class="content_area clearfix">

        <!-- -------- Left Content Area Starts ---------- -->
        <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

            <div class="form_container clearfix">

                <div class="col-lg-3">
                    <img src="{!! asset($single_product->image) !!}" class="img-responsive col-md-12" alt=""/>
                    <div class="product_desc clearfix">
                        <label for="_name" class="control-label">{!! $single_product->name !!}</label>
                        <div >
                            <p>{!! $single_product->description !!}</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9 product_details">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Name</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $single_product->name !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Icon</label>
                            <div class="col-md-12 col-lg-10">
                                @php
                                    $icon = \App\ProductIcon::find($single_product->icon);
                                @endphp
                                <p>@if($icon)<img src="{!! $icon->path !!}" class="col-md-1"> @else Icon Deleted @endif</p>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Description</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $single_product->description !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">TYPE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>@if($single_product->is_composite) Composite Product @else Single Product @endif</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">SUPPLIER CODE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $single_product->manufacturing_product_code !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">BUILDERS PRODUCT CODE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $single_product->builder_code !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">CONTRACTOR CODE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $single_product->pronto_code !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">CONTRACTOR PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->contractor_price !!}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">SUPPLIER PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->supplier_price !!}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">SALES PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->builder_price !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Discount (%)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $single_product->discount !!}</p>
                            </div>
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
                class="breadcrumb-text">Products</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn cursor-normal" type="submit" id="2-bc"><span
                class="breadcrumb-text">Single-Products</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>
    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $single_product->name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop