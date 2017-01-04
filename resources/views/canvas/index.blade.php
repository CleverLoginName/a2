<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="canvas/css/draw-tool.css"/>
    <link rel="stylesheet" href="canvas/css/tool-bar.css"/>
    <link rel="stylesheet" href="canvas/css/left-menu.css"/>
    <link rel="stylesheet" href="canvas/css/right-click-menu.css"/>

    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">-->


    <link rel="stylesheet" href="canvas/lib/jquery-ui.min.css"/>
    <link rel="stylesheet" href="canvas/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="canvas/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="canvas/dist/css/lobipanel.min.css"/>
    <link rel="stylesheet" href="canvas/lib/font-awesome/css/font-awesome.min.css"/>

    <link rel="stylesheet" href="canvas/lib/highlight/github.css"/>
    <link rel="stylesheet" href="canvas/demo/documentation.css"/>
    <link rel="stylesheet" href="canvas/demo/demo.css"/>

    <link rel="stylesheet" href="canvas/css/rating-stars.css">



    <script>
        var i = 0;
        var dragging = false;
        $('#dragbar').mousedown(function(e){
            e.preventDefault();

            dragging = true;
            var main = $('#main');
            var ghostbar = $('<div>',
                    {id:'ghostbar',
                        css: {
                            height: main.outerHeight(),
                            top: main.offset().top,
                            left: main.offset().left
                        }
                    }).appendTo('body');

            $(document).mousemove(function(e){
                ghostbar.css("left",e.pageX+2);
            });
        });

        $(document).mouseup(function(e){
            if (dragging)
            {
                $('#sidebar').css("width",e.pageX+2);
                $('#main').css("left",e.pageX+2);
                $('#ghostbar').remove();
                $(document).unbind('mousemove');
                dragging = false;
            }
        });
    </script>


</head>
<body onload="init();">
<!--Tool bar started-->
<div id="sidebar" class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
    <div style=" background-color:#f5f5f5;  overflow: scroll">






        <div class="panel panel-default" style="background-color: #51748c"id="main-pnnel-drag" >
            <div class="panel-heading back-ground-colour-inner">
                <div class="panel-title back-ground-colour-inner">
                    <div class="row left-align"  style="margin-top: 30px">
                        <div class="col-md-2=1 col-lg-2 col-sm-2 col-xs-2"   >
                            <img class="pro-logo" src="img/logooo.png" align="right">
                        </div>
                        <div class="col-md-7 col-lg-7 col-sm-7 col-xs-7 title titel-text-size" align="right" id="plan-name">Fist Floor:Electrical</div>
                        <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3 title titel-text-size" id="scale1" align="left">1:100</div>
                    </div>
                    <div class="row" style=" margin-bottom:2px; " >
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue title">Energy Rated :</div>
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6" id="energy-reted">
                            <form class="acidjs-rating-stars">
                                <input type="radio" name="group-1" id="group-1-0" value="5" /><label for="group-1-0"></label>
                                <input type="radio" name="group-1" id="group-1-1" value="4" /><label for="group-1-1"></label>
                                <input type="radio" name="group-1" id="group-1-2" value="3" /><label for="group-1-2"></label>
                                <input type="radio" name="group-1" id="group-1-3" value="2" /><label for="group-1-3"></label>
                                <input type="radio" name="group-1" id="group-1-4"  value="1" /><label for="group-1-4"></label>
                                <input type="radio" name="group-1" id="group-1-5"  value="1" /><label for="group-1-4"></label>
                            </form></div>

                    </div>
                    <div class="row" style=" margin-bottom:2px; margin-top:2px;" >
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue title">Max Energy:</div>
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue" id="max-energy">XXX5</div>

                    </div>
                    <div class="row" style=" margin-bottom:2px; margin-top:2px;" >
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue title" >Design Energy :</div>
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue" id="design-energy">XXX5</div>

                    </div>
                    <div class="row" style=" margin-bottom:2px; margin-top:2px;" >
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue title">Variation cost :</div>
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 text-in-side-menue" id="variation-cost">XXX5</div>

                    </div>
                </div>
            </div>
            <div class="panel-body back-ground-colour-inner" >

                <div class="panel panel-default inner-class cat-1" id="ishi">
                    <div class="panel-heading ">
                        <div class="panel-title " >
                            <h6>Catalogue 1</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        <div class="row" style=" margin-bottom:4px; margin-top:4px;" >
                            <ul class="level-2">
                                <li>
                                    <div>
                                        <div class="row">
                                            <div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                <img  src="img/expand-btn.png" >
                                            </div>
                                            <div class="col-md-10 col-lg-10 col-sm-10 col-xs-10 inside-text" >
                                                Search
                                            </div>

                                        </div>
                                    </div>
                                    <ul class="level-3">
                                        <div >
                                            <div class="row">
                                                <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9">
                                                    <input name="search_switch" type="text" class="search-input">
                                                </div>
                                                <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                                                    <button type="button" class="btn-min-search">Go</button>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                <li>
                                    <div>
                                        <div class="row">
                                            <div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                <!--<button type="button" class="btn-min-search">+</button>-->
                                                <img  src="img/expand-btn.png" >
                                            </div>
                                            <div class="col-md-10 col-lg-10 col-sm-10 col-xs-10 inside-text" >
                                                Category
                                            </div>

                                        </div>
                                    </div>
                                    <ul class="level-3">
                                        <li>
                                            <div>
                                                <div class="row">
                                                    <div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
                                                        <img  src="img/expand-btn.png" >
                                                    </div>
                                                    <div class="col-md-10 col-lg-10 col-sm-10 col-xs-10 inside-text" >
                                                        SubCategory
                                                    </div>

                                                </div></div>
                                            <ul class="level-4">
                                                <li>
                                                    <div>

                                                        <div class="row">

















                                                            <div id="product-container">
                                                                <div class="single-item S" attr="LIGHT_BULB" data-angle="0"
                                                                     data-evel="2.54" data-power="30" data-name="Down Light T1"
                                                                     data-tooltip="img/left-menu/ceilinglight.png">
                                                                    <div>
                                                                        <img src="img/left-menu/ceilinglight.png">
                                                                        <div class="pro-price-container">
                                                                            <span class="set-red">Sale</span> <span>$105.00</span> <span>Save</span>
                                                                            <span>$0.00</span>
                                                                        </div>
                                                                        <div class="pro-detail-container">

                                                                            <span>Ceiling Light</span> <span>LUMS : 100</span> <span>Rating
															: 4.0</span> <span>Type : LED</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="single-item C" attr="LIGHT_SWITCH" data-angle="0"
                                                                     data-evel="2.54" data-power="30" data-name="Single Switch"
                                                                     data-tooltip="img/left-menu/switch.png">
                                                                    <div>
                                                                        <img src="img/left-menu/switch.png">
                                                                        <div class="pro-price-container">
                                                                            <span class="set-red">Sale</span> <span>$105.00</span> <span>Save</span>
                                                                            <span>$0.00</span>
                                                                        </div>
                                                                        <div class="pro-detail-container">
                                                                            <span>Single Switch</span> <span>LUMS : 100</span> <span>Rating
															: 4.0</span> <span>Type : LED</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>






















                                                        </div>


                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="panel panel-default inner-class cat-2" >
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h6>Catalogue 2</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        Panel 2
                    </div>
                </div>

                <div class="panel panel-default inner-class cat-3">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h6>Catalogue 3</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        Panel 3
                    </div>
                </div>
                <div class="panel panel-default inner-class cat-4">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h6>Catalogue 5</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        Panel 5
                    </div>
                </div>
                <div class="panel panel-default inner-class cat-7">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h6>Catalogue 6</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        Panel 6
                    </div>
                </div>
                <div class="panel panel-default inner-class cat-5">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h6>Catalogue 7</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        Panel 7
                    </div>
                </div>
                <div class="panel panel-default inner-class cat-6">
                    <div class="panel-heading">
                        <div class="panel-title">
                            <h6>Catalogue 8</h6>
                        </div>
                    </div>
                    <div class="panel-body back-ground-colour-inner">
                        Panel 8
                    </div>
                </div>

            </div>
        </div>













    </div>
    <div  style="background-color:green;  vertical-align: bottom;">



        <div class="side-bar2" >
            <div class="property-div">
                <table id="productInfo" border="1" cellpadding="2">
                    <tr>

                        <td><b>Name</b></td>
                        <td><b>Price</b></td>
                        <td><b>Discount</b></td>
                        <td><b>Energy(W)</b></td>
                        <td><b>Visible</b></td>
                    </tr>
                </table>
            </div>
        </div>









    </div>
