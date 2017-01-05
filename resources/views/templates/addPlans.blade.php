@extends('layouts.default')


@section('main-content')

        <?php
        $catalogs = \App\ProductCatalog::all();
        $levels = [
                'Basement','Ground Floor','1st Floor','2nd Floor','3rd Floor','4th Floor','5th Floor'
        ];
        ?>


    @if($empty_form)
        @foreach($templatesPlans as $templatesPlan)
            @php
                $model = "modal_".$templatesPlan->id;
            @endphp

            <div class="modal fade" id="{!! $model !!}" role="dialog" aria-labelledby="modalLabel" tabindex="-1">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="modalLabel">Cropper</h4>
                        </div>
                        <div class="modal-body">
                            <div class="img-container">
                                <img id="image_{!! $templatesPlan->id !!}" src="{!! asset($templatesPlan->img) !!}" alt="Picture">
                            </div>
                            <button onclick="rotate_left_{!! $templatesPlan->id !!}()">Rotate Clockwise</button>
                            <button onclick="rotate_right_{!! $templatesPlan->id !!}()">Rotate Anti-clockwisw</button>
                        </div>
                        <div class="modal-footer">
                            {!! Form::open(['url' => 'templates/create/add-plans/'.$templatesPlan->id.'/crop', 'method' => 'post']) !!}
                            <input type="hidden" name="width" id="width_{!! $templatesPlan->id !!}" value="">
                            <input type="hidden" name="height" id="height_{!! $templatesPlan->id !!}" value="">
                            <input type="hidden" name="x" id="x_{!! $templatesPlan->id !!}" value="">
                            <input type="hidden" name="y" id="y_{!! $templatesPlan->id !!}" value="">
                            <input type="hidden" name="rotate" id="rotate_{!! $templatesPlan->id !!}" value="">
                            {!! Form::submit('Save & Exit') !!}
                            {!! Form::close() !!}
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    @endif





    <div class="content_area clearfix">
    <div class="col-xs -12 col-sm-12 col-md-9 col-lg-12 content_left">

        <div class="form_container clearfix">
            {!! Form::open(['url' => 'templates/create/plans', 'class' => 'col-xs-12 col-sm-12 col-md-2 col-lg-2 file_uploader dropzone', 'files'=>true, 'id'=>'real-dropzone']) !!}

                <div class="form-group">
                    <label class="col-xs-12 col-lg-12 control-label">Upload Plan File Drop it Here</label>
                    <label for="profile_pic" class="col-xs-12 col-lg-12 control-label browse_file">Browse</label>
                    <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">
                    <input type="hidden" name="template_id" id="template_id" value="{!! session('template')->id !!}">

            </div>{!! Form::close() !!}

            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 model_search_results new_template_uploader consultant_results_bg clearfix">
                <ul>

                    @if($empty_form)
                        @foreach($templatesPlans as $templatesPlan)
                    <li>
                        <div class="consultant_wrapper clearfix">
                            <div class="col-md-4 img_consultant">
                            <a href="{!! url('templates/create/add-plans/'.$templatesPlan->id.'/canvas') !!}">
                                <p>@if($templatesPlan->design){!! $templatesPlan->design !!}@else{!! \App\Template::find($templatesPlan->template_id)->name !!}@endif {!! '_'.$levels[($templatesPlan->level-1)].'_'.$catalogs[($templatesPlan->catalog_id-1)]->name !!}</p>
                                <img src="{!! asset($templatesPlan->img) !!}" class="col-md-8"/>
                            </a>

                                @php
                                    $model = "#modal_".$templatesPlan->id;
                                @endphp
                                <br/>
                                <div class="row clearfix">
                                <a data-target="{!! $model !!}" data-toggle="modal" class="col-md-12">Crop / Rotate Plan</a>
                                </div>
                            </div>

                            <div class="col-md-8 desc_plan">

                                {!! Form::open(['url' => 'templates/create/plan-data','method'=>'POST']) !!}

                                {{Form::hidden('id',$templatesPlan->id)}}
                                <h5>Save Template Plan</h5>
                                <p>{!! $templatesPlan->client_file_name !!} : (Not Available Yet)kbs </p>

                                <div class="col-md-12 margin_top_20">
                                    <div class="form-group">
                                        <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Design</label>
                                        <div class="col-md-12 col-lg-10">
                                            @if($templatesPlan->design != '')
                                                <input class="form-control required" id="design"
                                                       name="design" aria-required="true" type="text" placeholder="" value="{!! $templatesPlan->design !!}">
                                            @else
                                                <input class="form-control required" id="design"
                                                       name="design" aria-required="true" type="text" placeholder="" value="">
                                            @endif
                                        </div>

                                        <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Level </label>
                                        <div class="col-md-12 col-lg-10">
                                            <?php  $i = 0;$j = 0; ?>
                                            <select class="form-control required"
                                                    id="prod-frm-sub-cat" name="level" aria-required="true"
                                                    aria-invalid="true">
                                                @foreach($levels as $level)
                                                    <?php ++$i; ?>

                                                    @if($templatesPlan->level == $i)
                                                        <option value="{!! $i !!}" selected="selected">{!! $level !!}</option>
                                                    @else
                                                        <option value="{!! $i !!}">{!! $level !!}</option>
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>

                                        <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Catalogue  </label>
                                        <div class="col-md-12 col-lg-10">
                                            <select class="form-control required"
                                                    id="catalog_id" name="catalog_id" aria-required="true"
                                                    aria-invalid="true">
                                                @foreach($catalogs as $catalog)
                                                    <?php ++$j; ?>

                                                    @if($templatesPlan->catalog_id == $j)
                                                        <option value="{!! $catalog->id !!}" selected="selected">{!! $catalog->name !!}</option>
                                                    @else
                                                        <option value="{!! $catalog->id !!}">{!! $catalog->name !!}</option>
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <input name="Save" type="submit" class="btn_save" id="Save" value="Save">
                                        <input name="Reset" type="reset" class="btn_reset" id="Reset" value="Delete">
                                    </div>
                                </div>
                                {!! Form::close() !!}
                            </div>
                        </div>
                    </li>
                        @endforeach
                    @else
                        @foreach($templatesPlans as $templatesPlan)

                            <li>
                                <div class="consultant_wrapper clearfix">
                                    <div class="col-md-4 img_consultant">
                                        <p>@if($templatesPlan->design){!! $templatesPlan->design !!}@else{!! \App\Template::find($templatesPlan->template_id)->name !!}@endif {!! '_'.$levels[($templatesPlan->level-1)].'_'.$catalogs[($templatesPlan->catalog_id-1)]->name !!}</p>
                                        <img src="{!! asset($templatesPlan->img_300x200) !!}" class="col-md-8"/>
                                    <div class="col-md-8 desc_plan">
                                        {!! Form::open(['url' => 'templates/create/plan-data','method'=>'POST']) !!}

                                        {{Form::hidden('id',$templatesPlan->id)}}
                                        <h5>Save Template Plan</h5>
                                        <p>TheUploadedFile name.pdf : file size.kbs </p>

                                        <div class="col-md-12 margin_top_20">
                                            <div class="form-group">
                                                <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Design</label>
                                                <div class="col-md-12 col-lg-10">
                                                    <input class="form-control required" id="design"
                                                           name="design" aria-required="true" type="text" placeholder="" value="{!! $templatesPlan->design !!}">
                                                </div>

                                                <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Level </label>
                                                <div class="col-md-12 col-lg-10">
                                                    <input class="form-control required" id="level"
                                                           name="level" aria-required="true" type="text"
                                                           placeholder="" value="{!! $templatesPlan->level !!}">
                                                </div>

                                                <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Catalogue  </label>
                                                <div class="col-md-12 col-lg-10">
                                                    <input class="form-control required" id="catalog_id"
                                                           name="catalog_id" aria-required="true" type="text"
                                                           placeholder="" value="{!! $templatesPlan->catalog_id !!}">
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <input name="Save" type="submit" class="btn_save" id="Save" value="Save">
                                                <input name="Reset" type="reset" class="btn_reset" id="Reset" value="Delete">
                                            </div>
                                        </div>
                                        {!! Form::close() !!}
                                    </div>
                                </div>
                                </div>
                            </li>
                        @endforeach
                    @endif

                    <li>

                </ul>
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
                                           src="{{ URL::asset('resources/images/FloorPlans.png') }}"></span><span
                class="breadcrumb-text">Templates</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn cursor-normal" type="submit" id="2-bc"><span
                class="breadcrumb-text">New</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! session('template')->name !!}</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
