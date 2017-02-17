<!DOCTYPE html>
<html>
<head>

    {{ Html::style('canvas/css/draw-tool.css') }}
    {{ Html::style('canvas/css/tool-bar.css') }}
    {{ Html::style('canvas/css/left-menu.css') }}
    {{ Html::style('canvas/css/right-click-menu.css') }}
    {{ Html::style('canvas/css/address-bar.css') }}
    {{ Html::style('canvas/css/popup-window.css') }}
    {{ Html::style('canvas/lib/jquery-ui.min.css') }}
    {{ Html::style('canvas/bootstrap/dist/css/bootstrap.min.css') }}
    {{ Html::style('canvas/bootstrap/css/bootstrap.min.css') }}
    {{ Html::style('canvas/dist/css/lobipanel.min.css') }}
    {{ Html::style('canvas/lib/font-awesome/css/font-awesome.min.css') }}
    {{ Html::style('canvas/lib/highlight/github.css') }}
    {{ Html::style('canvas/demo/documentation.css') }}
    {{ Html::style('canvas/demo/demo.css') }}
    {{ Html::style('canvas/css/rating-stars.css') }}
    {{ Html::style('canvas/css/custom-css.css') }}


	{{ Html::style('canvas/css/product-popup.css') }}
	{{ Html::style('canvas/css/animate.css') }}
	{{ Html::style('pnotify.custom.min.css') }}
	{{ Html::style('canvas/css/bom-print.css') }}
	<style>
		@media print {
			body * {
				visibility: hidden;
			}
			#container, #containert * {
				visibility: visible;
			}
			#container {
				position: absolute;
				left: 0;
				top: 0;
			}
		}</style>




</head>
<body>
<!--Tool bar started-->

<div id="parent" class="row">
    <div id="sidebar" class="col-xs-12 col-sm-12 col-md-4 col-lg-2" style="background-color: #E7E7E7">
	<div style=" background-color:#E7E7E7; ">
		<div class="panel panel-default  body-main inside-body-pan" style="background-color: #51748c;"id="main-pnnel-drag" >
             <div class="panel-heading back-ground-colour-inner">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel-title back-ground-colour-inner line-hight " style="padding-right: 10px; padding-left:0px;">
						<div class="row left-align"  style="margin-top: 40px;margin-bottom: 3px">
							<div class="col-xs-2 col-sm-2 col-md-2 col-lg-1 panel_top_width"   >
								<img class="pro-logo" src="{!! asset('img/logooo.png') !!}" align="center">
							</div>
							<div class="col-xs-7 col-sm-10 col-md-7 col-lg-7 title titel-text-size content_right_head span-new"  id="plan-name" data-toggle="tooltip" data-placement="left" title="Fist Floor:Electrical" style="margin-top: 5px; padding-left:10px;">Fist Floor:Electrical</div>
							<div class="col-xs-3 col-sm-1 col-md-3 col-lg-3  title pull-right text-center titel-text-size" id="scale1" align="right" style="margin-top: 5px">1:100</div>
						</div>
						<div class="row" style=" margin-bottom:2px; " >
							<div class="col-xs-6 col-sm-11 col-md-9 col-lg-9  text-in-side-menue title" >Energy Rated :</div>
							<div class="col-xs-6 col-sm-1 col-md-3 col-lg-3 " id="energy-reted" >
								<form class="acidjs-rating-stars">
									<input type="radio" name="group-1" id="group-1-0" value="5" /><label for="group-1-0"></label>
									<input type="radio" name="group-1" id="group-1-1" value="4" /><label for="group-1-1"></label>
									<input type="radio" name="group-1" id="group-1-2" value="3" /><label for="group-1-2"></label>
									<input type="radio" name="group-1" id="group-1-3" value="2" /><label for="group-1-3"></label>
									<input type="radio" name="group-1" id="group-1-4"  value="1" /><label for="group-1-4"></label>
									<input type="radio" name="group-1" id="group-1-5"  value="1" /><label for="group-1-4"></label>
								</form>
							</div>
						</div>
						<div class="row" style=" margin-bottom:2px; margin-top:2px;"  >
							<div class="col-xs-6 col-sm-11 col-md-9 col-lg-9 text-in-side-menue title">Max Energy :</div>
							<div class="col-xs-6 col-sm-1 col-md-3 col-lg-3 text-sub-cat" id="max-energy">0 watts</div>
						</div>
						<div class="row" style=" margin-bottom:2px; margin-top:2px;" >
							<div class="col-xs-6 col-sm-11 col-md-9 col-lg-9 col-xs-6 text-in-side-menue title" >Design Energy :</div>
							<div class="col-xs-6 col-sm-1 col-md-3 col-lg-3 text-sub-cat" id="design-energy">0 watts</div>
						</div>
						<div class="row" style=" margin-bottom:2px; margin-top:2px; margin-bottom:20px;" >
							<div class="col-xs-6 col-sm-11 col-md-9 col-lg-9 col-xs-6 text-in-side-menue title">Variation cost :</div>
							<div class="col-xs-6 col-sm-1 col-md-3 col-lg-3 text-sub-cat" id="variation-cost">0 $</div>
						</div>
					</div>
			</div>
            
            
            
            
            
            
            
                
                
                
                
			<div class="panel-body back-ground-colour-inner main-body-tag inside-body-pan selected-panel-body-pan" id="main-pannel-body" style="overflow: auto" >
				<div class="panel panel-default inner-class cat-1 hide-catelog" id="main-0">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="0" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-0">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-2 hide-catelog" id="main-1">
					<div class="panel-heading">
						<div class="panel-title ading-left-padding title titel-text-size">
							<div id="1" class="catelog-name">
								
							</div>
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;">
							<ul class="level-2" style=""  id="catlog-1">
								
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-3 hide-catelog" id="main-2">
					<div class="panel-heading">
						<div class="panel-title ading-left-padding title titel-text-size">
							<div id="2" class="catelog-name">
								
							</div>
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;">
							<ul class="level-2" style=""  id="catlog-2">
							</ul>
						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-4 hide-catelog" id="main-3">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="3" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-3">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-5 hide-catelog" id="main-4">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="4" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-4">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-6 hide-catelog" id="main-5">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="5" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-5">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-7 hide-catelog" id="main-6">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="6" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-6">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-8 hide-catelog" id="main-7">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="7" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-7">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-9 hide-catelog" id="main-8">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="8" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-8">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-10 hide-catelog" id="main-9">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="9" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-9">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-11 hide-catelog" id="main-10">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="10" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-10">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-12 hide-catelog" id="main-11">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="11" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-11">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-13 hide-catelog" id="main-12">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="12" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-12">
							</ul>

						</div>
					</div>
				</div>

				<div class="panel panel-default inner-class cat-14 hide-catelog" id="main-13">
					<div class="panel-heading ">
						<div class="panel-title ading-left-padding title titel-text-size" >
							<div id="13" class="catelog-name">
								
							</div>
						
						</div>
					</div>
					<div class="panel-body back-ground-colour-inner inside-body-pan body-inner boddy-defalt-hight scroller" style="overflow-x: hidden;overflow-y:auto;">
						<div class="clearfix" style=" margin-bottom:4px; margin-top:4px;" >
							<ul class="level-2" style="" id="catlog-13">
							</ul>

						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
        
        <!--Popup -->
                <div class="modal fade common_popup new_Project_popup" id="myModal" role="dialog">

                    <div class="modal-dialog custom_popupModel">
                        <!-- Modal content-->

                        <div class="popup_con clearfix" >
                            <div class="pd_popup_header">

                                <button type="button" class="close custom_popupButton" data-dismiss="modal"></button>

                                <div class="image_div" align="center">
                                    <img class="pd_img img-responsive"  id="left_popup_imgProduct" style="background-color: whitesmoke;background-size:100% auto; "/>
                                </div>
                            </div>
                            <div class="pd_details_con">
                                <div class="col-md-7 padding_L">
                                    <h2 name="smname" id="left_popup_productName">LED SS - 25mm Chrome</h2>
                                    <p >Product Description.</p><p id="left_popup_productDescription" >Product Description. This is where the product description placed. This is a small descriptionn about the product focuses on selling the product like why the product is good for the house they use and want to own. No more than words.</p>
                                </div>

                                <div class="col-md-5 padding_R padding_L margin_top_20">

                                    <p><strong>Supplier :</strong><span id="left_popup_suppName"> Clipsal</span></p>
                                    <p><strong>Colour :</strong><span id="left_popup_productStyle">White, Chrome</span></p>
                                    <p><strong>Style :</strong><span id="left_popup_productType">  LED</span></p>
                                    <p><strong>Watts :</strong><span id="left_popup_productWatt">10 w</span></p>
                                    <p><strong>Rating</strong>:N/A</p>
                                    <p><strong>Size</strong>:N/A</p>

                                </div>
                                <div class="price_holder clearfix">
                                    <div class="col-md-5 padding_L padding_R margin_top_40">
                                        <strong><span class="pd_price" name="builderproductPrice" id="left_popup_builderproductPrice"></span>
                                        <span class="pd_price_txt">(inc GST)</span></strong>
                                    </div>

                                    <div class="col-md-4 padding_L padding_R margin_top_20">
                                        <span class="pd_price_txt lbl_red">WAS<br>
                                            <strong ><span class="pd_price" id="left_popup_wasprice"></span></strong>
                                        </span>
                                    </div>

                                    <div class="col-md-3 padding_L padding_R margin_top_20">
                                        <span class="pd_price_txt lbl_green">SAVE<br>
                                            <strong ><span class="pd_price" id="left_popup_saveprice"></span></strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        <!-- -->

	<div  style="vertical-align: bottom;" class="clearfix ">
		<div class="panel panel-default bom-medder bom-hide" id="bom-area">
			<div class="panel-heading test1 ">
				<div class="panel-title ading-left-padding title titel-text-size" >
					BOM
				</div>
				</div>
				<div class="panel-body back-ground-colour-inner selected-panel-body-pan">
				<div class="side-bar2" id="bom-table">
					<div class="property-div" >
						<table id="productInfo" border="1" cellpadding="2">
							<tr>
								<th>Name</th>
								<th>Unit Price ($)</th>
								<th>Quantity</th>
								<th>Total Price ($)</th>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div >

    <div id="design-area" class="col-xs-12 col-sm-12 col-md-8 col-lg-10">

    <div id="address-bar" class="clearfix">
        <div class="headerDiv first border-left-add">
                @php
					$template = \Illuminate\Support\Facades\DB::table('templates')->where('id','=',session('template_id'))->first();
				@endphp
			{!! $template->name !!}

        </div>
        <div class="headerDiv second">
                Template Floor - Template Catalog
        </div>
        <div class="headerDiv third">
                <img src="/img/adopto.png" width="90"/>
        </div>
    </div>

	<div id="top-menu" class="clearfix" >
		<div class="row">

		</div>
		<div class="col-xs-10 col-sm-10 col-md-10 border-left-add">
			<ul id="tool-items-ul">
				<li class="tool-item top-menu-item">
					<a href="{!! url('templates/create/add-plans') !!}" id="home-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/home.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/home.png') !!}">
					</a>
					<span class="tooltiptext">Home</span>
				</li>

				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0)" id="save-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/saveIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/saveIcon.png') !!}">
					</a>
					<span class="tooltiptext">Save</span>
				</li>

				<li class="tool-item top-menu-item" id="print-btn" >
					<a href="javascript:void(0)">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/printIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/printIcon.png') !!}">
					</a>
					<span class="tooltiptext">Print</span>
				</li>

				<!--<li class="tool-item top-menu-item" >-->
				<!--<a href="javascript:print_pdf();" id="open-button">-->
				<!--<img class="image-item" src="img/tool-bar/folder-7.png">-->
				<!--</a>-->
				<!--<span class="tooltiptext">Open</span>-->
				<!--</li>-->

				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0)" id="proj-comment-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/project_comment.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/project_comment.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 120px">Project Comment</span>
				</li>

				<li class="top-menu-item" >|</li>

				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0)" id="plans-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/plan.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/plan.png') !!}">
					</a>
					<span class="tooltiptext">Plans</span>
				</li>
				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0)" id="archived-plan-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/archived_plans.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/archived_plans.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 120px">Archived Plans</span>
				</li>

				<li class="top-menu-item">|</li>

				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0);" id="undo">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/undo.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/undo.png') !!}">
					</a>
					<span class="tooltiptext">Undo</span>
				</li>
				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0);" id="redo">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/redo.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/redo.png') !!}">
					</a>
					<span class="tooltiptext">Redo</span>
				</li>

				<li class="top-menu-item" >|</li>

				<li class="tool-item toggle-button top-menu-item">
					<a href="javascript:void(0);" id="drag">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/selectIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/selectIcon.png') !!}">
					</a>
					<span class="tooltiptext">Select</span>
				</li>

				<li class="tool-item toggle-button top-menu-item">
					<a href="javascript:void(0);" id="cwall">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/NewWallIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/NewWallIcon.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 100px">Draw wall</span>
				</li>

				<li class="tool-item toggle-button top-menu-item" >
					<a href="javascript:void(0);" id="eraser">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/eraser_icon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/eraser_icon.png') !!}">
					</a>
					<span class="tooltiptext">Eraser</span>
				</li>

				<li id="add-text" class="tool-item toggle-button top-menu-item" >
					<a href="javascript:void(0)">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/text.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/text.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 120px">Add Plan Note</span>
				</li>

				<li class="tool-item toggle-button top-menu-item" >
					<a href="javascript:void(0);" id="scale">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/scale.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/scale.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 120px">Scale object</span>
				</li>

				<li class="tool-item toggle-button top-menu-item" >
					<a href="javascript:void(0);" id="pan">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/handIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/handIcon.png') !!}">
					</a>
					<span class="tooltiptext">Pan</span>
				</li>

				<li class="top-menu-item">|</li>

				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0);" id="zoom-in" class="zoom-control" data-action="zoom-in">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/zoom_in.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/zoom_in.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 100px">Zoom in</span>
				</li>
				<li class="tool-item top-menu-item" >
					<a href="javascript:void(0);" id="zoom-out" class="zoom-control" data-action="zoom-out">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/zoom_out.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/zoom_out.png') !!}">
					</a>
					<span class="tooltiptext" style="width: 100px">Zoom out</span>
				</li>
			</ul>
		</div>
		<div class="pull-right wr_logout">
			<ul id="tool-items-ul1" style="float:right; padding:0">
				<li class="tool-item bom-hide">
					<a href="javascript:void(0)" id="help-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/infomationIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/infomationIcon.png') !!}">
					</a>
					<span class="tooltiptext">Help</span>
				</li>
				<li class="tool-item top-menu-item" >
					<a href="{!! url('/logout') !!}" id="logout-button">
						<img class="image-item" 		src="{!! asset('img/tool-bar/black/logOffIcon.png') !!}">
						<img class="image-item-hover" 	src="{!! asset('img/tool-bar/blue/logOffIcon.png') !!}">
					</a>
					<span class="tooltiptext">Settings/Logout</span>
				</li>
			</ul>
		</div>
	</div>

	<!--<hr>-->

	<!--Tool bar end-->

	<!-- wrapper start -->
	<div id="wrapper" class="clearfix">

		<div id="container" class="clearfix">
			<!--<div style="height:50px; width:100%;"></div>-->
			<canvas id="ruler-canvas" style="border:1px solid #fff; position:absolute; top: 0;left: 0;"></canvas>
			<canvas id="bg-canvas"></canvas>
			<canvas id="era-canvas"></canvas>
			<canvas id="draw-tool-canvas" class="hide-canvas"></canvas>
			<!-- <div id="scale-ratio-display">&nbsp;</div>
            <div id="zoom-ratio-display">&nbsp;</div> -->
		</div>
	</div>


	<div id="switch-menu-container">
		<ul id="switch-menu" data-root-obj-id="">
		</ul>
	</div>

	<div id="mouse-action-container">
		<ul id="mouse-action-menu">
			<li id="cut" data-action="cut">Cut</li>
			<li id="copy" data-action="copy">Copy</li>
			<li id="paste" data-action="paste">Paste</li>
			<li id="delete" data-action="delete">Delete</li>
			<!--(+)TBIRD - VB0.4 - START-->
			<li id="stop" data-action="stop">Stop</li>
			<li id="clear" data-action="clear">Clear</li>
			<!--(+)TBIRD - VB0.4 - FINISH-->
		</ul>
	</div>

	<div id="text-container">
		<input id="type-text" type="text" name="type-text" value="" placeholder="Enter your text here"/><br/>
		<input id="type-text-size" type="text" name="type-text-size" value="15" placeholder="Font size in pixels" size="3" maxlength="3"/>px<br/>
		<button id="text-ok">OK</button>
		<button id="text-cancel">Cancel</button>
	</div>

	</div>
	<div id="item-popup-conW" class="item-popup " title="Connect Lights">
		<img src="/img/DesignCanvassCreateSwitchWire.png" class="image-background">
	</div>
	<div id="item-popup-info" class="item-popup " title="Product Information">
		<img src="/img/DesignCanvassProductInfo.png" class="image-background">
	</div>
	<div id="item-popup-close" class="item-popup " title="Close">
		<img src="/img/DesignCanvassClose.png" class="image-background">
	</div>

	<div id="item-popup-remW" class="item-popup " title="Remove Connection">
		<img src="/img/DesignCanvassRemoveSwitchWire.png" class="image-background">
	</div>

	<div id="item-popup-connections" class="item-popup " title="Rearrange Connection">
		<img src="/img/re_arrange.png" class="image-background">
	</div>
</div>

<!--PRODUCT ICON POP UP -->

        <div class="modal fade common_popup new_Project_popup" id="productIconModal" role="dialog">
            <div class="modal-dialog custom_popupModel ">

                <!-- Modal content-->
                <!--<div class="modal-content clearfix">-->
                <div class="popup_con">
                    <div class="pd_popup_header" align="center">

                        <button type="button" class="close custom_popupButton" data-dismiss="modal"></button>
                        <!--<h4 class="modal-title ttl_consultants">Consultants:</h4>-->
						<!--this popup is not responsive , for best viewing exprince-->
                        <img class="pd_img " src="images/pd_1.png" id="popupImage" />
                        <div class="ico_cw" style="border-style: solid;border-width: 1px;border-color:gray"><img style="width:50px;height:50px;" src="images/ico_cw.jpg" id="popupImageIcon"/></div>
                    </div>
                    <div class="pd_details_con">
                        <h2 id="canvas_popup_productName" class="no-margin" style="max-width:100%;  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">LED SS - 25mm Chrome</h2>
                        <p class="no-margin"><strong>Color:</strong> <span id="canvas_popup_productColor">xx</span></p>
                        <p class="no-margin"><strong>Style:</strong> <span id="canvas_popup_productStyle"></span></p>
                        <p class="no-margin"><strong>Watts:</strong> <span id="canvas_popup_productWatt"></span></p>

                        <div class="col-md-6 padding_L no-margin"><strong>SIV Code:</strong> <span id="canvas_popup_SIVcode"></span></div>

                        <div class="col-md-6 margin_top-20 text-right padding_R">
                            <span class="pd_price"><strong>$<span id="canvas_popup_productPrice">00</span></strong></span>
                            <span class="pd_price_txt">(inc GST)</span>
                        </div>


                        <div class="pd_commentbox">
                            <input  type="text" list="comments" id="displayvalues" style="color: black; width: 100%;" width="50" placeholder="Add Comment Here" />
                            <datalist id="comments" style="color: black; width: 100%;"></datalist>
                        </div>

                        <input id="savevalues" name="save_btn" type="button" class="pd_btn_save" value="SAVE">
                        <textarea id="display_notes" rows="3" cols="50" style="color: black;background-color:#52748d;border: 0px;color: #fff; width: 100%;resize: none;" readonly></textarea>
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>

<!--PRODUCT ICON POP UP END-->
<script>
	var template_floor_catalog_design_id = '{!! $template_floor_catalog_design_id !!}';
</script>

{{ Html::script('lib/jquery-3.1.1.js') }}
{{ Html::script('lib/jquery-ui.js') }}
{{ Html::script('canvas/js/canvas_items/canvas_item.js') }}
{{ Html::script('canvas/js/canvas_items/drawing_item.js') }}
{{ Html::script('canvas/js/canvas_items/product_item.js') }}
{{ Html::script('canvas/js/ntc.js') }}
{{ Html::script('canvas/js/draw-tool.js') }}
{{ Html::script('canvas/js/bom.js') }}
{{ Html::script('canvas/js/controllers_template.js') }}
{{ Html::script('canvas/js/functions.js') }}
{{ Html::script('canvas/js/rays/polyk.js') }}
{{ Html::script('canvas/js/rays/ivank.js') }}
{{ Html::script('canvas/js/left-menu.js') }}
{{ Html::script('canvas/js/reports.js') }}
{{ Html::script('canvas/js/scripts-expand.js') }}
{{ Html::script('lib/jquery.ui.touch-punch.min.js') }}
{{ Html::script('canvas/bootstrap/js/bootstrap.min.js') }}
{{ Html::script('canvas/dist/js/lobipanel.js') }}
{{ Html::script('lib/highlight/highlight.pack.js') }}
{{ Html::script('canvas/js/get-products.js') }}
{{ Html::script('canvas/js/lobipannel-query.js') }}
{{ Html::script('canvas/js/product-popup.js') }}
{{ Html::script('pnotify.custom.min.js') }}


<script>

	$(function() {
		init();
		setBackgroundImage('{!! url($bgImg) !!}');
	});
	$('#plans-button').on('click', function () {

		$('.template_modal').modal('show');
	});
	
	clientName = "N/A";
	clientAdddress = "N/A";
	projectName = "N/A";
	consultentName = "N/A";
	printVersion = "N/A";

</script>


<!-- ========================= MODEL POPUP STARTS ============================ -->

<!-- Modal -->
<div class="modal fade common_popup new_Project_popup template_modal" id="myModal_" role="dialog">
	<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content clearfix">
			<div class="modal-header">

				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Project Plans:</h4>

			</div>
			<div class="modal-body" id="templates">
				<form class="row new-item-from-wrapper" role="form" method="post" id="new-prod-form"
					  enctype="multipart/form-data" novalidate="novalidate" action="{!! url('/catalogs') !!}">
					<div class="form-group">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 clearfix">
									<input type="hidden" name="_token" value="{{ csrf_token() }}">
									<section class="row form-group">
										<section class="col-md-12" style="margin-left: 100px">
											<ul>
												@foreach($templateFloors as $templateFloor)
													@php
														$templateFloorCatalogs  = DB::table('template_floor_catalogs')->where('id','=',$templateFloor->id)->get();
														$templateImage  = DB::table('template_images')->where('id','=',$templateFloor->template_image_id)->first();
													@endphp

													@foreach($templateFloorCatalogs as $templateFloorCatalog)
<div class="row">
	<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7"><img src="{!! asset($templateImage->path) !!}" class="col-xs-10 col-sm-10 col-md-10 col-lg-10 img-responsive"/></div>

	<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"><a class="btn_assign" href="{!! url('templates/create/add-plans/'.$templateFloorCatalog->id.'/canvas') !!}">Open</a></div>
</div>





												@endforeach
												@endforeach
											</ul>
										</section>
										</section>
						</div>
					</div>
				</form>
			</div>

		</div>

	</div>
</div>
<!-- ========================= MODEL POPUP ============================ -->

</body>

</html>
