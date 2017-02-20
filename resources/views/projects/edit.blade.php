@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/projects/'.$project->id.'/edit') !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <input type="hidden" name="consultant_id" id="consultant_id" value="{!! $project->consultant_id !!}">
                <input type="hidden" name="template_id" id="template_id" value="{!! $project->template_id !!}">
                <input type="hidden" name="address_id" id="address_id" value="{!! $project->address_id !!}">
                <input type="hidden" name="address_id" id="address_id" value="{!! $project->address_id !!}">
                <input type="hidden" name="user_id_1" id="user_id_1" value="{!! $project->user_id_1 !!}">
                <input type="hidden" name="user_id_2" id="user_id_2" value="{!! $project->user_id_2 !!}">
                {{ method_field('POST') }}
                {{Form::hidden('id',$project->id)}}
                <?php
                $template = App\Template::find($project->template_id);
                $consultant= App\User::find($project->consultant_id);
                $user_1 = App\User::find($project->user_id_1);
                $user_2 = App\User::find($project->user_id_2);
                $address = App\Address::find($project->address_id);
                ?>
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
                    <section class="col-md-2"><label>Job# / Consultant</label></section>
                    <section class="col-md-2">

                        {!! Form::text('job',$project->job,['class'=>'form-control required','placeholder'=>"Job#",'id'=>'job']) !!}
                    </section>
                    <section class="col-md-8">
                        @if($consultant)
                            {!! Form::text('consultant',$consultant->first_name.' '. $consultant->last_name,['class'=>'form-control required','placeholder'=>"Consultant",'id'=>'consultant']) !!}
                        @else
                            {!! Form::text('consultant',null,['class'=>'form-control required','placeholder'=>"Consultant",'id'=>'consultant']) !!}
                        @endif
                        </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Client Detail 1</label></section>
                    <section class="col-md-2">

                        {!! Form::select('title_1', ['Mr.' => 'Mr', 'Miss.' => 'Miss', 'Mrs.' => 'Mrs', 'Ms.' => 'Ms'],null,['id'=>'title_1','class'=>'form-control required']) !!}
                    </section>
                    <section class="col-md-4">
                        @if($user_1)
                        {!! Form::text('first_name_1',$user_1->first_name,['class'=>'form-control required','placeholder'=>"First Name",'id'=>'first_name_1']) !!}
                            @else
                            {!! Form::text('first_name_1',null,['class'=>'form-control required','placeholder'=>"First Name",'id'=>'first_name_1']) !!}
                        @endif
                    </section>
                    <section class="col-md-4">

                        @if($user_1)
                            {!! Form::text('last_name_1',$user_1->last_name,['class'=>'form-control required','placeholder'=>"Last Name",'id'=>'last_name_1']) !!}
                        @else
                            {!! Form::text('last_name_1',null,['class'=>'form-control required','placeholder'=>"Last Name",'id'=>'last_name_1']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"></section>
                    <section class="col-md-4">

                        @if($user_1)
                            {!! Form::text('mobile_1',$user_1->mobile,['class'=>'form-control required','placeholder'=>"Mobile",'id'=>'mobile_1']) !!}
                        @else
                            {!! Form::text('mobile_1',null,['class'=>'form-control required','placeholder'=>"Mobile",'id'=>'mobile_1']) !!}
                        @endif
                    </section>
                    <section class="col-md-4">

                        @if($user_1)
                            {!! Form::email('email_1',$user_1->email,['class'=>'form-control required','placeholder'=>"E-Mail",'id'=>'email_1']) !!}
                        @else
                            {!! Form::email('email_1',null,['class'=>'form-control required','placeholder'=>"E-Mail",'id'=>'email_1']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Client Detail 2</label></section>
                    <section class="col-md-2">
                        {!! Form::select('title_2', ['Mr.' => 'Mr', 'Miss.' => 'Miss', 'Mrs.' => 'Mrs', 'Ms.' => 'Ms'],null,['id'=>'title_2','class'=>'form-control required']) !!}
                    </section>
                    <section class="col-md-4">

                        @if($user_2)
                            {!! Form::text('first_name_2',$user_2->first_name,['class'=>'form-control required','placeholder'=>"First Name",'id'=>'first_name_2']) !!}
                        @else
                            {!! Form::text('first_name_2',null,['class'=>'form-control required','placeholder'=>"First Name",'id'=>'first_name_2']) !!}
                        @endif
                    </section>
                    <section class="col-md-4">

                        @if($user_2)
                            {!! Form::text('last_name_2',$user_2->last_name,['class'=>'form-control required','placeholder'=>"Last Name",'id'=>'last_name_2']) !!}
                        @else
                            {!! Form::text('last_name_2',null,['class'=>'form-control required','placeholder'=>"Last Name",'id'=>'last_name_2']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"></section>
                    <section class="col-md-4">

                        @if($user_2)
                            {!! Form::text('mobile_2',$user_2->mobile,['class'=>'form-control required','placeholder'=>"Mobile",'id'=>'mobile_2']) !!}
                        @else
                            {!! Form::text('mobile_2',null,['class'=>'form-control required','placeholder'=>"Mobile",'id'=>'mobile_2']) !!}
                        @endif
                    </section>
                    <section class="col-md-4">

                        @if($user_2)
                            {!! Form::email('email_2',$user_2->email,['class'=>'form-control required','placeholder'=>"E-Mail",'id'=>'email_2']) !!}
                        @else
                            {!! Form::email('email_2',null,['class'=>'form-control required','placeholder'=>"E-Mail",'id'=>'email_2']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Design Template</label></section>
                    <section class="col-md-7">

                        @if($template)
                            {!! Form::text('template', $template->name ,['class'=>'form-control required','placeholder'=>"Template",'id'=>'template']) !!}
                        @else
                            {!! Form::text('template', null,['class'=>'form-control required','placeholder'=>"Template",'id'=>'template']) !!}
                        @endif
                    </section>
                    <section class="col-md-3">

                        @if($template)
                            {!! Form::text('scale', $template->scale,['class'=>'form-control required','placeholder'=>"Scale",'id'=>'scale', 'disabled'=>'disabled']) !!}
                        @else
                            {!! Form::text('scale', null,['class'=>'form-control required','placeholder'=>"Scale",'id'=>'scale', 'disabled'=>'disabled']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Build Address</label></section>
                    <section class="col-md-2">

                        @if($address)
                            {!! Form::text('lot',$address->lot ,['class'=>'form-control required','placeholder'=>"Lot#",'id'=>'lot']) !!}
                        @else
                            {!! Form::text('lot',null ,['class'=>'form-control required','placeholder'=>"Lot#",'id'=>'lot']) !!}
                        @endif
                    </section>
                    <section class="col-md-2">

                        @if($address)
                            {!! Form::text('no_unit',$address->no,['class'=>'form-control required','placeholder'=>"No/Unit",'id'=>'no_unit']) !!}
                        @else
                            {!! Form::text('no_unit',null,['class'=>'form-control required','placeholder'=>"No/Unit",'id'=>'no_unit']) !!}
                        @endif
                    </section>
                    <section class="col-md-6">

                        @if($address)
                            {!! Form::text('street_name',$address->street_name,['class'=>'form-control required','placeholder'=>"Street Name",'id'=>'street_name']) !!}
                        @else
                            {!! Form::text('street_name',null,['class'=>'form-control required','placeholder'=>"Street Name",'id'=>'street_name']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label></label></section>
                    <section class="col-md-5">

                        @if($address)
                            {!! Form::text('town',$address->town,['class'=>'form-control required','placeholder'=>"Suburb/Town",'id'=>'town']) !!}
                        @else
                            {!! Form::text('town',null,['class'=>'form-control required','placeholder'=>"Suburb/Town",'id'=>'town']) !!}
                        @endif
                    </section>
                    <section class="col-md-2">

                        @if($address)
                            {!! Form::text('postal_code',$address->postal_code,['class'=>'form-control required','placeholder'=>"Postal Code",'id'=>'postal_code']) !!}
                        @else
                            {!! Form::text('postal_code',null,['class'=>'form-control required','placeholder'=>"Postal Code",'id'=>'postal_code']) !!}
                        @endif
                    </section>
                    <section class="col-md-3">
                        @if($address)
                            {!! Form::select('state', ['VIC' => 'VIC',
                       'TAS' => 'TAS',
                       'NSW' => 'NSW',
                       'WA' => 'WA',
                       'NT' => 'NT',
                       'QLD' => 'QLD',
                       'SA' => 'SA',
                       ],$address->state,['id'=>'state','class'=>'form-control required','placeholder'=>"State"]) !!}
                        @else
                            {!! Form::select('state', ['VIC' => 'VIC',
                        'TAS' => 'TAS',
                        'NSW' => 'NSW',
                        'WA' => 'WA',
                        'NT' => 'NT',
                        'QLD' => 'QLD',
                        'SA' => 'SA',
                        ],null,['id'=>'state','class'=>'form-control required','placeholder'=>"State"]) !!}
                        @endif



                    </section>

                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>Budget/Energy</label></section>
                    <section class="col-md-3">

                        @if($project)
                            {!! Form::text('budget',$project->budget,['class'=>'form-control required','placeholder'=>"$ Budget(If App)",'id'=>'budget']) !!}
                        @else
                            {!! Form::text('budget',null,['class'=>'form-control required','placeholder'=>"$ Budget(If App)",'id'=>'budget']) !!}
                        @endif
                    </section>
                    <section class="col-md-3">
                        {!! Form::text('energy_consumption',$project->energy_consumption,['class'=>'form-control required','placeholder'=>"Total Energy per SQM",'id'=>'energy_consumption']) !!}
                    </section>
                    <section class="col-md-4">


                        @if($template)
                            {!! Form::text('rating',$template->energy_rating,['class'=>'form-control required','placeholder'=>"Rating",'id'=>'rating', 'disabled'=>'disabled']) !!}
                        @else
                            {!! Form::text('rating',null,['class'=>'form-control required','placeholder'=>"Rating",'id'=>'rating', 'disabled'=>'disabled']) !!}
                        @endif
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label></label></section>
                    <section class="col-md-1">
                        House
                    </section>
                    <section class="col-md-2">

                        @if($template)
                            {!! Form::text('house',$template->sqm_house,['class'=>'form-control required','placeholder'=>"5w per SQM",'id'=>'house', 'disabled'=>'disabled']) !!}(w per SQM)
                        @else
                            {!! Form::text('house',null,['class'=>'form-control required','placeholder'=>"5w per SQM",'id'=>'house', 'disabled'=>'disabled']) !!}(w per SQM)
                        @endif
                    </section>


                    <section class="col-md-1">
                        Garage
                    </section>
                    <section class="col-md-2">

                        @if($template)
                            {!! Form::text('garage',$template->sqm_garage,['class'=>'form-control required','placeholder'=>"3w per SQM",'id'=>'garage', 'disabled'=>'disabled']) !!}(w per SQM)
                        @else
                            {!! Form::text('garage',null,['class'=>'form-control required','placeholder'=>"3w per SQM",'id'=>'garage', 'disabled'=>'disabled']) !!}(w per SQM)
                        @endif
                    </section>
                    <section class="col-md-1">

                    </section>

                    <section class="col-md-1">
                        Porch
                    </section>
                    <section class="col-md-2">

                        @if($template)
                            {!! Form::text('porch',$template->sqm_porch,['class'=>'form-control required','placeholder'=>"4w per SQM",'id'=>'porch', 'disabled'=>'disabled']) !!}(w per SQM)
                        @else
                            {!! Form::text('porch',null,['class'=>'form-control required','placeholder'=>"4w per SQM",'id'=>'porch', 'disabled'=>'disabled']) !!}(w per SQM)
                        @endif
                    </section>


                </section>
                <section class="row box-footer" id="form-footer">
                    <button type="submit"
                            class="btn add-item-btn">Save <img src="resources/images/spinning-circles.svg"
                                                              class="loading-img-btn" style="display:none;"
                                                              id="1bf1a6a6-757b-921f-0a96-f95ffc63c6bc-new-product-loading">
                    </button>
                    <a id="prod-frm-reset" href="{!! url('products') !!}" class="btn add-item-btn" style="margin-right:10px;">Reset</a>

                </section>
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
                class="breadcrumb-text">Edit</span></button>
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

    </script>
@stop
@section('post-css')
    {!! Html::style('css/common.css') !!}
@stop