</div >
<div class="col-md-9 col-lg-9 col-sm-9 col-xs-9">


    <div id="top-menu" >
        <div class="row">

        </div>
        <div class="col-md-10 col-lg-10 col-sm-10 col-xs-10">
            <ul id="tool-items-ul">
                <li class="tool-item">
                    <a href="javascript:void(0)" id="home-button">
                        <img class="image-item" 		src="img/tool-bar/black/home.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/home.png">
                    </a>
                    <span class="tooltiptext">Home</span>
                </li>

                <li class="tool-item">
                    <a href="javascript:void(0)" id="save-button">
                        <img class="image-item" 		src="img/tool-bar/black/saveIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/saveIcon.png">
                    </a>
                    <span class="tooltiptext">Save</span>
                </li>

                <li class="tool-item" id="print-btn">
                    <a href="javascript:void(0)">
                        <img class="image-item" 		src="img/tool-bar/black/printIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/printIcon.png">
                    </a>
                    <span class="tooltiptext">Print</span>
                </li>

                <!--<li class="tool-item">-->
                <!--<a href="javascript:print_pdf();" id="open-button">-->
                <!--<img class="image-item" src="img/tool-bar/folder-7.png">-->
                <!--</a>-->
                <!--<span class="tooltiptext">Open</span>-->
                <!--</li>-->

                <li class="tool-item">
                    <a href="javascript:void(0)" id="proj-comment-button">
                        <img class="image-item" 		src="img/tool-bar/black/project_comment.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/project_comment.png">
                    </a>
                    <span class="tooltiptext">Project Comment</span>
                </li>

                <li>|</li>

                <li class="tool-item">
                    <a href="javascript:void(0)" id="plans-button">
                        <img class="image-item" 		src="img/tool-bar/black/plan.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/plan.png">
                    </a>
                    <span class="tooltiptext">Plans</span>
                </li>
                <li class="tool-item">
                    <a href="javascript:void(0)" id="archived-plan-button">
                        <img class="image-item" 		src="img/tool-bar/black/archived_plans.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/archived_plans.png">
                    </a>
                    <span class="tooltiptext">Archived Plans</span>
                </li>

                <li>|</li>

                <li class="tool-item">
                    <a href="javascript:void(0);" id="undo">
                        <img class="image-item" 		src="img/tool-bar/black/undo.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/undo.png">
                    </a>
                    <span class="tooltiptext">Undo</span>
                </li>
                <li class="tool-item">
                    <a href="javascript:void(0);" id="redo">
                        <img class="image-item" 		src="img/tool-bar/black/redo.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/redo.png">
                    </a>
                    <span class="tooltiptext">Redo</span>
                </li>

                <li> |</li>


                <li class="tool-item toggle-button">
                    <a href="javascript:void(0);" id="drag">
                        <img class="image-item" 		src="img/tool-bar/black/selectIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/selectIcon.png">
                    </a>
                    <span class="tooltiptext">Move</span>
                </li>

                <li class="tool-item toggle-button">
                    <a href="javascript:void(0);" id="cwall">
                        <img class="image-item" 		src="img/tool-bar/black/NewWallIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/NewWallIcon.png">
                    </a>
                    <span class="tooltiptext">Draw walls</span>
                </li>

                <li class="tool-item toggle-button">
                    <a href="javascript:void(0);" id="eraser">
                        <img class="image-item" 		src="img/tool-bar/black/eraser_icon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/eraser_icon.png">
                    </a>
                    <span class="tooltiptext">Draw walls</span>
                </li>

                <li id="add-text" class="tool-item toggle-button">
                    <a href="javascript:void(0)">
                        <img class="image-item" 		src="img/tool-bar/black/text.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/text.png">
                    </a>
                    <span class="tooltiptext">Add Text</span>
                </li>

                <li class="tool-item toggle-button">
                    <a href="javascript:void(0);" id="scale">
                        <img class="image-item" 		src="img/tool-bar/black/scale.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/scale.png">
                    </a>
                    <span class="tooltiptext">Scale</span>
                </li>

                <li class="tool-item toggle-button">
                    <a href="javascript:void(0);" id="pan">
                        <img class="image-item" 		src="img/tool-bar/black/handIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/handIcon.png">
                    </a>
                    <span class="tooltiptext">Pan</span>
                </li>

                <li>|</li>

                <li class="tool-item">
                    <a href="javascript:void(0);" id="zoom-in" class="zoom-control" data-action="zoom-in">
                        <img class="image-item" 		src="img/tool-bar/black/zoom_in.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/zoom_in.png">
                    </a>
                    <span class="tooltiptext">Zoom in</span>
                </li>
                <li class="tool-item">
                    <a href="javascript:void(0);" id="zoom-out" class="zoom-control" data-action="zoom-out">
                        <img class="image-item" 		src="img/tool-bar/black/zoom_out.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/zoom_out.png">
                    </a>
                    <span class="tooltiptext">Zoom out</span>
                </li>
                <li class="tool-item">
                    <a href="javascript:void(0);" id="load" class="load" data-action="load">
                        <img class="image-item" 		src="img/tool-bar/black/zoom_out.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/zoom_out.png">
                    </a>
                    <span class="tooltiptext">Zoom out</span>
                </li>
                <!--<li class="tool-item">-->
                <!--<a href="javascript:void(0);" id="zoom-reset" class="zoom-control" data-action="zoom-reset">-->
                <!--<img class="image-item" 		src="img/tool-bar/black/zoom_reset.png">-->
                <!--<img class="image-item-hover" 	src="img/tool-bar/blue/zoom_reset.png">-->
                <!--</a>-->
                <!--<span class="tooltiptext">Zoom reset</span>-->
                <!--</li>-->
                <!---->
                <!--<li class="tool-item">-->
                <!--<a href="javascript:void(0);" id="scale-up" class="scale-item-control" data-action="scale-up">-->
                <!--<img class="image-item" 		src="img/tool-bar/black/scale_up.png">-->
                <!--<img class="image-item-hover" 	src="img/tool-bar/blue/scale_up.png">-->
                <!--</a>-->
                <!--<span class="tooltiptext">Scale Up</span>-->
                <!--</li>-->
                <!--<li class="tool-item">-->
                <!--<a href="javascript:void(0);" id="scale-down" class="scale-item-control" data-action="scale-down">-->
                <!--<img class="image-item" 		src="img/tool-bar/black/scale_down.png">-->
                <!--<img class="image-item-hover" 	src="img/tool-bar/blue/scale_down.png">-->
                <!--</a>-->
                <!--<span class="tooltiptext">Scale Down</span>-->
                <!--</li>-->
                <!--				<li class="tool-item">
                                    <a href="javascript:void(0);" id="scale-reset" class="scale-item-control" data-action="scale-reset"><img
                                            class="image-item"
                                            src="img/tool-bar/repeat.png"></a>
                                    <span class="tooltiptext">Scale reset</span>
                                </li>
                                 -->


                <!--<li class="tool-item">
                    <a href="javascript:void(0);" id="rotate">
                        <img class="image-item" src="img/tool-bar/rotate.png">
                    </a>
                    <span class="tooltiptext">Rotate</span>
                </li>-->
                <!--
                                <li class="tool-item">
                                    <a href="javascript:void(0);" id="prive_vice" onclick="javascript:print_report_price_vice();">
                                        <img class="image-item" src="img/tool-bar/icon_drawer.png">
                                    </a>
                                    <span class="tooltiptext">Report price vice</span>
                                </li>

                                <li class="tool-item">
                                    <a href="javascript:void(0);" id="product_vice" onclick="javascript:print_report_product_vice();">
                                        <img class="image-item" src="img/tool-bar/icon_drawer_alt.png">
                                    </a>
                                    <span class="tooltiptext">Report product vice</span>
                                </li>-->
            </ul>
        </div>
        <div class="col-md-2 col-lg-2 col-sm-2 col-xs-2">
            <ul id="tool-items-ul1" style="float:right">
                <li class="tool-item">
                    <a href="javascript:void(0)" id="help-button">
                        <img class="image-item" 		src="img/tool-bar/black/infomationIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/infomationIcon.png">
                    </a>
                    <span class="tooltiptext">Help</span>
                </li>
                <li class="tool-item">
                    <a href="javascript:void(0)" id="logout-button">
                        <img class="image-item" 		src="img/tool-bar/black/logOffIcon.png">
                        <img class="image-item-hover" 	src="img/tool-bar/blue/logOffIcon.png">
                    </a>
                    <span class="tooltiptext">Settings/Logout</span>
                </li>
            </ul>
        </div>
    </div>

    <!--<hr>-->

    <!--Tool bar end-->

    <!-- wrapper start -->
    <div id="wrapper">

        <div id="container">

            <!--side bar started-->
            <!--<div class="side-bar" id="menu-site-bar">-->
            <!--<div class="main-lab">-->
            <!--<img class="pro-logo" src="img/logo.png">-->
            <!--<button type="button" class="btn-min-mini" id="minimize-btn">-</button>-->
            <!--</div>-->

            <!--<div id="menu-detail-col">-->
            <!--<div class="detail">-->
            <!--<div class="detail-title">-->
            <!--<span>Energy Rating:</span><br/>-->
            <!--<span>Sub Total:</span><br/>-->
            <!--<span>Project Status:</span><br/>-->
            <!--<span>Plan Scale ($):</span><br/>-->
            <!--</div>-->
            <!--<div class="detail-values">-->
            <!--<span>4.5</span><br/>-->
            <!--<span>2000.00</span><br/>-->
            <!--<span>Not Saved</span><br/>-->
            <!--<span>1:100</span><br/>-->
            <!--</div>-->

            <!--<input type="file" style="display:none;" id="open-file" name="open_file"/>-->

            <!--</div>-->

            <!--<div class="item-container">-->
            <!--<ul class="items-ul">-->
            <!--<li>-->
            <!--<div class="open">Electrical <span>Blubs</span>-->
            <!--<button type="button" id="e-btn" class="btn-min-image">+</button>-->
            <!--</div>-->
            <!--<div class="e-item-cont">-->
            <!--<div class="single-item-con" id="e-item-div">-->

            <!--<div class="search-div">-->
            <!--<div>-->
            <!--<span>Search</span>-->
            <!--</div>-->

            <!--<div style="margin-top: 14px;">-->
            <!--<input type="text" class="search-input" name="search"/>-->
            <!--<button type="button" class="btn-min-search">Go</button>-->
            <!--</div>-->
            <!--</div>-->
            <!--<hr>-->

            <!--<div class="product-container" id="product-container">-->
            <!---->
            <!--</div>-->
            <!--</div>                -->
            <!---->
            <!--<br>-->
            <!--</div>-->


            <!--</li>-->

            <!--<li>-->
            <!--<div class="open">Electrical <span>Switch</span>-->
            <!--<button type="button" id="btn-drw-switch" class="btn-min-image">+</button>-->
            <!--</div>-->

            <!--<div class="e-item-cont">-->

            <!--<div class="single-item-con" id="switch-item-div">-->

            <!--<div class="search-div">-->
            <!--<div>-->
            <!--<span>Search</span>-->
            <!--</div>-->

            <!--<div style="margin-top: 14px;">-->
            <!--<input type="text" class="search-input" name="search_switch"/>-->
            <!--<button type="button" class="btn-min-search">Go</button>-->
            <!--</div>-->
            <!--</div>-->
            <!--<hr>-->

            <!--<div class="product-container" id="product-container-switch">-->
            <!---->

            <!--</div>-->
            <!--</div><br>-->
            <!--</div>-->


            <!--</li>-->

            <!--<li>-->
            <!--<div class="open">Electrical <span>Prise</span>-->
            <!--<button type="button" id="btn-drw-prise" class="btn-min-image">+</button>-->
            <!--</div>-->

            <!--<div class="e-item-cont">-->

            <!--<div class="single-item-con" id="prise-item-div">-->

            <!--<div class="search-div">-->
            <!--<div>-->
            <!--<span>Search</span>-->
            <!--</div>-->

            <!--<div style="margin-top: 14px;">-->
            <!--<input type="text" class="search-input" name="search_prise"/>-->
            <!--<button type="button" class="btn-min-search">Go</button>-->
            <!--</div>-->
            <!--</div>-->
            <!--<hr>-->

            <!--<div class="product-container" id="product-container-Prise">-->
            <!---->

            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</li>-->

            <!--</ul>-->
            <!--</div>-->

            <!--<hr class="ht-horz">-->

            <!--<div class="property-div">-->
            <!--&lt;!&ndash; 						<table>-->
            <!--<thead>-->
            <!--<th>-->
            <!--<td>Name</td>-->
            <!--<td>Price</td>-->
            <!--<td>Discount</td>-->
            <!--<td>Weight</td>-->
            <!--<td>Visibility</td>-->
            <!--</th>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr>-->
            <!--<td colspan="6">No items yet</td>-->
            <!--</tr>-->
            <!--</tbody>-->
            <!--</table> &ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--side bar ended-->





            <div style="height:50px; width:100%;"></div>

            <canvas id="ruler-canvas" style="border:1px solid #fff; position:absolute; top: 0;left: 0;"></canvas>
            <canvas id="bg-canvas"></canvas>
            <canvas id="draw-tool-canvas"></canvas>
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
        </ul>
    </div>

    <div id="text-container">
        <input id="type-text" type="text" name="type-text" value="" placeholder="Enter your text here"/><br/>
        <input id="type-text-size" type="text" name="type-text-size" value="15" placeholder="Font size in pixels" size="3" maxlength="3"/>px<br/>
        <button id="text-ok">OK</button>
        <button id="text-cancel">Cancel</button>
    </div>

    <!--bulb pop up-->
    <div class="bulb-pop" id="bulb-prop">
        <div class="header">
            <h4>Bulb property</h4>
            <button class="btn-close" type="button" id="bulb-prop-close">X</button>
        </div>
        <div class="body">
            <div class="input-container">
                <div class="form-label">Name :</div>
                <input type="text" id="b-name"/>
            </div>

            <div class="input-container">
                <div class="form-label">X(m) :</div>
                <input type="number" id="b-x"/>
            </div>

            <div class="input-container">
                <div class="form-label">Y(m) :</div>
                <input type="number" id="b-y"/>
            </div>

            <div class="input-container">
                <div class="form-label">Elevation (m) :</div>
                <input type="number" id="elevation"/>
            </div>

            <div class="input-container">
                <div class="form-label">Angle (o) :</div>
                <input type="number" id="angle"/>
            </div>

            <div class="input-container">
                <div class="form-label">Light power (%) :</div>
                <input type="number" id="powerll"/>
            </div>


        </div>
        <div class="footer">
            <div class="f-buttons">
                <button type="button" id="bb-save" class="btn-info">Save</button>
                <!-- <button type="button" id="bb-cancel" class="btn-error">Cancel</button> -->
            </div>
        </div>
    </div>
    <!--bulb pop up end-->


    <!--switch pop up start-->
    <div class="switch-pop" id="switch-prop">
        <div class="header">
            <h4>Switch property</h4>
            <button class="btn-close" type="button" id="switch-prop-close">X</button>
        </div>
        <div class="body">

            <div>
                <div class="input-container">
                    <div class="form-label">Name :</div>
                    <input type="text" id="s-name"/>
                </div>

                <div class="input-container">
                    <div class="form-label">X(m) :</div>
                    <input type="number" id="s-x"/>
                </div>

                <div class="input-container">
                    <div class="form-label">Y(m) :</div>
                    <input type="number" id="s-y"/>
                </div>

                <div class="input-container">
                    <div class="form-label">Elevation (m) :</div>
                    <input type="number" id="s-elevation"/>
                </div>

                <div class="input-container">
                    <div class="form-label">Angle (o) :</div>
                    <input type="number" id="s-angle"/>
                </div>

                <fieldset>
                    <legend>Button and Lights</legend>
                    <div class="input-container">
                        <div class="form-label">Lights :</div>
                        <select id="switch-lig" data-root-obj-id="tel me something"></select>
                    </div>

                    <button type="button" id="add-s-buld" class="btn-info">Add</button>
                    <!--<button type="button" class="btn-error">Remove</button>-->
                </fieldset>

            </div>

            <div class="one-half">

            </div>
        </div>
        <div class="footer">
            <div class="f-buttons">
                <button type="button" id="b-save" class="btn-info">Save</button>
                <!-- <button type="button" id="b-cancel" class="btn-error">Cancel</button> -->
            </div>
        </div>
    </div></div>

		<span class="canvas-tooltip-span" id="span-tooltip-can">
			<img id="can-tool-image" alt="" src=""/>
		</span>

