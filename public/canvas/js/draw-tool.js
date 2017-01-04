var isIE = false;
var isCtrlPressed = false;
var isAltPressed = false;
var isAngleSnappingOn = true;
var isGridSnappingOn = false;
var backgroundImage; 
var showSelectedObjects =false;
var drawelementListChanged =false;
var lastConectedObj;
var selectedSwitchObject;
var eraserSeg = null;

var MouseActionEnum = {
	NONE:1,
	CUT:2,
	COPY:3	
}

var MouseStatusEnum = {
  UP: 1, //Normal un-clicked 
  DOWN: 2, // Clicked down
  DRAG: 3, // Move an object
  DRAW:4, // DRAWING an object,
  CONT_DRAW:5, //DRAWING A WALL - IN THE MIDDLE OF DRAWING,
  PAN: 6, // Panning
  ROTATE:7,
  ERASE: 8
};

var ToolActionEnum = {
	DRAW:1,
	DRAG:2,
	SCALE:3,
	PAN:4,
	EDITTEXT:5,
	ROTATE:6,
	ERASE:7,
    CONNECT:9,
	REMOVE_CONNECTION:10
}

var MouseButtonEnum = {
	LEFT:1,
	RIGHT:3
}



var lightBulbArr = []; /* Holds the light bulbs */
var connectedLightBulbLabels = []; /* Holds the connected light bulb labels to avoid re-adding */
var switchConnectedBulbLabelsInCurrentTimeState = []; /* This is useful in undo / redo. We keep track which bulbs are connected to switches in the current status */
var panObjectOffsets = [];
var mouseAction = MouseActionEnum.NONE;
var memObject = null;
var canToolTip = true;

/* curZoom holds the current zoom ratio. Originally it is 1 and has increments/decrements of 0.05 */
var zoom = 1;
var minZoom = 0.25;

var mouseStatus = MouseStatusEnum.UP;
var toolAction = ToolActionEnum.DRAG;
var drawObjectType = ObjectType.WALL;

var drawElements = [];
var drawElementsStack = []; /* Used to track the object history for undo / redo */
var deletedElements = [];


var startX, startY, endX, endY;
var clickX, clickY, offsetX, offsetY; // For drag objects
var selObj, scaleObj, scaleDirection, rotateObj, tmpInitialRotation, selObjCenter;
var wallThickness = 10;
var currentCWallPoints = new Array();

// Eraser related
var currentMasterEraserPoints = new Array();
var currentEraserPoints = new Array();
var eraserColor = '#ffffff';
var eraserSize = 15;
var eraserType = 'round';

var clickTimeout = 1000; /* in milli seconds */
var checkDoubleClick = 0;

var isErasing = false;

var scaleFactor = 1; /* Scale of the map. This get changes when user scales up or down the map */
var scaleItemSelTrigger =false; /* Flag to identify whether the click is to select the scaleing object. Useful to ommit it on undo operations */
var currentTimeIndex = 0; /* Index of drawElement we draw upto. This value changes when undo / redo */

var	rotateObjInitAngle = 0;
var rotateOffsetAngle = 0;


/* Continuous wall realted variables */

var wallPointsCount = 0;

/* End of Continuous wall related variables */

/* Ruler related variables */
	
	var mmMarkingHeight = 10;
	var cmMarkingHeight = 30;
	
	var rulerHeight = 0 ;
	var rulerWidth = 0;
	
	var rulerOrigOffsetX = 0; /* Not mandatory to keep these two vars */
	var rulerOrigOffsetY = 0;
	
	var rulerOffsetX = 0;
	var rulerOffsetY = 0;
	
	var mmLineWidth = 1;
	var mmLineColor = 'rgba(206, 206, 206, 0.3)';
	
	var cmLineWidth = 1;
	var cmLineColor = 'rgba(206, 206, 206, 0.8)';
	
	
/* end of ruler related vars */
 
/* Initializing of the script.
 * Defines the contexts. There are two canvases. One for dynamic drawing and one to draw already driven elements.
 * Defines mouse related event listeners */
 
function init(){
	
	// $('#design-area').width($(window).width()-275);
	// $('#ruler-canvas').width($(window).width()-275);
	// $('#bg-canvas').width($(window).width()-275);
	// $('#draw-tool-canvas').width($(window).width()-275);
	// $('#top-canvas').width($(window).width()-275);
	// $('#top-menu').width($(window).width()-275);
	// //$('#sidebar').height($(window).height());
	// $('#sidebar').height($(window).height());
	
	//var topCanvasWidth = $('#draw-tool-canvas').width();
	//alert(aa);
	
	checkIE();

	canvasOrig = document.getElementById('draw-tool-canvas');
	contextOrig = canvasOrig.getContext("2d");
	contextOrig.strokeStyle = "#0000FF";
	
	rulerCanvas = document.getElementById('ruler-canvas');
	rulerContext = rulerCanvas.getContext("2d");
	
	var container = canvasOrig.parentNode;
	canvas = document.createElement('canvas');
	canvas.id = "top-canvas";

	bg_Canvas = document.getElementById("bg-canvas");
        era_canvas = document.getElementById("era-canvas");
	
	adjustCanvas();	
  $("#draw-tool-canvas").removeClass("hide-canvas");
// canvas resizing end

    var container = canvasOrig.parentNode;
    canvas = document.createElement('canvas');
    canvas.id = "top-canvas";
    canvas.width = canvasOrig.width; // -by UIUX //edited again
    //canvas.width = topCanvasWidth;    // + by UIUX
    canvas.height = canvasOrig.height;

    container.appendChild(canvas);
    context = canvas.getContext('2d');
    context.strokeStyle = "#FF0000";
	
	canvas.addEventListener("mousedown", function (e) {
		mouseDown(e);
	}, false);

	canvas.addEventListener("mouseup", function (e) {
		mouseUp(e);
		canToolTip = true;
	}, false);

	canvas.addEventListener("mousemove", function (e) {
		mouseMove(e);
	}, false);
	
	canvas.addEventListener("mouseout", function (e) {
		mouseOut(e);
	}, false);	
	
	canvas.addEventListener("contextmenu", function (e) {
		contextMenu(e);
		return true;
	}, false);	

    canvas.addEventListener("dblclick", function (e){ 
        performEscapeAction();
        mouseDoubleClick(e);
        return true;
    }, false);

	
	preloadAndCacheImages(['img/lightdemo.png','img/swtichdemo.PNG']);
	drawAllObjects();
	drawBackgroundImage();
}




$("body").on("contextmenu", "canvas", function(e) {
  return false;
});

/* Handles what happens on a right click */
function contextMenu(e){
	hideDialog();
	var curZoom = this.zoom;
	startX = getX(e);
	startY = getY(e);
	
	var selObjIndex = getSelObjectIndex(startX, startY);
	
	if (selObjIndex != null){
		$('#mouse-action-menu').attr('data-obj-index',selObjIndex);
	} else {
		if (mouseAction == MouseActionEnum.NONE){
			$('#mouse-action-menu').attr('data-obj-index',"-1");
		}
	}
	
	$('#mouse-action-container').css('left', startX).css('top', startY);
	$('#mouse-action-container').attr('left', startX).attr('top', startY);
	
	if (selObjIndex != null){
		$('#mouse-action-menu li').removeClass('inactive');
		
		if ((mouseAction != MouseActionEnum.COPY) && (mouseAction != MouseActionEnum.CUT)){
			$('#paste').addClass('inactive');
		}
		
	} else {
		$('#mouse-action-menu li').addClass('inactive');
		if ((mouseAction == MouseActionEnum.COPY) || (mouseAction == MouseActionEnum.CUT)){
			$('#paste').removeClass('inactive');
		}
	}
	
	$('#mouse-action-container').show();
	return false;
}

/* IE detects which button clicked by using e.button property. Web browsers use 
 * e.which property. To make it universal, the following fix is implemented and called before 
 * everytime we compare the e.which property.
 */
function fixWhich(e) {
  if (!e.which && e.button) {
    if (e.button & 1) e.which = 1      // Left
    else if (e.button & 4) e.which = 2 // Middle
    else if (e.button & 2) e.which = 3 // Right
  }
}



function mouseDoubleClick(e){
    // fixWhich(e);
    // if (e.which != 1) return false;
    // $('#mouse-action-container').hide();
    // var curZoom = this.zoom;

    // startX = getX(e);
    // startY = getY(e);

    // selObj = getSelObject(startX, startY);

    // if (selObj != null){
    // 	alert(selObj.getCatType());
	// }
    // if (toolAction == ToolActionEnum.ERASE) {

    // }
}

        /* Handles what happens when mouse down.
         *
         * When draw - it marks the starting points to draw the object
         * When drag and scale - it selects the object
         *
         *  */
function mouseDown(e){
	fixWhich(e);
	if (e.which != 1) return false;
	$('#mouse-action-container').hide();
	var curZoom = this.zoom;
	mouseStatus = MouseStatusEnum.DOWN;
	
	startX = getX(e);
	startY = getY(e);
	
	if (toolAction == ToolActionEnum.ERASE){		
		var eraX = startX / curZoom;
		var eraY = startY / curZoom;
		eraserSeg = new Eraser();
		eraserSeg.setErasePoints(eraX,eraY);	
	}

	if (toolAction == ToolActionEnum.DRAW){
		if (drawObjectType == ObjectType.CONT_WALL){
			mouseStatus = MouseStatusEnum.CONT_DRAW;
			console.log("MS "+mouseStatus, "SX=",startX, "SY=",startY);
			var startX_fixed = startX / curZoom;
			var startY_fixed = startY / curZoom;
			wallPointsCount = wallPointsCount + 1;
			// currentCWallPoints.push({x:startX_fixed, y:startY_fixed});
			var filtered_pnt = getFilteredCoordinates(currentCWallPoints, startX_fixed, startY_fixed);
			currentCWallPoints.push(filtered_pnt);
	
			if (wallPointsCount == 2) {
				currentObj = new CWall();
				currentObj.setVertices(currentCWallPoints);
				var lastX = currentCWallPoints[currentCWallPoints.length - 1].x;
				var lastY = currentCWallPoints[currentCWallPoints.length - 1].y;
				currentCWallPoints.splice(0);
				pushElementToDrawElement(currentObj);
				//~ mouseStatus = MouseStatusEnum.UP;
				wallPointsCount = 1;
				// currentCWallPoints.push({x:startX_fixed, y:startY_fixed});
				currentCWallPoints.push({x:lastX, y:lastY});
			}
			drawAllObjects();
		} else {
			mouseStatus = MouseStatusEnum.DRAW;
			currentCWallPoints.splice(0); /* Clears any already added points in a continuous array */
		}
		
	} else if (toolAction == ToolActionEnum.DRAG){
		canToolTip = false;
		/* Need to find out the object user is trying to move */
		selObj = getSelObject(startX, startY);
		showSelectedObjects = true;
		/* create the changeObj and save obj and initial params */
		
		if (selObj != null){
			changeObj = new ChangeObject(selObj);
			
			mouseStatus = MouseStatusEnum.DRAG;
			hideDialog();
			clickX = startX / curZoom;
			clickY = startY / curZoom;
			if (selObj.getType() == ObjectType.TEXT){
				offsetX = (selObj.getObjStartX() - (startX / curZoom));
				offsetY = (selObj.getObjEndY() - (startY / curZoom));
			} else {
				offsetX = (selObj.getObjStartX() - (startX / curZoom));
				offsetY = (selObj.getObjStartY() - (startY / curZoom));
			}
			
		} 
	} else if (toolAction == ToolActionEnum.PAN){
		mouseStatus = MouseStatusEnum.PAN;
		clickX = startX / curZoom;
		clickY = startY / curZoom;
		
		/* We need to store all the offsets of objects w.r.t. the mouse click location */
		panObjectOffsets = [];
		for (var i=0; i< drawElements.length; i++){
			selObj = drawElements[i];
			
			if (!(selObj instanceof CanvasItem)) continue;
			
			if (selObj.getType() == ObjectType.TEXT){
				offsetX = (selObj.getObjStartX() - (startX / curZoom));
				offsetY = (selObj.getObjEndY() - (startY / curZoom));
			}else if (selObj.getType() == ObjectType.ERASER){
				offsetX = (selObj.getObjStartX() - (startX / curZoom));
				offsetY = (selObj.getObjStartY() - (startY / curZoom));				
			} else {
				offsetX = (selObj.getObjStartX() - (startX / curZoom));
				offsetY = (selObj.getObjStartY() - (startY / curZoom));
			}
			panObjectOffsets.push({id:i, offsetX:offsetX, offsetY:offsetY});
		}
		
		/* Set ruler offset */
		rulerOrigOffsetX = rulerOffsetX;
		rulerOrigOffsetY = rulerOffsetY;
		
	} else if (toolAction == ToolActionEnum.SCALE){
		var tmpGotSelObj = false;
		selObj = getSelObject(startX, startY);
		if (selObj != null){
			clearObjStatusesAndSetToDraw();
			selObj.setStatus(ObjectStatus.SCALE);
			tmpGotSelObj = true;
		} 
		scaleObj = getScalingObject();
		if ((scaleObj != null)){
			scaleDirection = scaleObj.getScaleDirection(startX / curZoom, startY/curZoom);
			if (scaleDirection != null){
				changeObj = new ChangeObject(scaleObj); /* Scaling of object, so record the change */
				clickX = startX / curZoom;
				clickY = startY / curZoom;
				if (scaleDirection == ObjectDirection.NE){
					offsetX = scaleObj.getObjEndX() - clickX;
					offsetY = clickY - scaleObj.getObjStartY();
				} else if (scaleDirection == ObjectDirection.SE){
					offsetX = scaleObj.getObjEndX() - clickX ;
					offsetY = scaleObj.getObjEndY() - clickY ;
				} else if (scaleDirection == ObjectDirection.SW){
					offsetX = clickX - scaleObj.getObjStartX();
					offsetY = scaleObj.getObjEndY() - clickY;
				} else if (scaleDirection == ObjectDirection.NW){
					offsetX = clickX - scaleObj.getObjStartX();
					offsetY = clickY - scaleObj.getObjStartY();
				}
				mouseStatus = MouseStatusEnum.SCALE;
			} else {
				if (!tmpGotSelObj){
					clearObjStatusesAndSetToDraw();
				} 
			}
		} else {
			clearObjStatusesAndSetToDraw();
		}
		drawAllObjects();

	} else if (toolAction == ToolActionEnum.ROTATE){
		canToolTip = false;
		var tmpGotSelObj = false;
		selObj = getSelObject(startX, startY);
		
		if (selObj != null){
			changeObj = new ChangeObject(selObj);
			switch(selObj.getType()){
				case ObjectType.LIGHT_BULB:
				case ObjectType.LIGHT_SWITCH:
					clearObjStatusesAndSetToDraw();
					selObj.setStatus(ObjectStatus.ROTATE);
					tmpGotSelObj = true;
					
					rotateObj = getRotatingObject();
					
					if ((rotateObj != null)){
						rotateObjInitAngle = rotateObj.getRotation();
						clickX = startX / curZoom;
						clickY = startY / curZoom;
						var center = rotateObj.getCenter();
						rotateOffsetAngle = Math.atan2(clickX- center.x, - (clickY- center.y));
						changeObj = new ChangeObject(selObj);
						selObjCenter = rotateObj.getCenter();
						mouseStatus = MouseStatusEnum.ROTATE;
					} else {
						clearObjStatusesAndSetToDraw();
					}
				break;
			}
		} else {
			clearObjStatusesAndSetToDraw();
		}
		drawAllObjects();
	} 
}

/* Handles what happens when mouse move.
 * 
 * When draw - it draws the object
 * When drag - it moves the object
 * When scale - it scales the object
 * 
 *  */
function mouseMove(e){
	var curZoom = this.zoom;
	
	endX = getX(e);
	endY = getY(e);
	
	if (canToolTip) {
        selObj = getSelObject(endX, endY);
    } else {
		hideCanvasProductTooltip();
    }

    if (selObj != null && selObj.tooltip != null) {
        // if (selObjStat == true) {
        //     selObjStat = false;
			// showCanvasProductTooltip(e);
        // }
    } else {
        selObjStat = true;
		hideCanvasProductTooltip();
    }

	var w,h;

	if (toolAction == ToolActionEnum.ERASE){
		if (mouseStatus == MouseStatusEnum.DOWN) {
			var eraX = endX / curZoom;
			var eraY = endY / curZoom;			

			eraserSeg.setErasePoints(eraX,eraY);
			drawEraserObj(eraserSeg);
		}
	}
	
	if (mouseStatus == MouseStatusEnum.DRAW){
		if (drawObjectType == ObjectType.CIRCLE){
			/* Let's keep the corners in a equal square */
			w = Math.abs(endX - startX);
			h = Math.abs(endY - startY);
			if (w>h){
				endX = startX + (endY - startY);
			} else if (w<h){
				endY = startY + (endX - startX);
			}
		}
	} else if (mouseStatus == MouseStatusEnum.DRAG){
		/* When zoom is in effect, we need to move obj to zoomed pane */
		canToolTip = false;
		selObj.moveObjTo( (endX/curZoom + offsetX), (endY/curZoom+offsetY));
		
		
	} else if (mouseStatus == MouseStatusEnum.PAN){
		var tmpOffsetX, tmpOffsetY;
		
		for (var i=0; i< panObjectOffsets.length; i++){
			selObj = drawElements[panObjectOffsets[i].id];
			tmpOffsetX = panObjectOffsets[i].offsetX;
			tmpOffsetY = panObjectOffsets[i].offsetY;
			selObj.moveObjTo( (endX/curZoom + tmpOffsetX), (endY/curZoom+tmpOffsetY));
		}
		
		rulerOffsetX = rulerOrigOffsetX+ (endX - clickX * curZoom);
		rulerOffsetY = rulerOrigOffsetY+ (endY - clickY * curZoom);		
		drawBackgroundImage();
	} else if (mouseStatus == MouseStatusEnum.SCALE){
		scaleObj.resize(this.scaleDirection, endX/curZoom, endY/curZoom, offsetX, offsetY);
	} else if (mouseStatus == MouseStatusEnum.ROTATE){
		canToolTip = false;
		switch (rotateObj.getType()){
			case ObjectType.LIGHT_BULB:
			case ObjectType.LIGHT_SWITCH:
				var center = rotateObj.getCenter();
				var angle = Math.atan2(endX- center.x * curZoom, - (endY- center.y * curZoom) );
				rotateObj.setRotation(rotateObjInitAngle + angle - rotateOffsetAngle);
			break;
		}
	}
	drawAllObjects();
	drawDrawerDetails();
}

var temp_selected_obj
/* Handles what happens when mouse up.
 * 
 * When draw - it creates the draw object and adds to the object container (drawElements)
 * When drag - it just stops dragging
 * WHen scale - it just stops scalling and re-arrange the points if the object is a circle.
 * 
 *  */
function mouseUp(e){
	fixWhich(e);
    if (toolAction != ToolActionEnum.CONNECT && toolAction != ToolActionEnum.REMOVE_CONNECTION){
        hideDialog();
    }
	if (e.which != 1) return false;
	endX = this.getX(e);
	endY = this.getY(e);
	
	var curZoom = this.zoom;

	if (toolAction == ToolActionEnum.ERASE){
		pushElementToDrawElement(eraserSeg);
		mouseStatus = MouseStatusEnum.UP;
	}

	if (toolAction == ToolActionEnum.DRAW){
		if ((mouseStatus == MouseStatusEnum.DRAW) || (mouseStatus == MouseStatusEnum.DOWN) || (mouseStatus == MouseStatusEnum.CONT_DRAW)){
			var startX_fixed = startX / curZoom;
			var startY_fixed = startY / curZoom;
			var endX_fixed = endX / curZoom;
			var endY_fixed = endY / curZoom;
			
			if (drawObjectType == ObjectType.SQUARE){
				currentObj = new Square();
			} else if (drawObjectType == ObjectType.CIRCLE){
				w = Math.abs(endX_fixed - startX_fixed);
				h = Math.abs(endY_fixed - startY_fixed);
				if (w>h){
					endX_fixed = startX_fixed + (endY_fixed - startY_fixed);
				} else if (w<h){
					endY_fixed = startY_fixed + (endX_fixed - startX_fixed);
				}
				currentObj = new Circle();
			} else if (drawObjectType == ObjectType.WALL){
				currentObj = new Wall();
				currentObj.setWallThickness(wallThickness);
			} else if (drawObjectType == ObjectType.CONT_WALL){
				//Wall drawing code moved to mouseup
			
				//~ if (checkDoubleClick == false) {
					//~ checkDoubleClick = true;
					//~ setTimeout(function(){
						//~ checkDoubleClick = false;
					//~ },200);
				//~ } else {
					//~ /* In a double click */
					//~ currentCWallPoints.pop();
					//~ currentCWallPoints.pop();
					//~ currentObj = new CWall();
					//~ currentObj.setVertices(currentCWallPoints);
					//~ currentCWallPoints.splice(0);
					//~ pushElementToDrawElement(currentObj);
					//~ mouseStatus = MouseStatusEnum.UP;
					//~ checkDoubleClick = false;
				//~ }
				
				
			} else if (drawObjectType == ObjectType.LIGHT_BULB){
				/*	currentObj = new LightBulb();
					currentObj.setCoordinates(endX_fixed,endY_fixed);
					var lightBulbIndex = lightBulbArr.length +1;
					currentObj.setLabel(lightBulbIndex);
					pushElementToDrawElement(currentObj);
					lightBulbArr.push(currentObj);
					addToTable(currentObj);
					populateLightBulbMenu();*/
			} else if (drawObjectType == ObjectType.LIGHT_SWITCH){
					currentObj = new LightSwitch();
					currentObj.setCoordinates(endX_fixed, endY_fixed);
					addToSwitchTable(currentObj);
					pushElementToDrawElement(currentObj);
			} else if (drawObjectType == ObjectType.TEXT){
				/* Checks if user double clicks */
				if (checkDoubleClick == false){
					checkDoubleClick = true;
					setTimeout(function(){
						checkDoubleClick = false;
						if ($('#text-container').css('display') == 'none'){
							showTextEdit(startX_fixed, startY_fixed);
						}
					},200);
				} else {
					var tmpObjIndex = getSelObjectIndex(endX, endY);
					if (tmpObjIndex != null && !isNaN(tmpObjIndex)){
						var tmpObj = drawElements[tmpObjIndex];
						if (tmpObj.getType() == ObjectType.TEXT){
							toolAction = ToolActionEnum.EDITTEXT;
							currentObj = tmpObj;
							changeObj = new ChangeObject(currentObj);
							showTextEdit(tmpObj.getObjStartX(), tmpObj.getObjEndY(), tmpObj.getDrawText(), tmpObj.getFontSize());
						}
					}
				}
			}

			switch (drawObjectType){
				case ObjectType.CONT_WALL:
					/* Different parameters and already set few lines above*/
				case ObjectType.LIGHT_BULB:
					/* Different parameters and already set few lines above*/
					break;
				case ObjectType.LIGHT_SWITCH:
					/* here we ommit calling setPoints because they were handled correctly whe
					 * we setCoordinates for the bulb/switch. */
					mouseStatus = MouseStatusEnum.UP;
					break;
				case ObjectType.TEXT:
					mouseStatus = MouseStatusEnum.UP;
					/* No object creation here. Just show the text box */
					break;
				default:
					currentObj.setPoints(startX_fixed, startY_fixed, endX_fixed, endY_fixed);
					pushElementToDrawElement(currentObj);
					mouseStatus = MouseStatusEnum.UP;
			}
			
			
		}
		drawAllObjects();
	}else if (toolAction == ToolActionEnum.REMOVE_CONNECTION){
        selObj = getSelObject(startX, startY);
        if (selObj != null){
            if(lightBulbConnected(selObj.getLabel())){
				for (var i =0;i<temp_selected_obj.getConnections().length;i++){
                   if(selObj.getLabel() == temp_selected_obj.getConnections()[i].getLabel()){
                       temp_selected_obj.getConnections().splice(i, 1);
				   }
				}
                for (var i =0;i<connectedLightBulbLabels.length;i++){
                    if(selObj.getLabel() == connectedLightBulbLabels[i]){
                        connectedLightBulbLabels.splice(i, 1);
                    }
                }
                drawAllObjects();
                //updateSwitchConnectedBulbLabelsInCurrentTimeState(selObj);

			}
		}
        drawAllObjects();
	}else if (toolAction == ToolActionEnum.CONNECT){
        //populateDialog(e,selectedSwitchObject);
        selObj = getSelObject(startX, startY);
        if (selObj != null){
            if(selObj.getType()== ObjectType.LIGHT_BULB){
                if(!lightBulbConnected(selObj.getLabel())){
                    lastConectedObj.addLightBulbObj(selObj);
                    //drawWiresFromSwitchOrBulbToConnectedLightBulbs(selectedSwitchObject,selObj);
                    //selectedSwitchObject.addLightBulbObj(selObj);
                    connectedLightBulbLabels.push(selObj.getLabel());
                    //drawWiresFromSwitchOrBulbToConnectedLightBulbs(selectedSwitchObject,selObj);
                    updateSwitchConnectedBulbLabelsInCurrentTimeState(selObj);
                    selObj.setConectingMood(false);
                    lastConectedObj = selObj;
                    drawAllObjects();
                }else {
                    alert ('Light bulb already connected');
                }
            }
            // if (outermostObj.getType()== ObjectType.LIGHT_SWITCH || !lightBulbConnected(bulbObj.getLabel())){
            //     outermostObj.addLightBulbObj(bulbObj);
            //     connectedLightBulbLabels.push(bulbObj.getLabel());
            //     updateSwitchConnectedBulbLabelsInCurrentTimeState();
            // } else {
            //     alert ('Light bulb already connected');
            // }
            //resetLightBulbMenu();
            event.preventDefault();
            drawAllObjects();
        }




    } else if (toolAction == ToolActionEnum.DRAG){
		mouseStatus = MouseStatusEnum.UP;
		showSelectedObjects = false;
		/* If starting and end points are same, there is no need to add a change object.*/
		if (startX != endX && startY != endY){
			if (selObj != null){
				changeObj.updateNewParameters();
				pushElementToDrawElement(changeObj);
				changeObj = null;
			}
		} else {
            //todo ish
            selObj = getSelObject(startX, startY);
            if (selObj != null){
                temp_selected_obj =selObj;
                //ishara
                if(temp_selected_obj.getType()==ObjectType.LIGHT_SWITCH){
                    selectedSwitchObject = selObj;
                    lastConectedObj = selectedSwitchObject;
					populateDialog(e,selObj);
                } else if(temp_selected_obj.getType()==ObjectType.LIGHT_BULB){
					lastConectedObj = selectedSwitchObject;
					populateDialog(e,selObj);
				}
                //ishara
                
            }

        }
		
		selObj = null;

		if (checkDoubleClick == false) {
			checkDoubleClick = true;
			setTimeout(function () {
				checkDoubleClick = false;
			}, 200);
		} else {
			var curZoom = this.zoom;
			startX = getX(e);
			startY = getY(e);
			selObj = getSelObject(startX, startY);
			if (selObj != null) {
				// if (selObj.objType == ObjectType.LIGHT_BULB) {
				// 	document.getElementById('b-name').value = selObj.name;
				// 	document.getElementById('b-x').value = selObj.objStartX;
				// 	document.getElementById('b-y').value = selObj.objStartY;
				// 	document.getElementById('elevation').value = selObj.elevation;
				// 	document.getElementById('angle').value = selObj.angle;
				// 	document.getElementById('power').value = selObj.lightpower;
                //
				// 	document.getElementById('bulb-prop').style.display = "block";
				// } else if (selObj.objType == ObjectType.LIGHT_SWITCH) {
				// 	var tmpObjIndex = getSelObjectIndex(endX * curZoom, endY * curZoom);
				// 	if (!isNaN(tmpObjIndex)) {
				// 		var tmpObj = drawElements[tmpObjIndex];
				// 		if (tmpObj.getType() == ObjectType.LIGHT_SWITCH) {
				// 			$('#switch-lig').attr('data-root-obj-id', tmpObjIndex);
				// 		}
				// 	}
                //
				// 	document.getElementById("switch-lig").innerHTML = "";
                //
				// 	document.getElementById('s-name').value = selObj.name;
				// 	document.getElementById('s-x').value = selObj.objStartX;
				// 	document.getElementById('s-y').value = selObj.objStartY;
				// 	document.getElementById('s-elevation').value = selObj.s_elevation;
				// 	document.getElementById('s-angle').value = selObj.s_angle;
                //
				// 	document.getElementById('switch-prop').style.display = "block";
                //
				// 	var x = document.getElementById("switch-b");
				// 	var option = document.createElement("option");
				// 	option.text = selObj.name;
				// 	option.value = "x_pos=" + selObj.objStartX + ",y_pos=" + selObj.objStartY;
                //
				// 	for (var i = drawElements.length - 1; i >= 0; i--) {
				// 		if (drawElements[i].objType == ObjectType.LIGHT_BULB) {
				// 			var sx = document.getElementById("switch-lig");
				// 			var optionTwo = document.createElement("option");
				// 			optionTwo.text = drawElements[i].name;
				// 			optionTwo.value = parseInt(drawElements[i].label) - 1;
				// 			sx.add(optionTwo);
				// 		}
				// 	}
				// }
			}
		}
		
	} else if (toolAction == ToolActionEnum.PAN){
		panObjectOffsets = [];
		mouseStatus = MouseStatusEnum.UP;
		drawBackgroundImage();
//		drawEraserObj();
	} else if (toolAction == ToolActionEnum.SCALE){
		mouseStatus = MouseStatusEnum.UP;
		if (startX != endX && startY != endY){
			if (scaleObj != null && changeObj != null){
				changeObj.updateNewParameters();
				pushElementToDrawElement(changeObj);
				changeObj = null;
			}
		}
		if (scaleObj != null) scaleObj.updateCoordinatesToOrder();
	} else if (toolAction == ToolActionEnum.ROTATE){
		mouseStatus = MouseStatusEnum.UP;
		
		if (startX != endX && startY != endY){
			if (changeObj != null){
				changeObj.updateNewParameters();
				pushElementToDrawElement(changeObj);
			}
		}
		
		rotateObjInitAngle = 0;
	}
}

function hideCanvasProductTooltip(params) {
	var tooltipSpan = document.getElementById('span-tooltip-can');
	if(tooltipSpan.style.display != 'none')
	{	
		tooltipSpan.style.display = 'none';
	}
}

function showCanvasProductTooltip(mouse_event) {
    if (temp_selected_obj != null){
        selObj=temp_selected_obj;
    }
	var tooltipSpan = document.getElementById('span-tooltip-can');
	var toolImg = document.getElementById('can-tool-image');
	document.getElementById('can-tool-title').innerHTML = selObj.name;
	document.getElementById('can-tool-product-code').innerHTML = "Product Code :" + selObj.itemCode;
	document.getElementById('can-tool-product-elevation').innerHTML = "Height " + selObj.elevation +" f/m floor";
	document.getElementById('can-tool-product-power').innerHTML = selObj.lightpower;

	if (selObj.notes != undefined) 
	{
		document.getElementById('can-tool-product-note').value = selObj.notes;
	}

	var x = mouse_event.clientX,
		y = mouse_event.clientY;

	toolImg.src = selObj.imgPath;

	var window_width = $(window).width();  
	var window_height = $(window).height();  
	// var tooltip_width = tooltipSpan.clientWidth; 
	// var tooltip_height = tooltipSpan.clientHeight; 

	if( window_width - x < 250){
		tooltipSpan.style.left = (x - 205) + 'px';
	}
	else {
		tooltipSpan.style.left = (x - 5) + 'px';
	}	

	if( window_height - y < 250){
		tooltipSpan.style.top = (y - 205) + 'px';
	}
	else {
		tooltipSpan.style.top = (y + 0) + 'px';
	}	
	tooltipSpan.style.left = (x - 5) + 'px';
	tooltipSpan.style.top = (y + 0) + 'px';
	
	tooltipSpan.style.display = 'block';
	var tooltip_width = tooltipSpan.clientWidth; 
	if( window_width - x < tooltip_width + 5){
		tooltipSpan.style.left = (x - tooltip_width) + 'px';
	}

	var tooltip_height = tooltipSpan.clientHeight;
	if( window_height - y < tooltip_height + 5){
		tooltipSpan.style.top = (y - tooltip_height) + 'px';
	}
}	

function addNoteToSelectedProduct(note) {
	if (selObj != null) {
		selObj.notes = note;
	}
}

/* Pushes an object in to draw elements */
function pushElementToDrawElement(e, ignoreCopyToStack){
	var tmpDrawElements = [];
	drawElements.push(e);
	if (!(ignoreCopyToStack != undefined && ignoreCopyToStack == true)){
		copyDrawElementsToStack();
		currentTimeIndex = currentTimeIndex + 1;
	}
	drawelementListChanged = true;
}

function popElementFromDrawElementsAndStack(){
	drawElements.pop();
	drawElementsStack.pop();
	currentTimeIndex = currentTimeIndex - 1;
	drawelementListChanged = true;
}

/* Handles what happens when mouse gets out of the canvas. */
function mouseOut(e){
	drawAllObjects();
	// performEscapeAction();
}

/* Clears any statuses in objects which are marked clear */
function clearObjStatusesAndSetToDraw(){
	for (var i =0; i<drawElements.length; i++){
		 drawElements[i].setStatus(ObjectStatus.DRAW);
	}
}

function getFilteredCoordinates(array, x, y) {
	var x_filtered = x;
	var y_filtered = y;
	if (isAngleSnappingOn) {
		if (array.length > 0) {
			var lastPnt = array[array.length - 1];
			var polar = getPolarFilteredCoords(x - lastPnt.x, y - lastPnt.y);

			x_filtered = lastPnt.x + polar.x;
			y_filtered = lastPnt.y + polar.y;
		}		
	}
	else if (isGridSnappingOn) {
		//TODO
	} else {
		//TODO
	}
	return 	{ x:x_filtered, y:y_filtered };
}

function getPolarFilteredCoords(dx, dy){
	var x_polr, ypolr;
	var theta = Math.atan2(dy,dx);
	var r = Math.sqrt(dx*dx + dy*dy);
	var angle_step = Math.PI / 12; //15 degrees
	theta = Math.round(theta / angle_step) * angle_step; 
	x_polr = r * Math.cos(theta);
	y_polr = r * Math.sin(theta);
	return {
		x: x_polr,
		y: y_polr
	}
}

/* Calls draw functions to draw the dynamic object in to the canvas. */
function drawCurrentObj(){
	var curZoom = this.zoom;
	var tmpCWallPoints = new Array();
	context.clearRect(0,0,canvas.width, canvas.height);
	var sX, sY,eX,eY,rulerWidth, rulerHeight,tmpX, tmpY;
	
	rulerWidth  = this.rulerWidth;
	rulerHeight = this.rulerHeight;
	
	sX = startX;
	sY = startY;
	eX = endX;
	eY = endY ;
	
	if (drawObjectType == ObjectType.SQUARE){
		drawSquare(sX , sY , eX, eY, context);
	} else if (drawObjectType == ObjectType.CIRCLE){
		drawCircle(sX, sY, eX, eY, context);
	} else if (drawObjectType == ObjectType.WALL){
		drawWall(sX, sY, eX, eY, wallThickness * curZoom, context);;
	} else if (drawObjectType == ObjectType.CONT_WALL){
		$(currentCWallPoints).each(function(i,e){
			tmpX = e.x * curZoom ;
			tmpY = e.y*curZoom ;
			tmpCWallPoints.push ({x: tmpX, y: tmpY});
		});
		// drawContWall(tmpCWallPoints,context, eX, eY);
		var filtered_pnt = getFilteredCoordinates(tmpCWallPoints, eX, eY);
		drawContWall(tmpCWallPoints,context, filtered_pnt.x, filtered_pnt.y);
	}
}

/* Draws rectangle
 *  */
function drawSquare(sX, sY, eX, eY, targetContext){
	targetContext.lineWidth=1;
	targetContext.strokeStyle = '#000000';
	targetContext.strokeRect(sX, sY , (eX-sX), (eY-sY));
}

/* Draws Filled Circles on given points */
function drawFillCircles(points, r, targetContext, fillColor){
	$(points).each(function(i,e){
		targetContext.beginPath();
		targetContext.arc(e.x, e.y, r, 0, 2*Math.PI);
		targetContext.fillStyle = "#e74c3c";
		targetContext.fill();
	});
}


/* Draws circle */
function drawCircle(sX, sY, eX, eY, targetContext){
	var tmpX, tmpY, tmpR;
	targetContext.lineWidth=1;
	targetContext.strokeStyle = '#000000';
	
	tmpX = ((eX + sX)/2);
	tmpY = ((eY + sY)/2);
	tmpR = ((Math.min(Math.abs(eX - sX), Math.abs(eY-sY))/2));
	
	targetContext.beginPath();
	targetContext.arc(tmpX,tmpY,tmpR,0,2*Math.PI);
	targetContext.stroke();
}

/* Draws wall */
function drawWall(sX, sY, eX, eY, wT, targetContext){
	var tmpX, tmpY, tmpR;
	var w,h;
	
	targetContext.lineWidth=1;
	targetContext.strokeStyle = '#000000';
	
	w = (Math.abs(eX-sX));
	h = (Math.abs(eY-sY));
	
	targetContext.fillStyle = "#0000FF";
	if (w>h){
		targetContext.fillRect(sX,sY,(eX-sX),wT);
	} else {
		targetContext.fillRect(sX,sY,wT,(eY-sY));
	}
	targetContext.fillStyle = "#000000";
}

/* Draws continuous wall */
function drawContWall(pointsArr, targetContext, curX, curY){
	var first = true;
	var sX,sY,eX,eY;
	var crossPointForArc;
	targetContext.lineWidth=5;
	targetContext.strokeStyle = '#000000';
	
	$(pointsArr).each(function(i,e){
		if (first == true){
			eX = e.x;
			eY = e.y;
			sX = eX;
			sY = eY;
			first = false;
		} else {
			
			targetContext.beginPath();
			sX = eX;
			sY = eY;
			eX = e.x;
			eY = e.y;
			targetContext.moveTo(sX,sY);
			targetContext.lineTo(eX,eY);
			targetContext.stroke();
		}
	});
	
	if (mouseStatus == MouseStatusEnum.CONT_DRAW){
		/* Dynamic line following the mouse movement */
		targetContext.strokeStyle = '#FF0000';
		targetContext.beginPath();
		targetContext.moveTo(eX,eY);
		targetContext.lineTo(curX,curY);		
		targetContext.stroke();
		
		if (pointsArr.length >=2){
			/* Calculates and draws the angle between two lines. Only m1<0 developed. Should implement for other cases as well. */
			var last2Points = pointsArr.slice(pointsArr.length-2, pointsArr.length)
			var prev1 = last2Points.pop();
			var prev2 = last2Points.pop();
			
			targetContext.beginPath();
			var m1 = getGradientOfLine(prev2.x,prev2.y,prev1.x, prev1.y);	
			var firstLineAngle =  getAngleBetweenTwoLines(0,0,100,0,prev2.x,prev2.y,prev1.x, prev1.y);
			
			var m2 = getGradientOfLine(prev1.x,prev1.y,curX, curY);
			var secondLineAngle =  getAngleBetweenTwoLines(0,0,100,0,prev1.x,prev1.y,curX, curY);
			
			var angleBetween = getAngleBetweenTwoLines(prev2.x,prev2.y,prev1.x, prev1.y,prev1.x,prev1.y,curX,curY);
			
			if (m1<0){
				
				if (m1>= -100){
					if (prev2.x < prev1.x && prev2.y>prev1.y) {
						if (m2<0){
							if (m2 >= -100){
								if (prev1.x <= curX){
									targetContext.arc(prev1.x, prev1.y,30, Math.PI - firstLineAngle, 2*Math.PI - secondLineAngle, false);
								} else {
									targetContext.arc(prev1.x, prev1.y,30, Math.PI - firstLineAngle, Math.PI - secondLineAngle, false);
								}
							}
						} else if (m2>=0){
							if (m2 <100){
								if (prev1.x>=curX){
									targetContext.arc(prev1.x, prev1.y,30, Math.PI - firstLineAngle, Math.PI + secondLineAngle, false);
								} else {
									targetContext.arc(prev1.x, prev1.y,30, Math.PI - firstLineAngle, secondLineAngle, false);
								}
								
							}
						}
					}
				}
			} else if (m1>=0){
				
			}
				
			targetContext.lineWidth=1;
			targetContext.stroke();
		}
	}
	
}

/* Draws light bulb */
function drawLightBulb(x,y,r,targetContext, w,h,path,conMood,colour){
	var curZoom = this.zoom;
    var imageObj = new Image();
    imageObj.src = path;
    if(conMood){
        targetContext.shadowColor = colour;
        targetContext.shadowBlur = 10;
        targetContext.shadowOffsetX = 0;
        targetContext.shadowOffsetY = 0;
        targetContext.fill();
    }
    targetContext.strokeStyle = '#000000';
    targetContext.drawImage(imageObj, x, y, w, h);
}

/* Draws light switch */
function drawLightSwitch(x,y,r,targetContext,w,h,path){
    var img = document.createElement('img');
    img.src = path;
    targetContext.strokeStyle = '#000000';
    targetContext.drawImage(img, x, y, w, h);
}

/* Draws light bulb connections from a switch */
function drawWiresFromSwitchOrBulbToConnectedLightBulbs(rootObj, targetContext){
	// var curZoom = this.zoom;
	// var lightBulbs = rootObj.getConnections();
	// var tmpLightBulb;
	// var rootCoordinates = rootObj.getCoordinates();
	// var sX, sY, bX,bY;
	//
	// sX = rootCoordinates.x + rootObj.getObjWidth()/2;
	// sY = rootCoordinates.y + rootObj.getObjHeight()/2;
	//
	// var bulbCoordinates;
	// var tmpOffsetCenterPoint = {x:0, y:0};
	//
	// targetContext.lineWidth = 1;
	// targetContext.strokeStyle = '#000000';
	//
	// for (var i=0; i<lightBulbs.length; i++){
	// 	tmpLightBulb = lightBulbs[i];
	// 	if (tmpLightBulb != undefined){
	// 		if (getWhetherLightBulbOnCanvas(tmpLightBulb.label)){
	// 			if (isBulbLabelInSwitchConnectedBulbLabelsInCurrentTimeState(tmpLightBulb.label)) {
	//
	// 				bulbCoordinates = tmpLightBulb.getCoordinates();
	// 				bX = bulbCoordinates.x + tmpLightBulb.getObjWidth()/2;
	// 				bY = bulbCoordinates.y + tmpLightBulb.getObjHeight()/2;
	//
	// 				targetContext.beginPath();
	// 				targetContext.moveTo(sX * curZoom, sY * curZoom);
	// 				tmpOffsetCenterPoint = getOffsetCenterPoint(rootCoordinates.x, rootCoordinates.y,bulbCoordinates.x,bulbCoordinates.y);
	// 				targetContext.quadraticCurveTo(tmpOffsetCenterPoint.x * curZoom ,tmpOffsetCenterPoint.y * curZoom, bX * curZoom, bY * curZoom);
	// 				targetContext.stroke();
	// 			}
	// 		}
	// 	}
	// }
}


function drawText(obj, targetContext, sX, sY, eX, eY){
	
	var fontSize = obj.getFontSize();
	var fontColor = obj.getFontColor();
	var drawText = obj.getDrawText();
	var fontFamily = obj.getFontFamily();
	targetContext.fillStyle = obj.getFontColor();
	targetContext.font=fontSize+ 'px '+ fontFamily;
	targetContext.fillText(drawText,sX,eY);
	
}

/* Gets the offset center point to construct the quadraticCurve */
function getOffsetCenterPoint(x1,y1,x2,y2){
	var tmpX, tmpY;
	var offset = 20;
	
	var retOffCenter = {x:0, y:0};
	
	tmpX = (x1 + x2)/2;
	
	if (x1 > x2){
		tmpX = tmpX - offset;
	} else {
		tmpX = tmpX + offset;
	}
	
	tmpY = (y1+y1)/2;
	if (y1 > y2){
		tmpY = tmpY + offset;
	} else {
		tmpY = tmpY - offset;
	}
	retOffCenter.x = tmpX;
	retOffCenter.y = tmpY;
	
	return retOffCenter;
}
 

/* Call draw functions to draw all objects in the stack */
function drawAllObjects(){
	context.clearRect(0,0,canvas.width, canvas.height);
	contextOrig.clearRect(0,0,canvasOrig.width, canvasOrig.height);
	drawRuler();
	
	if (mouseStatus == MouseStatusEnum.DRAW || mouseStatus == MouseStatusEnum.CONT_DRAW){
		drawCurrentObj();
	}

	for (var i =0; i<this.drawElements.length; i++){
		drawLightsOnCanvas(this.drawElements[i]);
        drawConnections(this.drawElements[i]);
		drawObjectOnCanvas(this.drawElements[i]);
		drawEraserObj(this.drawElements[i]);
	}
	if(drawelementListChanged)
	{
		drawelementListChanged = false;
		updateBomTable(drawElements);
	}

	// for (var i =0; i<this.drawElements.length; i++){
	// 	drawLightsOnCanvas(this.drawElements[i]);
	// }
	
	// for (var i =0; i<this.drawElements.length; i++){
	// 	drawWiresOnCanvas(this.drawElements[i]);
	// }
	
	// for (var i =0; i<this.drawElements.length; i++){
	// 	if (drawElements[i].getType() != ObjectType.LIGHT_BULB) drawObjectOnCanvas(this.drawElements[i]);
	// }
	
	// for (var i =0; i<this.drawElements.length; i++){
	// 	if (drawElements[i].getType() == ObjectType.LIGHT_BULB) drawObjectOnCanvas(this.drawElements[i]);
	// }

	if (showSelectedObjects && selObj != null) {
		highlightObject(selObj)
	}

	if (eraserSeg != null) {
		drawEraserObj(eraserSeg);
	}

	drawScaleFactorDetails();
	drawZoomFactorDetails();	
}

function drawEraserObj(obj){
	if (obj.getType() == ObjectType.ERASER){
		era_canvas = document.getElementById("era-canvas");

		var ectx = era_canvas.getContext('2d');	
		ectx.clearRect(0, 0, era_canvas.width, era_canvas.height);	
		var curZoom = this.zoom;
		ectx.beginPath();
		ectx.lineWidth = eraserSize;		
		ectx.strokeStyle = eraserColor;
		ectx.lineJoin = ectx.lineCap = eraserType;
				
		for(var iy = 0; iy<obj.eraserPointsArr.length; iy++){
			eraX = obj.eraserPointsArr[iy].x * curZoom ;
			eraY = obj.eraserPointsArr[iy].y * curZoom ;
			if ( iy == 0){				
				ectx.moveTo(eraX, eraY);
			} else {				
				ectx.lineTo(eraX, eraY);
				ectx.stroke();	
			}
		}
	}
}

function setBackgroundImage(img_src)
{
	backgroundImage = new Image();
	backgroundImage.onload = function() {
		drawBackgroundImage();
	}
	backgroundImage.src = img_src;
}

function drawBackgroundImage() {
	if (backgroundImage != undefined){
		var ctx = bg_Canvas.getContext("2d");
		ctx.clearRect(0, 0, bg_Canvas.width, bg_Canvas.height);		
		//ctx.beginPath();
		var curZoom = this.zoom;
		ctx.drawImage(backgroundImage, rulerOffsetX, rulerOffsetY, backgroundImage.width * curZoom, backgroundImage.height * curZoom);
	}
}

function getDrawElementIndexByObject(obj){
	for (var i=0; i< drawElements.length; i++){
		if (drawElements[i] == obj) return i;
	}
	return null;
}

/* Draws the square following the mouse pointer showing some information */
function drawDrawerDetails(){
	var left_X = endX; //endX = mouseX
	var top_Y = endY;

	var posX = endX - rulerOffsetX;
	var posY = endY - rulerOffsetY;
	var curZoom = this.zoom;
	
	// context.lineWidth=1;
	// context.strokeStyle = '#E0790B';
	// context.fillStyle = '#FFFFFF';
	// context.fillRect(left_X+1, top_Y+1, 150-1, 50-1);
	// context.strokeRect(left_X, top_Y, 150, 50);
	// context.fillStyle = '#000000';
	// context.font = "15px Arial";
	// context.fillText("X:"+(posX/curZoom).toFixed(0)+" Y:"+(posY/curZoom).toFixed(0),left_X+20, top_Y+30);
	context.fillText("( "+(posX/curZoom).toFixed(0)+", "+(posY/curZoom).toFixed(0)+" )",left_X+20, top_Y+30);
}

/* Draws the current scale factor details */
function drawScaleFactorDetails(){
	$('#scale-ratio-display').html('1:'+this.scaleFactor.toFixed(2));
}

/* Draws the current zoom factor details */
function drawZoomFactorDetails(){
	$('#zoom-ratio-display').html(this.zoom + "X ");
}

/* Call draw functions to draw a single object. Different parameters are set and send to the functions here */
function drawObjectOnCanvas(obj){
	
	if( obj.hasOwnProperty("visibility") && !obj.getVisibility()){
		return;
	}
	var x,y,w,h;
	var pointsArr, borderArr;
	var curZoom = this.zoom;
	var tmpPointsArr = new Array();
	var tmpBorderPointsArr = new Array();
	var tmpCenter, tmpRotation;
	var sX, sY, eX, eY;
	
	if (!(obj instanceof CanvasItem)) return;
	
	tmpCenter = obj.getCenter();
	tmpRotation = obj.getRotation();
	contextOrig.save();
	contextOrig.translate(tmpCenter.x * curZoom, tmpCenter.y * curZoom);
	contextOrig.rotate(tmpRotation);
	contextOrig.translate(-tmpCenter.x * curZoom, -tmpCenter.y * curZoom);
	
	if (obj.getType() == ObjectType.CONT_WALL){
		pointsArr = obj.getVerticesArr();
		$(pointsArr).each(function(i,e){
			tmpPointsArr.push({x:e.x * curZoom, y: e.y * curZoom});
		});
		var tmpPolygon = obj.getPolygon();
		for (var i=0; i< (tmpPolygon.length-1); i = i + 2){
			tmpBorderPointsArr.push ({x: tmpPolygon[i] * curZoom, y: tmpPolygon[i+1] * curZoom});
		}
	} else {
		sX = parseInt(obj.getObjStartX()) * curZoom;
		sY = parseInt(obj.getObjStartY()) * curZoom;
		eX = parseInt(obj.getObjEndX()) * curZoom;
		eY = parseInt(obj.getObjEndY()) * curZoom;
	}
	
	if (toolAction == ToolActionEnum.SCALE || toolAction == ToolActionEnum.DRAG){
		drawOutlinesOnCanvas(obj);
	}
	
	if (obj.getType() == ObjectType.SQUARE){
		drawSquare(sX , sY , eX , eY , contextOrig);
	} else if(obj.getType() == ObjectType.CIRCLE){
		drawCircle(sX , sY , eX , eY , contextOrig);
	} else if (obj.getType() == ObjectType.WALL){
		drawWall(sX , sY , eX , eY , obj.getWallThickness() * curZoom,contextOrig);
	} else if (obj.getType() == ObjectType.CONT_WALL){
		
		drawContWall(tmpPointsArr, contextOrig);
	} else if (obj.getType() == ObjectType.LIGHT_BULB){
		var coor = obj.getCoordinates();
		var rad = obj.getRadius();
        drawLightBulb(sX, sY, rad * curZoom, contextOrig, obj.getObjWidth() * curZoom, obj.getObjHeight() * curZoom,obj.getSymbolPath(),obj.getConectingMood(),obj.getSelectionColour());
    } else if (obj.getType() == ObjectType.LIGHT_SWITCH){
		var coor = obj.getCoordinates();
		var rad = obj.getRadius();
        drawLightSwitch(sX, sY, rad * curZoom, contextOrig, obj.getObjWidth() * curZoom, obj.getObjHeight() * curZoom,obj.getSymbolPath());
    } else if (obj.getType() == ObjectType.TEXT){
		drawText(obj,contextOrig,sX,sY,eX,eY);		
	}
	
	contextOrig.restore();
		
	obj.updateBorder();
	
	if (obj.getStatus() == ObjectStatus.SCALE){
		drawObjectScalerOnCanvas(obj);
	} else if (obj.getStatus() == ObjectStatus.ROTATE){
		drawObjectRotateIndicatorsOnCanvas(obj);
	}
}


//~ function drawCornerCirclesCanDeleteThis(obj){
	  //~ contextOrig.lineWidth = 3;
	  //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objBorderStartX, obj.objBorderStartY, 10, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'green';
      //~ contextOrig.stroke();
      
      //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objBorderEndX, obj.objBorderStartY, 10, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'blue';
      //~ contextOrig.stroke();
      
      //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objBorderEndX, obj.objBorderEndY, 10, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'red';
      //~ contextOrig.stroke();
      
      //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objBorderStartX, obj.objBorderEndY, 10, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'orange';
      //~ contextOrig.stroke();
//~ }

//~ function drawCornerCirclesOfOrig(obj){
	  //~ contextOrig.lineWidth = 3;
	  
	  //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objStartX, obj.objStartY, 5, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'green';
      //~ contextOrig.stroke();
      
      //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objEndX, obj.objStartY, 5, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'blue';
      //~ contextOrig.stroke();
      
      //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objEndX, obj.objEndY, 5, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'red';
      //~ contextOrig.stroke();
      
      //~ contextOrig.beginPath();
      //~ contextOrig.arc(obj.objStartX, obj.objEndY, 5, 0, 2 * Math.PI, false);
      //~ contextOrig.strokeStyle = 'orange';
      //~ contextOrig.stroke();
//~ }

/* Call draw functions to draw light of a bulb */
function drawLightsOnCanvas(obj){
	
	if( obj.hasOwnProperty("visibility") && !obj.getVisibility()){
		//alert('called for switches');
		return;
	}
	var x,y,w,h;
	var pointsArr;
	var curZoom = this.zoom;
	var tmpPointsArr = new Array();
	
	if (obj.getType() == ObjectType.LIGHT_BULB){
		var coor = obj.getCoordinates();
		var rad = obj.getRadius();
		drawRayCasts(obj, contextOrig);
		drawWiresFromSwitchOrBulbToConnectedLightBulbs(obj, contextOrig);
	} 
}


/* Call draw functions to draw wires */
function drawWiresOnCanvas(obj){
	var x,y,w,h;
	var pointsArr;
	var curZoom = this.zoom;
	var tmpPointsArr = new Array();
	switch (obj.getType()){
		case ObjectType.LIGHT_BULB:
		case ObjectType.LIGHT_SWITCH:
			drawWiresFromSwitchOrBulbToConnectedLightBulbs(obj, contextOrig);
		break;
	}
}

function drawConnections(rootObj) {
    if(rootObj.getType() == ObjectType.LIGHT_SWITCH ||rootObj.getType() == ObjectType.LIGHT_BULB){
        var curZoom = this.zoom;
        var lightBulbs = rootObj.getConnections();
        var rootCoordinate = rootObj.getCoordinates();
        var rootX, rootY, EndX,EndY;
        rootX = rootCoordinate.x + rootObj.getObjWidth()/2;
        rootY = rootCoordinate.y + rootObj.getObjHeight()/2;
        var bulbCoordinates;
        var tmpOffsetCenterPoint = {x:0, y:0};
        contextOrig.lineWidth = 1;
        contextOrig.strokeStyle = '#000000';
        for (var i=0; i<lightBulbs.length; i++){
            tmpLightBulb = lightBulbs[i];
            bulbCoordinates = tmpLightBulb.getCoordinates();
            EndX = bulbCoordinates.x + tmpLightBulb.getObjWidth()/2;
            EndY = bulbCoordinates.y + tmpLightBulb.getObjHeight()/2;

            contextOrig.beginPath();
            contextOrig.moveTo(rootX * curZoom, rootY * curZoom);
            tmpOffsetCenterPoint = getOffsetCenterPoint(rootCoordinate.x, rootCoordinate.y,bulbCoordinates.x,bulbCoordinates.y);
            // targetContext.quadraticCurveTo(tmpOffsetCenterPoint.x * curZoom ,tmpOffsetCenterPoint.y * curZoom, EndX * curZoom, EndY * curZoom);
            contextOrig.bezierCurveTo(tmpOffsetCenterPoint.x * curZoom ,tmpOffsetCenterPoint.y * curZoom,(tmpOffsetCenterPoint.x+20)* curZoom ,(tmpOffsetCenterPoint.y+20 )* curZoom, EndX * curZoom, EndY * curZoom);
            contextOrig.stroke();
        }
    }
}
/* Draws the outline of an object */
function drawOutlinesOnCanvas(obj){
	var sX,sY,eX,sY;
	var curZoom = this.zoom;
	var center = obj.getCenter();
	
	sX = (obj.objBorderStartX) * curZoom;
	sY = (obj.objBorderStartY) * curZoom;
	eX = (obj.objBorderEndX) * curZoom;
	eY = (obj.objBorderEndY) * curZoom;
	
	contextOrig.beginPath();
	contextOrig.moveTo(sX,sY);
	contextOrig.lineTo(eX,sY);
	contextOrig.lineTo(eX,eY);
	contextOrig.lineTo(sX,eY);
	contextOrig.lineTo(sX,sY);
	contextOrig.lineWidth=1;
	contextOrig.strokeStyle = '#BDBDBD';
	contextOrig.strokeStyle = '#FF0000';
	contextOrig.stroke();
	
}

/* Draws object scaler boxes of an object */
function highlightObject(obj) {
    var coor = obj.getResizeCornerCoordinates();
    var curZoom = this.zoom;
    objType = obj.getType();
	var r = 5;
	points = [];
    if (objType == ObjectType.CONT_WALL) {
        objVertices = obj.getVerticesArr();
        x1 = objVertices[0].x * curZoom;
        y1 = objVertices[0].y * curZoom;
        x2 = objVertices[1].x * curZoom;
        y2 = objVertices[1].y * curZoom;

		points.push({x:x1, y:y1});
		points.push({x:x2, y:y2});

    } else {
		sX = parseInt(obj.getObjStartX()) * curZoom;
		sY = parseInt(obj.getObjStartY()) * curZoom;
		eX = parseInt(obj.getObjEndX()) * curZoom;
		eY = parseInt(obj.getObjEndY()) * curZoom;

		points.push({x:eX, y:sY})
		points.push({x:eX, y:eY})
		points.push({x:sX, y:eY})
		points.push({x:sX, y:sY})
    }
	drawFillCircles(points, r, contextOrig, "#e74c3c");
}


/* Draws object scaler boxes of an object */
function drawObjectScalerOnCanvas(obj) {
    var coor = obj.getResizeCornerCoordinates();
    var curZoom = this.zoom;
    objType = obj.getType();
    if (objType == ObjectType.CONT_WALL) {
        objVertices = obj.getVerticesArr();
        x1 = objVertices[0].x;
        y1 = objVertices[0].y;
        x2 = objVertices[1].x;
        y2 = objVertices[1].y;

        m = (y2 - y1) / (x2 - x1);

        contextOrig.fillStyle = "#FF0000";
        if (m < 0) {
            contextOrig.fillRect(coor.NE.SX * curZoom, coor.NE.SY * curZoom, (coor.NE.EX - coor.NE.SX) * curZoom, (coor.NE.EY - coor.NE.SY) * curZoom);
            contextOrig.fillRect(coor.SW.SX * curZoom, coor.SW.SY * curZoom, (coor.SW.EX - coor.SW.SX) * curZoom, (coor.SW.EY - coor.SW.SY) * curZoom);
        } else {
            contextOrig.fillRect(coor.SE.SX * curZoom, coor.SE.SY * curZoom, (coor.SE.EX - coor.SE.SX) * curZoom, (coor.SE.EY - coor.SE.SY) * curZoom);
            contextOrig.fillRect(coor.NW.SX * curZoom, coor.NW.SY * curZoom, (coor.NW.EX - coor.NW.SX) * curZoom, (coor.NW.EY - coor.NW.SY) * curZoom);
        }
        contextOrig.fillStyle = "#000000";
    } else {
        contextOrig.fillStyle = "#FF0000";
        contextOrig.fillRect(coor.NE.SX * curZoom, coor.NE.SY * curZoom, (coor.NE.EX - coor.NE.SX) * curZoom, (coor.NE.EY - coor.NE.SY) * curZoom);
        contextOrig.fillRect(coor.SE.SX * curZoom, coor.SE.SY * curZoom, (coor.SE.EX - coor.SE.SX) * curZoom, (coor.SE.EY - coor.SE.SY) * curZoom);
        contextOrig.fillRect(coor.SW.SX * curZoom, coor.SW.SY * curZoom, (coor.SW.EX - coor.SW.SX) * curZoom, (coor.SW.EY - coor.SW.SY) * curZoom);
        contextOrig.fillRect(coor.NW.SX * curZoom, coor.NW.SY * curZoom, (coor.NW.EX - coor.NW.SX) * curZoom, (coor.NW.EY - coor.NW.SY) * curZoom);
        contextOrig.fillStyle = "#000000";
    }
}

/* Draws the rotation indicators */
function drawObjectRotateIndicatorsOnCanvas(obj){
	var coor = obj.getResizeCornerCoordinates();
	var curZoom  =  this.zoom;
	var center = obj.getCenter();
	var arcSegment = Math.PI/8;
	var tmpPoint;
	
	drawArcArrow(center.x * curZoom,center.y * curZoom,obj.getObjWidth()/2 * curZoom, Math.PI/4 -arcSegment + obj.getRotation(),Math.PI/4 + arcSegment + obj.getRotation(), contextOrig);
	drawArcArrow(center.x * curZoom,center.y * curZoom,obj.getObjWidth()/2 * curZoom, 3 * Math.PI/4 -arcSegment + obj.getRotation(), 3 * Math.PI/4 + arcSegment + obj.getRotation(), contextOrig);
	drawArcArrow(center.x * curZoom,center.y * curZoom,obj.getObjWidth()/2 * curZoom, 5 * Math.PI/4 -arcSegment + obj.getRotation(),5 * Math.PI/4 + arcSegment + obj.getRotation(), contextOrig);
	drawArcArrow(center.x * curZoom,center.y * curZoom,obj.getObjWidth()/2 * curZoom, 7* Math.PI/4 -arcSegment + obj.getRotation(),7 * Math.PI/4 + arcSegment + obj.getRotation(), contextOrig);
}

/* Draws a two sided arc arrow to indicate rotation
 * cX - center X
 * cY - center Y
 * r - radius
 * sA - starting angle
 * eA - end angle
 */
function drawArcArrow(cX, cY, r, sA, eA, targetContext){
	
	targetContext.beginPath();
	targetContext.strokeStyle = "#FF0000";
	targetContext.lineWidth = 3;
	
	targetContext.arc(cX,cY, r ,sA, eA);
	targetContext.stroke();
}


/* Detects which object is being selected by the user by clicking. Later added objects get selected first. 
 * factor variable is used to expand the area of sensitivity
 * */
function getSelObject(x, y){
	var curZoom = this.zoom;
	
	var checkX = x / curZoom;
	var checkY = y / curZoom;
	
	var tmpObj = null;
	for (var i=drawElements.length-1; i>=0 ; i--){
		tmpObj = drawElements[i];
		if ( tmpObj instanceof CanvasItem && tmpObj.pointInsideObj(checkX,checkY)){
			return tmpObj;
		}
	}
	return null;
}

/* Detects which object is being selected by the user by clicking. Later added objects get selected first. 
 * Returns object index */
 
function getSelObjectIndex(x, y){
	var curZoom = this.zoom;
	var checkX = x / curZoom;
	var checkY = y / curZoom;
	
	var tmpObj = null;
	for (var i=drawElements.length-1; i>=0 ; i--){
		tmpObj = drawElements[i];
		
		if (tmpObj instanceof CanvasItem){
			if (tmpObj.pointInsideObj(checkX,checkY)){
				return i;
			}
		}
	}
	return null;
}


/* Gets the object which is currently in scaling operation */
function getScalingObject(){
	var tmpObj = null;
	for (var i=drawElements.length-1; i>=0 ; i--){
		tmpObj = drawElements[i];
		
		if (tmpObj instanceof CanvasItem){
			if (tmpObj.getStatus() == ObjectStatus.SCALE){
				return tmpObj;
			}
		}
	}
	return null;
}

/* Gets the object which is currently in rotating operation */
function getRotatingObject(){
	var tmpObj = null;
	for (var i=drawElements.length-1; i>=0 ; i--){
		tmpObj = drawElements[i];
		
		if (tmpObj instanceof CanvasItem){
			if (tmpObj.getStatus() == ObjectStatus.ROTATE){
				return tmpObj;
			}
		}
	}
	return null;
}

/* Gets the current mouse pointer location x */
function getX(e){
	
	if (e.layerX || e.layerX == 0) { // Firefox
		x = e.layerX;
	} else if (e.offsetX || e.offsetX == 0) { // Opera
		x = e.offsetX;
	}
	
	if (isIE == true) {
		x = x-rulerWidth;
	}
	return x;
}

/* Gets the current mouse pointer location y */
function getY(e){
	if (e.layerX || e.layerX == 0) { // Firefox
		y = e.layerY;
	} else if (e.offsetX || e.offsetX == 0) { // Opera
		y = e.offsetY;
	}
	
	if (isIE == true) {
		y = y-rulerHeight;
	}
	
	return y;
}

/* Clears all elements in the stack and clears the canvas */
function clearDrawElements(){
	drawElements = [];
	lightBulbArr = [];
	drawAllObjects();
}

/* Loads objects from saved files using read params */
function generateAndLoadObjectFromParams(params){
	if (params.objType == ObjectType.SQUARE){
		currentObj = new Square();
	} else if (params.objType == ObjectType.CIRCLE){
		currentObj = new Circle();
	} else if (params.objType == ObjectType.WALL){
		currentObj = new Wall();
		currentObj.setWallThickness(params.objWallThickness);
	} else if (params.objType == ObjectType.CONT_WALL){
		currentObj = new CWall();
		currentObj.setVertices(params.objVerticesArr);
	} else if (params.objType == ObjectType.LIGHT_BULB){
		currentObj = new LightBulb();
		currentObj.setConnections(params.connections);
		currentObj.setLabel(params.label);
		currentObj.setSymbolPath(params.symbolPath);
		currentObj.setImgPath(params.imgPath);
		currentObj.setName(params.name);
		currentObj.setPrice(params.price);
		currentObj.notes = params.notes;
		lightBulbArr.push(currentObj);
	} else if (params.objType == ObjectType.LIGHT_SWITCH){
		currentObj = new LightSwitch();
		currentObj.setConnections(params.connections);
		currentObj.setSymbolPath(params.symbolPath);
		currentObj.setImgPath(params.imgPath);
		currentObj.setName(params.name);
		currentObj.setPrice(params.price);
		currentObj.notes = params.notes;
	} else if (params.objType == ObjectType.TEXT){
		currentObj = new DrawText();
		currentObj.setDrawText(params.drawText);
		currentObj.setFontSize(params.fontSize);
	} else if (params.objType == ObjectType.CHANGE){
		// Need to fill Change object when integrate file loading
	} else if (params.objType == ObjectType.ERASER){
		currentObj = new Eraser();
	}
	 else {
		alert ('Invalid Object Type');
		return;
	}
	
	
	currentObj.setPoints(params.objStartX, params.objStartY, params.objEndX, params.objEndY);
	
	pushElementToDrawElement(currentObj);
}


/* Although bulb objects associated with switches are saved, we can't just load them back because
 * we are generating new bulb objects when loading bulbs from saved file. 
 * 
 * The following function will go through all switches and bulbs and re-populate the
 * connected bulbs using 'label' attribute of saved bulbs */
function rePopulateConnectedBulbs(){
	var tmpObj, tmpConnections;
	var tmpConnectedBulb, tmpLabel, tmpObjLightBulb;
	var tmpNewConnections = [];
	for (var i=0; i<drawElements.length; i++){
		tmpNewConnections = [];
		tmpObj = drawElements[i];
		switch (tmpObj.getType()){
			case ObjectType.LIGHT_BULB:
			case ObjectType.LIGHT_SWITCH:
				tmpConnections = tmpObj.getConnections();
				for (var j=0; j<tmpConnections.length;j++){
					tmpConnectedBulb = tmpConnections[j];
					if (tmpConnectedBulb != undefined){
						tmpLabel = tmpConnectedBulb.label;
						connectedLightBulbLabels.push(tmpLabel);
						tmpObjLightBulb = getLightBulbFromLabel(tmpLabel);
						tmpNewConnections.push(tmpObjLightBulb);
					}
				}
				
				tmpObj.setConnections(tmpNewConnections);
			
			break;
			default:
		}
		
		
	}
}


/* Gets a bulb object by label */
function getLightBulbFromLabel(label){
	for (var i =0; i< lightBulbArr.length; i++){
		if (lightBulbArr[i].getLabel() == label){
			return lightBulbArr[i];
		}
	}
	return null;
}


/* Increments the zoom ratio */
function zoomIn(){
	zoom = zoom + minZoom;
	drawAllObjects();
	drawBackgroundImage();
}

/* Decrements the zoom ratio */
function zoomOut(){
	this.zoom = this.zoom - minZoom;
	if (this.zoom <minZoom) this.zoom =minZoom;
	drawAllObjects();
	drawBackgroundImage();
}

/* Resets the zoom ratio to 1 */
function zoomReset(){
	this.zoom = 1;
	drawAllObjects();
	drawBackgroundImage();
}

/* Scales up all elements */
function scale(currentScaleFactor, newScaleFactor){
	for (var i=0; i< drawElements.length; i++){
		if (drawElements[i] instanceof CanvasItem){
			drawElements[i].scale(currentScaleFactor,newScaleFactor);
		}
	}
	drawAllObjects();
}

/* Sets the scale variable to a lower value and calls scale function */
function scaleUp(){
	var currentScaleFactor = this.scaleFactor;
	var newScaleFactor = currentScaleFactor - 0.25;
	if (newScaleFactor <= 0.25) newScaleFactor = 0.25;
	this.scaleFactor = newScaleFactor;
	scale(currentScaleFactor,newScaleFactor);
	
}

/* Sets the scale variable to a higher value and calls scale function */
function scaleDown(){
	var currentScaleFactor = this.scaleFactor;
	var newScaleFactor = currentScaleFactor + 0.25;
	this.scaleFactor = newScaleFactor;
	scale(currentScaleFactor,newScaleFactor);
	
}

function scaleReset(){
	var currentScaleFactor = this.scaleFactor;
	var newScaleFactor = 1;
	this.scaleFactor = newScaleFactor;
	scale(currentScaleFactor,newScaleFactor);
}

/* Sets a zoom value directly */
function setZoom(zoomValue){
	this.zoom = zoomValue;
	if (this.zoom < minZoom ) this.zoom = minZoom;
}

/* Draws rays from the mouse ponter to a given radius. Rays will be blocked by any item */
function drawRayCasts(lightBulbObj, targetContext)
{
	if (lightBulbObj.getType() != ObjectType.LIGHT_BULB) return;
	
	var curZoom = this.zoom;
	var rayNo = 2000;
	var rayLength = lightBulbObj.getRayLength();
	var tmpPoints = [];
	var tmpPoint;
	var k=0;
	var lineTargetX, lineTargetY;
	polyArray = [];
	poly = [];
	var coordinates = lightBulbObj.getCoordinates();
	
	var lightBulbCenter = lightBulbObj.getCenter();
	var ax = lightBulbCenter.x;
	var ay = lightBulbCenter.y;
	
	
	var diff = 2*Math.PI/rayNo;
	var tmpIscc = {dist:0, edge:0, norm:{x:0, y:0}, refl:{x:0, y:0}};
	var iscc = {dist:0, edge:0, norm:{x:0, y:0}, refl:{x:0, y:0}};
	
	/* Populate every object (cont wall or square only) to a polygon array to compare minimum distances */
	for (var i=0; i<drawElements.length ; i++){
		tmpObj = drawElements[i];
		
		if (tmpObj.getType() == ObjectType.CONT_WALL || tmpObj.getType() == ObjectType.SQUARE){
			poly = tmpObj.getPolygon();
			polyArray.push(poly);
		}
	}
	
	targetContext.strokeStyle = '#FCD826';
	/* Here we keep an array of all end points of the light rays.
	 * We use it to draw a poligon and then draw a fading light within that poligon 
	 * 
	 */
	var lightEndPoints = []; 
	
	
	/* Calculate the distance of each ray */
	for(var i=0; i<rayNo; i++)
	{
		var dx = Math.cos(i*diff);
		var dy = Math.sin(i*diff);
		var tmpIst, minDist;
		
		minDist = 1000000;
		/* Let's retrieve each polygon in polygon array and check the minimum distance */
		for (var j =0; j < polyArray.length; j++){
			var isc;
			isc = PolyK.Raycast(polyArray[j], ax, ay, dx, dy, tmpIscc);
			
			if (!isc){
				tmpIscc.dist = 1000000;
			}
			if (isc && (tmpIscc.dist < minDist)){
				minDist = tmpIscc.dist;
			}
		}
		
		/* Light distance constraint */
		if (minDist > rayLength) minDist = rayLength;
		
		minDist = minDist;
		
		lineTargetX = ax+dx*minDist;
		lineTargetY = ay+dy*minDist;
		
		lineTargetX = lineTargetX * curZoom;
		lineTargetY = lineTargetY * curZoom
		
		lightEndPoints.push ({x:lineTargetX, y:lineTargetY});
	}
	
	/* Now draw the light polygon */
	var first = true;
	var prevX, prevY;
	var tmpX, tmpY;
	var centerX = ax * curZoom;
	var centerY = ay * curZoom;
	
	var lightGradient=targetContext.createRadialGradient(centerX,centerY,0,centerX,centerY,rayLength * curZoom);
	lightGradient.addColorStop(0,"yellow");
	lightGradient.addColorStop(1,'rgba(252, 216, 38, 0)');
	
	
	
	targetContext.beginPath();
	targetContext.moveTo(lightEndPoints[0].x,lightEndPoints[0].y);
	for (var i=0; i<lightEndPoints.length; i++){
		tmpX = lightEndPoints[i].x;
		tmpY = lightEndPoints[i].y;
		targetContext.lineTo(tmpX,tmpY);
	}
	
	targetContext.closePath();
	targetContext.fillStyle = lightGradient;
	targetContext.fill();
}

/* Polulates light bulbs menu using lightBulbArr array object */
function populateLightBulbMenu(){
	$('#switch-menu').html('');
	for (var i=0; i<lightBulbArr.length; i++){
		$('#switch-menu').append('<li><a href="#" data-id="'+i+'">'+lightBulbArr[i].getLabel()+'</a></li>');
	}
}

/* returns the outer most object of a connection, given the switch */
function getOutermostObject(switchObj){
	
	var tmpObj = switchObj;
	var connections = tmpObj.getConnections();
	var foundOutermost = false;
	var addedBulbLabels = [];
	
	
	while (connections.length > 0){
		tmpObj = connections[0];
		connections = tmpObj.getConnections();
	}
	
	return tmpObj;
}

/* Gets whether a given light bulb is already connected */
function lightBulbConnected(label){
	var added = false;
	for (var i = 0; i < connectedLightBulbLabels.length; i++){
		if (label == connectedLightBulbLabels[i]){
			return true;
		}
	}
	
	return false;
}

/* Reset the bulb menu */
function resetLightBulbMenu(){
	$('#switch-menu').hide();
}

// add switch bulb connection


$("#add-s-buld").on("click", function() {
        var bulbIndex = $("#switch-lig option:selected").val();
        var bulbObj = lightBulbArr[bulbIndex];
        var rootObjIndex = $('#switch-lig').attr('data-root-obj-id');
        var rootObj = drawElements[rootObjIndex];

        var outermostObj = getOutermostObject(rootObj);

        if (outermostObj.getType()== ObjectType.LIGHT_SWITCH || !lightBulbConnected(bulbObj.getLabel())){
            outermostObj.addLightBulbObj(bulbObj);
            connectedLightBulbLabels.push(bulbObj.getLabel());
            updateSwitchConnectedBulbLabelsInCurrentTimeState();
        } else {
            alert ('Light bulb already connected');
        }

        resetLightBulbMenu();
        event.preventDefault();
        drawAllObjects();
});

// end add switch bulb connection

$('#switch-menu').on('click','a',function(event){
	var link = $(this);
	var bulbIndex = $(link).attr('data-id');
	var bulbObj = lightBulbArr[bulbIndex];
	var rootObjIndex = $(link).parent().parent().attr('data-root-obj-id');
	var rootObj = drawElements[rootObjIndex];
	
	var outermostObj = getOutermostObject(rootObj);
	
	if (outermostObj.getType()== ObjectType.LIGHT_SWITCH || !lightBulbConnected(bulbObj.getLabel())){
		outermostObj.addLightBulbObj(bulbObj);
		connectedLightBulbLabels.push(bulbObj.getLabel());
		updateSwitchConnectedBulbLabelsInCurrentTimeState();
	} else {
		alert ('Light bulb already connected');
	}
	
	resetLightBulbMenu();
	event.preventDefault();
});

function getRulerParams(is_mm){
	var curZoom = this.zoom;
	var pixelsPerMm = 5 * curZoom;

	var pixelsPerUnit = pixelsPerMm;
	var unitsPerMajorDiv = 10;

	var smallDivsPerMajorDiv = 5;

	if (!is_mm) {
		pixelsPerUnit = 25.4 * pixelsPerMm; //inch
		unitsPerMajorDiv = 1
	}

	if (curZoom >= 10 ) {
		//unitsPerMajorDiv /= 10;
		smallDivsPerMajorDiv *= 10 
	} else if (curZoom >= 5) {
		//unitsPerMajorDiv /= 5;
		smallDivsPerMajorDiv *= 5
	} else if (curZoom >= 2) {
		//unitsPerMajorDiv /= 2;
		smallDivsPerMajorDiv *= 2
	} else if (curZoom >= 1) {
		unitsPerMajorDiv;
	} else if (curZoom >= 0.6) {
		unitsPerMajorDiv /= 0.5;
	} else {
		unitsPerMajorDiv /= 0.2;
	}
	// console.log("curZoom: "+ curZoom +",  unitsPerMajorDiv: "+unitsPerMajorDiv );
	return { "pixelsPerUnit":pixelsPerUnit, "unitsPerMajorDiv":unitsPerMajorDiv, "smallDivsPerMajorDiv":smallDivsPerMajorDiv }
}

/* Draws scale on top and left */
function drawRuler(){
	var curZoom = this.zoom;
	var rulerParams = getRulerParams(true);

	/* Draw top line */
	rulerContext.fillStyle = "#000000";
	rulerContext.strokeStyle="#000000";
	rulerContext.clearRect(0, 0, rulerCanvas.width, rulerCanvas.height);
	
	rulerContext.font="12px Open Sans";
	/* Draw top line markings */
	rulerContext.lineWidth=1;
	rulerContext.beginPath();
	
	var pixelsperMajorDivision = rulerParams.pixelsPerUnit * rulerParams.unitsPerMajorDiv; 
	var pixelsPerSmallStep = pixelsperMajorDivision / rulerParams.smallDivsPerMajorDiv  
	var count;
	/* Draw top center to right ruler */
	count = 4;
	for (var i=rulerOffsetX; i<= (canvasOrig.width) ;i = i + pixelsPerSmallStep){
		
		j = i+rulerWidth;
		if (j < rulerWidth) continue;

		rulerContext.moveTo(j,rulerHeight);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(j,rulerHeight-cmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height,cmLineWidth, cmLineColor);
			rulerContext.fillText((i - rulerOffsetX)/pixelsperMajorDivision,j+2,cmMarkingHeight/2);
			count = 0;
		}
		else {
			rulerContext.lineTo(j,rulerHeight-mmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height, mmLineWidth, mmLineColor);
		}
	}
	
	/* Draw top center to left ruler */
	count = 4;
	for (var i=rulerOffsetX; i >0 ;i = i - pixelsPerSmallStep){
		j = i+rulerWidth;
		rulerContext.moveTo(j,rulerHeight);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(j,rulerHeight-cmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height,cmLineWidth, cmLineColor);
			//~ rulerContext.fillText((i - rulerOffsetX)/pixelsperMajorDivision,j+2,cmMarkingHeight/2);
			count = 0;
		}
		else {
			rulerContext.lineTo(j,rulerHeight-mmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height, mmLineWidth, mmLineColor);
		}		
	}
	
	/* Draw left middle to bottom ruler */
	count = 4;
	for (var i=rulerOffsetY; i<= (canvasOrig.height); i = i + pixelsPerSmallStep){
		j = i+rulerHeight;
		if (j<rulerHeight) continue;
		rulerContext.moveTo(rulerWidth, j);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(rulerWidth-cmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,cmLineWidth, cmLineColor);
			//~ rulerContext.fillText((i-rulerOffsetY)/pixelsperMajorDivision, cmMarkingHeight/2 -10, j-2);
			count = 0;
		}
		else {
			rulerContext.lineTo(rulerWidth-mmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,mmLineWidth, mmLineColor);
		}	
	}
	
	/* Draw left middle to top ruler */
	count = 4;
	for (var i=rulerOffsetY; i>=0; i = i - pixelsPerSmallStep){
		j = i+rulerHeight;
		rulerContext.moveTo(rulerWidth, j);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(rulerWidth-cmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,cmLineWidth, cmLineColor);
			//~ rulerContext.fillText((i-rulerOffsetY)/pixelsperMajorDivision, cmMarkingHeight/2 -10, j-2);
			count = 0;
		}
		else {
			rulerContext.lineTo(rulerWidth-mmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,mmLineWidth, mmLineColor);
		}	
	}
	rulerContext.stroke();
}

function drawGridLine(x1,y1,x2,y2,lineWidth,color){
	contextOrig.lineWidth = (lineWidth == undefined) ? 1  : lineWidth ;
	contextOrig.strokeStyle = (color == undefined) ? "#E5E5E5" : color;
	contextOrig.beginPath();
	contextOrig.moveTo(x1,y1);
	contextOrig.lineTo(x2,y2);
	contextOrig.stroke();
}

function createAndInsertTextObject(){
	var insertText = $('#type-text').val();
	var fontSize = $('#type-text-size').val();
	var insertX = $('#text-container').attr('data-x');
	var insertY = $('#text-container').attr('data-y');
	
	if (toolAction != ToolActionEnum.EDITTEXT){
		currentObj = new DrawText();
	} 
	
	if (insertText.trim() !='') {
		if (currentObj.getType() == ObjectType.TEXT){
			currentObj.setDrawText(insertText);
			currentObj.setFontSize(fontSize);
			currentObj.setPoints(insertX,insertY - 25,parseInt(insertX)+250,insertY);
			
			if (toolAction != ToolActionEnum.EDITTEXT){
				pushElementToDrawElement(currentObj);
			}
			
			if (changeObj != undefined){
				if (changeObj.getTrackObject().getType() == ObjectType.TEXT) {
					changeObj.updateNewParameters();
					pushElementToDrawElement(changeObj);
					changeObj = undefined;
				}
			}
		} else {
			console.log ("Expecting text but getting ");
			console.log(currentObj);
		}
		$('#text-container').hide();
	} else {
		alert ('Please enter a text first!');
	}
	
	drawAllObjects();
	toolAction = ToolActionEnum.DRAW;
}

function showTextEdit(endX,endY, text, fontSize){
	var curZoom = this.zoom;
	
	if (text == undefined) text= "";
	if (fontSize == undefined) fontSize = 15;
	
	$('#text-container').css('left', (endX *curZoom)+ rulerWidth + 7).css('top', (endY * curZoom)+ rulerHeight- 8).attr('data-x', endX).attr('data-y', endY);
	$('#text-container').show();
	$('#type-text-size').val(fontSize);
	$('#type-text').val(text).focus();
	
}

function cancelTextEdit(){
	$('#text-container').hide();
	mouseStatus = MouseStatusEnum.UP;
	toolAction = ToolActionEnum.DRAW;
}

function logElementStacksBegin(){
	console.log("------ START -----");
	logElementStacks();
	console.log("------");
}

function logElementStacksEnd(){
	
	console.log("-----");
	logElementStacks();
	console.log("------ END -----");
}

function logElementStacks(){
	
	console.log(drawElements);
	console.log(drawElementsStack);
	console.log(deletedElements);
	console.log("CTI= "+currentTimeIndex);
}


function undo(){
	//console.log("IN UNDO");
	if (drawElements.length >0 ){
		var changeObj, trackObj, trackOldParams, tmpOldCoordinates;
		currentTimeIndex = (parseInt(currentTimeIndex) >0 ) ? parseInt(currentTimeIndex) - 1 : 0;
		changeObj = drawElements.pop();
		if (changeObj.getType() == ObjectType.CHANGE){
			/* Object change detected. Let's reverse that change */
			trackObj = changeObj.getTrackObject();
			if (changeObj.deleteElementIndex !=null && changeObj.drawElementIndex  != null){
				/* It seems this is either a delete or a cut. Then we take the deleted object
				 * from the deleteElements array and put it back */
				 
				 tmpObj = pullObjectFromDrawElements(getDrawElementIndexByObject(trackObj)); 
				 trackObj = insertDeletedDrawElementAtIndexLocation(changeObj.deleteElementIndex,changeObj.drawElementIndex);
				
			} 
			switch(trackObj.getType()){
				case ObjectType.LIGHT_BULB:
				case ObjectType.LIGHT_SWITCH:
					trackOldParams = JSON.parse(changeObj.getOldParameters());
					trackObj.setPoints(trackOldParams.objStartX, trackOldParams.objStartY, trackOldParams.objEndX, trackOldParams.objEndY);
				break;
				case ObjectType.TEXT:
					trackOldParams = JSON.parse(changeObj.getOldParameters());
					trackObj.setPoints(trackOldParams.objStartX, trackOldParams.objStartY, trackOldParams.objEndX, trackOldParams.objEndY);
					trackObj.setDrawText(trackOldParams.drawText);
					trackObj.setFontSize(trackOldParams.fontSize);
					
				break;
				case ObjectType.CONT_WALL:
					trackOldParams = JSON.parse(changeObj.getOldParameters());
					tmpOldCoordinates = trackOldParams.objVerticesArr;
					trackObj.objVerticesArr = tmpOldCoordinates;
					trackObj.setPointsFromVertices();
				break;
			}
			trackObj.setRotation(trackOldParams.rotation);
			
		}
		changeObj = null;
		
		updateLightBulbArray();
		populateLightBulbMenu();
		updateSwitchConnectedBulbLabelsInCurrentTimeState();
		drawelementListChanged = true;
		drawAllObjects();
		
	}
}

function redo(){
	//console.log("In REDO");
	var changeObj, trackObj, trackOldParams,tmpNewCoordinates;
	currentTimeIndex = (currentTimeIndex < drawElementsStack.length ) ? currentTimeIndex + 1 : drawElementsStack.length;	
	
	if (currentTimeIndex == 0) return;
	
	var tmpDrawElements = [];
	
	for (var i=0; i < (currentTimeIndex-1); i++){
		tmpDrawElements.push (drawElementsStack[i]);
	}
	
	changeObj = drawElementsStack[currentTimeIndex-1];
	
	//console.log(currentTimeIndex, changeObj);
	
	tmpDrawElements.push (changeObj);
	
	if (changeObj.getType() == ObjectType.CHANGE){
		/* Object change detected. Let's reverse that change */
		trackObj = changeObj.getTrackObject();
		
		switch(trackObj.getType()){
			case ObjectType.LIGHT_BULB:
			case ObjectType.LIGHT_SWITCH:
				trackNewParams = JSON.parse(changeObj.getNewParameters());
				trackObj.setPoints(trackNewParams.objStartX, trackNewParams.objStartY, trackNewParams.objEndX, trackNewParams.objEndY);
			break;
			case ObjectType.TEXT:
				trackNewParams = JSON.parse(changeObj.getNewParameters());
				trackObj.setPoints(trackNewParams.objStartX, trackNewParams.objStartY, trackNewParams.objEndX, trackNewParams.objEndY);
				trackObj.setDrawText(trackNewParams.drawText);
				trackObj.setFontSize(trackNewParams.fontSize);
			break;
			case ObjectType.CONT_WALL:
				trackNewParams = JSON.parse(changeObj.getNewParameters());
				tmpNewCoordinates = trackNewParams.objVerticesArr;
				trackObj.objVerticesArr = tmpNewCoordinates;
				trackObj.setPointsFromVertices();
			break;
		}
		trackObj.setRotation(trackNewParams.rotation);
	}
	
	drawElements = tmpDrawElements;
	updateLightBulbArray();
	populateLightBulbMenu();
	updateSwitchConnectedBulbLabelsInCurrentTimeState();
	drawelementListChanged = true;
	drawAllObjects();
}

function copyDrawElementsToStack(){
	/* If we draw something in a middle of undo, we just forget about un-did elements */
	drawElementsStack = [];
	for (var i = 0; i< drawElements.length; i++){
		drawElementsStack.push(drawElements[i]);
	}
}

function updateLightBulbArray(){
	var tmpLightBulbArr = [];
	var tmpObj;
	
	for (var i=0; i< drawElements.length; i++){
		tmpObj = drawElements[i];
		if (tmpObj.getType() == ObjectType.LIGHT_BULB){
			tmpLightBulbArr.push(tmpObj);
		}
		lightBulbArr = tmpLightBulbArr;
	}
}

function getWhetherLightBulbOnCanvas(bulbLabel){
	for (var i=0; i< drawElements.length; i++){
		tmpObj = drawElements[i];
		
		if (tmpObj.getType() == ObjectType.LIGHT_BULB){
			if (tmpObj.getLabel() == bulbLabel) return true;
		}
	}
	return false;
}


function updateSwitchConnectedBulbLabelsInCurrentTimeState(rootObj){
	
	var tmpRootObj;
	if (rootObj == undefined){
		switchConnectedBulbLabelsInCurrentTimeState = [];
		/* We iterate through elements and recursively add bulbs starting from switches */
		for (var i=0; i < drawElements.length; i++){
			tmpRootObj = drawElements[i];
			
			switch (tmpRootObj.getType()){
				case ObjectType.LIGHT_SWITCH:
					updateSwitchConnectedBulbLabelsInCurrentTimeState(tmpRootObj);
				break;
			} 
		}
	} else {
		
		if (rootObj.getType() == ObjectType.LIGHT_BULB) switchConnectedBulbLabelsInCurrentTimeState.push(rootObj.getLabel());
		
		tmpConnections = rootObj.getConnections();
				
		for (var j =0; j< tmpConnections.length; j++){
			tmpRootObj = tmpConnections[j];
			updateSwitchConnectedBulbLabelsInCurrentTimeState(tmpRootObj);
		}
	}
}

function isBulbLabelInSwitchConnectedBulbLabelsInCurrentTimeState(label){
	var tmpLabel = "";
	for (var i=0; i<switchConnectedBulbLabelsInCurrentTimeState.length; i++){
		tmpLabel = switchConnectedBulbLabelsInCurrentTimeState[i];
		if (tmpLabel == label) return true;
	}
}


function cut(selObjIndex){
	mouseAction = MouseActionEnum.CUT; 
	memObject = drawElements[selObjIndex];
	changeObj = new ChangeObject(memObject);
	changeObj.setDrawElementIndex(selObjIndex);
	 $('#mouse-action-container').hide();
}

function copy(selObjIndex){
	mouseAction = MouseActionEnum.COPY; 
	memObject = drawElements[selObjIndex];
	 $('#mouse-action-container').hide();
}

function paste(selObjIndex){
	var tmpObj, newX, newY, newObj;
	
	newX = $('#mouse-action-container').attr('left');
	newY = $('#mouse-action-container').attr('top');
	
	if (mouseAction == MouseActionEnum.CUT){
		var cutObjectIndex = getDrawElementIndexByObject(memObject);
		tmpObj = pullObjectFromDrawElements(getDrawElementIndexByObject(memObject));
		/* Insert this object in the deletedElementsIndex in order to use if user undo */
		deletedElements.push(tmpObj);
		tmpObj = memObject;
		tmpObj.moveObjTo(newX, newY);
		if (tmpObj.getType() == ObjectType.LIGHT_BULB || tmpObj.getType() == ObjectType.LIGHT_SWITCH){
			tmpObj.setCoordinates(newX, newY);
		}
		insertObjectToDrawElementsAtIndex(tmpObj,cutObjectIndex);
		changeObj.updateNewParameters();
		changeObj.setDeleteElementIndex(deletedElements.length-1);
		pushElementToDrawElement(changeObj);
		mouseAction = MouseActionEnum.NONE;
		updateLightBulbArray();
		populateLightBulbMenu();
	} else if (mouseAction == MouseActionEnum.COPY){
		tmpObj = memObject;
		newObj = jQuery.extend(true, {}, tmpObj);
		mouseAction = MouseActionEnum.COPY;
		newObj.moveObjTo(newX,newY);
		if (newObj.getType() == ObjectType.LIGHT_BULB){
			newObj.setCoordinates(newX,newY);
			newObj.setConnections([]);
			var lightBulbIndex = lightBulbArr.length +1;
			newObj.setLabel(lightBulbIndex);
			lightBulbArr.push(newObj);
			populateLightBulbMenu();
		} else if(newObj.getType() == ObjectType.LIGHT_SWITCH){
			newObj.setCoordinates(newX,newY);
			newObj.setConnections([]);
		}
		pushElementToDrawElement(newObj);
	}
	
	$('#mouse-action-container').hide();
	drawAllObjects();
	updateLightBulbArray();
}

function deleteContainingPack(productitem){
	if (productitem.isInsidePack) {
		var containingPack = drawElements.find( function(e){
			if (e.getType() == ObjectType.PACK) {
				return e.product_list.find( function (p) { return p == productitem });
			}
			return false;
		});
		// var canDeletePack = confirm("Selected product is associated with the pack : "+containingPack.name+"\nHence whole pack will be deleted");
		alert("Selected product is associated with the pack : "+containingPack.name+"\nHence whole pack will be deleted");
		var canDeletePack = true;

		if(canDeletePack){
			containingPack.product_list.forEach( removeObjectFromDrawElements );
			removeObjectFromDrawElements(containingPack);
		}
		$('#mouse-action-container').hide();
		drawelementListChanged = true;
		drawAllObjects();
		//TODO undo redo support
	}
}

/* Deletes an object and put it on the deleted objects array */
function deleteObj(selObjIndex){
	memObject = drawElements[selObjIndex];
	if (memObject instanceof ProductItem) {
		if (memObject.isInsidePack) {
			deleteContainingPack(memObject);
			return;
		}
	}
	changeObj = new ChangeObject(memObject);
	changeObj.setDrawElementIndex(selObjIndex);
	
	tmpObj = memObject;
	deletedElements.push(tmpObj);
	changeObj.updateNewParameters();
	changeObj.setDeleteElementIndex(deletedElements.length-1);
	pushElementToDrawElement(changeObj);
	tmpObj = pullObjectFromDrawElements(selObjIndex);
	mouseAction = MouseActionEnum.NONE;
	updateLightBulbArray();
	populateLightBulbMenu();
	$('#mouse-action-container').hide();
	drawelementListChanged = true;
	drawAllObjects();
}

function removeObjectFromDrawElements(obj){
	var tmpDrawElements = drawElements;
	var retObj;
	drawElements = [];
	drawElements = tmpDrawElements.filter( function(e){
		return e != obj;	
	});
}


function pullObjectFromDrawElements(index){
	var tmpDrawElements = drawElements;
	var retObj;
	drawElements = [];
	for (var i=0; i< tmpDrawElements.length; i++){
		if (i == index){
			retObj = tmpDrawElements[i];
		} else {
			pushElementToDrawElement(tmpDrawElements[i], true);
		}
	}
	return retObj;
}


function insertDeletedDrawElementAtIndexLocation(delElementIndex, drawElementInsertIndex){
	tmpObj = deletedElements[delElementIndex];
	return insertObjectToDrawElementsAtIndex(tmpObj,drawElementInsertIndex );
}


function insertObjectToDrawElementsAtIndex(obj, index){
	var tmpDrawElements = drawElements;
	drawElements = [];
	for (var i=0; i<index ; i++){
		pushElementToDrawElement(tmpDrawElements[i], true);
	}
	pushElementToDrawElement(obj,true);
	for (var i=index; i< tmpDrawElements.length; i++){
		pushElementToDrawElement(tmpDrawElements[i],true);
	}
	return obj;
}



/* We do not save rotated points of an object. Instead we keep the rotation as a var.
 * When we scale, we need to get the border of the rotated object.
 * 
 * cX = center X
 * cY = center Y
 * oX = original X
 * oY = original Y
 * rotation = angle to rotate in radians
 * 
 */
function getRotatedPoint(cX,cY,oX,oY, rotation){
	var radius =  Math.sqrt( Math.pow(oY - cY,2) + Math.pow(oX-cX,2)  );
	var alpha = Math.atan( (oY - cY) / (oX - cX));
	var y = radius * Math.sin(rotation + alpha) + cY;
	var x = radius * Math.cos(rotation + alpha) + cX;
	return { x: x, y:y}
} 


function checkIE() {
	this.isIE = true;
	
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
	this.isIE = false;
    // other browser
    return false;
}

function preloadAndCacheImages(imgArray) {
    if (!preloadAndCacheImages.list) {
        preloadAndCacheImages.list = [];
    }
    var list = preloadAndCacheImages.list;
    for (var i = 0; i < imgArray.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = imgArray[i];
    }
}

$(document).keydown(function(e) {
	console.log("key down :" + e.keyCode); 
	if (e.keyCode == 17) {
		isCtrlPressed = true;  
	}
	if (e.keyCode == 18) {
		isAltPressed = true;  
	}		
	if (isCtrlPressed && isAltPressed) {
		if (e.keyCode == 65) { //a
			isAngleSnappingOn = !isAngleSnappingOn;
		}
		if (e.keyCode == 71) { //g
			isGridSnappingOn = !isGridSnappingOn;
		}
	}
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        performEscapeAction();
    }
	if (e.keyCode == 17) {
		isCtrlPressed = false;  
	}
	if (e.keyCode == 18) {
		isAltPressed = false;  
	}
    //(+)TBIRD VB0.4 - START
    if (e.keyCode == 46){
        performDelAction();
    }
    //(+)TBIRD VB0.4 - FINISH
});


function performEscapeAction(){
    mouseStatus = MouseStatusEnum.UP;
    wallPointsCount = 0;
    currentCWallPoints.pop();	    
	drawAllObjects();
}

//(+)TBIRD VB0.4 - START
function performDelAction(){
    var link = $(this);
    var selObjIndex = $(link).attr('data-id');
    //console.log(" Link => " + link);
    //console.log(" Object ID => " + selObjIndex);
    deleteObj(selObjIndex);
}

function simulateEScPressForMenu() {
    $('#mouse-action-container').hide();
    performEscapeAction();
}
//(+)TBIRD VB0.4 - FINISH



// function generatePdf(){
// 	var txt;
// 	var tmpEle;
//
// 	for (var i=0 ; i< drawElements.length; i++){
// 		tmpEle = drawElements[i];
// 		if (tmpEle.getType() != ObjectType.CHANGE){
// 			alert (tmpEle.getType());
// 		}
// 	}
// 	//alert(txt);
// }




