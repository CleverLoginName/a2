@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-proj-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/projects') !!}">
                {{ Form::hidden('_token',  csrf_token() , array('id' => '_token')) }}
                {{ Form::hidden('consultant_id', null, array('id' => 'consultant_id')) }}
                {{ Form::hidden('template_id', null, array('id' => 'template_id')) }}
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
                <section class="row form-group ">
                    <section class="col-md-2"><label>Job # / Consultant</label></section>
                    <section class="col-md-2 @if ($errors->has('job')) has-error @endif">

                        {!! Form::text('job',null,['class'=>'form-control required','placeholder'=>"Job#",'id'=>'job']) !!}
                        @if ($errors->has('job')) <p class="error_message">{{ $errors->first('job') }}</p> @endif
                    </section>
                    <section class="col-md-8 @if ($errors->has('consultant')) has-error @endif">
                        {!! Form::text('consultant',null,['class'=>'form-control required','placeholder'=>"Consultant",'id'=>'consultant']) !!}
                        @if ($errors->has('consultant_id')) <p class="error_message">The consultant field is required</p> @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Client Detail 1</label></section>
                    <section class="col-md-2">

                        {!! Form::select('title_1', ['Mr.' => 'Mr', 'Miss.' => 'Miss', 'Mrs.' => 'Mrs', 'Ms.' => 'Ms'],null,['id'=>'title_1','class'=>'form-control required']) !!}
                    </section>
                    <section class="col-md-4 @if ($errors->has('first_name_1')) has-error @endif">
                        {!! Form::text('first_name_1',null,['class'=>'form-control required','placeholder'=>"First Name",'id'=>'first_name_1']) !!}
                        @if ($errors->has('first_name_1')) <p class="error_message">The first name is required</p> @endif
                    </section>
                    <section class="col-md-4 @if ($errors->has('last_name_1')) has-error @endif">
                        {!! Form::text('last_name_1',null,['class'=>'form-control required','placeholder'=>"Last Name",'id'=>'last_name_1']) !!}
                        @if ($errors->has('last_name_1')) <p class="error_message">The last name is required</p> @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"></section>
                    <section class="col-md-4 @if ($errors->has('mobile_1')) has-error @endif">
                        {!! Form::text('mobile_1',null,['class'=>'form-control required','placeholder'=>"Mobile",'id'=>'mobile_1']) !!}
                        @if ($errors->has('mobile_1')) <p class="error_message">The mobile is required</p> @endif
                    </section>
                    <section class="col-md-4 @if ($errors->has('email_1')) has-error @endif">
                        {!! Form::email('email_1',null,['class'=>'form-control required','placeholder'=>"E-Mail",'id'=>'email_1']) !!}
                        @if ($errors->has('email_1')) <p class="error_message">The e-mail is required</p> @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Client Detail 2</label></section>
                    <section class="col-md-2">
                        {!! Form::select('title_2', ['Mr.' => 'Mr', 'Miss.' => 'Miss', 'Mrs.' => 'Mrs', 'Ms.' => 'Ms'],null,['id'=>'title_2','class'=>'form-control required']) !!}
                    </section>
                    <section class="col-md-4">
                        {!! Form::text('first_name_2',null,['class'=>'form-control required','placeholder'=>"First Name",'id'=>'first_name_2']) !!}
                    </section>
                    <section class="col-md-4">
                        {!! Form::text('last_name_2',null,['class'=>'form-control required','placeholder'=>"Last Name",'id'=>'last_name_2']) !!}
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"></section>
                    <section class="col-md-4">
                        {!! Form::text('mobile_2',null,['class'=>'form-control required','placeholder'=>"Mobile",'id'=>'mobile_2']) !!}
                    </section>
                    <section class="col-md-4">
                        {!! Form::email('email_2',null,['class'=>'form-control required','placeholder'=>"E-Mail",'id'=>'email_2']) !!}
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Design Template</label></section>
                    <section class="col-md-7 @if ($errors->has('template')) has-error @endif">
                        {!! Form::text('template',null,['class'=>'form-control required','placeholder'=>"Template",'id'=>'template']) !!}
                        @if ($errors->has('template')) <p class="error_message">The template is required</p> @endif
                    </section>
                    <section class="col-md-3">
                        {!! Form::text('scale',null,['class'=>'form-control required','placeholder'=>"Scale",'id'=>'scale', 'disabled'=>'disabled']) !!}
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Build Address</label></section>
                    <section class="col-md-2 @if ($errors->has('lot')) has-error @endif">
                        {!! Form::text('lot',null,['class'=>'form-control required','placeholder'=>"Lot#",'id'=>'lot']) !!}
                        @if ($errors->has('lot')) <p class="error_message">The lot field is required</p> @endif
                    </section>
                    <section class="col-md-2 @if ($errors->has('no_unit')) has-error @endif">
                        {!! Form::text('no_unit',null,['class'=>'form-control required','placeholder'=>"No/Unit",'id'=>'no_unit']) !!}
                        @if ($errors->has('lot')) <p class="error_message">The no/unit field is required</p> @endif
                    </section>
                    <section class="col-md-6 @if ($errors->has('street_name')) has-error @endif">
                        {!! Form::text('street_name',null,['class'=>'form-control required','placeholder'=>"Street Name",'id'=>'street_name']) !!}
                        @if ($errors->has('street_name')) <p class="error_message">The street name field is required</p> @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label></label></section>
                    <section class="col-md-5 @if ($errors->has('town')) has-error @endif">
                        {!! Form::text('town',null,['class'=>'form-control required','placeholder'=>"Suburb/Town",'id'=>'town']) !!}
                        @if ($errors->has('town')) <p class="error_message">The suburb/town field is required</p> @endif
                    </section>
                    <section class="col-md-2 @if ($errors->has('postal_code')) has-error @endif">
                        {!! Form::text('postal_code',null,['class'=>'form-control required','placeholder'=>"Postal Code",'id'=>'postal_code']) !!}
                        @if ($errors->has('postal_code')) <p class="error_message">The postal code field is required</p> @endif
                    </section>
                    <section class="col-md-3">
                        {!! Form::select('state', ['VIC' => 'VIC',
                         'TAS' => 'TAS',
                         'NSW' => 'NSW',
                         'WA' => 'WA',
                         'NT' => 'NT',
                         'QLD' => 'QLD',
                         'SA' => 'SA',
                         ],null,['id'=>'state','class'=>'form-control required','placeholder'=>"Plaese select a State","required"=>""]) !!}
                        @if ($errors->has('state')) <p class="error_message">The state field is required</p> @endif

                    </section>

                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Budget/Energy</label></section>
                    <section class="col-md-3">
                        {!! Form::text('budget',null,['class'=>'form-control required','placeholder'=>"$ Budget(If App)",'id'=>'budget']) !!}
                        @if ($errors->has('state')) <p class="error_message">The state field is required</p> @endif
                    </section>
                    <section class="col-md-3">
                        {!! Form::text('energy_consumption',null,['class'=>'form-control required','placeholder'=>"Total Energy per SQM",'id'=>'energy_consumption']) !!}
                        @if ($errors->has('state')) <p class="error_message">The state field is required</p> @endif
                    </section>
                    <section class="col-md-4">
                        {!! Form::text('rating',null,['class'=>'form-control required','placeholder'=>"Rating",'id'=>'rating', 'disabled'=>'disabled']) !!}
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label></label></section>
                    <section class="col-md-1">
                        House
                    </section>
                    <section class="col-md-2">
                        {!! Form::text('house',null,['class'=>'form-control required','placeholder'=>"5w per SQM",'id'=>'house', 'disabled'=>'disabled']) !!}(w per SQM)
                    </section>


                    <section class="col-md-1">
                        Garage
                    </section>
                    <section class="col-md-2">
                        {!! Form::text('garage',null,['class'=>'form-control required','placeholder'=>"3w per SQM",'id'=>'garage', 'disabled'=>'disabled']) !!}(w per SQM)
                    </section>
                    <section class="col-md-1">

                    </section>

                    <section class="col-md-1">
                        Porch
                    </section>
                    <section class="col-md-2">
                        {!! Form::text('porch',null,['class'=>'form-control required','placeholder'=>"4w per SQM",'id'=>'porch', 'disabled'=>'disabled']) !!}(w per SQM)
                    </section>


                </section>
                <div class="wr_btn clearfix">
                    <input name="Save" type="submit" class="btn_save" id="Save" value="Save">
                    <a name="Reset" href="{!! url('projects/create') !!}" class="btn_reset" id="Reset">Reset</a>
                </div>
            </form>
        </section>
    </section>







    <!-- ========================= MODEL POPUP STARTS ============================ -->

    <!-- Modal -->
    <div class="modal fade common_popup consultant_modal" id="myModal" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content clearfix">
                <div class="modal-header">

                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title ttl_consultants">Consultants:</h4>

                </div>


                <div class="modal-body" id="consultants">

                    <div class="form-group">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 common_searchBox">
                            <input type="text" class="form-control search" id="budget" placeholder="Search">
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 model_search_results consultant_results_bg clearfix">
                        <ul class="list">
                            @foreach($consultants as $consultant)
                            <li>
                                <div class="consultant_wrapper clearfix">
                                    <div class="col-md-4 img_consultant">
                                        <img src="{!! asset($consultant->profile_pic) !!}" class="col-md-12"/>
                                        <button class="btn_assign assign" data-consultant-id="{!! $consultant->id !!}" data-consultant-name="{!! $consultant->first_name.' '.$consultant->last_name !!}">Assign</button>
                                    </div>
                                    <div class="col-md-8 desc_consultant">
                                        <h5><span class="name">{!! $consultant->first_name.' '.$consultant->last_name !!}</span></h5>
                                        <p>Department</p>
                                        <ul>
                                            <li>Job Title </li>
                                            <li>{!! $consultant->mobile !!}</li>
                                            <li>{!! $consultant->email !!}</li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                                @endforeach
                        </ul>
                    </div>


                </div>

            </div>

        </div>
    </div>

    <!-- ========================= MODEL POPUP ============================ -->







    <!-- Modal -->
    <div class="modal fade common_popup new_Project_popup template_modal" id="myModal" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content clearfix">
                <div class="modal-header">

                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Design Template:</h4>

                </div>


                <div class="modal-body" id="templates">
                    <div class="form-group">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 common_searchBox">
                            <input placeholder="Search" id="budget" class="form-control search"/>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 model_search_results clearfix">
                        <ul class="list">
                            @php
                            $ii = 0;
                            @endphp
                            @foreach($templates as $template)

                                <li  class="template-item"
                                        data-template-id="{!! $template->id !!}"
                                        data-template-name="{!! $template->name !!}"
                                        data-template-scale="{!! $template->scale !!}"
                                        data-template-energy-rating="{!! $template->energy_rating !!}"
                                        data-template-sqm-house="{!! $template->sqm_house !!}"
                                        data-template-sqm-porch="{!! $template->sqm_porch !!}"
                                        data-template-sqm-garage="{!! $template->sqm_garage !!}"
                                    >   @if($ii %4 ==0 )<a> @endif
                                            <span class="name">{!! $template->name !!}</span>
                                        @if($ii %4 ==0 ) </a> @endif

                                </li>
                                @php
                                    $ii++;
                                @endphp
                            @endforeach
                        </ul>
                    </div>


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
                                           src="{{ URL::asset('resources/images/project_ico_black.png') }}"></span><span
                class="breadcrumb-text">Projects</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">New</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop


@section('post-js')
    {{ Html::script('js/list.min.js') }}
<script>

    var options = {
        valueNames: [ 'name' ]
    };

    var userList = new List('consultants', options);
    var templateList = new List('templates', options);


    $('#consultant').on('click', function () {
        $('.consultant_modal').modal('show');
    });
    $('#template').on('click', function () {
        $('.template_modal').modal('show');
    });

    $('.assign').on('click', function () {
        var consultant_id = $(this).data('consultant-id');
        var consultant_name = $(this).data('consultant-name');
        $('#consultant').val(consultant_name);
        $('#consultant_id').val(consultant_id);
        $('.consultant_modal').modal('hide');
    });

    $('.template-item').on('click', function () {console.log($(this).data('template-id'));
        var template_name = $(this).data('template-name');
        var template_id = $(this).data('template-id');
        var scale = $(this).data('template-scale');
        var energy_rating = $(this).data('template-energy-rating');
        var house = $(this).data('template-sqm-house');
        var porch = $(this).data('template-sqm-porch');
        var garage = $(this).data('template-sqm-garage');
        $('#template_id').val(template_id);
        $('#template').val(template_name);
        $('#scale').val('1 : '+scale);
        $('#rating').val(energy_rating);
        $('#house').val(house);
        $('#garage').val(garage);
        $('#porch').val(porch);



        $('.template_modal').modal('hide');
    });
    $('#town').bind('keyup', function () {
        $("#town").val(($("#town").val()).toUpperCase());
    });

    $(function () {
        $('#new-proj-form').parsley().on('field:validated', function() {
            var ok = $('.parsley-error').length === 0;
            $('.bs-callout-info').toggleClass('hidden', !ok);
            $('.bs-callout-warning').toggleClass('hidden', ok);
        })
                .on('form:submit', function() {
                   // return false; // Don't submit form for this demo
                });
    });

</script>
@stop
@section('post-css')
    {!! Html::style('css/common.css') !!}
    <style>
        input.parsley-error, select.parsley-error, textarea.parsley-error {
            color: #B94A48;
            background-color: #F2DEDE;
            border: 1px solid #EED3D7;
        }
    </style>
@stop