<!--switch pop up end-->
<script type="text/javascript" src="canvas/js/jquery.js"></script>
<script type="text/javascript" src="canvas/js/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="js/jspdf.min.js"></script> -->
<script type="text/javascript" src="canvas/js/draw-object.js"></script>
<script type="text/javascript" src="canvas/js/draw-tool.js"></script>
<script type="text/javascript" src="canvas/js/controllers.js"></script>
<script type="text/javascript" src="canvas/js/product-json.js"></script>
<script type="text/javascript" src="canvas/js/functions.js"></script>
<script type="text/javascript" src="canvas/js/rays/polyk.js"></script>
<script type="text/javascript" src="canvas/js/rays/ivank.js"></script>
<script type="text/javascript" src="canvas/js/left-menu.js"></script>
<script type="text/javascript" src="canvas/js/reports.js"></script>
<script type="text/javascript" src="canvas/js/scripts-expand.js"></script>

<script src="canvas/lib/jquery.1.11.min.js"></script>
<script src="canvas/lib/jquery-ui.min.js"></script>
<script src="canvas/lib/jquery.ui.touch-punch.min.js"></script>
<script src="canvas/bootstrap/js/bootstrap.min.js"></script>

<!--Installation using bower. Preferred!!! -->
<!--<script src="bower_components/jquery/dist/jquery.min.js"></script>-->
<!--<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>-->
<!--<script src="bower_components/jquery-ui-touch-punch-improved/jquery.ui.touch-punch-improved.js"></script>-->
<!--<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>-->

<script src="canvas/dist/js/lobipanel.js"></script>

<script src="canvas/lib/highlight/highlight.pack.js"></script>

<!--Installation using bower. Preferred!!! -->
<!--<script src="bower_components/jquery/dist/jquery.min.js"></script>-->
<!--<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>-->
<!--<script src="bower_components/jquery-ui-touch-punch-improved/jquery.ui.touch-punch-improved.js"></script>-->
<!--<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>-->

<script src="canvas/dist/js/lobipanel.js"></script>

<script src="canvas/lib/highlight/highlight.pack.js"></script>
<script>
    $('#sidebar').height(screen.height);
    //			document.getElementById("sidebar").setAttribute("style","height:"+screen.height+"px");
</script>
<script>
    $(function(){

        $('#main-pnnel-drag').lobiPanel({
            //Options go here
            reload: false,
            close: false,
            editTitle: false,
            sortable: true,
            minimize:false,
            expand:false,
            unpin: {
                icon: 'glyphicon glyphicon-pushpin',
            }

        });

        $('.inner-class').lobiPanel({
            reload: false,
            close: false,
            editTitle: false,
            sortable: true,
            expando:false,
            expand:false,
            unpin: {
                icon: 'glyphicon glyphicon-pushpin',
            }

        });


//                catlog1
        $('.cat-1').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-1>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-1').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-1>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();


//                catlog2
        $('.cat-2').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-2>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-2').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-2>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();

//                catlog3
        $('.cat-3').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-3>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-3').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-3>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();

//                catlog 4
        $('.cat-4').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-4>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-4').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-4>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();

//                catlog 5
        $('.cat-5').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-5>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-5').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-5>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();


//				catlog 6
        $('.cat-6').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-6>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-6').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-6>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();


        $('.cat-7').on('beforeMaximize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-7>.panel-heading').addClass("test1").removeClass("test2");

        }).lobiPanel();

        $('.cat-7').on('beforeMinimize.lobiPanel',function (ev,lobiPanel) {
            $('.cat-7>.panel-heading').addClass("test2").removeClass("test1");
        }).lobiPanel();
        $('.inner-class').lobiPanel('minimize');








    });
</script>

</body>

</html>
