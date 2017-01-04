/**
 * Created by ishara on 12/28/16.
 */
selObj ;
var isHide =false;
var imgHight = 0;
var imgWidth =0;
function populateDialog(e,selObj1) {
    this.selObj =selObj1;
    var canvas_offset = $(canvasOrig).offset();
    var width =  $(window).width() - canvas_offset.left;
    var height = $(window).height() - canvas_offset.top;

    var center = selObj1.getCenter();
    center.x = center.x*zoom + canvas_offset.left;
    center.y = center.y*zoom + canvas_offset.top;
    hideDialog();
    if(imgHight == 0 && imgWidth == 0){
        imgHight = $('.image-background').height();
        imgWidth =$('.image-background').width();
    }
    $('.image-background').height(imgHight*zoom).width(imgWidth*zoom);
    $('#item-popup').css({ top: center.y-50*zoom , left:  (center.x)-40*zoom});//.slideDown();
    $('#item-popup1').css({ top: center.y-50*zoom, left: center.x+10*zoom});//.slideDown();
    $('#item-popup2').css({ top: center.y-15, left:  center.x+30*zoom});//.slideDown();
    $('#delete-item').css({ top: center.y-15*zoom, left:  center.x-60*zoom});
    $('.item-popup').show();
    if(selObj1.getType()== ObjectType.LIGHT_BULB){
        $('#item-popup').hide();
        $('#item-popup1').css({ top: center.y-50*zoom, left: center.x-15*zoom});
    }
    $('#item-popup').addClass('animated bounceIn');
    $('#item-popup1').addClass('animated bounceIn');
    $('#item-popup2').addClass('animated bounceIn');
    $('#delete-item').addClass('animated bounceIn');


    $('#item-popup').click(function(e) {
       var selObj_new= getSelObject(startX, startY);
        if(selObj_new.getType() == ObjectType.LIGHT_SWITCH){
            isHide = false;
            toolAction = ToolActionEnum.CONNECT;
            changeBulbMood();
            drawAllObjects();
        }
    });


    $('#item-popup2').click(function() {
        hideDialog();
        isHide = true;
        changeBulbMood();
        toolAction = ToolActionEnum.DRAG;
    });

    $('#item-popup1').click(function(e) {
        showCanvasProductTooltip(e);
    });



    $('#delete-item').click(function(e) {
        isHide = false;
        getConnectedBulbs();
        toolAction = ToolActionEnum.REMOVE_CONNECTION;
        drawAllObjects();
    });


    function changeBulbMood() {
        for (var i = drawElements.length - 1; i >= 0; i--) {
            if (drawElements[i].objType == ObjectType.LIGHT_BULB) {
                //drawElements[i].setConectingMood(type);
                if(isHide){
                    drawElements[i].setConectingMood(false);
                } else {
                    if(lightBulbConnected(drawElements[i].getLabel())){
                        drawElements[i].setConectingMood(false);
                    }else{
                        drawElements[i].setConectingMood(true);
                        drawElements[i].setSelectionColour('#008000');
                    }
                }
            }
        }
    }
    function getConnectedBulbs() {
        for (var i = drawElements.length - 1; i >= 0; i--) {
            if (drawElements[i].objType == ObjectType.LIGHT_BULB) {
                if(isHide){
                    drawElements[i].setConectingMood(false);
                } else {
                    if(lightBulbConnected(drawElements[i].getLabel())){
                        drawElements[i].setConectingMood(true);
                        drawElements[i].setSelectionColour('#FF0000');
                    }else{
                        drawElements[i].setConectingMood(false);
                    }
                }
            }
        }
    }
}



function hideDialog() {
    $('.item-popup').hide();
}



