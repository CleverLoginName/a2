@extends('layouts.default')


@section('main-content')

    <div class="content_area clearfix">

        <!-- -------- Left Content Area Starts ---------- -->
        <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

            <div class="form_container clearfix">

                <div class="col-lg-3">
                    <img src="{!! asset($composite_product->image) !!}" class="img-responsive col-md-12" alt=""/>
                    <div class="product_desc clearfix">
                        <label for="_name" class="control-label">{!! $composite_product->name !!}</label>
                        <div >
                            <p>{!! $composite_product->description !!}</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-9 product_details">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Name</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->name !!}</p>
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Description</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->description !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">TYPE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>@if($composite_product->is_composite) Composite Product @else Single Product @endif</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">MANUFACTURING PRODUCT CODE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->manufacturing_product_code !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">BUILDERS PRODUCT CODE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->builder_code !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">PRONTO CODE</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->pronto_code !!}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">BUILDERS PRICE ($)</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $composite_product->sale_price !!}</p>
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
                                <p>{!! $composite_product->discount !!}</p>
                            </div>
                        </div>


                    </form>
                </div>
                <div class="col-md-12 related_products" >
                    <h4>Products Contains</h4>

                    @if($composite_product->is_composite)


                        <?php $itemProducts = \App\ProductCompositeMap::where('parent','=',$composite_product->id)->get();  ?>
                        @foreach($itemProducts as $itemProduct)
                            @php
                                $child = \App\Product::find($itemProduct->child);
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
                                            <p><a href="{!! url('products/'.$itemProduct->child) !!}">Link</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        @endforeach
                    @endif



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
                class="breadcrumb-text">Composite-Products</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>
    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $composite_product->name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop