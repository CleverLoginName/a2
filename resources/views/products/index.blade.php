@extends('layouts.default')

@section('main-content')
    <div class="row" id="prod-list-view">
        <div class="box">
            <div class="box-header"></div>
            <div class="box-body table-responsive">

                <table id="product_table"
                       class="table table-bordered table-striped table-view no-cursor  dataTable no-footer"
                       role="grid" aria-describedby="product-table-view_info">
                    <thead>
                    <tr role="row">
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Code: activate to sort column ascending"> Name
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Description
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Type
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Category
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Sub-Category
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Builder's Price
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="product-table-view" rowspan="1" colspan="1"
                            aria-label="Product Name: activate to sort column ascending">Image
                        </th>
                        <th width="130px">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>

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
                                           src="{{ URL::asset('resources/images/products_ico_black.png') }}"></span><span
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
           /* $(".product-link-hover").mouseover(function(){ console.log('f');
                var id = $(this).attr("id");
                var image_id = '#image_'+id;
                $(image_id).attr("src",$(this).attr("src"));
                $(image_id).css("display","block");
            });*/


            var table =$('#product_table').DataTable({
                ajax:'/products/all',/*
                "aoColumns": [
                { "mDataProp": "name" },
                { "mDataProp": "description" },
                { "mDataProp": "type" },
                { "mDataProp": "category" },
                { "mDataProp": "sub_category" },
                { "mDataProp": "builder_price" },
                { "mDataProp": "image" },
            ],*/ "columns": [
                { "data": "name" },
                { "data": "description" },
                { "data": "type" },
                { "data": "category" },
                { "data": "sub_category" },
                { "data": "builder_price" }
            ],
                "columnDefs": [ {
                    "targets": 6,
                     visible: true,
                    "data": function ( row, type, val, meta ) {

                        //return '<a href="">Demonstration<span><img class="tooltip" src="http://www.scriptol.com/images/apache.png"> <h3>How use my site</h3>The description with an image. </span></a>';

                        return '<img src="'+row.image+'" alt="'+row.name+'" class="col-md-12" style="display: none" id ="image_'+row.id+'"/><a href="#" class="product-link-hover" id ="'+row.id+'">View Image</a>';
                        return '<img src="'+row.image+'" alt="'+row.name+'" class="col-md-12 product-link-hover"/>';
                    }
                },{
                    "targets": 7,
                     visible: true,
                    "data": function ( row, type, val, meta ) {
                        return '<a class="action-btn btn-app" href="'+row.more_url+'" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Product"><i class="fa fa-folder-open-o green-font"></i></a>' +
                                '<a class="action-btn btn-app" data-product-id="'+row.id+'" id="2-edit-action" href="'+row.edit_url+'" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Product"><i class="fa fa-edit green-font"></i></a>'+
                                '<form method="GET" action="'+row.delete_url+'" accept-charset="UTF-8" style="display:inline">' +
                                '<a class="action-btn btn-app" data-product-id="'+row.id+'" data-placement="top" title="" data-toggle="modal" data-target="#confirmDelete" data-title="Delete Product" data-message="Are you sure you want to delete this Product ?" data-original-title="Remove User"><i class="fa fa-times red-font"></i></a>' +
                                '</form>';
                    }
                } ],
                pageLength:50
            });
            var table = $('#product_table').DataTable();
            $('#product_table tbody')
                    .on( 'mouseenter', 'td', function () {
                        if(table.cell(this).index().column == 6){

                        }
/*
                        var colIdx = table.cell(this).index().column;

                        $( table.cells().nodes() ).removeClass( 'highlight' );
                        $( table.column( colIdx ).nodes() ).addClass( 'highlight' );*/
                    } );

        });



    </script>

    @include('includes.confirmDelete')
@stop

@section('post-css')
    <style>
    .tooltip
    {
    text-decoration:none;
    position:relative;
    }


    .tooltip span
    {
    display:none;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    border-radius:6px;
    color:black;
    background:white;
    }


    .tooltip span img
    {
    float:left;
    margin:0px 8px 8px 0;
    }


    .tooltip:hover span
    {
    display:block;
    position:absolute;
    top:0;
    left:0;
    z-index:1000;
    width:auto;
    max-width:320px;
    min-height:128px;
    border:1px solid black;
    margin-top:12px;
    margin-left:32px;
    overflow:hidden;
    padding:8px;
    }
    </style>
    @stop