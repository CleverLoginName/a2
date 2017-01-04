@extends('layouts.default')


@section('main-content')

    <div class="content_area clearfix">

        <!-- -------- Left Content Area Starts ---------- -->
        <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

            <div class="form_container clearfix">

              <!--  <div class="col-lg-3">
                    <img src="{!! asset($pack->image) !!}" class="img-responsive col-md-12" alt=""/>
                    <div class="product_desc clearfix">
                        <label for="_name" class="control-label">{!! $pack->name !!}</label>
                        <div >
                            <p>{!! $pack->description !!}</p>
                        </div>
                    </div>
                </div>-->

                <div class="col-lg-12 product_details">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">NAME</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $pack->name !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">DESCRIPTION</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $pack->description !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">CONTRACTOR PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $pack->contractor_price !!}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">SUPPLIER PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $pack->supplier_price !!}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">SALES PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $pack->builder_price !!}</p>
                            </div>
                        </div>


                    </form>
                </div>
                <div class="col-md-12 related_products" >
                    <h4>Products Contains</h4>


                        <?php $itemProducts = \App\ProductSubCategoryMap::where('sub_category_id','=',$pack->id)->get();  ?>
                        @foreach($itemProducts as $itemProduct)
                            @php
                                $child = \App\Product::find($itemProduct->product_id);
                            @endphp
                            @if($child)

                            @endif
                            <div class="col-xs-12 colsm-12 cim-md-4 col-lg-3">
                                <div class="product">
                                    <img src="{!! asset($child->image) !!}" class="img-responsive col-md-12"/>
                                    <div class="form-group clearfix">
                                        <label for="_name" class="col-xs-12 col-lg-4 control-label">Name</label>
                                        <div class="col-md-12 col-lg-8">
                                            <p>{!! $child->name !!}</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix">
                                        <label for="_name" class="col-xs-12 col-lg-4 control-label">Description</label>
                                        <div class="col-md-12 col-lg-8">
                                            <p>{!! substr($child->description,0,20).'...' !!}</p>
                                        </div>
                                    </div>
                                    <div class="form-group clearfix">
                                        <label for="_name" class="col-xs-12 col-lg-4 control-label">More</label>
                                        <div class="col-md-12 col-lg-8">
                                            @if($itemProduct->is_composite)
                                                <p><a href="{!! url('products/composite-products/'.$child->id) !!}">Link</a></p>
                                            @else
                                                <p><a href="{!! url('products/single-products/'.$child->id) !!}">Link</a></p>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>


                        @endforeach



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
                class="breadcrumb-text">Packs</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>
    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $pack->name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop