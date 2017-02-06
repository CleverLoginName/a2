/**
 * Created by ishara on 12/28/16.
 */
var currentPopupObj ;
var isHide =false;
var imgHight = 0;
var imgWidth =0;
var enteredCommentes;
var valuesAdded = false;
var commentValues = ['1. 2000mm AFL', 
                     '2. 1050mm AFL', 
                     '3. 600 AFL for Upright',
                     '4. 300MM AFL for Fireplace',
                     '5. 200MM AFL',
                     '6. For Ducted Heating in ceiling',
                     '7. CCTV-014 Camera with Small spacer for mounting onto brick work',
                     '8. CCTV-015 Camera with large spacer for mounting onto brick work',
                     '9. 600MM AFL FOR Dishwasher point',
                     '10. Microwave Point',
                     '11. On Ceiling for Garage Door Remote',
                     '12. Under Eaves',
                     '13. HOT WATER SESTEM',
                     '14. Oven',
                     '15. In Ceiling for Range hood',
                     '16. UNDER CORNICE',
                     '17. FOR SECURITY SYSTEM'];
comments = new Array();
function populateDialog(e,selObj1, xOffset, yOffset) {
    this.currentPopupObj =selObj1;
    lastConectedObj = currentPopupObj;
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
    itemPopupIds.push('#item-popup-conW');
    if(getConnection(selObj1.getUniqueItemID()).length > 0){
         itemPopupIds.push('#item-popup-remW');
         itemPopupIds.push('#item-popup-connections');
    }
    // if(selObj1.getConnections().length > 0){
    //     itemPopupIds.push('#item-popup-remW');
    // }
    // if(selObj1.getType()== ObjectType.LIGHT_SWITCH){
        
    // }
    
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


}



    $('#item-popup-conW').click(function(e) {
       //var selObj_new= getSelObject(startX, startY);
       drawControllPoint(currentPopupObj.getUniqueItemID(),false);
        if(currentPopupObj.getType() == ObjectType.LIGHT_SWITCH ||currentPopupObj.getType() == ObjectType.LIGHT_BULB || currentPopupObj.getType() == ObjectType.PRODUCT){
            isHide = false;
            lastConectedObj = currentPopupObj;
            toolAction = ToolActionEnum.CONNECT;
           // changeBulbMood();
            drawAllObjects();
        }
    });


    $('#item-popup-close').click(function() {
       //var selObj_new= getSelObject(startX, startY);
        drawControllPoint(currentPopupObj.getUniqueItemID(),false);
        removeEditMode()        
        hideItemPopups();
        drawAllObjects();
        isHide = true;
       // changeBulbMood();
        changeToolAction(ToolActionEnum.DRAG);

    });

    $('#item-popup-info').click(function(e) {
        //var selObj_new= getSelObject(startX, startY);
        removeEditMode();
        drawControllPoint(currentPopupObj.getUniqueItemID(),false);
        drawAllObjects();
        showCanvasProductTooltip(e);
        
        loadValues();


        $('#productIconModal').modal({
            show: true
        });
    });
    
    $('#item-popup-connections').click(function(e) {
        removeEditMode();
         toolAction = ToolActionEnum.CONNECTION;
         //var selObj_new= getSelObject(startX, startY);
         drawControllPoint(currentPopupObj.getUniqueItemID(),true);
         drawAllObjects();
    });


    $('#item-popup-remW').click(function(e) {
        isHide = false;
        //getConnectedBulbs();
        changeConnectedObjColour(currentPopupObj);
        //var selObj_new= getSelObject(startX, startY);
        toolAction = ToolActionEnum.REMOVE_CONNECTION;
        drawControllPoint(currentPopupObj.getUniqueItemID(),false);
        drawAllObjects();
    });


    function changeBulbMood() {
        for (var i = productDataArray.length - 1; i >= 0; i--) {
            if (productDataArray[i].objType == ObjectType.LIGHT_BULB) {
                //drawElements[i].setConectingMood(type);
                if(isHide){
                    productDataArray[i].setConectingMood(false);
                } else {
                    if(lightBulbConnected(productDataArray[i].getLabel())){
                        productDataArray[i].setConectingMood(false);
                    }else{
                        productDataArray[i].setConectingMood(true);
                        productDataArray[i].setSelectionColour('#008000');
                    }
                }
            }
        }
    }
    
     
    $('#savevalues').click(function (e) {

        var d = new Date();

        var date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');

        var listValue = document.getElementById('displayvalues').value;
       // comments.unshift(date+' - '+listValue);
       if(!valuesAdded){
           enteredCommentes = selObj.getNotes();
           valuesAdded = true;
       }
        if (listValue != '') {
            enteredCommentes += date + ' - ' + listValue + "\n";
            selObj.notes = enteredCommentes;
//        var notes = selObj.getNotes();
//        notes.unshift(date+' - '+listValue);

            var textarea = document.getElementById("display_notes");
            textarea.value = enteredCommentes;//.join("\n");
            document.getElementById('displayvalues').value = "";
        }

    });
    
    function loadValues() {
        
        var list = document.getElementById('comments');
        list.innerHTML = '';
        //mycars.forEach(function (item) {

        for (var i = 0; i <commentValues.length; i++) {
            var option = document.createElement('option');
            option.value = commentValues[i];
            option.innerHTML = commentValues[i];
            list.appendChild(option);
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
        for (var i = productDataArray.length - 1; i >= 0; i--) {
            if (productDataArray[i].objType == ObjectType.LIGHT_BULB) {
                if(isHide){
                    productDataArray[i].setConectingMood(false);
                } else {
                    if(lightBulbConnected(productDataArray[i].getLabel())){
                        productDataArray[i].setConectingMood(true);
                        productDataArray[i].setSelectionColour('#FF0000');
                    }else{
                        productDataArray[i].setConectingMood(false);
                    }
                }
            }
        }
    }

function changeConnectedObjColour(objSourse){
	for (var i = productDataArray.length - 1; i >= 0; i--) {
        if(productDataArray[i].objType == ObjectType.CONNECT){
            if(productDataArray[i].getsourseId() == objSourse.getUniqueItemID()){
                var objectsConected =getObjectFromId(productDataArray[i].getsdestinationId());
                objectsConected.setConectingMood(true);
                objectsConected.setSelectionColour('#FF0000');
            //|| drawElements[i].getsdestinationId() == objSourse.getUniqueItemID()){
				
			}else if(productDataArray[i].getsdestinationId() == objSourse.getUniqueItemID()){
                var objectsConected =getObjectFromId(productDataArray[i].getsourseId());
                objectsConected.setConectingMood(true);
                objectsConected.setSelectionColour('#FF0000');
            }
		}
	}
	
}


function removeEditMode(){
	for (var i = productDataArray.length - 1; i >= 0; i--) {
		if(productDataArray[i].objType == ObjectType.LIGHT_BULB || productDataArray[i].objType == ObjectType.LIGHT_SWITCH || productDataArray[i].objType == ObjectType.PRODUCT){
			productDataArray[i].setConectingMood(false);
		} else if(productDataArray[i].objType == ObjectType.CONNECT){
            productDataArray[i].setIsActive(false);
        }
	}
}

function hideItemPopups() {
    $('.item-popup').hide();
     removeEditMode();
}



