// icons actions

// $('#tool-items-ul a').click(function () {
//     $('#tool-items-ul li').removeClass('active');
//     $(this).parent().addClass('active');
//     clearObjStatusesAndSetToDraw();
//     drawAllObjects();
// });

// var width =  $(window).width() ;
// var height = $(window).height();
	
$('.toggle-button a').click(function () {
    $('.toggle-button').removeClass('active');
    $(this).parent().addClass('active');
    clearObjStatusesAndSetToDraw();
    drawAllObjects();
});

$('#cwall').click(function () {
    toolAction = ToolActionEnum.DRAW;
    drawObjectType = ObjectType.CONT_WALL;
    document.getElementsByTagName("body")[0].style.cursor = "auto";
});

$('#drag').click(function () {
    toolAction = ToolActionEnum.DRAG;
    document.getElementsByTagName("body")[0].style.cursor = "auto";
});

$('#eraser').click(function () {
    toolAction = ToolActionEnum.ERASE;
    drawObjectType = ObjectType.ERASE;
    document.getElementsByTagName("body")[0].style.cursor = "auto";
});

$('#scale').click(function () {
    toolAction = ToolActionEnum.SCALE;
    document.getElementsByTagName("body")[0].style.cursor = "auto";
});

$('#rotate').click(function () {
    toolAction = ToolActionEnum.ROTATE;
    document.getElementsByTagName("body")[0].style.cursor = "auto";
});

$('#pan').click(function () {
    toolAction = ToolActionEnum.PAN;
    hideDialog();
    document.getElementsByTagName("body")[0].style.cursor = "pointer";
});

$('#add-text').click(function () {
    toolAction = ToolActionEnum.DRAW;
    drawObjectType = ObjectType.TEXT;
    document.getElementsByTagName("body")[0].style.cursor = "text";
});

$("#undo").on("click", function () {
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    undo();
});

$("#redo").on("click", function () {
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    redo();
});

$('#print-btn').click(function () {
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    printCanvas();
});


$("#b-save").on("click", function () {
    $("#switch-prop").hide();
});

$("#bb-save").on("click", function () {
    $("#bulb-prop").hide();
});

$("#bulb-prop-close").on("click", function () {
    $("#bulb-prop").hide();
});

$("#switch-prop-close").on("click", function () {
    $("#switch-prop").hide();
    var selectBulb = document.getElementById("switch-b");
    var selectSwitch = document.getElementById("switch-lig");
    selectSwitch.innerHTML = "";
    // selectBulb.innerHTML = "";
});
// icons actions end

// DROP ITEM TO THE CANVAS

var angle, elev, power, type, b_tooltip, s_angle, s_elev, s_power, s_bname, s_type, s_tooltip,bulb_icon,cat_type;

//var single_item = document.getElementsByClassName('single-item');

$(".product-container").on("click", ".single-item", function (e) {

    var getItemType = $(this).attr("attr");

    if (this.getAttribute("attr") == 'LIGHT_BULB') {
        toolAction = ToolActionEnum.DRAW;
        drawObjectType = ObjectType.LIGHT_BULB;

        angle = this.getAttribute("data-angle");
        elev = this.getAttribute("data-evel");
        power = this.getAttribute("data-power");

        bname = this.getAttribute("data-name");
        type = this.getAttribute("attr");
        b_tooltip = this.getAttribute("data-tooltip");
        bulbPrice = this.getAttribute("data-price");
        set_itemCode = this.getAttribute("data-item-code");
        lightImagePath = this.getAttribute("data-path");
        bulb_icon  = this.getAttribute("data-path1");
        cat_type = this.getAttribute("data-category-type");

        document.getElementsByTagName("body")[0].style.cursor = "url('/img/cursor/bulb-icon.cur'), auto";
    }

    $('#tool-items-ul li').removeClass('active');

});


$("#product-container-switch").on("click", ".single-item", function (e) {
    var getItemType = $(this).attr("attr");
    if (this.getAttribute("attr") == 'LIGHT_SWITCH') {
            toolAction = ToolActionEnum.DRAW;
            drawObjectType = ObjectType.LIGHT_SWITCH;

            s_angle = this.getAttribute("data-angle");
            s_elev = this.getAttribute("data-evel");
            s_bname = this.getAttribute("data-name");
            s_type = this.getAttribute("attr");
            s_tooltip = this.getAttribute("data-tooltip");
            set_itemCode = this.getAttribute("data-item-code");
            switchImagePath = this.getAttribute("data-path");
            
            switchPrice = this.getAttribute("data-price");

            document.getElementsByTagName("body")[0].style.cursor = "url('/img/cursor/switch-icon.cur'), auto";
    }
});

$("#product-container-Prise").on("click", ".single-item", function (e) {
    $("#drag").trigger("click");
});

