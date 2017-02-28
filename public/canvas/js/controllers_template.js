// icons actions
var projcetComments = '';
var isFirstTime = false;

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
    hideItemPopups();
    document.getElementsByTagName("body")[0].style.cursor = "pointer";
});


// proj-comment-button
$('#proj-comment-button').click(function () {
    var commentValue = document.getElementById('project_comment_area').value;
    projcetComments += combinateData(commentValue);
    $('#project_comment_popup').modal({
        show: true,
    });
    if(isFirstTime){
        $('.note-fontsize').prepend('<div style="float:left;padding-right:5px;padding-top:5px">Font </div>');
        isFirstTime = false;
    }
 
});


$('#add-text').click(function () {
    showPlanCommentDialog();
    // toolAction = ToolActionEnum.DRAW;
    // drawObjectType = ObjectType.TEXT;
    // document.getElementsByTagName("body")[0].style.cursor = "text";
});

$("#undo").on("click", function () {
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    undo();
});

$("#redo").on("click", function () {
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    redo();
});
/*
$('#print-btn').click(function () {
    document.getElementsByTagName("body")[0].style.cursor = "auto";
    printCanvas();
});*/
// icons actions end


function showPlanCommentDialog(){
	var text= "";
	var  fontSize_arr = [8,10,12,14,15,16,18,20,22,25];

    var sel = document.getElementById("text-container-fontsize");
    sel.innerHTML = "";
    fontSize_arr.forEach(function (e){
        var option = document.createElement("option");
        option.text = e + " pt";
        option.value = e;
        sel.add(option);
    })
    sel.value = 15;
	$('#type-text').val(text).focus();

	// $('#text-container').show();
    $('#text-container').modal({
        show: true
    });
}



function getFullCanvas(){
    var fullCanvas = document.createElement('canvas');
    var fullctx = fullCanvas.getContext('2d');
    var fullCanvasHelper = new CanvasHelper();

    if (backgroundImage != undefined){
        fullCanvas.width = backgroundImage.width;
        fullCanvas.height = backgroundImage.height;
        fullctx.drawImage(backgroundImage, 0, 0);
    } else {
        fullCanvas.width = canvasOrig.width;
        fullCanvas.height = canvasOrig.height;
    }

    //Eraser sould be drawen before walls and products
	for (var i = 0; i < floorplanDataArray.length; i++) {
		var element = floorplanDataArray[i];
        if (element.getType() == ObjectType.ERASER){
            element.draw(fullctx, fullCanvasHelper);
        }
	}

    for (var i = 0; i < floorplanDataArray.length; i++) {
		var element = floorplanDataArray[i];
        if (element.getType() != ObjectType.ERASER){
            element.draw(fullctx, fullCanvasHelper);
        }
	}

	for (var i = 0; i < productDataArray.length; i++) {
		var element = productDataArray[i];
		element.draw(fullctx, fullCanvasHelper);
	}

    return fullCanvas;
}

function printCanvas() {
    var bom_deta = getBomDictionary(drawElements);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    var hour = today.getHours(); 
    var mins = today.getMinutes()
    printTime = hour+':'+mins;
    today = mm+'/'+dd+'/'+yyyy;
   /* html2canvas($("#productInfo"), {
        onrendered: function(canvas) {
            dataUrl = canvas.toDataURL();
            var windowContent = '<!DOCTYPE html>';
            windowContent += '<html>'
            windowContent += '<head><title>Drawing</title></head>';
            windowContent += '<body>'
            windowContent += '<img src="' +dataUrl+ '">'; 
            windowContent += '</body>';
            windowContent += '</html>';
            printWin.document.open();
            printWin.document.write(windowContent);
            printWin.document.close();
            printWin.focus();
            printWin.print();
            printWin.close();
            }
        });*/
   var dataUrl = getFullCanvas().toDataURL("image/png"); //attempt to save base64 string to server using this var
    var tableContent = '<table id="productInfo_print" style="width:100%;">'
                            +'<tr>'
                            +'<th class ="print-bom-hedder" style=" background-color: #e2383f !important; color: white;-webkit-print-color-adjust: exact;">Name</th>'
                            +'<th class ="print-bom-hedder">Unit Price ($)</th>'
                            +'<th class ="print-bom-hedder">Quantity</th>'
                            +'<th class ="print-bom-hedder">Total Price ($)</th>'
                            +'</tr>';
    for(item in bom_deta){
        var row = '<tr>';
        row += '<td>'+ bom_deta[item].name+'</td>'
        row += '<td>'+ bom_deta[item].unit_price+'</td>'
        row += '<td>'+ bom_deta[item].qty+'</td>'
        row += '<td>'+ bom_deta[item].tot_price+'</td>'
        tableContent += row;
    } 
    tableContent += '</table>';

    var windowContent = '<!DOCTYPE html>'
                        +'<html>'
                            +'<head><title>Bill Of Materials</title>'
                                +'<style>'
                                    +'.print-bom-hedder{'
                                        +' background-color: #e2383f !important;'
                                        +' color: white !important;'
                                        +'-webkit-print-color-adjust: exact;'
                                    +'}'
                                    +'table {'
                                        +'border-collapse: collapse;'
                                        +'width: 100%;'
                                        +'-webkit-print-color-adjust: exact;'
                                    +'}'
                                    +'th, td {'
                                        +'text-align: left;'
                                        +'padding: 8px;'
                                        +'-webkit-print-color-adjust: exact;'
                                    +'}'
                                    +'tr:nth-child(even){'
                                        +'background-color: #f2f2f2;'
                                        +'-webkit-print-color-adjust: exact;'
                                    +'}'
                                    +'.image-print {'
                                        +'float: right;'
                                        +' width: 200px;'
                                        +' height: 50px;'
                                        +'-webkit-print-color-adjust: exact;'
                                    +'}'
                                    +'.braker-div{'
                                        +' width: 100%;'
                                        +' height: 1px;'
                                        + ' background-color: black;'
                                        +'-webkit-print-color-adjust: exact;'
                                    +' } '
                                +'</style>' 
                            +'</head>'
                                +'<body id="print_boddy" class="print-body">'
                                    +'<div>'
                                        +'<img class="image-print" src="/img/img_logo.png"><br/><br/><br/>'
                                        +' <div class="braker-div"></div>'
                                    +'</div><br/>'
                                    +'<div>'
                                        +'<table id="productInfo_print" style="width:100%;">'
                                            +'<tr>'
                                                +' <td>'
                                                    +' <div><b>Client Name :</b> '+clientName+'</div>'
                                                    +'<div><b>Project Address :</b> '+clientAdddress+'</div>'
                                                    +'<div><b>Project  :</b> '+projectName+'</div>'
                                                    +' <div><b>Consultant :</b> '+consultentName+' </div>'
                                                +' </td>'
                                                +'<td>'
                                                    +' <div style="float: right;">'
                                                        +'<div><b>Printout Date :</b> '+today+'</div>'
                                                        +'<div><b>Time :</b> '+printTime+'</div>'
                                                        +' <div><b>Version  :</b> '+printVersion+'</div>'
                                                    +' </div>'
                                                +' </td>'
                                            +' </tr>'
                                        +'</table>'
                                        +'<div class="braker-div"></div><br/>'
                                    +'</div>'
                                    +tableContent
                                     + '<img src="' + dataUrl + '">';
                                +'</body>'
                        +'</html>';   
    var printWin = window.open('', '', 'width=1000,height=900');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    setTimeout(function() {
    printWin.print();
    printWin.close();
}, 750);
    // printWin.print();
    // printWin.close();
}

