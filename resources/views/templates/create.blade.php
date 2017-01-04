@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/templates') !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <section class="row form-group">
                    <section class="col-md-12">
                        @if ($errors->has())
                            <div class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    {{ $error }}<br>
                                @endforeach
                            </div>
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Template Name</label></section>
                    <section class="col-md-8"><input class="form-control required" id="name"
                                                     name="name" aria-required="true" type="text" placeholder="House Design Plan Template Name"></section>
                    <section class="col-md-2">
                        <select class="form-control required"
                                id="prod-frm-sub-cat" name="scale" aria-required="true"
                                aria-invalid="true">
                            <option value="200">1:200</option>
                            <option value="150">1:150</option>
                            <option value="150">1:100</option>
                            <option value="150">1:50</option>
                        </select></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Watts Per SQM</label></section>
                    <section class="col-md-8">
                        <section class="col-md-12">
                            <section class="row form-group">
                                <section class="col-md-4">
                                    House
                                </section>
                                <section class="col-md-8">
                                    <input class="form-control required" id="house_watts_per_sqm"
                                           name="house_watts_per_sqm" aria-required="true" type="text" placeholder="5w Per SQM">
                                </section>
                            </section>
                            <section class="row form-group">
                            <section class="col-md-4">
                                Garage
                            </section>
                            <section class="col-md-8">
                                <input class="form-control required" id="garage_watts_per_sqm"
                                       name="garage_watts_per_sqm" aria-required="true" type="text" placeholder="3w Per SQM">
                            </section>
                            </section>
                            <section class="row form-group">
                            <section class="col-md-4">
                                Porch
                            </section>
                            <section class="col-md-8">
                                <input class="form-control required" id="porch_watts_per_sqm"
                                       name="porch_watts_per_sqm" aria-required="true" type="text" placeholder="4w Per SQM">
                            </section>
                            </section>
                            <section class="row form-group">
                            <section class="col-md-4">
                                Total
                            </section>
                            <section class="col-md-8">
                                <input class="form-control required" id="total"
                                       name="total" aria-required="true" type="text" placeholder="Total" disabled>
                                <input type="hidden" name="energy_rating" id="energy_rating" value="1">
                            </section>
                            </section>
                        </section>
                    </section>
                    <section class="col-md-2"></section>
                </section>

                <section class="row box-footer" id="form-footer">
                    <button type="submit"
                            class="btn add-item-btn">Load Plans <img src="resources/images/spinning-circles.svg"
                                                              class="loading-img-btn" style="display:none;"
                                                              id="1bf1a6a6-757b-921f-0a96-f95ffc63c6bc-new-product-loading">
                    </button>
                    <a id="prod-frm-reset" href="{!! url('templates') !!}" class="btn add-item-btn" style="margin-right:10px;">Reset</a>
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
                class="breadcrumb-text">New</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop

@section('post-js')
    <script>
 /*       var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');


        context.beginPath();
        context.arc(150, 100, 100, 0, Math.PI, true);
        context.closePath();
        context.lineWidth = 5;
        context.fillStyle = 'red';
        context.fill();

        context.beginPath();
        context.arc(150, 100, 60, 0, Math.PI, true);
        context.closePath();
        context.lineWidth = 5;
        context.fillStyle = 'white';
        context.fill();

        context.fillStyle = "white";
        context.font = "bold 24px Arial";
        context.fillText("5", 145, 80);

        context.beginPath();
        context.rect(50, 100, 200, 160);
        context.closePath();
        context.lineWidth = 5;
        context.fillStyle = 'black';
        context.fill();

        context.beginPath();
        context.rect(50, 130, 200, 50);
        context.closePath();
        context.lineWidth = 5;
        context.fillStyle = 'yellow';
        context.fill();

        context.fillStyle = "white";
        context.font = "bold 24px Arial";
        context.fillText("Energy", 250, 175);

        context.fillStyle = "white";
        context.font = "bold 24px Arial";
        context.fillText("Rating", 250, 195);
*/

 function calTotal(){
     var total = 0;
     total = (parseInt($( "#house_watts_per_sqm" ).val()) || 0)+
             (parseInt($( "#garage_watts_per_sqm" ).val()) || 0)+
             (parseInt($( "#porch_watts_per_sqm" ).val()) || 0);
     $('#total').val(total+'W');
 }
        $( "#house_watts_per_sqm" ).keyup(function() {
            calTotal();
        });
        $( "#garage_watts_per_sqm" ).keyup(function() {
            calTotal();
        });
        $( "#porch_watts_per_sqm" ).keyup(function() {
            calTotal();
        });


    </script>
@stop