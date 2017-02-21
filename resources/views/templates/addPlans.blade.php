@extends('layouts.default')


@section('main-content')

        @foreach($templateFloorCatalogDesigns as $templateFloorCatalogDesign)
            @php
                $model = "modal_".$templateFloorCatalogDesign->template_floor_catalog_design_id;
            @endphp

            <div class="modal fade" id="{!! $model !!}" role="dialog" aria-labelledby="modalLabel" tabindex="-1">
                <div class="modal-dialog col-xs-10 col-sm-10 col-md-10 col-lg-10" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="modalLabel">Cropper</h4>
                        </div>
                        <div class="modal-body">
                            <div class="img-container col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <img id="image_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}" src="{!! asset($templateFloorCatalogDesign->image_path) !!}" alt="Picture" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            </div>
                            <div style="padding-top: 15px">
                                {!! Form::open(['url' => 'templates/create/'.$template->id.'/add-plans/'.$templateFloorCatalogDesign->template_floor_catalog_design_id.'/crop', 'method' => 'post']) !!}
                                <input type="hidden" name="width" id="width_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}" value="">
                                <input type="hidden" name="height" id="height_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}" value="">
                                <input type="hidden" name="x" id="x_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}" value="">
                                <input type="hidden" name="y" id="y_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}" value="">
                                <input type="hidden" name="rotate" id="rotate_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}" value="">
                                {!! Form::submit('Save & Exit',['class'=>'btn_save']) !!}
                                {!! Form::close() !!}
                                <button class="btn_save" onclick="rotate_left_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}()">Rotate Clockwise</button>
                                <button class="btn_save" onclick="rotate_right_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}()">Rotate Anti-clockwisw</button>

                                <button type="button" class="btn_save" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                        <div class="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
        @endforeach







    <div class="content_area clearfix">
        <div class="col-xs-12 col-sm-12 col-md-9 col-lg-12 content_left">

            <div class="form_container clearfix">
                {!! Form::open(['url' => 'templates/create/plans', 'class' => 'col-xs-12 col-sm-12 col-md-3 col-lg-3 file_uploader dropzone', 'files'=>true, 'id'=>'real-dropzone', 'style'=>'word-wrap: break-word;height:275px']) !!}

                <div id="dropzonePreview" class="dz-default dz-message">
                    <div class="form-group">
                        <label class="col-xs-12 col-lg-12 control-label">Upload Plan File Drop it Here</label>
                        <label for="profile_pic" class="col-xs-12 col-lg-12 control-label browse_file">Browse</label>
                        <input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">
                        <input type="hidden" name="template_id" id="template_id" value="{!! $template->id !!}">

                    </div>
                </div>


                {!! Form::close() !!}

                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 model_search_results new_template_uploader consultant_results_bg clearfix">

                    @if ($errors->has('exists')) <span style="color: red">Floor & Catalog Already Exists. Please Select Another Combination</span> @endif
                    @if ($errors->has('empty_exists')) <span style="color: red">Floor & Catalog Already Exists. Please Select Another Combination</span> @endif
                    <ul>

                            @foreach($templateFloorCatalogDesigns as $templateFloorCatalogDesign)
                                @php
                                    $templateFloor = \App\TemplateFloor::find($templateFloorCatalogDesign->template_floor_id);
                                @endphp
                                <li>
                                    <div class="consultant_wrapper clearfix">
                                        <div class="col-md-4 img_consultant">
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 clearfix">
                                                <a href="{!! url('templates/create/'.$template->id.'/add-plans/'.$templateFloorCatalogDesign->template_floor_catalog_design_id.'/canvas') !!}">
                                                    <p>@if($templateFloorCatalogDesign->template_floor_catalog_design){!! $templateFloorCatalogDesign->template_floor_catalog_design !!}@else{!! $templateFloorCatalogDesign->template_name !!}@endif {!! $templateFloorCatalogDesign->floor_name !!}</p>
                                                    <img src="{!! asset($templateFloorCatalogDesign->image_path) !!}" class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="height: 165px"/>
                                                </a>
                                            </div>
                                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 clearfix">
                                                @php
                                                    $model = "#modal_".$templateFloorCatalogDesign->template_floor_catalog_design_id;
                                                @endphp
                                                <br/>


                                                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 "></div>


                                                <table>
                                                    <tr>
                                                        <td class="col-md-8"> <a data-target="{!! $model !!}" data-toggle="modal" class="btn_save col-md-12" style="color:white">Crop / Rotate</a>
                                                        </td>
                                                        <td width="15"></td>
                                                        <td class="col-md-4"> <a href="{!! url('templates/create/'.$template->id.'/add-plans/'.$templateFloorCatalogDesign->template_floor_catalog_design_id.'/canvas') !!}" class="btn_save col-md-12" id="Reset" style="color: white">Edit</a>

                                                        </td>
                                                    </tr>
                                                </table>

                                            </div>



                                        </div>

                                        <div class="col-md-8 desc_plan">

                                            {!! Form::open(['url' => 'templates/create/'.$template->id.'/plan-data','method'=>'POST']) !!}

                                            {{Form::hidden('id',$templateFloorCatalogDesign->template_floor_catalog_design_id)}}
                                            <h5>House Design Template</h5>
                                            <p>{!! $templateFloorCatalogDesign->image_name !!} : (Not Available Yet)kbs </p>

                                            <div class="col-md-12 margin_top_20">
                                                <div class="form-group">
                                                    <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Design</label>
                                                    <div class="col-md-12 col-lg-10">
                                                        @if($templateFloorCatalogDesign->template_floor_catalog_design != '')
                                                            <input class="form-control required" id="design"
                                                                   name="design" aria-required="true" type="text" placeholder="" value="{!! $templateFloorCatalogDesign->template_floor_catalog_design !!}">
                                                        @else
                                                            <input class="form-control required" id="design"
                                                                   name="design" aria-required="true" type="text" placeholder="" value="">
                                                        @endif
                                                    </div>
                                                    @php

                                                     @endphp

                                                    <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Level </label>
                                                    <div class="col-md-12 col-lg-10">
                                                        <?php  $i = 0;$j = 0; ?>
                                                        {!! Form::select('level',$templateFloors,$templateFloor->floor_id,['class' => 'form-control']) !!}

                                                    </div>

                                                    <label for="first_name1" class="col-xs-12 col-lg-2 control-label">Catalog</label>
                                                    <div class="col-md-12 col-lg-10">
                                                        {!! Form::select('catalog_id',$templateCatalogs,$templateFloorCatalogDesign->catalog_id,['class' => 'form-control']) !!}

                                                    </div>
                                                </div>

                                                <div class="col-md-12">
                                                    <input name="Save" type="submit" class="btn_save" id="Save" value="Save">
                                                    <a href="{!! url('templates/create/'.$template->id.'/add-plans/'.$templateFloorCatalogDesign->template_floor_catalog_design_id.'/delete') !!}" class="btn_reset" id="Reset" style="color: white">Delete</a>
                                                </div>
                                            </div>
                                            {!! Form::close() !!}
                                        </div>
                                    </div>
                                </li>
                            @endforeach

                        <li>


                    </ul>
                </div>
                <section class="row box-footer" id="form-footer">
                    <a id="prod-frm-reset" href="{!! url('/') !!}" class="btn_save" style="color: white">Done</a>
                </section>
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
                                           src="{{ URL::asset('resources/images/Black/plan.png') }}"></span><span
                class="breadcrumb-text">Templates</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn " id="1-ic"></i>

    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn cursor-normal" type="submit" id="2-bc"><span
                class="breadcrumb-text">New</span></button>
    <i class="fa fa-chevron-right breadcrumb-icn font-blue" id="3-ic"></i>
    <button data-ref="sub-menu-items" data-index="2" class="breadcrumb-btn font-blue" type="submit" id="2-bc"><span
                class="breadcrumb-text">{!! $template->name !!}</span></button>
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
            url: "{!! url('templates/create/'.$template->id.'/plan-image') !!}",
            acceptedFiles: '.jpg, .jpeg, .png, .svg, .pdf'
        });

        myDropzone.on("success", function (file, resp) {
           /* if(resp == 0){
                setTimeout(function(){
                new PNotify({
                        title: 'Error',
                        title_escape: false,
                        text: 'Please Select Floor and Catalog for existing Design Plans',
                        text_escape: false,
                        styling: "bootstrap3",
                        type: "error",
                        icon: true,
                        addclass: "stack-bottomright",
                        delay:1500
                });
                    window.location.href = '{!! url('templates/create/'.$template->id.'/add-plans') !!}';
                }, 2000);


            }else{

            }*/
            window.location.href = '{!! url('templates/create/'.$template->id.'/add-plans') !!}';
           //

//console.log('test');
        });
        myDropzone.on("addedfile", function(file) {
            var target = document.getElementById('real-dropzone')
            var spinner = new Spinner(opts).spin(target);
        });


    </script>


    <script>

                @foreach($templateFloorCatalogDesigns as $templateFloorCatalogDesign)

        var cropBoxData_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!};
        var canvasData_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!};
        var cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!};


        function rotate_left_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}() {
            cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}.rotate(45);
        }
        function rotate_right_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}() {
            cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}.rotate(-45);
        }

        @endforeach

    window.addEventListener('DOMContentLoaded', function () {


                    @foreach($templateFloorCatalogDesigns as $templateFloorCatalogDesign)
                    @php
                        $model = "modal_".$templateFloorCatalogDesign->template_floor_catalog_design_id;
                    @endphp

            var image_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!} = document.getElementById('image_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}');
            $('#modal_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}').on('shown.bs.modal', function () {
                cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!} = new Cropper(image_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}, {
                    autoCropArea: 0.5,
                    ready: function () {

                        // Strict mode: set crop box data first
                        cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}.setCropBoxData(cropBoxData_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}).setCanvasData(canvasData_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!});
                    },
                    crop: function(e) {

                        $('#x_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}').val(e.detail.x);
                        $('#y_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}').val(e.detail.y);
                        $('#width_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}').val(e.detail.width);
                        $('#height_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}').val(e.detail.height);
                        $('#rotate_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}').val(e.detail.rotate);

                    }
                });
            }).on('hidden.bs.modal', function () {
                cropBoxData_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!} = cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}.getCropBoxData();
                canvasData_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!} = cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}.getCanvasData();
                cropper_{!! $templateFloorCatalogDesign->template_floor_catalog_design_id !!}.destroy();
            });


            @endforeach

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


        @media screen and (min-width: 768px){
            .modal-dialog {
                left: 10%;
                width: 80%;
            }
        }
        .modal-dialog {

        }
    </style>
@stop