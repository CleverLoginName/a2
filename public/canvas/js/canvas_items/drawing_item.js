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
    this.objWallThickness = 10;
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
    for(var i = 0 ; i < this.objVerticesArr.length ; i++){
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


/////////////////////////////////////////////////////////////////////////////
/* Text object inherit from Draw object. Unlike other primitive object classes, this class 
 * keeps a text, fontSize, fontColor variables to hold the displaying text. */
/////////////////////////////////////////////////////////////////////////////
DrawText.prototype = new DrawingItem();
DrawText.prototype.constructor = CWall;
function DrawText(){

    this.drawText = "Sample Text";
    this.fontSize = "15"; /* in pixels */
    this.fontColor = "#FF0000";
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.TEXT;
    this.fontFamily = "Open Sans";
    this.objStartX = 0;
    this.objStartY = 0;
    this.objEndX = 0;
    this.objEndY = 0;
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

/* Changes the boundaries of the object without changing the dimensions. In text object, we need to
 * make sure borders are set according to the font size, etc.. so that drag and scale borderes are not 
 * a line */
DrawText.prototype.moveObjTo = function(newStartX, newStartY){
    this.setPoints(newStartX,newStartY,parseInt(newStartX)+250,newStartY);
}

/* Sets the boundaries of any object */
DrawText.prototype.setPoints = function(sX, sY, eX, eY){
    var tmp;
    this.objStartX = parseInt(sX);
    this.objEndY = parseInt(eY);

    tmpEX = parseInt(sX) + this.drawText.length * this.fontSize * 6/10;
    tmpSY = parseInt(eY) - this.fontSize * 7/10;

    this.objStartY = parseInt(tmpSY);
    this.objEndX = parseInt(tmpEX);
}


/////////////////////////////////////////////////////////////////////////////
/* Text object inherit from Draw object.  */
/////////////////////////////////////////////////////////////////////////////
Eraser.prototype = new DrawingItem();
Eraser.prototype.constructor = Eraser;
function Eraser(){    
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.ERASER;
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