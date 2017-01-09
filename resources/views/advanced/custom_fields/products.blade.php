@extends('layouts.default')


@section('main-content')

    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content_left">

        <div class="form_container">
            <form  files="true" class="form-horizontal" role="form" method="post" id="new-prod-form"
                   enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/advanced/custom-fields/products') !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <div class="form-group">
                    <label for="budget" class="col-xs-12 col-lg-2 control-label">Sub-Category</label>
                    <div class="col-xs-10 col-sm-11 col-md-11 col-lg-7">
                        <select class="form-control required"
                                id="prod-frm-sub-cat" name="sub_category_id" aria-required="true"  aria-invalid="true">
                       @foreach($subCategories as $subCategory)
                        <option value="{!! $subCategory->id !!}">
                            {!! $subCategory->name !!}
                        </option>
                           @endforeach
                        </select>
                        @if ($errors->has('category_id'))<span class="error_message">Please select a Category</span>@endif
                    </div>
                </div>


                <div class="row form-group @if ($errors->has('name')) has-error @endif">
                    <div class="col-md-2"><label>Name</label></div>
                    <div class="col-md-7">
                        {!! Form::text('name', null,['id'=>'name','class'=>"form-control"]) !!}
                        @if ($errors->has('name')) <p class="error_message">{{ $errors->first('name') }}</p> @endif
                    </div>
                    <div class="col-md-2"></div>
                </div>

                <div class="row form-group @if ($errors->has('type')) has-error @endif">
                    <div class="col-md-2"><label>Type</label></div>
                    <div class="col-md-7">
                        {!! Form::select('type', $customFieldTypes,null,['id'=>'type','class'=>"form-control"]) !!}
                        @if ($errors->has('type')) <p class="error_message">{{ $errors->first('type') }}</p> @endif
                    </div>
                    <div class="col-md-2"></div>
                </div>


                <!-- -------- Buttons Start ---------- -->
                <div class="wr_btn clearfix">
                    <input name="Save" type="submit" class="btn_save" id="Save" value="Save" >
                </div>
                <!-- -------- Buttons End ---------- -->

            </form>
        </div>
    </div>


    <div class="row" id="prod-list-view">
        <div class="box">
            <div class="box-header"></div>
            <div class="box-body table-responsive">

                <table id="product-table-view"
                       class="table table-bordered table-striped table-view no-cursor  dataTable no-footer"
                       role="grid" aria-describedby="product-table-view_info">
                    <thead>
                    <tr role="row">
                        <th class="sorting_asc" tabindex="0" aria-controls="product-table-view" rowspan="1"
                            colspan="1" aria-sort="ascending" aria-label="ID: activate to sort column descending">#
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Code: activate to sort column ascending"> Name
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Type
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php $i = 1; ?>
                    @foreach($customFields as $customField)
                        <tr data-product-id="2" role="row">
                            <td data-id="2-id" class="sorting_1">{!! $i++ !!}</td>
                            <td data-id="2-code">{!! $customField->name !!}</td>
                            <?php
                            $customFieldType = App\CustomFieldType::find($customField->type);
                            ?>
                            <td data-id="2-name">{!! $customFieldType->name !!}</td>
                            <td data-id="2-actions"><a class="action-btn btn-app" href="{!! url('projects/'.$customField->id) !!}"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="View Project"><i
                                            class="fa fa-folder-open-o green-font"></i></a>
                                <a class="action-btn btn-app" data-product-id="2" id="2-edit-action" href="{!! url('projects/'.$project->id.'/edit') !!}"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Edit Project"><i class="fa fa-edit green-font"></i></a>

                                <form method="GET" action="{!! url('projects/'.$project->id.'/delete') !!}" accept-charset="UTF-8" style="display:inline">
                                    <a class="action-btn btn-app"
                                       data-product-id="2"
                                       data-placement="top"
                                       title=""
                                       data-toggle="modal"
                                       data-target="#confirmDelete"
                                       data-title="Delete Project"
                                       data-message="Are you sure you want to delete this Project ?"
                                       data-original-title="Remove User"><i class="fa fa-times red-font"></i></a>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
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
    <button data-ref="sub-menu-items" data-index="1" class="breadcrumb-btn font-blue" type="submit" id="1-bc">
            <span class="bc-img-wrap"><img class="breadcrumb-main-icon"
                                           src="{{ URL::asset('resources/images/project_ico_black.png') }}"></span><span
                class="breadcrumb-text">Advanced</span></button>
    <button data-ref="sub-menu-items" data-index="1" class="breadcrumb-btn font-blue" type="submit" id="1-bc">
            <span class="bc-img-wrap"><img class="breadcrumb-main-icon"
                                           src="{{ URL::asset('resources/images/project_ico_black.png') }}"></span><span
                class="breadcrumb-text">Custom-Fields</span></button>
    <button data-ref="sub-menu-items" data-index="1" class="breadcrumb-btn font-blue" type="submit" id="1-bc">
            <span class="bc-img-wrap"><img class="breadcrumb-main-icon"
                                           src="{{ URL::asset('resources/images/project_ico_black.png') }}"></span><span
                class="breadcrumb-text">Products</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

@stop

@section('post-css')


    {{ Html::style('resources/css/datatables/dataTables.bootstrap.css') }}
@stop
@section('post-js')
    {{ Html::script('resources/js/plugins/datatables/jquery.dataTables.js') }}
    {{ Html::script('resources/js/plugins/datatables/dataTables.bootstrap.js') }}
    <script>
        $(document).ready(function () {
            $('#product-table-view').DataTable({
                "iDisplayLength": 50
            });
        });
    </script>

    @include('includes.confirmDelete')
@stop