@stop

@section('post-js')
    {{ Html::script('js/dropzone.js') }}
    {{ Html::script('js/cropper.js') }}
    {{ Html::script('js/spin.min.js') }}
    <script>

        var opts = {
            lines: 11 // The number of lines to draw
            , length: 18 // The length of each line
            , width: 14 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 44 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '44%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        }

        Dropzone.autoDiscover = false;
        /* var myDropzone = new Dropzone("#filexx",{ url: "{!! url('templates/create/plans') !!}"});*/

        var myDropzone = new Dropzone("#real-dropzone", {
            maxFiles: 1,
            uploadMultiple: false,
            sending: function (file, xhr, formData) {
                formData.append('_token', $('#token').val()),
                        formData.append('template_id', $('#template_id').val())
            },
            url: "{!! url('templates/create/plan-image') !!}",
            acceptedFiles: '.jpg, .jpeg, .png, .svg, .pdf'
        });

        myDropzone.on("success", function (file, resp) {
            window.location.href = '{!! url('templates/create/add-plans') !!}';
//console.log('test');
        });
        myDropzone.on("addedfile", function(file) {
            var target = document.getElementById('real-dropzone')
            var spinner = new Spinner(opts).spin(target);
        });


    </script>


    <script>
                @if($empty_form)
                @foreach($templatesPlans as $templatesPlan)

        var cropBoxData_{!! $templatesPlan->id !!};
        var canvasData_{!! $templatesPlan->id !!};
        var cropper_{!! $templatesPlan->id !!};


        function rotate_left_{!! $templatesPlan->id !!}() {
            cropper_{!! $templatesPlan->id !!}.rotate(45);
        }
        function rotate_right_{!! $templatesPlan->id !!}() {
            cropper_{!! $templatesPlan->id !!}.rotate(-45);
        }

        @endforeach
        @endif
    window.addEventListener('DOMContentLoaded', function () {

                    @if($empty_form)
                    @foreach($templatesPlans as $templatesPlan)
                    @php
                        $model = "modal_".$templatesPlan->id;
                    @endphp

            var image_{!! $templatesPlan->id !!} = document.getElementById('image_{!! $templatesPlan->id !!}');
            $('#modal_{!! $templatesPlan->id !!}').on('shown.bs.modal', function () {
                cropper_{!! $templatesPlan->id !!} = new Cropper(image_{!! $templatesPlan->id !!}, {
                    autoCropArea: 0.5,
                    ready: function () {

                        // Strict mode: set crop box data first
                        cropper_{!! $templatesPlan->id !!}.setCropBoxData(cropBoxData_{!! $templatesPlan->id !!}).setCanvasData(canvasData_{!! $templatesPlan->id !!});
                    },
                    crop: function(e) {

                        $('#x_{!! $templatesPlan->id !!}').val(e.detail.x);
                        $('#y_{!! $templatesPlan->id !!}').val(e.detail.y);
                        $('#width_{!! $templatesPlan->id !!}').val(e.detail.width);
                        $('#height_{!! $templatesPlan->id !!}').val(e.detail.height);
                        $('#rotate_{!! $templatesPlan->id !!}').val(e.detail.rotate);

                    }
                });
            }).on('hidden.bs.modal', function () {
                cropBoxData_{!! $templatesPlan->id !!} = cropper_{!! $templatesPlan->id !!}.getCropBoxData();
                canvasData_{!! $templatesPlan->id !!} = cropper_{!! $templatesPlan->id !!}.getCanvasData();
                cropper_{!! $templatesPlan->id !!}.destroy();
            });


            @endforeach
            @endif

        });
    </script>


@stop
@section('post-css')

    {{ Html::style('css/cropper.css') }}
    <style>
        .dz-success-mark{
            display: none !important;
        }
        .dz-error-mark{
            display: none !important;
        }
    </style>
@stop