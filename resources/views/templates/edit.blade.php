@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/templates/'.$template->id) !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                {{ method_field('PUT') }}
                {{Form::hidden('id',$template->id)}}
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
                    <section class="col-md-8">
                    {!! Form::text('name',$template->name,['class'=>'form-control required','placeholder'=>"House Design Plan Template Name",'id'=>'name']) !!}</section>
                    <section class="col-md-2">
                        {!! Form::select('scale', ['200' => '1 : 200', '150' => '1 : 150', '100' => '1 : 100', '50' => '1 : 50'],$template->scale,['id'=>'scale','class'=>'form-control required']) !!}
                    </section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"><label>SQM</label></section>
                    <section class="col-md-8">
                        <section class="col-md-12">
                            <section class="row form-group">
                                <section class="col-md-2">
                                    House
                                </section>
                                <section class="col-md-4">
                                    {!! Form::text('house_watts_per_sqm',$template->sqm_house,['class'=>'form-control required','placeholder'=>"5w Per SQM",'id'=>'house_watts_per_sqm']) !!}
                                </section>
                            <section class="row form-group">
                                <section class="col-md-2">
                                    Terrace
                                </section>
                                <section class="col-md-4">
                                    {!! Form::text('terrace_watts_per_sqm',$template->sqm_terrace,['class'=>'form-control required','placeholder'=>"4w Per SQM",'id'=>'terrace_watts_per_sqm']) !!}
                                </section>
                            </section>
                            <section class="row form-group">
                                <section class="col-md-2">
                                    Garage
                                </section>
                                <section class="col-md-4">
                                    {!! Form::text('garage_watts_per_sqm',$template->sqm_garage,['class'=>'form-control required','placeholder'=>"3w Per SQM",'id'=>'garage_watts_per_sqm']) !!}
                                </section>
                                <section class="col-md-2">
                                    Balcony
                                </section>
                                <section class="col-md-4">
                                    {!! Form::text('balcony_watts_per_sqm',$template->sqm_balcony,['class'=>'form-control required','placeholder'=>"4w Per SQM",'id'=>'balcony_watts_per_sqm']) !!}
                                </section>
                            </section>
                            <section class="row form-group">
                                <section class="col-md-2">
                                    Porch
                                </section>
                                <section class="col-md-4">
                                    {!! Form::text('porch_watts_per_sqm',$template->sqm_porch,['class'=>'form-control required','placeholder'=>"4w Per SQM",'id'=>'porch_watts_per_sqm']) !!}
                                </section>
                                <section class="col-md-2">
                                    Alfresco
                                </section>
                                <section class="col-md-4">
                                    {!! Form::text('alfresco_watts_per_sqm',$template->sqm_alfresco,['class'=>'form-control required','placeholder'=>"4w Per SQM",'id'=>'alfresco_watts_per_sqm']) !!}
                                </section>
                            </section>
                            <section class="row form-group">
                                <section class="col-md-2">
                                    Total
                                </section>
                                <section class="col-md-4">
                                    <span id="total">{!!
                                    (intval($template->sqm_house)*5)+
                                    (intval($template->sqm_garage)*3)+
                                    (intval($template->sqm_porch)*4)+
                                    (intval($template->terrace_watts_per_sqm)*4)+
                                    (intval($template->balcony_watts_per_sqm)*4)+
                                    (intval($template->alfresco_watts_per_sqm)*4)
                                     !!}</span>W

                                </section>
                                <section class="col-md-2">
                                    Rating
                                </section>
                                <section class="col-md-4">
                                    {!! Form::select('energy_rating', [
                                    '1' => '1',
                                    '2' => '2',
                                    '3' => '3',
                                    '4' => '4',
                                    '4.5' => '4.5',
                                    '5' => '5',
                                    '5.5' => '5.5',
                                    '6' => '6',
                                    '6.5' => '6.5',
                                    '7' => '7',
                                    '7.5' => '7.5',
                                    '8' => '8',
                                    '8.5' => '8.5'
                                     ],$template->scale,['id'=>'scale','class'=>'form-control required']) !!}

                                </section>
                            </section>
                        </section>
                    </section>
                    <section class="col-md-2"></section>
                </section>
                </section>
                <section class="row box-footer" id="form-footer">
                    <button type="submit"
                            class="btn add-item-btn">Save<img src="resources/images/spinning-circles.svg"
                                                              class="loading-img-btn" style="display:none;"
                                                              id="1bf1a6a6-757b-921f-0a96-f95ffc63c6bc-new-product-loading">
                    </button>
                    <a id="prod-frm-reset" href="{!! url()->current() !!}" class="btn add-item-btn" style="margin-right:10px;">Reset</a>
                    <a id="prod-frm-reset" href="{!! url('templates/create/'.$template->id.'/add-plans') !!}" class="btn add-item-btn" style="margin-right:10px;">Edit Plans</a>

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
                                           src="{{ URL::asset('resources/images/Black/plan.png') }}"></span><span
                class="breadcrumb-text">Template</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">Edit</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop