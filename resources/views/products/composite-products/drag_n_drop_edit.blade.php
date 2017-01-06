@extends('layouts.default')


@section('main-content')
    <style>
        .gu-mirror {
            position: fixed !important;
            margin: 0 !important;
            z-index: 9999 !important;
            opacity: 0.8;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
            filter: alpha(opacity=80);
        }
        .gu-hide {
            display: none !important;
        }
        .gu-unselectable {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        .gu-transit {
            opacity: 0.2;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
            filter: alpha(opacity=20);
        }
    </style>

    <section id="vue">
        <section class="box new-item-wrapper">
            <section class="box-header"></section>



            <div class="form_container">
                <form class="form-horizontal">

                    <div class="form-group">

                        <input type="hidden" name="product_id" value="{!! $product_id !!}">
                        <div>
                            <label for="budget" class="col-xs-12 col-lg-2 control-label">Search Product</label>
                            <div class="col-md-12 col-lg-10">
                                <input type="text"  class="form-control"  id="myInput" onkeyup="myFunction()" placeholder="Search for products">
                            </div>



                            <div class="col-md-12 col-lg-5 col-lg-offset-2 dragArea">
                                <ul class="container1 col-md-12" id='left-events' style="min-height: 500px;max-height: 500px;overflow: auto">

                                    @foreach($products as $product)
                                        <li id="{!! $product->id !!}" parent_id="{!! $product_id !!}">
                                            <span class="name"><img src="@if(\App\ProductIcon::find($product->icon)){!! \App\ProductIcon::find($product->icon)->path !!}@endif" width="35px"/>{!! $product->name !!}</span>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>

                            <!-- -------------- Drag and drop area starts -------------------- -->
                            <div class="col-md-12 col-lg-5 ">

                                <ul id='right-events' class='container2 col-md-12 dropArea'style="min-height: 500px;max-height: 500px;overflow: auto"">
                                @foreach($existingComposites as $existingComposite)
                                    <?php $product= \App\Product::find($existingComposite->child); ?>
                                    @if($product)
                                        <li id="{!! $product->id !!}" parent_id="{!! $product_id !!}">
                                            <span class="name"><img src="@if(\App\ProductIcon::find($product->icon)){!! \App\ProductIcon::find($product->icon)->path !!}@endif" width="35px"/>{!! $product->name !!}</span>
                                        </li>
                                        @endif
                                        @endforeach
                                        </ul>
                            </div>
                            <!-- -------------- Drag and drop area ends -------------------- -->
                        </div>

                    </div>

                    <!-- -------- Buttons Start ---------- -->
                    <div class="wr_btn clearfix">
                        <a href="{!! url('/products/composite-products/edit/done') !!}" name="Save"  style="color: white" type="button" class="btn_save" id="Save" value="Done" >Done</a>
                    </div>
                    <!-- -------- Buttons End ---------- -->

                </form>
            </div>
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
                class="breadcrumb-text">Products</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">Edit</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">Composite Product</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop


@section('post-js')

    {{ Html::script('js/dragula.js') }}
    <script>

        $(function() {
            // Handler for .ready() called.


            dragula([document.getElementById('left-events'), document.getElementById('right-events')], {
                removeOnSpill:  function (el) {
                    console.log(el);
                },
                copy: function (el, source) {
                    return source != document.getElementById('right-events')
                },
                accepts: function (el, target) {
                    return target == document.getElementById('right-events')
                },
            }).on('drop', function (el) {
                var x = el.getAttribute("parent_id");
                $.post( "/products/composite-products/selected", { child: el.id,parent:x } );
            }).on('remove', function (el) {
                //console.log(el.id);
                var x = el.getAttribute("parent_id");
                $.post( "/products/composite-products/remove", { child: el.id,parent:x } );
            });

        });


        function myFunction() {
            // Declare variables
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("left-events");
            tr = table.getElementsByTagName("li");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

    </script>
@stop

@section('post-css')
    {{ Html::style('css/common.css') }}
@stop