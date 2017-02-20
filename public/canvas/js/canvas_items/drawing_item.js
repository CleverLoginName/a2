/////////////////////////////////////////////////////////////////////////////
/* Wall object inherit from Draw object */
/////////////////////////////////////////////////////////////////////////////
DrawingItem.prototype = new CanvasItem();
DrawingItem.prototype.constructor = Wall;
function DrawingItem(){
    //TODO add common drawing parameters and methods
}

/////////////////////////////////////////////////////////////////////////////
/* Circle object inherit from Draw object */
/////////////////////////////////////////////////////////////////////////////
Circle.prototype = new DrawingItem();
Circle.prototype.constructor = Circle;
function Circle(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.CIRCLE;
    this.scalerSize = 10;
}

/////////////////////////////////////////////////////////////////////////////
/* Square object inherit from Draw object */
/////////////////////////////////////////////////////////////////////////////
Square.prototype = new DrawingItem();
Square.prototype.constructor=Square;
function Square(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.SQUARE;
    this.scalerSize = 10;
}


Square.prototype.getPolygon = function(){
    var poly = [];

    poly.push(this.objStartX);
    poly.push(this.objStartY);

    poly.push(this.objEndX);
    poly.push(this.objStartY);

    poly.push(this.objEndX);
    poly.push(this.objEndY);

    poly.push(this.objStartX);
    poly.push(this.objEndY);

    return poly;
}

/////////////////////////////////////////////////////////////////////////////
/* Wall object inherit from Draw object */
/////////////////////////////////////////////////////////////////////////////
Wall.prototype = new DrawingItem();
Wall.prototype.constructor = Wall;
function Wall(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.WALL;
    this.objWallThickness = 5;
    this.scalerSize = 10;
}

Wall.prototype.setWallThickness = function(t){
    this.objWallThickness = t;
}

Wall.prototype.getWallThickness = function(){
    return this.objWallThickness;
}

/* Walls boundaries are set considering wall thickness. Overrides parent class action */
Wall.prototype.setPoints = function(sX, sY, eX, eY){
    var w,h;
    w = Math.abs(eX-sX);
    h = Math.abs(eY-sY);

    this.objStartX = sX;
    this.objStartY = sY;

    if (w>h){
        this.objEndX = eX;
        this.objEndY = sY + this.getWallThickness();
    } else {
        this.objEndX = sX + this.getWallThickness();
        this.objEndY = eY;
    }
}


Wall.prototype.draw = function (targetContext, canvasHelper) {
    str_pnt = canvasHelper.convertCanvasXyToViewportXy({ x: this.objStartX, y: this.objStartY });
    end_pnt = canvasHelper.convertCanvasXyToViewportXy({ x: this.objEndX, y: this.objEndY });

    var oldLineWidth = targetContext.lineWidth;
    targetContext.lineWidth = objWallThickness;

    targetContext.beginPath();
    targetContext.moveTo(str_pnt.x, str_pnt.y);
    targetContext.lineTo(end_pnt.x, end_pnt.y);
    targetContext.stroke();

    targetContext.lineWidth = oldLineWidth;
    CanvasItem.prototype.draw.call(this, targetContext, canvasHelper);
}


/////////////////////////////////////////////////////////////////////////////
/* Continuous wall object inherit from Draw object. Unlike other primitive object classes, this class 
 * keeps an array of points in order to maintain the drew figure (objVerticesArr). */
/////////////////////////////////////////////////////////////////////////////
CWall.prototype = new DrawingItem();
CWall.prototype.constructor = CWall;
function CWall(){

    this.objVerticesArr = new Array();

    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.CONT_WALL;
    this.scalerSize = 10;
}

CWall.prototype.getVerticesArr = function(){
    return this.objVerticesArr;
}

/* Setting boundaries is automatically done by analysing the vertices */
CWall.prototype.setPointsFromVertices = function(){
    var minX = 500000, minY=500000, maxX=0, maxY=0;

    $(this.objVerticesArr).each(function(i,e){
        if (e.x < minX) minX = e.x;
        if (e.x > maxX) maxX = e.x;
        if (e.y < minY) minY = e.y;
        if (e.y > maxY) maxY = e.y;
    });

    this.objStartX = minX;
    this.objStartY = minY;
    this.objEndX = maxX;
    this.objEndY = maxY;
}

/* pointsArr must be an array of point objects
 * 
 * e.g. [{x:10,y:20},{x:50,y:24}.....{x:789,y:59}]
 */
CWall.prototype.setVertices = function(pointsArrIncoming){
    var tmpObjVerticesArr = this.objVerticesArr;
    $(pointsArrIncoming).each(function(i,e){
        tmpObjVerticesArr.push({x:e.x, y:e.y});
    });
    this.setPointsFromVertices();
}

/* Gets the polygon of the continuous wall */

CWall.prototype.getPolygon = function (wallThickness){
    var w; // Half wall thickness

    if (isNaN(wallThickness)) {
        w = 1;
    } else {
        w = wallThickness;
    }

    var tmpObjVertices = this.getVerticesArr();
    var tmpVertex, tmpNextVertex,x1,y1,x2,y2;

    var polygon = [];
    var polygonSecondHalf = [];
    var lastPoint = false;

    for (var i =0; i< (tmpObjVertices.length-1); i++){
        tmpVertex = tmpObjVertices[i];
        x1 = parseInt(tmpVertex.x);
        y1 = parseInt(tmpVertex.y);

        tmpNextVertex = tmpObjVertices[i+1];
        x2 = parseInt(tmpNextVertex.x);
        y2 = parseInt(tmpNextVertex.y);

        if (x1 == x2 && y1 >= y2){
            polygon.push(x1 + w);
            polygon.push(y1 + w);

            if (!lastPoint){
                polygon.push(x2 + w)
                polygon.push(y2 - w);
            }

            polygonSecondHalf.push(y1 + w);
            polygonSecondHalf.push(x1 - w);

            if (!lastPoint){
                polygonSecondHalf.push(y2 - w);
                polygonSecondHalf.push(x2-w);
            }
        } else if( x1 < x2 && y1 > y2){
            polygon.push(x1 + w);
            polygon.push(y1 + w);

            if (!lastPoint){
                polygon.push(x2 + w);
                polygon.push(y2 + w);
            }
            polygonSecondHalf.push(y1 - w);
            polygonSecondHalf.push(x1 - w);
            if (!lastPoint){
                polygonSecondHalf.push(y2 - w);
                polygonSecondHalf.push(x2 - w);
            }
        } else if (x1 < x2 && y1 == y2){

            polygon.push(x1);
            polygon.push(y1 + w);
            if (!lastPoint){
                polygon.push(x2);
                polygon.push(y2 + w);
            }
            polygonSecondHalf.push(y1 - w);
            polygonSecondHalf.push(x1);
            if (!lastPoint){
                polygonSecondHalf.push(y2 - w);
                polygonSecondHalf.push(x2);
            }
        } else if (x1 < x2 && y1 < y2){
            polygon.push(x1 - w);
            polygon.push(y1 + w);

            if (!lastPoint){
                polygon.push(x2 - w);
                polygon.push(y2 + w);
            }
            polygonSecondHalf.push(y1 - w);
            polygonSecondHalf.push(x1 + w);

            if (!lastPoint){
                polygonSecondHalf.push(y2 - w);
                polygonSecondHalf.push(x2 + w);
            }
        } else if (x1 == x2 && y1 < y2){
            polygon.push(x1 - w);
            polygon.push(y1);

            if (!lastPoint){
                polygon.push(x2 - w);
                polygon.push(y2);
            }
            polygonSecondHalf.push(y1);
            polygonSecondHalf.push(x1 + w);

            if (!lastPoint){
                polygonSecondHalf.push(y2);
                polygonSecondHalf.push(x2 + w);
            }

        } else if (x1>x2 && y1 < y2){
            polygon.push(x1 - w);
            polygon.push(y1 - w);

            if (!lastPoint){
                polygon.push(x2 - w);
                polygon.push(y2 - w);
            }
            polygonSecondHalf.push(y1 + w);
            polygonSecondHalf.push(x1 + w);

            if (!lastPoint){
                polygonSecondHalf.push(y2 + w);
                polygonSecondHalf.push(x2 + w);
            }
        } else if (x1 > x2 && y1 == y2){
            polygon.push(x1);
            polygon.push(y1 - w);
            if (!lastPoint){
                polygon.push(x2);
                polygon.push(y2 - w);
            }

            polygonSecondHalf.push(y1 + w);
            polygonSecondHalf.push(x1);

            if (!lastPoint){
                polygonSecondHalf.push(y2 + w);
                polygonSecondHalf.push(x2);
            }
        } else if (x1 > x2 && y1 > y2){
            polygon.push(x1 + w );
            polygon.push(y1 - w);

            if (!lastPoint){
                polygon.push(x2 + w);
                polygon.push(y2 - w);
            }
            polygonSecondHalf.push(y1 + w);
            polygonSecondHalf.push(x1 - w);

            if (!lastPoint){
                polygonSecondHalf.push(y2 + w);
                polygonSecondHalf.push(x2 - w);
            }
        }
    }

    for (var i = polygonSecondHalf.length-1; i>=0; i--){
        polygon.push (polygonSecondHalf[i]);
    }

    return polygon;
}

/* Unlike other primitive classes, this class have multiple elements to move; therefore override */
CWall.prototype.moveObjTo = function(newStartX, newStartY){
    var xOffset = this.objStartX - newStartX;
    var yOffset = this.objStartY - newStartY;
    var tmpVertices = new Array();

    for (var i = 0; i< this.objVerticesArr.length; i++){
        this.objVerticesArr[i].x = this.objVerticesArr[i].x - xOffset;
        this.objVerticesArr[i].y = this.objVerticesArr[i].y - yOffset;
    }

    this.setPointsFromVertices();
}

/* Unlike other primitive classes, this class have multiple elements to resize; therefore override */
CWall.prototype.resize = function (direction, newX, newY, offsetX, offsetY){

    var tmpStartX, tmpStartY, tmpEndX, tmpEndY;
    var xScale, yScale;

    var scale;
    this.setPointsFromVertices();
    var x0, y0, x1, y1, xn, yn;
    switch (direction){
        case ObjectDirection.NE :
            xn = newX + offsetX;
            yn = newY - offsetY;
            
            x0 = this.objStartX;
            y0 = this.objEndY;

            x1 = this.objEndX;
            y1 = this.objStartY;
            break;

        case ObjectDirection.SE :
            xn = newX + offsetX;
            yn = newY + offsetY;
            
            x0 = this.objStartX;
            y0 = this.objStartY;

            x1 = this.objEndX;
            y1 = this.objEndY;
            break;

        case ObjectDirection.SW :
            xn = newX - offsetX;
            yn = newY + offsetY;
            
            x0 = this.objEndX;
            y0 = this.objStartY;

            x1 = this.objStartX;
            y1 = this.objEndY;
            break;

        case ObjectDirection.NW :
            xn = newX - offsetX;
            yn = newY - offsetY;
            
            x0 = this.objEndX;
            y0 = this.objEndY;

            x1 = this.objStartX;
            y1 = this.objStartY;
            break;

    }

    xScale = (x1 != x0) ? (xn - x0) / (x1 - x0) : 0;
    yScale = (y1 != y0) ? (yn - y0) / (y1 - y0) : 0;
    scale = (xScale > yScale) ? xScale : yScale;  
    if (scale > 0 ){
        for (var i = 0; i< this.objVerticesArr.length; i++){
            this.objVerticesArr[i].x = x0 + (this.objVerticesArr[i].x - x0) * scale;
            this.objVerticesArr[i].y = y0 + (this.objVerticesArr[i].y - y0) * scale;
        }
    }
    this.setPointsFromVertices();
}

/* Scales up or down the object by a given factor */
CWall.prototype.scale = function (oldScaleFactor, newScaleFactor){
    var tmpObjVerticesArr = [];
    for(var i = 0 ; i < this.objVerticesdrawArr.length ; i++){
        tmpObjVerticesArr.push({ x: ((this.objVerticesArr[i].x / oldScaleFactor) * newScaleFactor), y: ( (this.objVerticesArr[i].y / oldScaleFactor) * newScaleFactor)});
    }
    this.objVerticesArr = [];
    this.setVertices(tmpObjVerticesArr);
}

/* Returns whether any given point is inside the continuous wall. Useful in detection object user clicks for dragging, etc...
 * This is implemented in CanvasItem, but need specialization here because the way CWall constructed is different.
 * 
 * */
CWall.prototype.pointInsideObj = function(targetX, targetY){
	/* Need to go through each line and see if given point is inside the line */

    var polygon = this.getPolygon(5);

    if (PolyK.ContainsPoint(polygon, targetX, targetY)){
        return true;
    }
    return false;
}

CWall.prototype.drawObjectScalerOnCanvas = function(targetContext, canvasHelper) {
    var coor = this.getResizeCornerCoordinates();

    var pntNE_srt = canvasHelper.convertCanvasXyToViewportXy({ x: coor.NE.SX, y: coor.NE.SY });
    var pntNE_end = canvasHelper.convertCanvasXyToViewportXy({ x: coor.NE.EX, y: coor.NE.EY });

    var pntSE_srt = canvasHelper.convertCanvasXyToViewportXy({ x: coor.SE.SX, y: coor.SE.SY });
    var pntSE_end = canvasHelper.convertCanvasXyToViewportXy({ x: coor.SE.EX, y: coor.SE.EY });

    var pntSW_srt = canvasHelper.convertCanvasXyToViewportXy({ x: coor.SW.SX, y: coor.SW.SY });
    var pntSW_end = canvasHelper.convertCanvasXyToViewportXy({ x: coor.SW.EX, y: coor.SW.EY });

    var pntNW_srt = canvasHelper.convertCanvasXyToViewportXy({ x: coor.NW.SX, y: coor.NW.SY });
    var pntNW_end = canvasHelper.convertCanvasXyToViewportXy({ x: coor.NW.EX, y: coor.NW.EY });

    objVertices = this.getVerticesArr();
    x1 = objVertices[0].x;
    y1 = objVertices[0].y;
    x2 = objVertices[1].x;
    y2 = objVertices[1].y;

    m = (y2 - y1) / (x2 - x1);

    contextOrig.fillStyle = "#FF0000";
    if (m < 0) {
        contextOrig.fillRect(pntNE_srt.x, pntNE_srt.y, (pntNE_end.x - pntNE_srt.x), (pntNE_end.y - pntNE_srt.y));
        contextOrig.fillRect(pntSW_srt.x, pntSW_srt.y, (pntSW_end.x - pntSW_srt.x), (pntSW_end.y - pntSW_srt.y));
    } else {
        contextOrig.fillRect(pntSE_srt.x, pntSE_srt.y, (pntSE_end.x - pntSE_srt.x), (pntSE_end.y - pntSE_srt.y));
        contextOrig.fillRect(pntNW_srt.x, pntNW_srt.y, (pntNW_end.x - pntNW_srt.x), (pntNW_end.y - pntNW_srt.y));
    }
    contextOrig.fillStyle = "#000000";
}

CWall.prototype.draw = function (targetContext, canvasHelper) {
    str_pnt = canvasHelper.convertCanvasXyToViewportXy({ x: this.objStartX, y: this.objStartY });
// function drawContWall(pointsArr, targetContext, curX, curY){
	var first = true;
    var oldLineWidth = targetContext.lineWidth;
	targetContext.lineWidth=5;
	targetContext.strokeStyle = '#000000';

    targetContext.beginPath();

	$(this.objVerticesArr).each(function(i,pnt){
		if (first == true){
            str_pnt = canvasHelper.convertCanvasXyToViewportXy(pnt);
			targetContext.moveTo(str_pnt.x, str_pnt.y);
			first = false;
		} else {
            end_pnt = canvasHelper.convertCanvasXyToViewportXy(pnt);
			targetContext.lineTo(end_pnt.x, end_pnt.y);
		}
	});
    targetContext.stroke();
    targetContext.lineWidth = oldLineWidth;

    CanvasItem.prototype.draw.call(this, targetContext, canvasHelper);
}

/////////////////////////////////////////////////////////////////////////////
/* Text object inherit from Draw object. Unlike other primitive object classes, this class 
 * keeps a text, fontSize, fontColor variables to hold the displaying text. */
/////////////////////////////////////////////////////////////////////////////
DrawText.prototype = new DrawingItem();
DrawText.prototype.constructor = DrawText;
function DrawText(){

    this.drawText = "Sample Text";
    this.fontSize = "15"; /* in pixels */
    this.fontColor = "#0000FF";
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.TEXT;
    this.fontFamily = "Open Sans";
    // this.objStartX = 0;
    // this.objStartY = 0;
    // this.objEndX = 0;
    // this.objEndY = 0;
    this.minWidth = 10;
    this.maxHeight= 15;
}

/* Scales up or down the object by a given factor */
DrawText.prototype.scale = function (oldScaleFactor, newScaleFactor){
    CanvasItem.prototype.scale.call(this, oldScaleFactor, newScaleFactor);
    this.fontSize = (this.fontSize  / oldScaleFactor) * newScaleFactor;
}

/* Sets the text */
DrawText.prototype.setDrawText = function(text){
    this.drawText = text;
}

/* Gets the text */
DrawText.prototype.getDrawText = function(){
    return this.drawText;

}

DrawText.prototype.setMaxHeight = function(height){
    this.maxHeight = height;
}

DrawText.prototype.getMaxHeight = function(){
    return  this.maxHeight;

}


DrawText.prototype.setMinWidth = function(width){
    this.minWidth = width;
}

DrawText.prototype.getMinWidth = function(){
    return this.minWidth;

}

/* Gets the font size */
DrawText.prototype.getFontSize = function(){
    return this.fontSize;
}

/* Sets the font size */
DrawText.prototype.setFontSize = function(fontSize){
    this.fontSize = fontSize;
}

/* Gets the font color */
DrawText.prototype.getFontColor = function(){
    return this.fontColor;
}

/* Gets the font family */
DrawText.prototype.getFontFamily = function(){
    return this.fontFamily;
}

DrawText.prototype.resize = function (direction, newX, newY, offsetX, offsetY){

    var tmpStartX, tmpStartY, tmpEndX, tmpEndY;

    switch (direction){
        case ObjectDirection.NE :
            tmpStartX = this.objStartX;
            tmpStartY = newY - offsetY;
            tmpEndX = newX + offsetX;
            tmpEndY = this.objEndY;

            break;
        case ObjectDirection.SE :
            tmpStartX = this.objStartX;
            tmpStartY = this.objStartY;
            tmpEndX = newX + offsetX;
            tmpEndY = newY + offsetY;

            break;
        case ObjectDirection.SW :
            tmpStartX = newX - offsetX;
            tmpStartY = this.objStartY;
            tmpEndX = this.objEndX;
            tmpEndY = newY + offsetY;

            break;
        case ObjectDirection.NW :
            tmpStartX = newX - offsetX;
            tmpStartY = newY - offsetY;
            tmpEndX = this.objEndX;
            tmpEndY = this.objEndY;
            break;
    }

	/* Let's keep it a square */

    var minWidth = this.minWidth;
    var minHeight = this.maxHeight;
    var maxHeight = this.maxHeight;

    switch (direction){
        case ObjectDirection.NE :

            if (tmpEndX <= (tmpStartX + minWidth)) tmpEndX = tmpStartX + minWidth;
            if (tmpStartY >= (tmpEndY -minHeight)) tmpStartY = tmpEndY - minHeight;
            if (tmpStartY <= (tmpEndY -maxHeight)) tmpStartY = tmpEndY - maxHeight;


            break;
        case ObjectDirection.SE :

            if (tmpEndX <= (tmpStartX + minWidth)) tmpEndX = tmpStartX + minWidth;
            if (tmpEndY <= (tmpStartY + minHeight)) tmpEndY = tmpStartY + minHeight;
            if (tmpEndY >= (tmpStartY + maxHeight)) tmpEndY = tmpStartY + maxHeight;



            break;
        case ObjectDirection.SW :
            if (tmpStartX >= (tmpEndX - minWidth)) tmpStartX = tmpEndX - minWidth;
            if (tmpEndY <=(tmpStartY + minHeight)) tmpEndY = tmpStartY + minHeight;
            if (tmpEndY >=(tmpStartY + maxHeight)) tmpEndY = tmpStartY + maxHeight;


            break;
        case ObjectDirection.NW :
            if (tmpStartX >= (tmpEndX - minWidth)) tmpStartX = tmpEndX - minWidth;
            if (tmpStartY >= tmpEndY - minHeight) tmpStartY = tmpEndY - minHeight;
            if (tmpStartY <= tmpEndY - maxHeight) tmpStartY = tmpEndY - maxHeight;


            break;

    }

    this.objStartX = tmpStartX;
    this.objStartY = tmpStartY;
    this.objEndX = tmpEndX;
    this.objEndY = tmpEndY;
}

/* Changes the boundaries of the object without changing the dimensions. In text object, we need to
 * make sure borders are set according to the font size, etc.. so that drag and scale borderes are not 
 * a line */
DrawText.prototype.moveObjTo = function(newStartX, newStartY){
    var eX = newStartX + this.objEndX - this.objStartX;
    var eY = newStartY + this.objEndY - this.objStartY;
    this.setPoints(newStartX,newStartY, eX, eY);
}

/* Sets the boundaries of any object */
DrawText.prototype.setPoints = function(sX, sY, eX, eY){
    // var tmp;
    // this.objStartX = parseInt(sX);
    // this.objEndY = parseInt(eY);

    // tmpEX = parseInt(sX) + this.drawText.length * this.fontSize * 6/10;
    // tmpSY = parseInt(eY) - this.fontSize * 7/10;

    // this.objStartY = parseInt(tmpSY);
    // this.objEndX = parseInt(tmpEX);
    this.objStartX = parseInt(sX);
    this.objStartY = parseInt(sY);


    this.objEndY = parseInt(eY);
    this.objEndX = parseInt(eX);
}

DrawText.prototype.getMinWidth = function (targetContext) {
    var maxWordWidth = 0;
    var words = this.drawText.split(' ');
    for (var n = 0; n < words.length; n++) {
        var temp_width = targetContext.measureText(words[n]).width;
        if (maxWordWidth < temp_width) {
            maxWordWidth = temp_width;
        }
    }
    return maxWordWidth;
}

DrawText.prototype.draw = function(targetContext, canvasHelper){
    targetContext.save();
    targetContext.fillStyle = this.fontColor;
    var fontsize_zoomed = this.fontSize * canvasHelper.zoom;
    targetContext.font =  fontsize_zoomed + 'px ' + this.fontFamily;
    this.minWidth = this.getMinWidth(targetContext);
    
    var textboxWidth = (this.objEndX - this.objStartX) * canvasHelper.zoom;
    var textboxHeight = this.maxHeight;
    var lineHeight = fontsize_zoomed;
    var words = this.drawText.split(' ');
	var line = '';
	var lines = [];
	var tempLine = '';

    if (this.minWidth > textboxWidth) {
        textboxWidth = this.minWidth;
    }

    //wrap text around textboxWidth
	for (var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var testWidth = targetContext.measureText(testLine).width;
		if (testWidth > textboxWidth && n > 0) {
			lines.push(line);
			line = words[n] + ' ';
		}
		else {
			line = testLine;
		}
		if (n == words.length - 1) {
			lines.push(line);
		}
	}
    this.maxHeight = parseInt(this.fontSize) * lines.length;
    textboxHeight = lineHeight * lines.length;

    var str_pnt = canvasHelper.convertCanvasXyToViewportXy({x:this.objStartX, y:this.objStartY});

    var box_margin = fontsize_zoomed / 4;
	targetContext.fillStyle = 'white';
	targetContext.fillRect(str_pnt.x - box_margin, str_pnt.y - box_margin, textboxWidth + 2 * box_margin, textboxHeight + 2 * box_margin);
	targetContext.lineWidth = 1;
	targetContext.strokeStyle = this.fontColor;
	targetContext.strokeRect(str_pnt.x -  box_margin, str_pnt.y - box_margin, textboxWidth + 2 * box_margin, textboxHeight + 2 * box_margin);

    var x = str_pnt.x;
    var y = str_pnt.y;
	targetContext.fillStyle = this.fontColor;
	for (var index = 0; index < lines.length; index++) {
		var line = lines[index];
        y += lineHeight;
		targetContext.fillText(line, x, y);
	} 
    var obj_end_pnt = canvasHelper.convertViewportXyToCanvasXy({x: str_pnt.x + textboxWidth, y: str_pnt.y + textboxHeight});
    this.objEndX = obj_end_pnt.x;
    this.objEndY = obj_end_pnt.y;

    CanvasItem.prototype.draw.call(this, targetContext, canvasHelper);
    targetContext.restore();
}
                                           
/////////////////////////////////////////////////////////////////////////////
/* Text object inherit from Draw object.  */
/////////////////////////////////////////////////////////////////////////////
Eraser.prototype = new DrawingItem();
Eraser.prototype.constructor = Eraser;
function Eraser(){    
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.ERASER;
    this.eraserColor = 'rgba(255, 0, 0, 0.2)';
    this.eraserSize = curEraserSize;
    this.eraserType = 'round';
    this.eraserPointsArr = new Array();    
}

Eraser.prototype.getErasePoints = function(){
    return this.eraserPointsArr;
}

Eraser.prototype.setErasePoints = function(x,y){    
    this.eraserPointsArr.push({x:x, y:y});
}   

Eraser.prototype.getObjStartX = function(){
    return this.eraserPointsArr[0].x;
}

Eraser.prototype.getObjStartY = function(){
    return this.eraserPointsArr[0].y;
}

Eraser.prototype.moveObjTo = function(newStartX, newStartY){
    var xOffset = this.eraserPointsArr[0].x - newStartX;
    var yOffset = this.eraserPointsArr[0].y - newStartY;    
    for (var i = 0; i< this.eraserPointsArr.length; i++){
        this.eraserPointsArr[i].x = this.eraserPointsArr[i].x - xOffset;
        this.eraserPointsArr[i].y = this.eraserPointsArr[i].y - yOffset;
    }    
}

Eraser.prototype.setVertices = function(pointsArrIncoming){
    var tmpObjVerticesArr = this.eraserPointsArr;
    $(pointsArrIncoming).each(function(i,e){
        tmpObjVerticesArr.push({x:e.x, y:e.y});
    });
}

Eraser.prototype.draw = function (targetContext, canvasHelper) {
    targetContext.save();
    targetContext.beginPath();
    targetContext.lineWidth = this.eraserSize * canvasHelper.zoom;
    targetContext.strokeStyle = this.eraserColor;
    targetContext.lineJoin = targetContext.lineCap = this.eraserType;
    var erPnt;
    for (var iy = 0; iy < this.eraserPointsArr.length; iy++) {
        erPnt = canvasHelper.convertCanvasXyToViewportXy(this.eraserPointsArr[iy]);
        if (iy == 0) {
            targetContext.moveTo(erPnt.x, erPnt.y);
        } else {
            targetContext.lineTo(erPnt.x, erPnt.y);
        }
    }
    targetContext.stroke();

    CanvasItem.prototype.draw.call(this, targetContext, canvasHelper);
    targetContext.restore();
}


/////////////////////////////////////////////////////////////////////////////
/* Connection object inherit from Draw object.  */
/////////////////////////////////////////////////////////////////////////////

Connection.prototype = new DrawingItem();
Connection.prototype.constructor = Connection;
function Connection(){    
    this.sourseId;
    this.objType = ObjectType.CONNECT;
    this.destinationId;
    this.curvePointX;
    this.curvePointY;
    this.isActive = false;
    this.tolerance = 5;  
}

Connection.prototype.getcurvePointX = function(){
    return this.curvePointX;
}

Connection.prototype.setcurvePointX = function(curvePointX){    
    this.curvePointX = curvePointX ;
} 

Connection.prototype.getcurvePointY = function(){
    return this.curvePointY;
}

Connection.prototype.setcurvePointY = function(curvePointY){    
    this.curvePointY = curvePointY ;
} 

Connection.prototype.getIsActive = function(){
    return this.isActive;
}

Connection.prototype.setIsActive = function(isActive){    
    this.isActive = isActive ;
} 

Connection.prototype.getsourseId = function(){
    return this.sourseId;
}

Connection.prototype.setsourseId = function(sourseId){    
    this.sourseId = sourseId ;
}   

Connection.prototype.getsdestinationId = function(){
    return this.destinationId;
}

Connection.prototype.setdestinationId = function(destinationId){    
    this.destinationId = destinationId ;
}   

Connection.prototype.getcontrollerPointX = function(startX,endX){
    return this.curvePointX * 2 - (startX+endX)/2;
}

// Connection.prototype.setcontrollerPointX = function(controllerPointX){    
//     this.controllerPointX = controllerPointX ;
// }  

Connection.prototype.getcontrollerPointY = function(startY,endY){
    return this.curvePointY * 2 - (startY+endY)/2;
}

// Connection.prototype.setcontrollerPointY = function(controllerPointY){    
//     this.controllerPointY = controllerPointY ;
// }  

Connection.prototype.getTolarence = function(){
    return this.tolerance;
}

Connection.prototype.draw = function (targetContext, canvasHelper) {
    var beginPath = getObjectFromId(this.sourseId).getCenter();
    var endPath = getObjectFromId(this.destinationId).getCenter();
    var endx = endPath.x;
    var endy = endPath.y;
    targetContext.save();
    targetContext.lineWidth = 1;
    targetContext.setLineDash([5]);
    targetContext.strokeStyle = '#FF0000';
    targetContext.beginPath();
    var str_pnt = canvasHelper.convertCanvasXyToViewportXy(beginPath);
    targetContext.moveTo(str_pnt.x, str_pnt.y);

    var cpx = this.getcontrollerPointX(beginPath.x, endPath.x);
    var cpy = this.getcontrollerPointY(beginPath.y, endPath.y);
    var ctrl_pnt = canvasHelper.convertCanvasXyToViewportXy({ x: cpx, y: cpy });
    var end_pnt = canvasHelper.convertCanvasXyToViewportXy(endPath);

    targetContext.quadraticCurveTo(ctrl_pnt.x, ctrl_pnt.y, end_pnt.x, end_pnt.y);
    targetContext.stroke();

    if (this.isActive) {
        var boxWidth = this.tolerance * 2 * canvasHelper.zoom;
        var boxCenter = canvasHelper.convertCanvasXyToViewportXy({ x: this.curvePointX, y: this.curvePointY });
        targetContext.fillStyle = "#FF0000";
        targetContext.fillRect(boxCenter.x - boxWidth / 2, boxCenter.y - boxWidth / 2, boxWidth, boxWidth);
    }
    CanvasItem.prototype.draw.call(this, targetContext, canvasHelper);
    targetContext.restore();
}
