@extends('layouts.default')


@section('main-content')
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
                            aria-label="Product Code: activate to sort column ascending">First Name
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Last Name
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Role
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php $i = 1; ?>
                    @foreach($users as $user)
                        <tr data-product-id="2" role="row">
                            <td data-id="2-id" class="sorting_1">{!! $i++ !!}</td>
                            <td data-id="2-code">{!! $user->first_name !!}</td>
                            <td data-id="2-name">{!! $user->last_name !!}</td>
                            <td data-id="2-name">{!! \App\Role::find(DB::table('role_user')->where('user_id','=',$user->id)->first()->role_id)->display_name !!}</td>
                            <td data-id="2-actions"><a class="action-btn btn-app" href="{!! url('users/'.$user->id) !!}"
                                                       data-toggle="tooltip" data-placement="top" title=""
                                                       data-original-title="View User"><i
                                            class="fa fa-folder-open-o green-font"></i></a>
                                <a class="action-btn btn-app" data-product-id="2" id="2-edit-action" href="{!! url('users/'.$user->id.'/edit') !!}"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Edit User"><i class="fa fa-edit green-font"></i></a>

                                <form method="GET" action="{!! url('users/'.$user->id.'/delete') !!}" accept-charset="UTF-8" style="display:inline">
                                <a class="action-btn btn-app"
                                   data-product-id="2"
                                   data-placement="top"
                                   title=""
                                   data-toggle="modal"
                                   data-target="#confirmDelete"
                                   data-title="Delete User"
                                   data-message="Are you sure you want to delete this user ?"
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
                                           src="{{ URL::asset('resources/images/home_ico_black.png') }}"></span><span
                class="breadcrumb-text">Users</span></button>
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