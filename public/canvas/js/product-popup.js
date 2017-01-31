/**
 * Created by ishara on 12/28/16.
 */
selObj ;
var isHide =false;
var imgHight = 0;
var imgWidth =0;
function populateDialog(e,selObj1, xOffset, yOffset) {
    this.selObj =selObj1;
    var canvas_offset = $(canvasOrig).offset();
    var center = getConvertedPoint(selObj1.getCenter());
    center.x += canvas_offset.left;
    center.y += canvas_offset.top;
    hideItemPopups();
    if(imgHight == 0 && imgWidth == 0){
        imgHight = $('.image-background').height();
        imgWidth =$('.image-background').width();
    }
    $('.image-background').height(imgHight*zoom).width(imgWidth*zoom);

    var itemPopupIds = [];
    itemPopupIds.push('#item-popup-close');
    itemPopupIds.push('#item-popup-info');
    if(selObj1.getConnections().length > 0){
        itemPopupIds.push('#item-popup-remW');
    }
    if(selObj1.getType()== ObjectType.LIGHT_SWITCH){
        itemPopupIds.push('#item-popup-conW');
    }
    
    var theta_step = Math.PI / 6;
    if (itemPopupIds.length > 3) {
        theta_step = Math.PI / (2*itemPopupIds.length);
    }

    var radius = 60;
    var theta = 0;
    var x,y;
    for (var index = 0; index < itemPopupIds.length; index++) {
        theta += theta_step;
        x = center.x + (radius * Math.cos(theta) - imgWidth / 2) * zoom;
        y = center.y - (radius * Math.sin(theta) + imgHight / 2) * zoom;
        $(itemPopupIds[index]).css({ top: y , left:  x});
        $(itemPopupIds[index]).show();
        $(itemPopupIds[index]).addClass('animated bounceIn');
        theta += theta_step;
    }

    $('#item-popup-conW').click(function(e) {
       var selObj_new= getSelObject(startX, startY);
        if(selObj_new.getType() == ObjectType.LIGHT_SWITCH){
            isHide = false;
            toolAction = ToolActionEnum.CONNECT;
            changeBulbMood();
            drawAllObjects();
        }
    });


    $('#item-popup-close').click(function() {
        hideItemPopups();
        isHide = true;
        changeBulbMood();
        toolAction = ToolActionEnum.DRAG;
    });

    $('#item-popup-info').click(function(e) {
        showCanvasProductTooltip(e);
    });



    $('#item-popup-remW').click(function(e) {
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

    // function changeBulbMood() {
    //     for (var i = drawElements.length - 1; i >= 0; i--) {
    //         if (drawElements[i].objType == ObjectType.LIGHT_BULB) {
    //               if(lightBulbConnected(drawElements[i].getLabel())){
    //                     drawElements[i].setConectingMood(false);
    //                 }else{
    //                     drawElements[i].setConectingMood(true);
    //                     //drawElements[i].setSelectionColour('#008000');
    //                 }
    //         }
    //     }
    // }

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



function hideItemPopups() {
    $('.item-popup').hide();
}



