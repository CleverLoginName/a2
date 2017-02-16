@extends('layouts.default')


@section('main-content')
    <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

        <div class="form_container clearfix">


            <div class="col-lg-12 product_details">
                <form class="form-horizontal">

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Name</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->name !!}</p>
                        </div>
                    </div>



                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Area( SQM ) - House</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->sqm_house !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Area( SQM ) - Garage</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->sqm_garage !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Area( SQM ) - Porch</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->sqm_porch !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Area( SQM ) - Terrace</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->sqm_terrace !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Area( SQM ) - Balcony</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->sqm_balcony !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Area( SQM ) - Alfresco</label>
                        <div class="col-md-12 col-lg-10">
                            <p>{!! $template->sqm_alfresco !!}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="_name" class="col-xs-12 col-lg-2 control-label">Scale</label>
                        <div class="col-md-12 col-lg-10">
                            <p>1 : {!! $template->scale !!}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-12 related_products" >
            <h4>Related Plans</h4>
            @foreach($templateFloors as $templateFloor)
                @php
                    $templateImage  = \Illuminate\Support\Facades\DB::table('template_images')->where('id','=',$templateFloor->template_image_id)->first();
                    $templateFloorCatalogs  = DB::table('template_floor_catalogs')->where('template_floor_id','=',$templateFloor->id)->get();
                @endphp
                @foreach($templateFloorCatalogs as $templateFloorCatalog)

                    @php
                        $templateFloorCatalogDesigns  = DB::table('template_floor_catalog_designs')->where('template_floor_catalog_id','=',$templateFloorCatalog->id)->get();
                    @endphp
                    @foreach($templateFloorCatalogDesigns as $templateFloorCatalogDesign)

                    <div class="col-xs-12 colsm-12 cim-md-4 col-lg-3">
                <div class="product">
                    <img src="/{!! $templateImage->path !!}" class="img-responsive col-md-9 col-lg-9"/>
                    <div class="form-group clearfix">
                        <label for="_name" class="col-xs-12 col-lg-4 col-md-4 control-label"></label>
                        <div class="col-md-8 col-lg-8">
                            <p>{!! $templateFloor->name !!}</p>
                        </div>
                        <div class="col-md-12 col-lg-12">

                        </div>
                        <label for="_name" class="col-xs-12 col-lg-4 col-md-4 control-label"></label>
                        <div class="col-md-8 col-lg-8">
                            <a href="{!! url('templates/create/add-plans/'.$templateFloorCatalogDesign->id.'/canvas') !!}">Load in Canvas</a>
                        </div>
                    </div>


                </div>
            </div>
                @endforeach
                @endforeach
                @endforeach

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
                                           src="{{ URL::asset('resources/images/Black/plan.png') }}"></span><span
                class="breadcrumb-text">Templates</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $template->name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop