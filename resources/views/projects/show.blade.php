@extends('layouts.default')


@section('main-content')

    <div class="content_area clearfix">

        <!-- -------- Left Content Area Starts ---------- -->
        <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

            <div class="form_container clearfix">

                <div class="col-lg-12 product_details">
                    <form class="form-horizontal">

                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Job#</label>
                            <div class="col-md-12 col-lg-10">
                                <p>@if($project){!! $project->job !!}@endif</p>
                            </div>
                        </div>
                    @php
                        $consultant = \App\User::find($project->consultant_id);
            $address = App\Address::find($project->address_id);
            $user_1 = \App\User::find($project->user_id_1);
            $user_2 = \App\User::find($project->user_id_2);
            $template = \App\Template::find($project->template_id);
                    @endphp
                        @if($consultant)
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Consultant</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $consultant->first_name.' '.$consultant->last_name !!}</p>
                            </div>
                        </div>
                        @endif
                        @if($user_1)
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Client 1</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $user_1->first_name.' '.$user_1->last_name !!}</p>
                            </div>
                        </div>
                        @endif
                        @if($user_2)
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Client 2</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $user_2->first_name.' '.$user_2->last_name !!}</p>
                            </div>
                        </div>
                        @endif
                        @if($template)
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Template</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $template->name !!}</p>
                            </div>
                        </div>
                        @endif
                        @if($address)
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Build address</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $address->lot.', '.$address->no.', '.$address->street_name.', '.$address->town.', '.$address->state !!}</p>
                            </div>
                        </div>
                        @endif
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Budget</label>
                            <div class="col-md-12 col-lg-10">
                                <p><small>$</small>{!! $project->budget !!}</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="_name" class="col-xs-12 col-lg-2 control-label">Energy consumption</label>
                            <div class="col-md-12 col-lg-10">
                                <p>{!! $project->energy_consumption !!}<small>%</small></p>
                            </div>
                        </div>


                    </form>
                </div>
                <div class="col-md-12 related_products">
                    <h4>Project Plans</h4>
                    @php
                        $projectPlans = \App\ProjectPlan::where('project_id','=',$project->id)->get();
                    @endphp

                @foreach($projectPlans as $projectPlan)
                    <div class="col-xs-12 colsm-12 cim-md-4 col-lg-3">
                        <div class="product">
                            <img src="/{!! $projectPlan->img !!}" class="img-responsive col-md-12">
                            <div class="form-group clearfix">
                                <label for="_name" class="col-xs-12 col-lg-4 control-label">Design</label>
                                <div class="col-md-12 col-lg-8">
                                    <p>{!! $projectPlan->design !!}</p>
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <label for="_name" class="col-xs-12 col-lg-4 control-label">Level</label>
                                <div class="col-md-12 col-lg-8">
                                    <p>{!! $projectPlan->level !!}</p>
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <label for="_name" class="col-xs-12 col-lg-4 control-label">Catalog</label>
                                <div class="col-md-12 col-lg-8">
                                    <p>{!! $projectPlan->catalog !!}</p>
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <label for="_name" class="col-xs-12 col-lg-4 control-label">Edit in Canvas</label>
                                <div class="col-md-12 col-lg-8">
                                    <p><a href="{!! url('projects/'.$project->id.'/canvas') !!}">Link</a> </p>
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
                                           src="{{ URL::asset('resources/images/project_ico_black.png') }}"></span><span
                class="breadcrumb-text">Projects</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $project->job !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop