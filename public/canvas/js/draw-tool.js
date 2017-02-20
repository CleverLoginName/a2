var canvasOrig, contextOrig, canvas, rulerCanvas, rulerContext, context, currentObj, changeObj, bg_Canvas, era_canvas
var isIE = false;
var isCtrlPressed = false;
var isAltPressed = false;
var isAngleSnappingOn = true;
var isGridSnappingOn = false;
var backgroundImage; 
var showSelectedObjects =false;
var drawelementListChanged =false;
var lastConectedObj;
var firstSelectedObject;
var eraserSeg = null;
var curEraserSize = 15;

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
	REMOVE_CONNECTION:10,
	CONNECTION:11
}

var MouseButtonEnum = {
	LEFT:1,
	RIGHT:3
}

var DataLevel = {
	PROJECT:1,
	PROJECT_FLOORPLAN:2,
	PROJECT_FLOORPLAN_PRODUCT:3,
	NONE:100
}

//------------------------------
var project_pack_list = []; //array of packs in the project
var project_bom_dict = {}; 
var project_bom_dict_std_inc = {}; 
//------------------------------

// ......................
var mouseDownEvent = false;
var selectedConnection = 0;
// ......................

var canvasHelper = null;

var lightBulbArr = []; /* Holds the light bulbs */
var connectedLightBulbLabels = []; /* Holds the connected light bulb labels to avoid re-adding */
var switchConnectedBulbLabelsInCurrentTimeState = []; /* This is useful in undo / redo. We keep track which bulbs are connected to switches in the current status */
var mouseAction = MouseActionEnum.NONE;
var memObject = null;

/* curZoom holds the current zoom ratio. Originally it is 1 and has increments/decrements of 0.05 */
// var zoom = 1;
var minZoom = 0.25;

var mouseStatus = MouseStatusEnum.UP;
var toolAction = ToolActionEnum.DRAG;
var drawObjectType = ObjectType.WALL;

///////////////////////////
var productDataArray = [];
var floorplanDataArray = [];
var projectDataArray = [];

var isProductDataChanged = false;
var isFloorplanDataChanged = false;
var isProjectDataChanged = false;

var productCommentIndex = 0;
///////////////////////////

var drawElements = [];
var drawElementsStack = []; /* Used to track the object history for undo / redo */
var deletedElements = [];


var startX, startY, endX, endY;
var clickX, clickY, offsetX, offsetY; // For drag objects
var selObj, scaleObj, scaleDirection, rotateObj, tmpInitialRotation, selObjCenter;
var wallThickness = 10;
var currentCWallPoints = new Array();

var clickTimeout = 1000; /* in milli seconds */
var checkDoubleClick = 0;

var scaleFactor = 1; /* Scale of the map. This get changes when user scales up or down the map */
var scaleItemSelTrigger =false; /* Flag to identify whether the click is to select the scaleing object. Useful to ommit it on undo operations */
var currentTimeIndex = 0; /* Index of drawElement we draw upto. This value changes when undo / redo */

var	rotateObjInitAngle = 0;
var rotateOffsetAngle = 0;

var object_id_map = {}

/* Continuous wall realted variables */

var wallPointsCount = 0;

/* End of Continuous wall related variables */

/* Ruler related variables */
	
	var mmMarkingHeight = 10;
	var cmMarkingHeight = 30;
	
	var rulerHeight = 0 ;
	var rulerWidth = 0;
	
	var origOffsetX = 0; /* Not mandatory to keep these two vars */
	var origOffsetY = 0;
	
	var mmLineWidth = 1;
	var mmLineColor = 'rgba(206, 206, 206, 0.3)';
	
	var cmLineWidth = 1;
	var cmLineColor = 'rgba(206, 206, 206, 0.8)';
	
	
/* end of ruler related vars */
 
/* Initializing of the script.
 * Defines the contexts. There are two canvases. One for dynamic drawing and one to draw already driven elements.
 * Defines mouse related event listeners */
 
function init(){
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
	
	//init canvas properties (zoom, pan etc..)
	canvasHelper = new CanvasHelper(); 

	adjustDesignArea();
	$("#draw-tool-canvas").removeClass("hide-canvas");

    container.appendChild(canvas);
    context = canvas.getContext('2d');
    context.strokeStyle = "#FF0000";
	
	canvas.addEventListener("mousedown", function (e) {
		mouseDown(e);
	}, false);

	canvas.addEventListener("mouseup", function (e) {
		mouseUp(e);
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

	//preloadAndCacheImages(['img/lightdemo.png','img/swtichdemo.PNG']);
	drawAllObjects();
	drawBackgroundImage();
	changeToolAction(ToolActionEnum.DRAG);
}


$("body").on("contextmenu", "canvas", function(e) {
  return false;
});

/* Handles what happens on a right click */
function contextMenu(e){
	hideItemPopups();
	var curZoom = canvasHelper.zoom;
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
	//todo
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
	var curZoom = canvasHelper.zoom;
	mouseStatus = MouseStatusEnum.DOWN;
	
	startX = getX(e);
	startY = getY(e);
	
	if (toolAction == ToolActionEnum.ERASE){		
		var erPnt = canvasHelper.convertViewportXyToCanvasXy({x:startX, y:startY});
		eraserSeg = new Eraser();
		eraserSeg.setErasePoints(erPnt.x, erPnt.y);	
	}

	if (toolAction == ToolActionEnum.DRAW){
		if (drawObjectType == ObjectType.CONT_WALL){
			mouseStatus = MouseStatusEnum.CONT_DRAW;
			console.log("MS "+mouseStatus, "SX=",startX, "SY=",startY);
			var pnt = canvasHelper.convertViewportXyToCanvasXy({x:startX, y:startY});
			var startX_fixed = pnt.x;
			var startY_fixed = pnt.y;
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
		/* Need to find out the object user is trying to move */
		selObj = getSelObject(startX, startY);
		showSelectedObjects = true;
		/* create the changeObj and save obj and initial params */
		
		if (selObj != null){
			changeObj = new ChangeObject(selObj);			
			mouseStatus = MouseStatusEnum.DRAG;
			hideItemPopups();
			clickX = startX / curZoom;
			clickY = startY / curZoom;
			offsetX = (selObj.getObjStartX() - (startX / curZoom));
			offsetY = (selObj.getObjStartY() - (startY / curZoom));	
		} 
	}else if (toolAction == ToolActionEnum.CONNECTION){
		mouseDownEvent = true;
		selectedConnection = findClickeConnection(e);

	} else if (toolAction == ToolActionEnum.PAN){
		mouseStatus = MouseStatusEnum.PAN;
		clickX = startX / curZoom;
		clickY = startY / curZoom;
		
		/* Set ruler offset */
		origOffsetX = canvasHelper.panX;
		origOffsetY = canvasHelper.panY;
		
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
			var pnt = canvasHelper.convertViewportXyToCanvasXy({x:startX, y:startY});
			scaleDirection = scaleObj.getScaleDirection(pnt.x, pnt.y);
			if (scaleDirection != null){
				changeObj = new ChangeObject(scaleObj); /* Scaling of object, so record the change */
				
				clickX = pnt.x;
				clickY = pnt.y;
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
	var curZoom = canvasHelper.zoom;
	
	endX = getX(e);
	endY = getY(e);

	var w,h;

	if (toolAction == ToolActionEnum.ERASE){		
		if (mouseStatus == MouseStatusEnum.DOWN) {
			var erPnt = canvasHelper.convertViewportXyToCanvasXy({x:endX, y:endY});
			eraserSeg.setErasePoints(erPnt.x, erPnt.y);
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
		selObj.moveObjTo( (endX/curZoom + offsetX), (endY/curZoom+offsetY));
		
	} else if (toolAction == ToolActionEnum.CONNECTION){
		if(mouseDownEvent){
		  dragControlPoint(e,contextOrig,selectedConnection);
		}
	} else if (mouseStatus == MouseStatusEnum.PAN){
		var tmpOffsetX, tmpOffsetY;
		
		canvasHelper.panX = origOffsetX+ (endX / curZoom - clickX);
		canvasHelper.panY = origOffsetY+ (endY / curZoom - clickY);	

		var minOffsetX = -1;
		var minOffsetY = -1;
		if (backgroundImage != undefined){
			minOffsetX = backgroundImage.width - canvas.width / curZoom;
			minOffsetY = backgroundImage.height - canvas.height / curZoom;
		}
		minOffsetX = (minOffsetX < 0) ? 0 : -minOffsetX;
		minOffsetY = (minOffsetY < 0) ? 0 : -minOffsetY;

		if (canvasHelper.panX > 0) {
			canvasHelper.panX = 0;
		} else if (canvasHelper.panX < minOffsetX) {
			canvasHelper.panX = minOffsetX;
		}

		if (canvasHelper.panY > 0) {
			canvasHelper.panY = 0;
		} else if (canvasHelper.panY < minOffsetY) {
			canvasHelper.panY = minOffsetY;
		}

		drawBackgroundImage();
	} else if (mouseStatus == MouseStatusEnum.SCALE){
		var r_pnt = canvasHelper.convertViewportXyToCanvasXy({x:endX, y:endY})
		scaleObj.resize(this.scaleDirection, r_pnt.x, r_pnt.y, offsetX, offsetY);
	} else if (mouseStatus == MouseStatusEnum.ROTATE){
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
	drawEraserPointer();
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
    if (toolAction != ToolActionEnum.CONNECT && toolAction != ToolActionEnum.REMOVE_CONNECTION && toolAction != ToolActionEnum.CONNECTION){
        hideItemPopups();
    }

	if (e.which != 1) return false;
	endX = this.getX(e);
	endY = this.getY(e);
	
	var curZoom = canvasHelper.zoom;

	if (toolAction == ToolActionEnum.ERASE){
		eraserSeg.eraserColor = "#ffffff";
		pushElementToDrawElement(eraserSeg);
		eraserSeg = null;
		mouseStatus = MouseStatusEnum.UP;
	} else if (toolAction == ToolActionEnum.CONNECTION){
				mouseDownEvent = false;
			
	} 

	if (toolAction == ToolActionEnum.DRAW){
		if ((mouseStatus == MouseStatusEnum.DRAW) || (mouseStatus == MouseStatusEnum.DOWN) || (mouseStatus == MouseStatusEnum.CONT_DRAW)){
			var pnt = canvasHelper.convertViewportXyToCanvasXy({x:startX, y:startY});
			var startX_fixed = pnt.x;
			var startY_fixed = pnt.y;
			pnt = canvasHelper.convertViewportXyToCanvasXy({x:endX, y:endY});
			var endX_fixed = pnt.x;
			var endY_fixed = pnt.y;
			
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
			
			} else if (drawObjectType == ObjectType.TEXT){
				/* Checks if user double clicks */
				// if (checkDoubleClick == false){
				// 	checkDoubleClick = true;
				// 	setTimeout(function(){
				// 		checkDoubleClick = false;
				// 		if ($('#text-container').css('display') == 'none'){
				// 			showTextEdit(startX_fixed, startY_fixed);
				// 		}
				// 	},200);
				// } else {
				// 	var tmpObjIndex = getSelObjectIndex(endX, endY);
				// 	if (tmpObjIndex != null && !isNaN(tmpObjIndex)){
				// 		var tmpObj = drawElements[tmpObjIndex];
				// 		if (tmpObj.getType() == ObjectType.TEXT){
				// 			toolAction = ToolActionEnum.EDITTEXT;
				// 			currentObj = tmpObj;
				// 			changeObj = new ChangeObject(currentObj);
				// 			showTextEdit(tmpObj.getObjStartX(), tmpObj.getObjStartY(), tmpObj.getDrawText(), tmpObj.getFontSize());
				// 		}
				// 	}
				// }
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
			getCelectedConection(lastConectedObj,selObj);
		}else{
			hideItemPopups();
			changeToolAction(ToolActionEnum.DRAG);
		}
        drawAllObjects();
	}else if (toolAction == ToolActionEnum.CONNECT){
        //populateDialog(e,firstSelectedObject);
        selObj = getSelObject(startX, startY);
        if (selObj != null){
            if(selObj.getType()== ObjectType.LIGHT_BULB || selObj.getType()== ObjectType.PRODUCT){
				if(!isAlradyConected(lastConectedObj,selObj)){
					var bulb_connection = new Connection();
					bulb_connection.setsourseId(lastConectedObj.getUniqueItemID());
					bulb_connection.setdestinationId(selObj.getUniqueItemID());
					bulb_connection.setUniqueItemID( generateUID() );
					calControllPoint(lastConectedObj,selObj,bulb_connection);
					pushElementToDrawElement(bulb_connection);
					populateDialog(e,firstSelectedObject);
				}else {
                   new PNotify({
					title: 'Cannot connect',
					text: 'This connection already define',
					type: 'info'
				});
                }
				lastConectedObj = selObj;
				drawAllObjects();
            }
            event.preventDefault();
            drawAllObjects();
        }else{
			hideItemPopups();
			changeToolAction(ToolActionEnum.DRAG);
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
            selObj = getSelObject(startX, startY);
            if (selObj != null){
                temp_selected_obj =selObj;
                //ishara
				if (temp_selected_obj.getType() == ObjectType.LIGHT_SWITCH ||
					temp_selected_obj.getType() == ObjectType.LIGHT_BULB ||
					temp_selected_obj.getType() == ObjectType.PRODUCT) {
					firstSelectedObject = selObj;
					lastConectedObj = selObj;
					populateDialog(e, selObj);
				}
            }
        }
		
	} else if (toolAction == ToolActionEnum.PAN){
		mouseStatus = MouseStatusEnum.UP;
		drawBackgroundImage();
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
    var val = temp_selected_obj.imgPath;
    
    document.getElementById('popupImageIcon').src = selObj.symbolPath;
    document.getElementById('popupImage').src = selObj.imgPath;
 
    document.getElementById('canvas_popup_productName').innerHTML = selObj.name;
	$('#canvas_popup_productName').attr('title',selObj.name);

	var colorname = "N/A";
	// if (selObj.color != undefined) {
	// 	var match = ntc.name(selObj.color);
	// 	colorname    = match[1];
	// }

    document.getElementById('canvas_popup_productColor').innerHTML = colorname;
    document.getElementById('canvas_popup_productWatt').innerHTML = (selObj.watts != undefined) ? selObj.watts : "N/A";
    document.getElementById('canvas_popup_productStyle').innerHTML = (selObj.style != undefined) ? selObj.style : "N/A";
    document.getElementById('canvas_popup_SIVcode').innerHTML = (selObj.SIVcode != undefined) ? selObj.SIVcode : "N/A";
	
    document.getElementById('canvas_popup_productPrice').innerHTML = selObj.price;
    
    var textarea = document.getElementById("display_notes");
    textarea.value = selObj.getNotes();
    enteredCommentes ="";
    valuesAdded = false;
	// getTopPosition();
}	


function getDataLevel(obj){
	switch (obj.getType()) {
		case ObjectType.PRODUCT:
		case ObjectType.LIGHT_BULB:
		case ObjectType.LIGHT_SWITCH:
		case ObjectType.TEXT:
		case ObjectType.PACK: //todo move to project 
		case ObjectType.CONNECT:
			return DataLevel.PROJECT_FLOORPLAN_PRODUCT;

		case ObjectType.WALL:
		case ObjectType.CONT_WALL:
		case ObjectType.ERASER:
		//case ObjectType.PLANIMAGE: //todo
			return DataLevel.PROJECT_FLOORPLAN;

		// case ObjectType.PACK:
		// 	return DataLevel.PROJECT;
	
		default:
			return DataLevel.NONE;
	}
}

function getRelatedArray(obj, setChange){
	var relatedArr = null;
	switch (getDataLevel(obj)) {
		case DataLevel.PROJECT_FLOORPLAN_PRODUCT:
			isProductDataChanged = (setChange)? true : isProductDataChanged;
			relatedArr = productDataArray;
			break;
		case DataLevel.PROJECT_FLOORPLAN:
			isFloorplanDataArray = (setChange)? true : isFloorplanDataArray;
			relatedArr = floorplanDataArray;
			break;
		case DataLevel.PROJECT:
			isProjectDataArray = (setChange)? true : isProjectDataArray;
			relatedArr = projectDataArray;
			break;
	
		default:
			break;
	}
	return relatedArr;
}

/* Pushes an object in to draw elements */
function pushElementToDrawElement(e, ignoreCopyToStack){
	relatedSubArr = getRelatedArray(e, true);
	if (relatedSubArr != null) {
		relatedSubArr.push(e);
	}
	
	drawElements.push(e);
	if (!(ignoreCopyToStack != undefined && ignoreCopyToStack == true)){
		copyDrawElementsToStack();
		currentTimeIndex = currentTimeIndex + 1;
	}
	drawelementListChanged = true;
}

function popDrawElement(){
	var obj1 = drawElements.pop();
	relatedSubArr = getRelatedArray(obj1, true);
	if (relatedSubArr != null) {
		var index = relatedSubArr.indexOf(obj1);

		if (index > -1) {
			relatedSubArr.splice(index, 1);
		}
	}
	return obj1;
}

function popElementFromDrawElementsAndStack(){
	drawElements.pop();
	drawElementsStack.pop();
	currentTimeIndex = currentTimeIndex - 1;
	drawelementListChanged = true;
}

function pushDeletedElement(del_obj){
	deletedElements.push(del_obj);
	var relatedArr = getRelatedArray(del_obj, true);
	if (relatedArr != null) {
		//remove element from related array
		var index = relatedArr.indexOf(del_obj);

		if (index > -1) {
			relatedArr.splice(index, 1);
		}
	}
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
	var curZoom = canvasHelper.zoom;
	
	context.clearRect(0,0,canvas.width, canvas.height);
	var sX, sY,eX,eY,rulerWidth, rulerHeight,tmpX, tmpY;
	
	// rulerWidth  = this.rulerWidth;
	// rulerHeight = this.rulerHeight;
	
	sX = startX;
	sY = startY;
	eX = endX;
	eY = endY ;
	
	if (mouseStatus == MouseStatusEnum.CONT_DRAW && drawObjectType == ObjectType.CONT_WALL){
		var pnt;
		var tmpCWallPoints = new Array();
		$(currentCWallPoints).each(function(i,e){
			pnt = canvasHelper.convertCanvasXyToViewportXy(e);
			tmpCWallPoints.push ({x: pnt.x, y: pnt.y});
		});
		// drawContWall(tmpCWallPoints,context, eX, eY);
		var filtered_pnt = getFilteredCoordinates(tmpCWallPoints, eX, eY);
		drawContWall(tmpCWallPoints,context, filtered_pnt.x, filtered_pnt.y);
	}
	else if (eraserSeg != null) {
		eraserSeg.draw(era_canvas.getContext('2d'), canvasHelper);
	}
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

/* Draws continuous wall */
function drawContWall(pointsArr, targetContext, curX, curY){
	var first = true;
	var sX,sY,eX,eY;
	var crossPointForArc;
	targetContext.lineWidth=5;
	targetContext.strokeStyle = '#000000';
	
	var last_pnt = pointsArr[pointsArr.length - 1];
	
	if (mouseStatus == MouseStatusEnum.CONT_DRAW){
		/* Dynamic line following the mouse movement */
		targetContext.strokeStyle = '#FF0000';
		targetContext.beginPath();
		targetContext.moveTo(last_pnt.x, last_pnt.y);
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
 

function clearCanvasContexts() {
	context.clearRect(0,0,canvas.width, canvas.height);
	contextOrig.clearRect(0,0,canvasOrig.width, canvasOrig.height);
	era_canvas.getContext("2d").clearRect(0, 0, era_canvas.width, era_canvas.height);	
}

/* Call draw functions to draw all objects in the stack */
function drawAllObjects(){
	clearCanvasContexts();
	drawRuler();

	for (var i = 0; i < floorplanDataArray.length; i++) {
		var element = floorplanDataArray[i];
		var targetContext = (element.getType() == ObjectType.ERASER) ? era_canvas.getContext('2d') : contextOrig;
		element.draw(targetContext, canvasHelper);
	}

	for (var i = 0; i < productDataArray.length; i++) {
		var element = productDataArray[i];
		element.draw(contextOrig, canvasHelper);
	}

	//TODO projectDataArray loop
	// for (var i =0; i<this.drawElements.length; i++){
	// }

	drawCurrentObj();

	if(drawelementListChanged)
	{
		drawelementListChanged = false;
		updateBomTable(drawElements);
	}

	if (showSelectedObjects && selObj != null) {
		highlightObject(selObj)
	}

	// drawScaleFactorDetails();
	// drawZoomFactorDetails();	
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
		var curZoom = canvasHelper.zoom;
		var offset_pnt = canvasHelper.convertCanvasXyToViewportXy({x: 0, y: 0});
		ctx.drawImage(backgroundImage, offset_pnt.x, offset_pnt.y, backgroundImage.width * curZoom, backgroundImage.height * curZoom);
	}
}

function getDrawElementIndexByObject(obj){
	for (var i=0; i< drawElements.length; i++){
		if (drawElements[i] == obj) return i;
	}
	return null;
}

/* Draws the square following the mouse pointer showing some information */
function drawDrawerDetails() {
	var left_X = endX; //endX = mouseX
	var top_Y = endY;
	var mPnt = canvasHelper.convertViewportXyToCanvasXy({x:endX, y:endY});

	context.fillText("( " + (mPnt.x).toFixed(0) + ", " + (mPnt.y).toFixed(0) + " )", left_X + 20, top_Y + 30);
}

/* Draw Eraser pointer*/
function drawEraserPointer() {
	if (toolAction != ToolActionEnum.ERASE){
		return;
	}
	var curZoom = canvasHelper.zoom;
	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#000000';
	var radius = curEraserSize / 2;
	context.arc(endX, endY, radius * curZoom, false, Math.PI * 2, false);
	context.stroke();
}

/* Draws the current scale factor details */
function drawScaleFactorDetails(){
	$('#scale-ratio-display').html('1:'+this.scaleFactor.toFixed(2));
}

/* Draws the current zoom factor details */
function drawZoomFactorDetails(){
	$('#zoom-ratio-display').html(canvasHelper.zoom + "X ");
}

/* Call draw functions to draw light of a bulb */
function drawLightsOnCanvas(obj){
	
	if( obj.hasOwnProperty("visibility") && !obj.getVisibility()){
		//alert('called for switches');
		return;
	}
	var x,y,w,h;
	var pointsArr;
	var curZoom = canvasHelper.zoom;
	var tmpPointsArr = new Array();
	
	if (obj.getType() == ObjectType.LIGHT_BULB){
		var coor = obj.getCoordinates();
		var rad = obj.getRadius();
		// ray casts removed for now
		// drawRayCasts(obj, contextOrig); 
		// drawWiresFromSwitchOrBulbToConnectedLightBulbs(obj, contextOrig);
	} 
}

function drawConnections(rootObj, targetContext) {
    if(rootObj.getType() == ObjectType.CONNECT){
		var curZoom = canvasHelper.zoom;
		var beginPath = getObjectFromId(rootObj.getsourseId()).getCenter();
		var endPath = getObjectFromId(rootObj.getsdestinationId()).getCenter();
		var endx = endPath.x;
		var endy = endPath.y;
		targetContext.save();
		targetContext.lineWidth = 1;
        targetContext.setLineDash([5]);
		targetContext.strokeStyle ='#FF0000';
		targetContext.beginPath();
		var convertedPointstart = canvasHelper.convertCanvasXyToViewportXy(beginPath);
		targetContext.moveTo(convertedPointstart.x ,convertedPointstart.y);
		
		var cpx = rootObj.getcontrollerPointX(beginPath.x,endPath.x);
		var cpy = rootObj.getcontrollerPointY(beginPath.y,endPath.y);
		
		var convertedPointsCon = canvasHelper.convertCanvasXyToViewportXy({x:cpx,y:cpy});
		var convertedPointEnd =canvasHelper.convertCanvasXyToViewportXy(endPath);

		targetContext.quadraticCurveTo(convertedPointsCon.x,convertedPointsCon.y,convertedPointEnd.x,convertedPointEnd.y);
		targetContext.stroke();
		targetContext.restore();

		if(rootObj.getIsActive()){
			var boxWidth = rootObj.getTolarence()*2*curZoom;
			var boxCenter = canvasHelper.convertCanvasXyToViewportXy({x:rootObj.getcurvePointX(), y:rootObj.getcurvePointY()});
			contextOrig.fillStyle = "#FF0000";
			contextOrig.fillRect(boxCenter.x - boxWidth/2, boxCenter.y - boxWidth/2, boxWidth, boxWidth);
		}
	}
}

/* Draws object scaler boxes of an object */
function highlightObject(obj) {
    var coor = obj.getResizeCornerCoordinates();
    var curZoom = canvasHelper.zoom;
    objType = obj.getType();
	var r = 5;
	points = [];
	var pnt;
    if (objType == ObjectType.CONT_WALL) {
        objVertices = obj.getVerticesArr();
		pnt = canvasHelper.convertCanvasXyToViewportXy(objVertices[0]);
        x1 = pnt.x;
        y1 = pnt.y;

		pnt = canvasHelper.convertCanvasXyToViewportXy(objVertices[1]);
        x2 = pnt.x;
        y2 = pnt.y;

		points.push({x:x1, y:y1});
		points.push({x:x2, y:y2});

    } else {
		pnt = canvasHelper.convertCanvasXyToViewportXy( {x:obj.getObjStartX(), y:obj.getObjStartY()} );
		sX = pnt.x;
		sY = pnt.y;

		pnt = canvasHelper.convertCanvasXyToViewportXy( {x:obj.getObjEndX(), y:obj.getObjEndY() });
		eX = pnt.x;
		eY = pnt.y;

		points.push({x:eX, y:sY})
		points.push({x:eX, y:eY})
		points.push({x:sX, y:eY})
		points.push({x:sX, y:sY})
    }
	drawFillCircles(points, r, contextOrig, "#e74c3c");
}

/* Detects which object is being selected by the user by clicking. Later added objects get selected first. 
 * factor variable is used to expand the area of sensitivity
 * */
function getSelObject(x, y){
	var pnt = canvasHelper.convertViewportXyToCanvasXy({x:x, y:y});
	var checkX = pnt.x;
	var checkY = pnt.y;
	
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
	var pnt = canvasHelper.convertViewportXyToCanvasXy({x:x, y:y});
	var checkX = pnt.x;
	var checkY = pnt.y;
	
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
	} else if (params.objType == ObjectType.CONT_WALL){
		currentObj = new CWall();
	} else if (params.objType == ObjectType.LIGHT_BULB){
		currentObj = new LightBulb();
		lightBulbArr.push(currentObj);
	} else if (params.objType == ObjectType.LIGHT_SWITCH){
		currentObj = new LightSwitch();
	} else if (params.objType == ObjectType.TEXT){
		currentObj = new DrawText();
	} else if (params.objType == ObjectType.CHANGE){
		return;
	} else if (params.objType == ObjectType.ERASER){
		currentObj = new Eraser();
	} else if (params.objType == ObjectType.PACK){
		currentObj = new PackItem();
	} else if (params.objType == ObjectType.PRODUCT){
		currentObj = new ProductItem();
	} else if (params.objType == ObjectType.CONNECT){
		currentObj = new ProductItem();
	} else {
		console.error('Invalid Object Type :' + params.objType);
		return;
	}
	
	currentObj.copyProperties(params);
	//currentObj.setPoints(params.objStartX, params.objStartY, params.objEndX, params.objEndY);
	
	pushElementToDrawElement(currentObj);

	return currentObj;
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
	canvasHelper.zoom = canvasHelper.zoom + minZoom;
	drawAllObjects();
	drawBackgroundImage();
}

/* Decrements the zoom ratio */
function zoomOut(){
	canvasHelper.zoom = canvasHelper.zoom - minZoom;
	if (canvasHelper.zoom <minZoom) canvasHelper.zoom =minZoom;
	drawAllObjects();
	drawBackgroundImage();
}

/* Resets the zoom ratio to 1 */
function zoomReset(){
	canvasHelper.zoom = 1;
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
	canvasHelper.zoom = zoomValue;
	if (canvasHelper.zoom < minZoom ) canvasHelper.zoom = minZoom;
}

/* Draws rays from the mouse ponter to a given radius. Rays will be blocked by any item */
function drawRayCasts(lightBulbObj, targetContext)
{
	if (lightBulbObj.getType() != ObjectType.LIGHT_BULB) return;
	
	var curZoom = canvasHelper.zoom;
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
		
		lineTarget = canvasHelper.convertCanvasXyToViewportXy({x:lineTargetX, y:lineTargetY});
		lightEndPoints.push (lineTarget);
	}
	
	/* Now draw the light polygon */
	var first = true;
	var prevX, prevY;
	var tmpX, tmpY;
	var c_pnt = canvasHelper.convertCanvasXyToViewportXy({x:ax, y:ay});
	var centerX = c_pnt.x;
	var centerY = c_pnt.y;
	
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
	var curZoom = canvasHelper.zoom;
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
	var curZoom = canvasHelper.zoom;
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
	var offset_pnt = canvasHelper.convertCanvasXyToViewportXy({x: 0, y: 0});
	var xOffset = offset_pnt.x;
	var yOffset = offset_pnt.y;
	/* Draw top center to right ruler */
	count = rulerParams.smallDivsPerMajorDiv - 1;
	for (var i=xOffset; i<= (canvasOrig.width) ;i = i + pixelsPerSmallStep){
		
		j = i+rulerWidth;
		if (j < rulerWidth) continue;

		rulerContext.moveTo(j,rulerHeight);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(j,rulerHeight-cmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height,cmLineWidth, cmLineColor);
			rulerContext.fillText((i - xOffset)/pixelsperMajorDivision,j+2,cmMarkingHeight/2);
			count = 0;
		}
		else {
			rulerContext.lineTo(j,rulerHeight-mmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height, mmLineWidth, mmLineColor);
		}
	}
	
	/* Draw top center to left ruler */
	count = rulerParams.smallDivsPerMajorDiv - 1;
	for (var i=xOffset; i >0 ;i = i - pixelsPerSmallStep){
		j = i+rulerWidth;
		rulerContext.moveTo(j,rulerHeight);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(j,rulerHeight-cmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height,cmLineWidth, cmLineColor);
			//~ rulerContext.fillText((i - xOffset)/pixelsperMajorDivision,j+2,cmMarkingHeight/2);
			count = 0;
		}
		else {
			rulerContext.lineTo(j,rulerHeight-mmMarkingHeight);
			drawGridLine(i,0,i, canvasOrig.height, mmLineWidth, mmLineColor);
		}		
	}
	
	/* Draw left middle to bottom ruler */
	count = rulerParams.smallDivsPerMajorDiv - 1;
	for (var i=yOffset; i<= (canvasOrig.height); i = i + pixelsPerSmallStep){
		j = i+rulerHeight;
		if (j<rulerHeight) continue;
		rulerContext.moveTo(rulerWidth, j);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(rulerWidth-cmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,cmLineWidth, cmLineColor);
			//~ rulerContext.fillText((i-yOffset)/pixelsperMajorDivision, cmMarkingHeight/2 -10, j-2);
			count = 0;
		}
		else {
			rulerContext.lineTo(rulerWidth-mmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,mmLineWidth, mmLineColor);
		}	
	}
	
	/* Draw left middle to top ruler */
	count = rulerParams.smallDivsPerMajorDiv - 1;
	for (var i=yOffset; i>=0; i = i - pixelsPerSmallStep){
		j = i+rulerHeight;
		rulerContext.moveTo(rulerWidth, j);
		count += 1;
		if (count == rulerParams.smallDivsPerMajorDiv) {
			rulerContext.lineTo(rulerWidth-cmMarkingHeight,j);
			drawGridLine(0,i,canvasOrig.width,i,cmLineWidth, cmLineColor);
			//~ rulerContext.fillText((i-yOffset)/pixelsperMajorDivision, cmMarkingHeight/2 -10, j-2);
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
	var fontSize = $('#text-container-fontsize').val();
	var insertX = 0;
	var insertY = 0;
	
	if (toolAction != ToolActionEnum.EDITTEXT){
		currentObj = new DrawText();
	} 
	
	if (insertText.trim() !='') {
		if (currentObj.getType() == ObjectType.TEXT){
			currentObj.setDrawText(insertText);
			currentObj.setFontSize(fontSize);
			currentObj.setPoints(insertX,insertY,parseInt(insertX)+10,parseInt(insertY)+10);
			
			if (toolAction != ToolActionEnum.EDITTEXT){
				pushElementToDrawElement(currentObj);
				selObj = currentObj;
				changeToolAction(ToolActionEnum.DRAG);
				mouseStatus = MouseStatusEnum.DRAG;
				clickX = insertX;
				clickY = insertY;
				offsetX = 0;
				offsetY = 0;
			}
			
			if (changeObj != undefined && changeObj.getTrackObject().getType() == ObjectType.TEXT) {
				changeObj.updateNewParameters();
				pushElementToDrawElement(changeObj);
				changeObj = undefined;
			}
		} else {
			console.log ("Expecting text but getting ");
			console.log(currentObj);
			changeToolAction(ToolActionEnum.DRAG);
		}
		$('#text-container').modal('hide');
	} else {
		new PNotify({
			title: 'EMPTY TEXT',
			text: 'Please enter a text first!',
			type: 'error',
			icon: false
		});
		//alert ('Please enter a text first!');
	}
	
	drawAllObjects();
	// toolAction = ToolActionEnum.DRAW;
}

function showTextEdit(endX,endY, text, fontSize,obj){
	var curZoom = canvasHelper.zoom;
	// if(obj != null){
	// 	text = obj.getDrawText();
	// }
	
	if (text == undefined) text= "";
	if (fontSize == undefined) fontSize = 15;
	var pnt = canvasHelper.convertCanvasXyToViewportXy({x:endX, y:endY});
		$('#text-container').css('left',pnt.x + rulerWidth ).css('top',pnt.y + rulerHeight+$('#text-container').height()).attr('data-x', endX).attr('data-y', endY);
// $('#text-container').css('left', pnt.x + rulerWidth + 7).css('top', pnt.y + rulerHeight- 8).attr('data-x', endX).attr('data-y', endY);
	$('#text-container').show();
	$('#type-text-size').val(fontSize);
	$('#type-text').val(text).focus();
	
}

function cancelTextEdit(){
	$('#text-container').modal('hide');
	mouseStatus = MouseStatusEnum.UP;
	changeToolAction(ToolActionEnum.DRAG);
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
		changeObj = popDrawElement();
		if (changeObj.getType() == ObjectType.CHANGE){
			trackObj = changeObj.getTrackObject();
			if (changeObj.deleteElementIndex !=null && changeObj.drawElementIndex  != null){
				/* It seems this is either a delete or a cut. Then we take the deleted object
				 * from the deleteElements array and put it back */
				tmpObj = pullObjectFromDrawElements(getDrawElementIndexByObject(trackObj)); 
				trackObj = insertDeletedDrawElementAtIndexLocation(changeObj.deleteElementIndex,changeObj.drawElementIndex);

				relatedSubArr = getRelatedArray(trackObj, true);
				if (relatedSubArr != null && relatedSubArr.indexOf(trackObj) == -1) {
					relatedSubArr.push(trackObj);
				}
			}

			/* Object change detected. Let's reverse that change */
			trackOldParams = JSON.parse(changeObj.getOldParameters());
			trackObj.copyProperties(trackOldParams);
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
	if (currentTimeIndex < 0 || currentTimeIndex == drawElementsStack.length) return;
	currentTimeIndex = (currentTimeIndex < drawElementsStack.length) ? currentTimeIndex + 1 : drawElementsStack.length;	
	
	changeObj = drawElementsStack[currentTimeIndex -1];
	if (changeObj.getType() == ObjectType.CHANGE){
		/* Object change detected. Let's reverse that change */
		trackObj = changeObj.getTrackObject();
		if (changeObj.deleteElementIndex !=null && changeObj.drawElementIndex  != null){
			tmpObj = pullObjectFromDrawElements(changeObj.drawElementIndex);

			relatedSubArr = getRelatedArray(trackObj, true);
			if (relatedSubArr != null) {
				var index = relatedSubArr.indexOf(trackObj);
				if (relatedSubArr.indexOf(trackObj) != -1) {
					relatedSubArr.splice(index, 1);
				}
			}
		}
		

		trackNewParams = JSON.parse(changeObj.getNewParameters());
		trackObj.copyProperties(trackNewParams);
	}
	
	pushElementToDrawElement(changeObj, true);
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
		pushDeletedElement(tmpObj);

		var paste_obj = generateAndLoadObjectFromParams(memObject);
		paste_obj.setUniqueItemID(generateUID());
		paste_obj.moveObjTo(newX, newY);
		if (paste_obj.getType() == ObjectType.LIGHT_BULB || paste_obj.getType() == ObjectType.LIGHT_SWITCH){
			paste_obj.setCoordinates(newX, newY);
		}
		// insertObjectToDrawElementsAtIndex(tmpObj,cutObjectIndex);
		changeObj.updateNewParameters();
		changeObj.setDeleteElementIndex(deletedElements.length-1);
		pushElementToDrawElement(changeObj);
		mouseAction = MouseActionEnum.NONE;
		updateLightBulbArray();
		populateLightBulbMenu();
	} else if (mouseAction == MouseActionEnum.COPY){
		tmpObj = memObject;
		// newObj = jQuery.extend(true, {}, tmpObj);
		var newObj = generateAndLoadObjectFromParams(memObject);
		newObj.setUniqueItemID(generateUID());
		mouseAction = MouseActionEnum.COPY;
		newObj.setUniqueItemID(generateUID());
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
		//pushElementToDrawElement(newObj);
	}
	
	$('#mouse-action-container').hide();
	drawAllObjects();
	updateLightBulbArray();
}

function deleteContainingPack(productitem){
	if (productitem.isInsidePack) {
		var containingPack = getObjectFromId(productitem.getParentPackID());
		// var canDeletePack = confirm("Selected product is associated with the pack : "+containingPack.name+"\nHence whole pack will be deleted");
		alert("Selected product is associated with the pack : "+containingPack.name+"\nHence whole pack will be deleted");
		var canDeletePack = true;

		if(canDeletePack){
			containingPack.product_list.forEach( function (p_uid) {
				removeObjectFromDrawElements(getObjectFromId(p_uid));
			});
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
	pushDeletedElement(tmpObj);
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
			drawElements.push(tmpDrawElements[i]);
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
		drawElements.push(tmpDrawElements[i]);
	}
	drawElements.push(obj);
	for (var i=index; i< tmpDrawElements.length; i++){
		drawElements.push(tmpDrawElements[i]);
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

$(document).keydown(function (e) {
	// console.log("key down :" + e.keyCode);
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
	// } else if (e.keyCode == 69) { // 'e' for eraser
	// 	changeToolAction(ToolActionEnum.ERASE);
	// } else if (e.keyCode == 87) { // 'w' for walls
	// 	changeToolAction(ToolActionEnum.DRAW);
	// } else if (e.keyCode == 86) { // 'v' for Move
	// 	changeToolAction(ToolActionEnum.DRAG);
	// } else if (e.keyCode == 84) { // 't' for text
	// 	changeToolAction(ToolActionEnum.EDITTEXT);
	// } else if (e.keyCode == 84) { // 's' for scale
	// 	changeToolAction(ToolActionEnum.SCALE);
	// } else if (e.keyCode == 80) { // 'p' for pan
	// 	changeToolAction(ToolActionEnum.PAN);
	// } else if (e.keyCode == 90) { // 'z' for zoom in
	// 	zoomIn();
	// 	hideItemPopups();
	// } else if (e.keyCode == 88) { // 'x' for zoom out
	// 	zoomOut();
	// 	hideItemPopups();
	}
});

$(document).keyup(function (e) {
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
	if (e.keyCode == 46) {
		performDelAction();
	}
	//(+)TBIRD VB0.4 - FINISH
});

function changeToolAction(action) {
	$('.toggle-button').removeClass('active');
	performEscapeAction();

	switch (action) {
		case ToolActionEnum.ERASE:
			$('#eraser').parent().addClass('active');
			toolAction = ToolActionEnum.ERASE;
			break;
		case ToolActionEnum.DRAW:		     
    		drawObjectType = ObjectType.CONT_WALL;
			toolAction = ToolActionEnum.DRAW;
			$('#cwall').parent().addClass('active');			
			break;
		case ToolActionEnum.DRAG:			
			toolAction = ToolActionEnum.DRAG;
			$('#drag').parent().addClass('active');
			break;
		case ToolActionEnum.TEXT:
			drawObjectType = ObjectType.TEXT;
			toolAction = ToolActionEnum.DRAW;
			$('#add-text').parent().addClass('active');
			break;
		case ToolActionEnum.SCALE:			
			toolAction = ToolActionEnum.SCALE;
			$('#scale').parent().addClass('active');
			break;
		case ToolActionEnum.PAN:			
			toolAction = ToolActionEnum.PAN;
			$('#pan').parent().addClass('active');
			break;
	}
}

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

function getObjectFromId(id) {
	var object = null;
	if (object_id_map[id] == undefined){
		object = drawElements.find( function(e){
			return e.uid == id;
		});
		if (object == null || object == undefined) {
			//todo search from pack data
		}
		if (object != null && object != undefined) {
			object_id_map[id] = object;
		}
	} else {
		object = object_id_map[id];
	}
	return object;
}

function getLineCount(words ,ctx){
	var line = '';
    var lines = [];
	var maxWidth = getMaxWidth(words,ctx);
	     for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
		  if (testWidth > maxWidth && n > 0)  {
           	
            lines.push(line);
            line = words[n] + ' ';
          }
          else {
            line = testLine;
          }
		  if (n == words.length -1) {
            lines.push(line);
		  }
        }
	return 	lines.length;
}

function getConnection(id){
	var lines = [];
	for (var i = productDataArray.length - 1; i >= 0; i--) {
		if(productDataArray[i].objType == ObjectType.CONNECT){
			if(productDataArray[i].getsourseId() == id || productDataArray[i].getsdestinationId()== id){
				lines.push(productDataArray[i]);
			}
		}
	}
	return lines;
}

function setConnectionState(id,state){
	var curZoom = canvasHelper.zoom;
	var elements = [];
	var elements = getConnection(id);
	for (var i = elements.length - 1; i >= 0; i--) {
		elements[i].setIsActive(state);
	}
}
function findClickeConnection(e){
	clickX = getX(e);
	clickY = getY(e);
	var pnt = canvasHelper.convertViewportXyToCanvasXy({ x: clickX, y: clickY })
	for (var i = productDataArray.length - 1; i >= 0; i--) {
		if (productDataArray[i].objType == ObjectType.CONNECT && productDataArray[i].getIsActive()) {
			var tol = productDataArray[i].getTolarence() * canvasHelper.zoom;
			if (pnt.x > productDataArray[i].getcurvePointX() - tol &&
				pnt.x < productDataArray[i].getcurvePointX() + tol &&
				pnt.y > productDataArray[i].getcurvePointY() - tol &&
				pnt.y < productDataArray[i].getcurvePointY() + tol) {
				return productDataArray[i];
			}
		}
	}
	return 0;
}

function dragControlPoint(e,ctx,obj){
	if(obj == 0 || !mouseDownEvent){
		return;	
	}
	var newCP = canvasHelper.convertViewportXyToCanvasXy({x:endX,y:endY}); //mouse point converted to canvas
	obj.setcurvePointX(newCP.x);
	obj.setcurvePointY(newCP.y);
}


function calControllPoint(objSourse,objEnd,conObj){
	var beginPath = objSourse.getCenter();
	var endPath = objEnd.getCenter();
	var startX = beginPath.x;
	var starty = beginPath.y;
	var endx = endPath.x;               
	var endy = endPath.y;
	conObj.setcurvePointX((startX+endx)/2);
	conObj.setcurvePointY((starty+endy)/2);
}



function isAlradyConected(objSourse,objEnd){
	for (var i = productDataArray.length - 1; i >= 0; i--) {
		if(productDataArray[i].objType == ObjectType.CONNECT){
			if((productDataArray[i].getsourseId() == objSourse.getUniqueItemID() && 
			productDataArray[i].getsdestinationId() == objEnd.getUniqueItemID()) || 
			(productDataArray[i].getsourseId() == objEnd.getUniqueItemID() && 
			productDataArray[i].getsdestinationId() == objSourse.getUniqueItemID()) ||(objSourse.getUniqueItemID()==objEnd.getUniqueItemID())){
				return true;
			}
		}
	}
	return false;
}



function getCelectedConection(objSourse,objEnd){
	for (var i = productDataArray.length - 1; i >= 0; i--) {
		if(productDataArray[i].objType == ObjectType.CONNECT){
			if((productDataArray[i].getsourseId() == objSourse.getUniqueItemID() && 
			productDataArray[i].getsdestinationId() == objEnd.getUniqueItemID()) || 
			(productDataArray[i].getsourseId() == objEnd.getUniqueItemID() && 
			productDataArray[i].getsdestinationId() == objSourse.getUniqueItemID())){
				objEnd.setConectingMood(false);
				var objectsConected =getObjectFromId(productDataArray[i].getsdestinationId());
				productDataArray.splice(i, 1);
				new PNotify({
					title: 'CONNECTION DELETED',
					text: 'Product conectin deleted',
					type: 'error'
				});
			}
		}
	}
	
}

