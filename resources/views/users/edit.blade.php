@extends('layouts.default')


@section('main-content')
    <section class="box new-item-wrapper">
        <section class="box-header"></section>
        <section class="box-body">
            <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/users/'.$user->id) !!}">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                {{ method_field('PUT') }}
                {{Form::hidden('id',$user->id)}}
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
                    <section class="col-md-2"><label>First Name</label></section>
                    <section class="col-md-6"><input class="form-control required" id="first_name"
                                                     name="first_name" aria-required="true" type="text" value="{!! $user->first_name !!}"></section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Last Name</label></section>
                    <section class="col-md-6"><input class="form-control required" id="last_name"
                                                     name="last_name" aria-required="true" type="text" value="{!! $user->last_name !!}"></section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>E-mail</label></section>
                    <section class="col-md-6"><input class="form-control required" id="email"
                                                     name="email" aria-required="true" type="text" value="{!! $user->email !!}"></section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>Mobile</label></section>
                    <section class="col-md-6"><input class="form-control required" id="mobile"
                                                     name="mobile" aria-required="true" type="text" value="{!! $user->mobile !!}"></section>
                    <section class="col-md-2"></section>
                </section>
                <section class="row form-group">
                    <section class="col-md-2"></section>
                    <section class="col-md-2"><label>User Role</label></section>
                    <section class="col-md-6">
                        <select class="form-control required"
                                id="prod-frm-sub-cat" name="role_id" aria-required="true"
                                aria-invalid="true">
                            {!! \App\Role::find(DB::table('role_user')->where('user_id','=',$user->id)->first()->role_id)->display_name !!}
                            @foreach($roles as $role)
                                @if(DB::table('role_user')->where('user_id','=',$user->id)->first()->role_id == $role->id)
                            <option value="{!! $role->id !!}" selected="selected">{!! $role->display_name !!}</option>
                                @else
                                    <option value="{!! $role->id !!}">{!! $role->display_name !!}</option>
                                @endif
                            @endforeach
                        </select>
                    </section>
                    <section class="col-md-2"></section>
                </section>

                <section class="row box-footer" id="form-footer">
                    <button type="submit"
                            class="btn add-item-btn">Add <img src="resources/images/spinning-circles.svg"
                                                              class="loading-img-btn" style="display:none;"
                                                              id="1bf1a6a6-757b-921f-0a96-f95ffc63c6bc-new-product-loading">
                    </button>
                    <a id="prod-frm-reset" href="{!! url('users') !!}" class="btn add-item-btn" style="margin-right:10px;">Reset</a>
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
                class="breadcrumb-text">Users</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">Edit</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop