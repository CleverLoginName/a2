@extends('layouts.default')


@section('main-content')
    <section class="content padding-top-0" id="asa-dashboard-content" xmlns="http://www.w3.org/1999/html">
        <section class="title-wrapper"><h4 class="dashboard-title">Select a Option</h4></section>
        <section id="aeda35c3-bad5-70bc-697f-d3f05bec1dbb-widget-wrapper">
            <section class="row" style="margin-bottom:10px;">
                <a href="{!! url('/advanced/data-import/products/export') !!}">
                    <section class="col-md-4 dashboard-widget-col">
                        <section class="dashboard-widget"><span
                                    class="dahsboard-item-icon dashboard-item-user"></span><span
                                    class="dashboard-item-name">Std. Export Format</span><span
                                    class="dashboard-item-count"></span></section>
                    </section>
                </a>
            {!! Form::open(array('method' => 'post','files'=>'true')) !!}
                    <section class="col-md-4 dashboard-widget-col" id="OpenImgUpload">
                        <section class="dashboard-widget"><span
                                    class="dahsboard-item-icon dashboard-item-user"></span><span
                                    class="dashboard-item-name">Std. Import</span><span
                                    class="dashboard-item-count"></span></section>
                    </section>
                <input type="file" id="excel_file" name="excel_file" style="display:none" onchange="this.form.submit()"/>
                {!! Form::close() !!}
            {!! Form::open(array('method' => 'post','files'=>'true', 'url'=> '/advanced/data-import/raw')) !!}
                    <section class="col-md-4 dashboard-widget-col" id="OpenRawImgUpload">
                        <section class="dashboard-widget"><span
                                    class="dahsboard-item-icon dashboard-item-user"></span><span
                                    class="dashboard-item-name">Select File - RAW Data</span><span
                                    class="dashboard-item-count"></span></section>
                    </section>
                <input type="file" id="raw_excel_file" name="raw_excel_file" style="display:none" onchange="this.form.submit()"/>
                {!! Form::close() !!}
                </a> <a href="{!! url('/advanced/data-import/merge-data') !!}">
                    <section class="col-md-4 dashboard-widget-col">
                        <section class="dashboard-widget"><span
                                    class="dahsboard-item-icon dashboard-item-user"></span><span
                                    class="dashboard-item-name">Merge - RAW Data</span><span
                                    class="dashboard-item-count"></span></section>
                    </section>
                </a>
                <a href="{!! url('/advanced/reset-products') !!}">
                    <section class="col-md-4 dashboard-widget-col">
                        <section class="dashboard-widget"><span
                                    class="dahsboard-item-icon dashboard-item-user"></span><span
                                    class="dashboard-item-name">Remove All Products</span><span
                                    class="dashboard-item-count"></span></section>
                    </section>

               </section>
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
                                           src="{{ URL::asset('resources/images/products_ico_black.png') }}"></span><span
                class="breadcrumb-text">Data-Import</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

@stop

@section('post-js')
  <script>
      $('#OpenRawImgUpload').click(function(){ $('#raw_excel_file').trigger('click'); });
      $('#OpenImgUpload').click(function(){ $('#excel_file').trigger('click'); });
  </script>
@stop