function printCanvas() {
    var dataUrl = document.getElementById('draw-tool-canvas').toDataURL(); //attempt to save base64 string to server using this var
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Drawing</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    var printWin = window.open('', '', 'width=600,height=300');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
}

$('#elements').hide();

/* Controlls tool selection */
$('#tools input').change(function () {
    var val = $(this).val();

    switch (val) {
        case 'draw':
            $('#elements').show();
            toolAction = ToolActionEnum.DRAW;
            break;
        case 'scale':
            $('#elements').hide();
            toolAction = ToolActionEnum.SCALE;
            break;
        case 'drag':
            $('#elements').hide();
            toolAction = ToolActionEnum.DRAG;
            break;
        case 'pan':
            $('#elements').hide();
            toolAction = ToolActionEnum.PAN;
            break;
        case 'rotate':
            $('#elements').hide();
            toolAction = ToolActionEnum.ROTATE;
            break;
        default:
            $('#elements').hide();
    }

    console.log("Toola action is " + toolAction);
    drawAllObjects();
});


/* Controlls drawing element selection */
$('#elements input').change(function () {
    var val = $(this).val();

    switch (val) {
        case 'circle':
            drawObjectType = ObjectType.CIRCLE;
            break;
        case 'wall':
            drawObjectType = ObjectType.WALL;
            break;
        case 'cont_wall':
            drawObjectType = ObjectType.CONT_WALL;
            break;
        case 'bulb':
            drawObjectType = ObjectType.LIGHT_BULB;
            break;
        case 'switch':
            drawObjectType = ObjectType.LIGHT_SWITCH;
            break;
        case 'text' :
            drawObjectType = ObjectType.TEXT;
            break;
        case 'square':
        default:
            drawObjectType = ObjectType.SQUARE;
    }

    $('#tool-items-ul li').removeClass('active');
});

$(function () {
    $('#print').click(function () {
        window.print();
    });
    $('#draw').trigger('click');
    $('#square').trigger('click');

    /* Saves the current drawing to the file specified */
    $('#save-button').click(function () {

        var saveData = {
            metaData: {scaleFactor: scaleFactor},
            objectData: drawElements
        }

        var fileName = "drawtool.dtf";

        if (fileName != "") {
            $.ajax({
                type: 'POST',
                url: 'canvas/templates/updates',
                data: 'file_data=' + JSON.stringify(saveData),
                success: function (msg) {
                    new PNotify({
                        title: 'Data Saved',
                        title_escape: false,
                        text: 'Plan data saved',
                        text_escape: false,
                        styling: "bootstrap3",
                        type: "success",
                        icon: true,
                        addclass: "stack-bottomright",
                        delay:1500
                    });
                },
                error: function () {
                    alert('Network Error !');
                }
            });
        } else {
            alert('Please enter a file name');
        }
    });


    $('#price-vice').on('click', function () {
        


    });

    $('#product-vice').on('click', function () {
        alert('product');
    });

    $('#loadable_files').on('click', 'a', function () {
        var fileName = $(this).attr('data-file-name');
        loadSavedFile(fileName);
    });

    /* Clears the drawing space */
    $('#clear').click(function () {
        clearDrawElements();
    });

    $('#text-container button#text-ok').click(function () {
        createAndInsertTextObject();
    });

    $('#text-container button#text-cancel').click(function () {
        cancelTextEdit();
    });

    /* Zoom in and out control */
    $('.zoom-control').click(function () {
        var action = $(this).attr('data-action');

        switch (action) {
            case 'zoom-in':
                zoomIn();
                hideDialog();
                break;
            case 'zoom-out':
                zoomOut();
                hideDialog();
                break;
            case 'zoom-reset':
                zoomReset();
                break;
            default:
                alert('Invalid zoom option');
        }
    });

    /* Time control (Undo / Redo) */
    $('.time-control').click(function () {
        var action = $(this).attr('data-action');

        switch (action) {
            case 'undo' :
                undo();
                break;
            case 'redo' :
                redo();
                break;
            default:
                alert('Invalid time action');
        }
    });

    /* Scale up,down,reset control */
    $('.scale-item-control').click(function () {
        var action = $(this).attr('data-action');

        switch (action) {
            case 'scale-up':
                scaleUp();
                break;
            case 'scale-down':
                scaleDown();
                break;
            case 'scale-reset':
                scaleReset();
                break;
            default:
                alert('Invalid scale option');
        }
    });
});

/* Load a saved file */
function loadSavedFile(fileName) {
    $.ajax({
        type: 'POST',
        url: 'load_drawing.php',
        data: 'file_name=' + fileName,
        success: function (msg) {
            var fileDetails = JSON.parse(msg);

            clearDrawElements();

            var metaData = fileDetails.metaData;
            scaleFactor = metaData.scaleFactor;
            var objectData = fileDetails.objectData;

            $(objectData).each(function (i, e) {
                generateAndLoadObjectFromParams(e);
            });
            rePopulateConnectedBulbs();
            drawAllObjects();
        }
    });
}