$(function () {
    $('#print').click(function () {
        window.print();
    });
    $('#draw').trigger('click');
    $('#square').trigger('click');

    /* Saves the current drawing to the file specified */
    $('#save-button').click(function () {

        var print_dataUrl = getFullCanvas().toDataURL("image/png");
        var saveData = {
            // metaData: { scaleFactor: scaleFactor },
            products: { data: productDataArray, isChanged: isProductDataChanged , lastCommentIndex: productCommentIndex},
            floorplan: { data: floorplanDataArray, isChanged: isFloorplanDataChanged, printable_plan: print_dataUrl },
            project: { data: projectDataArray, isChanged: isProjectDataChanged,proj_comments:projcetComments },
            _token:'',
            template_floor_catalog_design_id:template_floor_catalog_design_id
        }


        var fileName = "drawtool.dtf";

        if (fileName != "") {
            $.ajax({
                type: 'POST',
                url: 'canvas/templates/updates',
                data: 'file_data=' + JSON.stringify(saveData),
                success: function (msg) {
                    new PNotify({
                        title: 'Plan Saved',
                        title_escape: false,
                        text: 'Plan saved',
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

    $('#text-container input#text-ok').click(function () {
        createAndInsertTextObject();
    });
//todo
    $('#text-container input#text-cancel').click(function () {
        cancelTextEdit();
    });

    /* Zoom in and out control */
    $('.zoom-control').click(function () {
        var action = $(this).attr('data-action');

        switch (action) {
            case 'zoom-in':
                zoomIn();
                hideItemPopups();
                break;
            case 'zoom-out':
                zoomOut();
                hideItemPopups();
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

            var productData = fileDetails.products.data;
            var floorplanData = fileDetails.floorplan.data;
            var projectData = fileDetails.project.data;
            projcetComments  = fileDetails.project.proj_comments;
            productCommentIndex = fileDetails.products.lastCommentIndex; 

            productData.forEach( generateAndLoadObjectFromParams );
            floorplanData.forEach( generateAndLoadObjectFromParams );
            projectData.forEach( generateAndLoadObjectFromParams );
            rePopulateConnectedBulbs();
            drawAllObjects();
        }
    });
}

$(function () {
    $.ajax({
        type: 'GET',
        url: 'canvas/templates/load-latest',
        data: 'template_floor_catalog_design_id=' + template_floor_catalog_design_id,
        success: function (msg) {
            var fileDetails =  msg;
            clearDrawElements();

            var metaData = fileDetails.metaData;
            //scaleFactor = metaData.scaleFactor;
            var productData = JSON.parse(fileDetails.products.data);
            var floorplanData = JSON.parse(fileDetails.floorplan.data);
            var projectData = JSON.parse(fileDetails.project.data);
            projcetComments  = fileDetails.project.proj_comments;
            productCommentIndex = fileDetails.products.lastCommentIndex;

            productData.forEach( generateAndLoadObjectFromParams );
            floorplanData.forEach( generateAndLoadObjectFromParams );
            projectData.forEach( generateAndLoadObjectFromParams );
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

$('#tool-items-ul a').click(function () {
    clearObjStatusesAndSetToDraw();
});


$("#sidebar").resizable();
$('#sidebar').resize(function() {
    adjustDesignArea();
 });
 

// Changing the canvas width and height according to window resize
$(window).resize(function () {
    $('#sidebar').height($(window).height());
    adjustSidebar();
    resizeSidebarContent();
    adjustDesignArea();
    drawAllObjects();
});

function adjustDesignArea(){
    var tol = 3;
    $('#design-area').width($(window).width() - $("#sidebar").width() -tol);
    $('#design-area').height($(window).height() - 1);
    $('#design-area').css({top:0, left: $("#sidebar").width()});    
    adjustCanvas();    
}

function adjustCanvas() {
    
    var canvas_offset = $(canvasOrig).offset();
    //var width =  $(window).width() - canvas_offset.left -5;
    var width =  $('#design-area').width();
    var height = $('#design-area').height() - canvas_offset.top;
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
    drawBackgroundImage();
}

adjustSidebar()
function adjustSidebar(){
    var height = $(window).height() - 1;
    $('#sidebar').height(height);
     $('#main-pnnel-drag').height(height * 90 / 100);
    // $('#bom-area').height(height * 30 / 100);
    $('#main-pannel-body').height( $('#main-pnnel-drag').height()-$('.main-title').height());
    $('#bom-area').width($('#sidebar').width());
    $('#bom-table').width($('#sidebar').width());
}

$(".toggle-button").click( function () {
    performEscapeAction()
})

$(document).ready(function() { 
    showTopIcons();
    isFirstTime = true;
    $('#project_comment_area').summernote({
        height: 70,                 // set editor height
        minHeight: 70,             // set minimum height of editor
        maxHeight: 400,             // set maximum height of editor
        focus: true,             // set focus to editable area after initializing summernote
        toolbar: [
            // [groupName, [list of button]]
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline']],
            ['para', ['ul', 'ol']]
        ],
        fontSizes: ['8', '9', '10', '11', '12', '15', '16', '17', '18' , '19', '20'],
        placeholder: 'Type your new comment here...'
    });
   $('#project_comment_area').summernote('fontSize', 12);
    $('#project_comment_display').summernote({
        height: 363,                 // set editor height
        minHeight: 363,             // set minimum height of editor
        maxHeight: 363,             // set maximum height of editor
        focus: true,             // set focus to editable area after initializing summernote
        toolbar: [
        ]
    });
    $('#project_comment_display').summernote('disable');
    // $('#project_comment_display').summernote('lineHeight', 0.9);

});


function showTopIcons() {
    $('.top-menu-item').show();
}

$(document).on({
    ajaxStart: function () { $("body").addClass("loading"); },
    ajaxStop: function () { $("body").removeClass("loading"); }
});