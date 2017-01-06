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
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Job# / Consultant</label></section>
                    <section class="col-md-3">
                        <input class="form-control required" id="job"
                               name="job" aria-required="true" type="text" placeholder="Job#" value="{!! $project->job !!}">
                    </section>
                    <section class="col-md-5"><input class="form-control required" id="consultant"
                                                     name="consultant" aria-required="true" type="text" placeholder="Consultant" value="{!! $consultant->first_name.' '. $consultant->last_name !!}"></section>
                </section>
                <?php
                    $user_1 = App\User::find($project->user_id_1);
                    $user_2 = App\User::find($project->user_id_2);
                    ?>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Client Name 1</label></section>
                    <section class="col-md-2">
                        <select class="form-control required"
                                id="prod-frm-sub-cat" name="title_1" aria-required="true"
                                aria-invalid="true">
                            <option value="Mr.">Mr</option>
                            <option value="Miss.">Miss</option>
                            <option value="Mrs.">Mrs</option>
                        </select>
                    </section>
                    <section class="col-md-3"><input class="form-control required" id="first_name_1"
                                                     name="first_name_1" aria-required="true" type="text" placeholder="First Name" value="{!! $user_1->first_name !!}"></section>
                    <section class="col-md-3"><input class="form-control required" id="last_name_1"
                                                     name="last_name_1" aria-required="true" type="text" placeholder="Last Name" value="{!! $user_1->last_name !!}"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"></section>
                    <section class="col-md-4">
                        <input class="form-control required" id="mobile_1"
                               name="mobile_1" aria-required="true" type="text" placeholder="Mobile" value="{!! $user_1->mobile !!}" >
                    </section>
                    <section class="col-md-4">
                        <input class="form-control required" id="email_1"
                               name="email_1" aria-required="true" type="text" placeholder="E-Mail" value="{!! $user_1->email !!}">
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Client Name 2</label></section>
                    <section class="col-md-2">
                        <select class="form-control required"
                                id="prod-frm-sub-cat" name="title_2" aria-required="true"
                                aria-invalid="true">
                            <option value="Mr.">Mr</option>
                            <option value="Miss.">Miss</option>
                            <option value="Mrs.">Mrs</option>
                        </select>
                    </section>
                    <section class="col-md-3"><input class="form-control required" id="first_name_2"
                                                     name="first_name_2" aria-required="true" type="text" placeholder="First Name" value="{!! $user_2->first_name !!}"></section>
                    <section class="col-md-3"><input class="form-control required" id="last_name_2"
                                                     name="last_name_2" aria-required="true" type="text" placeholder="Last Name" value="{!! $user_2->last_name !!}"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"></section>
                    <section class="col-md-4">
                        <input class="form-control required" id="mobile_2"
                               name="mobile_2" aria-required="true" type="text" placeholder="Mobile" value="{!! $user_2->mobile !!}">
                    </section>
                    <section class="col-md-4">
                        <input class="form-control required" id="email_2"
                               name="email_2" aria-required="true" type="text" placeholder="E-Mail" value="{!! $user_2->email !!}">
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Design Template</label></section>
                    <section class="col-md-6"><input class="form-control required" id="template"
                                                     name="template" aria-required="true" type="text" value="{!! $template->name !!}"></section>
                    <section class="col-md-2"><input class="form-control required" id="scale"
                                                     name="scale" aria-required="true" type="text" placeholder="Scale" disabled="disabled"  value="1 : {!! $template->scale !!}"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Build Address</label></section>
                    <?php

                        $address = App\Address::find($project->address_id);
                        ?>
                    <section class="col-md-2"><input class="form-control required" id="lot"
                                                     name="lot" aria-required="true" type="text" placeholder="Lot#" value="{!! $address->lot !!}">
                    </section>
                    <section class="col-md-2"><input class="form-control required" id="no_unit"
                                                     name="no_unit" aria-required="true" type="text" placeholder="No/Unit" value="{!! $address->no !!}">
                    </section>
                    <section class="col-md-4"><input class="form-control required" id="street_name"
                                                     name="street_name" aria-required="true" type="text" placeholder="Street Name" value="{!! $address->street_name !!}">
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label></label></section>
                    <section class="col-md-4"><input class="form-control required" id="town" name="town" aria-required="true" type="text" placeholder="Suburb/Town" value="{!! $address->town !!}">
                    </section>
                    <section class="col-md-2"><input class="form-control required" id="postal_code"
                                                     name="postal_code" aria-required="true" type="text" placeholder="Postal Code" value="{!! $address->postal_code !!}">
                    </section>
                    <section class="col-md-2"><input class="form-control required" id="state"
                                                     name="state" aria-required="true" type="text" placeholder="State" value="{!! $address->state !!}">
                    </section>

                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Budget/Energy</label></section>
                    <section class="col-md-2"><input class="form-control required" id="budget"
                                                     name="budget" aria-required="true" type="text" placeholder="$ Budget(If App)" value="{!! $project->budget !!}">
                    </section>
                    <section class="col-md-2"><input class="form-control required" id="energy_consumption"
                                                     name="energy_consumption" aria-required="true" type="text" placeholder="Total Energy per SQM" value="{!! $project->energy_consumption !!}">
                    </section>
                    <section class="col-md-4"><input class="form-control required" id="rating"
                                                     name="rating" aria-required="true" type="text" placeholder="Rating" disabled="disabled" value="{!! $template->energy_rating !!}">
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label></label></section>
                    <section class="col-md-1">
                        House
                    </section>
                    <section class="col-md-1">
                        <input class="form-control required" id="house" name="house" aria-required="true" type="text" placeholder="5w per SQM" disabled="disabled" value="{!! $template->sqm_house !!}">
                    </section>

                    <section class="col-md-1"></section>

                    <section class="col-md-1">
                        Garage
                    </section>
                    <section class="col-md-1">
                        <input class="form-control required" id="garage" name="garage" aria-required="true" type="text" placeholder="3w per SQM" disabled="disabled" value="{!! $template->sqm_garage !!}">
                    </section>

                    <section class="col-md-1"></section>

                    <section class="col-md-1">
                        Porch
                    </section>
                    <section class="col-md-1">
                        <input class="form-control required" id="porch" name="porch" aria-required="true" type="text" placeholder="4w per SQM" disabled="disabled" value="{!! $template->sqm_porch !!}">
                    </section>


                </section>
                <section class="row box-footer" id="form-footer">
                    <button type="submit"
                            class="btn add-item-btn">Save <img src="resources/images/spinning-circles.svg"
                                                              class="loading-img-btn" style="display:none;"
                                                              id="1bf1a6a6-757b-921f-0a96-f95ffc63c6bc-new-product-loading">
                    </button>
                    <a id="prod-frm-reset" href="{!! url('projects') !!}" class="btn add-item-btn" style="margin-right:10px;">Reset</a>
                    <a id="prod-frm-reset" href="{!! url('projects/'.$project->id.'/canvas') !!}" class="btn add-item-btn" style="margin-right:10px;">Manage Plans</a>
                </section>
            </form>
        </section>
    </section>

    <div class="modal fade consultant_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div id="consultants">

                    <!-- class="search" automagically makes an input a search field. -->
                    <input class="search" placeholder="Search" />
                    <!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
                    <button class="sort" data-sort="name">
                        Sort
                    </button>

                    <!-- Child elements of container with class="list" becomes list items -->
                    <ul class="list">
                        @foreach($consultants as $consultant)

                            <li>
                                <div class="row form-group">
                                    <section class="col-md-4">
                                        <div class="row">
                                            IMG
                                        </div>
                                        <div class="row">
                                            <button class="assign" data-consultant-id="{!! $consultant->id !!}" data-consultant-name="{!! $consultant->first_name.' '.$consultant->first_name !!}">Assign</button>
                                        </div>
                                    </section>
                                    <section class="col-md-8">
                                        <div class="row">
                                            <h3 class="name">{!! $consultant->first_name.' '.$consultant->first_name !!}</h3>
                                        </div>
                                        <div class="row">
                                            test
                                        </div>
                                    </section>
                                </div>

                            </li>
                        @endforeach
                    </ul>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade template_modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div id="templates">

                    <!-- class="search" automagically makes an input a search field. -->
                    <input class="search" placeholder="Search" />
                    <!-- class="sort" automagically makes an element a sort buttons. The date-sort value decides what to sort by. -->
                    <button class="sort" data-sort="name_1">
                        Sort
                    </button>

                    <!-- Child elements of container with class="list" becomes list items -->
                    <ul class="list">
                        @foreach($templates as $template)

                            <li>

                                <h3 class="name_1 template-item"
                                    data-template-id="{!! $template->id !!}"
                                    data-template-name="{!! $template->name !!}"
                                    data-template-scale="{!! $template->scale !!}"
                                    data-template-energy-rating="{!! $template->energy_rating !!}"
                                    data-template-sqm-house="{!! $template->sqm_house !!}"
                                    data-template-sqm-porch="{!! $template->sqm_porch !!}"
                                    data-template-sqm-garage="{!! $template->sqm_garage !!}"
                                >{!! $template->name !!}</h3>

                            </li>
                        @endforeach
                    </ul>

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
    </script>
@stop