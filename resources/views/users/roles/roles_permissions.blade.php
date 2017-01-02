@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <div class="row" id="prod-list-view">
            <div class="box">
                <div class="box-header"></div>
                <div class="box-body table-responsive">
                    {!! Form::open(['url' => 'users/permissions', 'method' => 'post', 'class'=>"row new-item-from-wrapper"]) !!}
                    <table id="product-table-view"
                           class="table table-bordered table-striped table-view no-cursor  dataTable no-footer"
                           role="grid" aria-describedby="product-table-view_info">
                        <thead>
                        <tr role="row">
                            <th>#
                            </th>
                            <th>Permission
                            </th>
                            @foreach($roles as $role)
                                <th>
                                    {{ $role->display_name }}
                                </th>
                            @endforeach
                        </tr>
                        </thead>
                        <tbody>
                        <?php $i = 1; ?>
                        @foreach($permissions as $permission)
                            <tr data-product-id="2" role="row" @if($i%2==1) class="odd" @else class="even" @endif>
                                <td data-id="2-id" class="sorting_1">{!! $i++ !!}</td>

                                <td>
                                    {{ $permission->display_name }}
                                </td>
                                @foreach($roles as $role)
                                    <?php  $notAdded = true; ?>
                                    <td>
                                        @foreach($activePermissions as $activePermission)
                                            @if(($activePermission->role_id == $role->id) && ($activePermission->permission_id==$permission->id))

                                                {!! Form::checkbox('permissions[]', $role->id.','.$permission->id,true) !!}
                                                <?php $notAdded = false; ?>
                                            @endif
                                        @endforeach
                                        @if($notAdded)
                                            {!! Form::checkbox('permissions[]', $role->id.','.$permission->id) !!}
                                        @endif
                                    </td>
                                @endforeach
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <section class="row box-footer" id="form-footer">
                        <button type="submit"
                                class="btn add-item-btn">Save <img src="resources/images/spinning-circles.svg"
                                                                   class="loading-img-btn" style="display:none;"
                                                                   id="1bf1a6a6-757b-921f-0a96-f95ffc63c6bc-new-product-loading">
                        </button>
                        <a id="prod-frm-reset" href="{!! url('users/roles') !!}" class="btn add-item-btn" style="margin-right:10px;">User Role Management </a>
                    </section>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
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
                class="breadcrumb-text">Users</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>
    <span
            class="breadcrumb-text font-blue">Permission Management</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

@stop

@section('post-css')


    {{ Html::style('resources/css/datatables/dataTables.bootstrap.css') }}
    <style>
        .new-item-wrapper .box-footer{
            margin:0px
        }
    </style>
@stop
@section('post-js')
    {{ Html::script('resources/js/plugins/datatables/jquery.dataTables.js') }}
    {{ Html::script('resources/js/plugins/datatables/dataTables.bootstrap.js') }}
    <script>
    </script>
@stop