$(function () {
    $.ajax({
        type: 'GET',
        url: 'canvas/templates/load-latest',
        success: function (msg) {
            var fileDetails = JSON.parse(msg);

            clearDrawElements();

            var metaData = fileDetails.metaData;
            //scaleFactor = metaData.scaleFactor;
            var objectData = fileDetails.objectData;

            $(objectData).each(function (i, e) {
                generateAndLoadObjectFromParams(e);
            });
            rePopulateConnectedBulbs();
            drawAllObjects();
        }
    });
});
/* Loads already saved files */
function showLoadableFiles() {
    $.ajax({
        type: 'POST',
        url: 'get_file_list.php',
        data: "",
        success: function (msg) {
            var files = jQuery.parseJSON(msg);
            var fileNames = [];

            $(files).each(function (i, e) {
                fileNames.push("<li><a href='#' class='load_file' data-file-name='" + e + "'>" + e + "</a></li>");
            });
            $('#loadable_files').html('');
            $('#loadable_files').append(fileNames.join(""));
        },
        error: function () {
            alert('Error loading files. Network Error!');
        }
    });
}

$('#mouse-action-menu li').click(function () {
    var selObjIndex = $(this).parent().attr('data-obj-index');
    console.log(" 1 => " + selObjIndex);
    var action = $(this).attr('data-action');

    switch (action) {
        case "cut":
            cut(selObjIndex);
            break;
        case "copy":
            copy(selObjIndex);
            break;
        case "paste":
            paste(selObjIndex);
            break;
        case "delete":
            deleteObj(selObjIndex);
            break;
        //(+)TBIRD - VB0.4 - START
        case "stop":
            performEscapeAction();
        case "clear":
            deleteObj(selObjIndex);
            break;
        default:
            break;
        //(+)TBIRD - VB0.4 - FINISH
    }
});

$('#can-tool-btn-save').click(function () {
    //console.log(this);
    var notes = $('#can-tool-product-note').val();
    if (notes != undefined) {
        addNoteToSelectedProduct(notes);    
    } 
});

$('#tool-items-ul a').click(function () {
    clearObjStatusesAndSetToDraw();
});


$("#sidebar").resizable();
$('#sidebar').resize(function() {
    $('#design-area').width($(window).width() - $("#sidebar").width());
    adjustCanvas();
 });
 

// Changing the canvas width and height according to window resize
$(window).resize(function () {
    $('#design-area').width($(window).width() - $("#sidebar").width());
    $('#sidebar').height($(window).height());
    adjustSidebar();
    adjustCanvas();
    drawAllObjects();
});

function adjustCanvas() {
    
    var canvas_offset = $(canvasOrig).offset();
    var width =  $(window).width() - canvas_offset.left -5;
    var height = $(window).height() - canvas_offset.top;
    rulerCanvas.width = width;
    rulerCanvas.height = height;
    canvasOrig.width = width;
    canvasOrig.height = height;
    canvas.width = width;
    canvas.height = height;
    bg_Canvas.width = width;
    bg_Canvas.height = height;
    era_canvas.width = width;
    era_canvas.height = height;

    $('#address-bar').width(width);
    $('#top-menu').width(width);

    $('#container').height(height);
    // adjustSidebar();
}

adjustSidebar()
function adjustSidebar(){
    $('#sidebar').height($(window).height());
    $('#main-pnnel-drag').height($(window).height() * 70 / 100);
    $('#bom-area').height($(window).height() * 30 / 100);

//    $('#bom-area').width($('#main-pnnel-drag').width());
    $('#bom-area').width($('#sidebar').width());
    $('#bom-table').width($('#sidebar').width());
    $('.body-main').css("height",($(window).height() * 70 / 100));
    $('#main-pannel-body').height( $('#main-pnnel-drag').height()-$('#main-hadder').height())
    //			document.getElementById("sidebar").setAttribute("style","height:"+screen.height+"px");
}
/*
$('#plans-button').click( function(){
    if ($('#temp-fileinput').length == 0) {
        $('<input id="temp-fileinput" type="file" name="somename" size="chars">').appendTo('body');

        $('#temp-fileinput').change(function(){
            var file = this.files[0];
            var reader = new FileReader();
            reader.onloadend = function(){
                setBackgroundImage(reader.result);
            }
            if(file){
                reader.readAsDataURL(file);
            }
        });
    }
    $('#temp-fileinput').hide();
    $('#temp-fileinput').click();
});*/

$(".toggle-button").click( function () {
    performEscapeAction()
})
