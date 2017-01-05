@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/users') !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Job#</label></section>
                    <section class="col-md-6">@if($project){!! $project->job !!}@endif</section>
                    <section class="col-md-2"></section>
                </section>
                @if(\App\User::find($project->consultant_id))
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Consultant</label></section>
                    <section class="col-md-6">{!! \App\User::find($project->consultant_id)->first_name.' '.\App\User::find($project->consultant_id)->last_name !!}</section>
                    <section class="col-md-2"></section>
                </section>
                @endif
                @if(\App\User::find($project->user_id_1))
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Client 1</label></section>
                    <section class="col-md-6">{!! \App\User::find($project->user_id_1)->first_name.' '.\App\User::find($project->user_id_1)->last_name !!}</section>
                    <section class="col-md-2"></section>
                </section>
                @endif
                    @if(\App\User::find($project->user_id_2))
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Client 2</label></section>
                    <section class="col-md-6">{!! \App\User::find($project->user_id_2)->first_name.' '.\App\User::find($project->user_id_2)->last_name !!}</section>
                    <section class="col-md-2"></section>
                </section>
                @endif
                        @if(\App\Template::find($project->template_id))
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Template</label></section>
                    <section class="col-md-6">{!! \App\Template::find($project->template_id)->name !!}</section>
                    <section class="col-md-2"></section>
                </section>
                @endif

            <?php
            $address = App\Address::find($project->address_id);

                ?>
                @if($address)
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Build Address</label></section>
                    <section class="col-md-6">{!! $address->lot.', '.$address->no.', '.$address->street_name.', '.$address->town.', '.$address->state; !!}</section>
                    <section class="col-md-2"></section>
                </section>
                @endif
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Budget</label></section>
                    <section class="col-md-6"><small>$</small>{!! $project->budget !!}</section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Energy Consumption</label></section>
                    <section class="col-md-6">{!! $project->energy_consumption !!}<small>%</small></section>
                    <section class="col-md-2"></section>
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
                                           src="{{ URL::asset('resources/images/project_ico_black.png') }}"></span><span
                class="breadcrumb-text">Projects</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $project->job !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop