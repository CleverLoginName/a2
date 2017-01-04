@extends('layouts.default')


@section('main-content')
    <section id="vue">
        <div class="content_area clearfix">

            <!-- -------- Left Content Area Starts ---------- -->
            <div class="col-xs -12 col-sm- 12 col-md-12 col-lg-12 content_left">

                <div class="form_container">
                    <form  files="true" class="form-horizontal" role="form" method="post" id="new-prod-form"
                           enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/products/packs') !!}">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label for="budget" class="col-xs-12 col-lg-2 control-label">Catalog</label>
                            <div class="col-xs-10 col-sm-11 col-md-11 col-lg-7 padding_R">
                                <select class="form-control required"
                                        id="prod-frm-sub-cat" name="catalog_id" id="catalog_id" aria-required="true" v-model="catalog" @change="catalogChange()"
                                aria-invalid="true">
                                @if(session('catalog_id') === null)<option selected disabled>Please select a Catalog</option>@endif

                                <option v-for="catalog in catalog_options" value="@{{ catalog.id }}">
                                    @{{ catalog.name }}
                                </option>
                                </select>
                                @if ($errors->has('catalog_id'))<span class="error_message">Please select a Catalog</span>@endif
                            </div>
                            <div class="col-xs-2 col-sm-1 col-md-1 col-lg-3 add_new"><a id="addCatalog">+</a></div>
                        </div>

                        <div class="form-group">
                            <label for="budget" class="col-xs-12 col-lg-2 control-label">Category</label>
                            <div class="col-xs-10 col-sm-11 col-md-11 col-lg-7 padding_R">
                                <select class="form-control required"
                                        id="prod-frm-sub-cat" name="category_id" aria-required="true" v-model="category" :disabled="category_disabled" @change="categoryChange()"
                                aria-invalid="true">
                                @if(session('category_id') === null)<option value="" selected disabled>Please select a Category</option>@endif
                                <option v-for="category in category_options" value="@{{ category.id }}  ">
                                    @{{ category.name }}
                                </option>
                                </select>
                                @if ($errors->has('category_id'))<span class="error_message">Please select a Category</span>@endif
                            </div>
                            <div class="col-xs-2 col-sm-1 col-md-1 col-lg-3 add_new"><a id="addCategory">+</a></div>
                        </div>


                        <div class="row form-group @if ($errors->has('name')) has-error @endif">
                            <div class="col-md-2"><label>Name</label></div>
                            <div class="col-md-7">
                                {!! Form::text('name', null,['id'=>'name','class'=>"form-control"]) !!}
                                @if ($errors->has('name')) <p class="error_message">{{ $errors->first('name') }}</p> @endif
                            </div>
                            <div class="col-md-2"></div>
                        </div>


                        <div class="row form-group @if ($errors->has('description')) has-error @endif">
                            <div class="col-md-2"><label>Description</label></div>
                            <div class="col-md-7">
                                {!! Form::text('description', null,['id'=>'description','class'=>"form-control"]) !!}
                                @if ($errors->has('description')) <p class="error_message">{{ $errors->first('description') }}</p> @endif</div>
                            <div class="col-md-3"></div>
                        </div>
                        <div class="row form-group @if ($errors->has('builder_price')) has-error @endif">
                            <div class="col-md-2"><label>Builders Price EX GST ($)</label></div>
                            <div class="col-md-7">
                                {!! Form::text('builder_price', null,['id'=>'builder_price','class'=>"form-control"]) !!}

                                @if ($errors->has('builder_price')) <p class="error_message">{{ $errors->first('builder_price') }}</p> @endif
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                        <div class="row form-group @if ($errors->has('supplier_price')) has-error @endif">
                            <div class="col-md-2"><label>Supplier Price EX GST ($)</label></div>
                            <div class="col-md-7">
                                {!! Form::text('supplier_price', null,['id'=>'supplier_price','class'=>"form-control"]) !!}
                                @if ($errors->has('supplier_price')) <p class="error_message">{{ $errors->first('supplier_price') }}</p> @endif
                            </div>
                            <div class="col-md-3"></div>
                        </div>
                        <div class="row form-group @if ($errors->has('contractor_price')) has-error @endif">
                            <div class="col-md-2"><label>Contractor Price EX GST ($)</label></div>
                            <div class="col-md-7">
                                {!! Form::text('contractor_price', null,['id'=>'contractor_price','class'=>"form-control"]) !!}
                                @if ($errors->has('contractor_price')) <p class="error_message">{{ $errors->first('contractor_price') }}</p> @endif
                            </div>
                            <div class="col-md-3"></div>
                        </div>


                    <!-- -------- Buttons Start ---------- -->
                        <div class="wr_btn clearfix">
                            <input name="Save" type="submit" class="btn_save" id="Save" value="Next" >
                            <input name="Reset" type="reset" class="btn_reset" id="Reset">
                        </div>
                        <!-- -------- Buttons End ---------- -->

                    </form>
                </div>
            </div>
        </div>



        <!-- Modal -->
        <div class="modal fade common_popup new_Project_popup catalog_modal" id="catalogModal" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content clearfix">
                    <div class="modal-header">

                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Catalog:</h4>

                    </div>


                    <div class="modal-body" id="templates">
                        <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                              enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/catalogs') !!}">
                            <div class="form-group">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <section class="box new-item-wrapper">
                                        <section class="box-header"></section>
                                        <section class="box-body">

                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Name</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="catalog_name"
                                                                                 name="catalog_name" aria-required="true" type="text"></section>
                                                <section class="col-md-2"></section>
                                            </section>
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Description</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="catalog_description"
                                                                                 name="catalog_description" aria-required="true" type="text"></section>
                                                <section class="col-md-2"></section>
                                            </section>

                                        </section>
                                    </section>
                                </div>
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center btn_load">
                                <div class="form-group">
                                    <div class="col-md-12 col-lg-2  pull-right clearfix">
                                        <input name="Save" type="button" class="btn_save" @click="newCatalog()" value="Save">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade common_popup new_Project_popup category_modal" id="categoryModal" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content clearfix">
                    <div class="modal-header">

                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Category:</h4>

                    </div>


                    <div class="modal-body" id="templates">
                        <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                              enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/categories') !!}">
                            <div class="form-group">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <section class="box new-item-wrapper">
                                        <section class="box-header"></section>
                                        <section class="box-body">

                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Catalog</label></section>
                                                <section class="col-md-7">
                                                    <select class="form-control required" name="modal_catalog_id" id="modal_catalog_id" aria-required="true"
                                                            aria-invalid="true">
                                                        @if(session('catalog_id') === null)<option selected disabled>Please select a Catalog</option>@endif

                                                        <option v-for="catalog in catalog_options" value="@{{ catalog.id }}">
                                                            @{{ catalog.name }}
                                                        </option>
                                                    </select>
                                                </section>
                                                <section class="col-md-2"></section>
                                            </section>

                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Name</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="category_name"
                                                                                 name="category_name" aria-required="true" type="text"></section>
                                                <section class="col-md-2"></section>
                                            </section>
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Description</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="category_description"
                                                                                 name="category_description" aria-required="true" type="text"></section>
                                                <section class="col-md-2"></section>
                                            </section>
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Type</label></section>
                                                <section class="col-md-7"><select class="form-control required" id="category_type"
                                                                                  name="category_type">
                                                        @foreach($categoryTypes as $categoryType)
                                                            <option value="{!! $categoryType->id !!}">{!! $categoryType->name !!}</option>
                                                        @endforeach

                                                    </select></section>
                                                <section class="col-md-2"></section>
                                            </section>
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Colour</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="category_colour"
                                                                                 name="category_colour" aria-required="true" type="color"></section>
                                                <section class="col-md-2"></section>
                                            </section>


                                        </section>
                                    </section>
                                </div>
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center btn_load">
                                <div class="form-group">
                                    <div class="col-md-12 col-lg-2  pull-right clearfix">
                                        <input name="Save" type="button" class="btn_save" @click="newCategory()" value="Save">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>



        <!-- Modal -->
        <div class="modal fade common_popup new_Project_popup subCategory_modal" id="subCategoryModal" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content clearfix">
                    <div class="modal-header">

                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Sub-Category:</h4>

                    </div>


                    <div class="modal-body" id="templates">
                        <form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
                              enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/categories') !!}">
                            <div class="form-group">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <section class="box new-item-wrapper">
                                        <section class="box-header"></section>
                                        <section class="box-body">

                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Category</label></section>
                                                <section class="col-md-7">
                                                    <select class="form-control required"
                                                            id="modal_category_id" name="modal_category_id" aria-required="true" v-model="category" :disabled="category_disabled" @change="categoryChange()"
                                                    aria-invalid="true">
                                                    @if(session('category_id') === null)<option value="" selected disabled>Please select a Category</option>@endif
                                                    <option v-for="category in category_options" value="@{{ category.id }}  ">
                                                        @{{ category.name }}
                                                    </option>
                                                    </select>
                                                </section>
                                            </section>

                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Name</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="sub_category_name"
                                                                                 name="sub_category_name" aria-required="true" type="text"></section>
                                                <section class="col-md-2"></section>
                                            </section>
                                            <section class="row form-group">
                                                <section class="col-md-2"></section>
                                                <section class="col-md-2"><label>Description</label></section>
                                                <section class="col-md-7"><input class="form-control required" id="sub_category_description"
                                                                                 name="sub_category_description" aria-required="true" type="text"></section>
                                                <section class="col-md-2"></section>
                                            </section>
                                        </section>
                                    </section>
                                </div>
                            </div>


                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center btn_load">
                                <div class="form-group">
                                    <div class="col-md-12 col-lg-2  pull-right clearfix">
                                        <input name="Save" type="button" class="btn_save" @click="newSubCategory()" value="Save">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

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
                class="breadcrumb-text">Products</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn cursor-normal" type="submit" id="2-bc"><span
                class="breadcrumb-text">New</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>

        <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                    class="breadcrumb-text">Packs</span></button>
        <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>

@stop


@section('post-js')
    {{ Html::script('js/vue.js') }}
    {{ Html::script('js/vue-resource.js') }}
    {{ Html::script('js/select2.full.js') }}
    {{ Html::script('js/image-picker.js') }}
    <script>

        /* function formatSymbols (symbol) {
         if (!symbol.id) { return symbol.text; }
         var $symbol = $(
         '<span><img src="/img/symbols/' + symbol.text + '.png" class="img-flag" /> ' + symbol.text + '</span>'
         );
         return $symbol;
         };
         $('#symbol').select2({ templateResult: formatSymbols});*/
        $("#symbol").imagepicker();

        var global_data = {

            catalog_options: JSON.parse('{!! $catalogs !!}'),

            @if(session('catalog_id') == null)
            catalog: 1,
            @else
            catalog: parseInt('{!! session('catalog_id') !!}'),
            @endif
                    @if(session('category_id') == null)
            category: 1,
            category_disabled: true,
            category_options: '',
            @else
            category: parseInt('{!! session('category_id') !!}'),
            category_disabled: false,
            category_options: JSON.parse('{!! $categories !!}'),
            @endif
                    @if(session('category_id') == null)
            sub_category: 1,
            sub_category_disabled: true,
            sub_category_options:'',
            @else
            sub_category_options:JSON.parse('{!! $subCategories !!}'),
            sub_category: parseInt('{!! session('sub_category_id') !!}'),
            sub_category_disabled: false,
            @endif

            fields_disabled: false

        }


        new Vue({
            el: '#vue',
            data: global_data,
            methods:{
                catalogChange:function () {
                    this.$http.get('/categories-by-catalog?id='+global_data.catalog )
                            .then(function(data){
                                global_data.category_options= [];
                                global_data.category_options = data.body;
                                global_data.category = 0;
                                global_data.category_disabled = false;
                                global_data.sub_category_disabled = true;
                                global_data.fields_disabled= true;

                                global_data.sub_category_options= [];

                            });
                },
                categoryChange:function () {
                    this.$http.get('/subcategories-by-category?id='+global_data.category )
                            .then(function(data){
                                global_data.sub_category_options= [];
                                global_data.sub_category_options = data.body;

                                global_data.sub_category_disabled = false;

                                global_data.fields_disabled= true;

                            });
                },
                subCategoryChange:function () {
                    this.$http.get('/fields-by-subcategory?sub_category_id='+global_data.sub_category )
                            .then(function(data){
                                //global_data.sub_category_options= [];
                                //global_data.sub_category_options = data.body;

                                //global_data.sub_category_disabled = false;
                                global_data.fields_disabled= false;
                                location.reload();


                            });
                },
                newCatalog:function () {
                    var formData = new FormData();
                    formData.append('catalog_name', $("#catalog_name").val());
                    formData.append('catalog_description',  $("#catalog_description").val());

                    this.$http.post('/ajax/catalogs',formData)
                            .then(function(data) {
                                if (data.body.catalogs != null){
                                    global_data.catalog_options = data.body.catalogs;
                                    global_data.catalog = data.body.insert_id;
                                    $('.catalog_modal').modal('hide');
                                    global_data.category = 0;
                                    global_data.category_disabled = false;
                                    global_data.sub_category_disabled = true;
                                    global_data.fields_disabled = true;

                                    global_data.category_options = [];
                                    global_data.sub_category_options = [];

                                    new PNotify({
                                        title: 'Catalog Saved',
                                        title_escape: false,
                                        text: 'Catalog Saved Successfully',
                                        text_escape: false,
                                        styling: "bootstrap3",
                                        type: "success",
                                        icon: true,
                                        addclass: "stack-bottomright",
                                        delay:1500
                                    });

                                }else{
                                    if(data.body.catalog_name != null)
                                        new PNotify({
                                            title: 'Catalog Name',
                                            title_escape: false,
                                            text: data.body.catalog_name,
                                            text_escape: false,
                                            styling: "bootstrap3",
                                            type: "error",
                                            icon: true,
                                            addclass: "stack-bottomright",
                                            delay:1500
                                        });
                                    if(data.body.catalog_description != null)
                                        new PNotify({
                                            title: 'Catalog Description',
                                            title_escape: false,
                                            text: data.body.catalog_description,
                                            text_escape: false,
                                            styling: "bootstrap3",
                                            type: "error",
                                            icon: true,
                                            addclass: "stack-bottomright",
                                            delay:1500
                                        });
                                }
                            });
                },
                newCategory:function () {

                    var formData = new FormData();
                    formData.append('modal_catalog_id', $("#modal_catalog_id").val());
                    formData.append('category_name', $("#category_name").val());
                    formData.append('category_description',  $("#category_description").val());
                    formData.append('category_type',  $("#category_type").val());
                    formData.append('category_colour',  $("#category_colour").val());

                    this.$http.post('/ajax/categories',formData)
                            .then(function(data) {
                                if (data.body.categories != null){
                                    global_data.category_options = data.body.categories;
                                    global_data.category = data.body.insert_id;
                                    $('.category_modal').modal('hide');
                                    global_data.sub_category_disabled = false;
                                    global_data.category_disabled = false;
                                    global_data.fields_disabled = true;

                                    global_data.sub_category_options = [];

                                    new PNotify({
                                        title: 'Category Saved',
                                        title_escape: false,
                                        text: 'Category Saved Successfully',
                                        text_escape: false,
                                        styling: "bootstrap3",
                                        type: "success",
                                        icon: true,
                                        addclass: "stack-bottomright",
                                        delay:1500
                                    });

                                }else{
                                    if(data.body.category_name != null)
                                        new PNotify({
                                            title: 'Category Name',
                                            title_escape: false,
                                            text: data.body.category_name,
                                            text_escape: false,
                                            styling: "bootstrap3",
                                            type: "error",
                                            icon: true,
                                            addclass: "stack-bottomright",
                                            delay:1500
                                        });
                                    if(data.body.category_description != null)
                                        new PNotify({
                                            title: 'Category Description',
                                            title_escape: false,
                                            text: data.body.category_description,
                                            text_escape: false,
                                            styling: "bootstrap3",
                                            type: "error",
                                            icon: true,
                                            addclass: "stack-bottomright",
                                            delay:1500
                                        });
                                }
                            });
                },
                newSubCategory:function () {

                    var formData = new FormData();
                    formData.append('modal_category_id', $("#modal_category_id").val());
                    formData.append('sub_category_name', $("#sub_category_name").val());
                    formData.append('sub_category_description',  $("#sub_category_description").val());

                    this.$http.post('/ajax/sub-categories',formData)
                            .then(function(data) {
                                if (data.body.sub_categories != null){
                                    global_data.sub_category_options = data.body.sub_categories;
                                    global_data.sub_category = data.body.insert_id;
                                    $('.subCategory_modal').modal('hide');
                                    global_data.fields_disabled = false;


                                    new PNotify({
                                        title: 'Sub-Category Saved',
                                        title_escape: false,
                                        text: 'Sub-Category Saved Successfully',
                                        text_escape: false,
                                        styling: "bootstrap3",
                                        type: "success",
                                        icon: true,
                                        addclass: "stack-bottomright",
                                        delay:1500
                                    });

                                }else{
                                    if(data.body.sub_category_name != null)
                                        new PNotify({
                                            title: 'Sub-Category Name',
                                            title_escape: false,
                                            text: data.body.sub_category_name,
                                            text_escape: false,
                                            styling: "bootstrap3",
                                            type: "error",
                                            icon: true,
                                            addclass: "stack-bottomright",
                                            delay:1500
                                        });
                                    if(data.body.sub_category_description != null)
                                        new PNotify({
                                            title: 'Category Description',
                                            title_escape: false,
                                            text: data.body.sub_category_description,
                                            text_escape: false,
                                            styling: "bootstrap3",
                                            type: "error",
                                            icon: true,
                                            addclass: "stack-bottomright",
                                            delay:1500
                                        });
                                }
                            });
                }
            }
        })

        $('#addCatalog').on('click', function () {
            $('.catalog_modal').modal('show');
        });
        $('#addCategory').on('click', function () {
            $('.category_modal').modal('show');
        });
        $('#addsubCategory').on('click', function () {
            $('.subCategory_modal').modal('show');
        });

    </script>




@stop

