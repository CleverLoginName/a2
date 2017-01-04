/* Contains the object types drawable in the app */
var ObjectType = {
    CIRCLE:1,
    SQUARE:2,
    WALL:3,
    CONT_WALL:4,
    LIGHT_BULB:5,
    LIGHT_SWITCH:6,
    TEXT:7,
    CHANGE:8,
    PRODUCT:9,
    ERASER:10,
    PACK:11
}

/* Directions associated with objects. Used in scale operations, etc... */
var ObjectDirection ={
    NE:1,
    SE:2,
    SW:3,
    NW:4,
    N :5,
    E :6,
    S :7,
    W :8
}

/* Object statuses in the app */
var ObjectStatus = {
    DRAW:1,
    MOVE:2,
    SCALE:3,
    ROTATE:4
}

/* LightBulb Switch Status in the app */
var LightBulbStatus = {
    OFF:1,
    ON:2
}

/* Colours */
var Color = {
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF',
    ORANGE: '#FCD826'
}

var minScaleFactor = 0.25;
var selectedProduct = {};

/* This ChangeObject class will hold if there are any parameter changes in a give object.
 * This class objects are used to track movement, scale and rotational changes of objects in the drawing panel */
function ChangeObject(obj){
    this.trackObj = obj;
    this.oldParameters = JSON.stringify(obj);
    this.newParameters;
    this.objType = ObjectType.CHANGE;
    this.objStatus = ObjectStatus.DRAW;
    this.deleteElementIndex = null;
    this.drawElementIndex = null;
};

ChangeObject.prototype.setDeleteElementIndex =  function(index){
    this.deleteElementIndex = index;
};

ChangeObject.prototype.setDrawElementIndex = function(index){
    this.drawElementIndex = index;
};

ChangeObject.prototype.getDeleteElementIndex = function(){
    return this.deleteElementIndex;
};

ChangeObject.prototype.getDrawElementIndex = function(){
    return this.drawElementIndex;
};

ChangeObject.prototype.setStatus = function(status){
    this.objStatus = status;
}

ChangeObject.prototype.updateNewParameters = function(){
    this.newParameters = JSON.stringify(this.trackObj);
}

ChangeObject.prototype.getTrackObject = function(){
    return this.trackObj;
};

ChangeObject.prototype.getOldParameters = function(){
    return this.oldParameters;
};

ChangeObject.prototype.getNewParameters = function(){
    return this.newParameters;
};

ChangeObject.prototype.getType = function(){
    return this.objType;
};

/* This is the fundamental drawing object used in the app. This has many children classes which are actually being used
 * to draw different objects in the app. */
function CanvasItem (){
    var objType, objStatus;
    var objStartX;
    var objStartY;
    var objEndX;
    var objEndY;

    var objBorderStartX;
    var objBorderStartY;
    var objBorderEndX;
    var objBorderEndY;

    var scalerSize = 10;
    this.rotation = 0; /* in radians. Range is 0 - 2pi */
}

/* Updates border to rotate objects. Not in use in current version but will require in future */
CanvasItem.prototype.updateBorder = function(){

    var center = this.getCenter();
    var sX, sY, eX,eY;
    var objectEdgePoints = [];

    var tL = getRotatedPoint(center.x, center.y,this.objStartX, this.objStartY, this.rotation); /* top left point */
    var tR = getRotatedPoint(center.x, center.y,this.objEndX, this.objStartY, this.rotation);
    var bR = getRotatedPoint(center.x, center.y,this.objEndX, this.objEndY , this.rotation);
    var bL = getRotatedPoint(center.x, center.y,this.objStartX, this.objEndY , this.rotation);

    this.objBorderStartX = tL.x ;
    this.objBorderStartY = tL.y ;

    this.objBorderEndX = bR.x ;
    this.objBorderEndY = bR.y ;
}

/* Gets the centre coordinates of the object */
CanvasItem.prototype.getCenter = function(){

    var tmpX = (parseInt(this.objStartX) + parseInt(this.objEndX))/2;
    var tmpY = (parseInt(this.objStartY)+ parseInt(this.objEndY))/2;

    return { x: tmpX, y:tmpY};
}

/* Gets the rotation of the object */
CanvasItem.prototype.getRotation = function(){
    return this.rotation;
}


/* Sets the rotation of the object
 * r is angle in radians
 */
CanvasItem.prototype.setRotation = function(r){
    this.rotation = (r % (2* Math.PI));
}

/* Gets the type */
CanvasItem.prototype.getType = function(){
    return this.objType;
}

/* Sets the boundaries of any object */
CanvasItem.prototype.setPoints = function(sX, sY, eX, eY){
    var tmp;
    var top = Math.min(sY,eY);
    var right = Math.max(sX,eX);
    var bottom = Math.max(sY,eY);
    var left = Math.min(sX,eX);

    this.objStartX = left;
    this.objStartY = top;
    this.objEndX = right;
    this.objEndY = bottom;
    var iconPath;
}

CanvasItem.prototype.getStatus = function(){
    return this.objStatus;
}

CanvasItem.prototype.setStatus = function(status){
    this.objStatus = status;
}

CanvasItem.prototype.getObjStartX = function(){
    return this.objStartX;
}

CanvasItem.prototype.getObjStartY = function(){
    return this.objStartY;
}

CanvasItem.prototype.getObjEndX = function(){
    return this.objEndX;
}

CanvasItem.prototype.getObjEndY = function(){
    return this.objEndY;
}

CanvasItem.prototype.getObjWidth = function(){
    return (this.objEndX-this.objStartX);
}

CanvasItem.prototype.getObjHeight = function(){
    return (this.objEndY - this.objStartY);
}





/* Returns whether any given point is inside the object. Useful in detection object user clicks for dragging, etc...
 */
CanvasItem.prototype.pointInsideObj = function(targetX, targetY){

    var top,left, bottom,right;

    top = Math.min(this.objStartY, this.objEndY);
    left = Math.min(this.objStartX, this.objEndX);
    bottom = Math.max(this.objStartY, this.objEndY);
    right = Math.max(this.objStartX, this.objEndX);

    if(targetX >= left && targetX <= right &&
        targetY >= top && targetY <= bottom){
        return true;
    }
    return false;
}

/* Changes the boundaries of the object without changing the dimensions */
CanvasItem.prototype.moveObjTo = function(newStartX, newStartY){

    var objWidth = this.getObjWidth();
    var objHeight = this.getObjHeight();

    this.objStartX =  parseInt(newStartX);
    this.objStartY = parseInt(newStartY);

    this.objEndX = parseInt(newStartX) + parseInt(objWidth);
    this.objEndY = parseInt(newStartY) + parseInt(objHeight);

}


/* Changes the boundaris of the object w.r.t. the direction object is being resized.
 * Offset is the difference mouse pointer is at w.r.t. the object */
CanvasItem.prototype.resize = function (direction, newX, newY, offsetX, offsetY){

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

    var minWidth = 20;

    switch (direction){
        case ObjectDirection.NE :

            if (tmpEndX <= (tmpStartX + minWidth)) tmpEndX = tmpStartX + minWidth;
            if (tmpStartY >= (tmpEndY -minWidth)) tmpStartY = tmpEndY - minWidth;

            var width = Math.abs(tmpEndX - tmpStartX);
            var height =  Math.abs(tmpEndY - tmpStartY);

            var sideLength = 0;
            var limitSide = ""; /* W,H */

            if ((width) > (height)){
                sideLength = (height);
                limitSide = "W";
            } else {
                sideLength = (width);
                limitSide = "H";
            }

            if (limitSide == "W"){
                if (tmpEndX > (tmpStartX+ (height))) tmpEndX = tmpStartX+ (height);
            } else if (limitSide == "H"){
                if (tmpStartY < (tmpEndY -  (width))) tmpStartY = tmpEndY -  (width);
            }
            break;
        case ObjectDirection.SE :

            if (tmpEndX <= (tmpStartX + minWidth)) tmpEndX = tmpStartX + minWidth;
            if (tmpEndY <= (tmpStartY + minWidth)) tmpEndY = tmpStartY + minWidth;

            var width = Math.abs(tmpEndX - tmpStartX);
            var height =  Math.abs(tmpEndY - tmpStartY);

            var sideLength = 0;
            var limitSide = ""; /* W,H */

            if ((width) > (height)){
                sideLength = (height);
                limitSide = "W";
            } else {
                sideLength = (width);
                limitSide = "H";
            }

            if (limitSide == "W"){
                if (tmpEndX > (tmpStartX+ (height))) tmpEndX = tmpStartX+ (height);
            } else if (limitSide == "H"){
                if (tmpEndY > (tmpStartY +  (width))) tmpEndY = tmpStartY +  (width);
            }


            break;
        case ObjectDirection.SW :
            if (tmpStartX >= (tmpEndX - minWidth)) tmpStartX = tmpEndX - minWidth;
            if (tmpEndY <=(tmpStartY + minWidth)) tmpEndY = tmpStartY + minWidth;

            var width = Math.abs(tmpEndX - tmpStartX);
            var height =  Math.abs(tmpEndY - tmpStartY);

            var sideLength = 0;
            var limitSide = ""; /* W,H */

            if ((width) > (height)){
                sideLength = (height);
                limitSide = "W";
            } else {
                sideLength = (width);
                limitSide = "H";
            }

            if (limitSide == "W"){
                if (tmpStartX < (tmpEndX - (height))) tmpStartX = tmpEndX -height;
            } else if (limitSide == "H"){
                if (tmpEndY > (tmpStartY +  (width))) tmpEndY = tmpStartY +  (width);
            }

            break;
        case ObjectDirection.NW :
            if (tmpStartX >= (tmpEndX - minWidth)) tmpStartX = tmpEndX - minWidth;
            if (tmpStartY >= tmpEndY - minWidth) tmpStartY = tmpEndY - minWidth;

            var width = Math.abs(tmpEndX - tmpStartX);
            var height =  Math.abs(tmpEndY - tmpStartY);

            var sideLength = 0;
            var limitSide = ""; /* W,H */

            if ((width) > (height)){
                sideLength = (height);
                limitSide = "W";
            } else {
                sideLength = (width);
                limitSide = "H";
            }

            if (limitSide == "W"){
                if (tmpStartX < (tmpEndX - height)) tmpStartX = tmpEndX -height;
            } else if (limitSide == "H"){
                if (tmpStartY < (tmpEndY  -  width)) tmpStartY = tmpEndY -  width;
            }

            break;

    }

    this.objStartX = tmpStartX;
    this.objStartY = tmpStartY;
    this.objEndX = tmpEndX;
    this.objEndY = tmpEndY;
}

/* Re-arranges the boundaries of an object when they flip. */
CanvasItem.prototype.updateCoordinatesToOrder = function(){
    var top,right,bottom,left,w,h;

    if (this.getType() == ObjectType.WALL){
        w = Math.abs(this.objStartX - this.objEndX);
        h = Math.abs(this.objStartY - this.objEndY);

        top = this.objStartY;
        right = this.objEndX;
        bottom = this.objEndY;
        left = this.objStartX;
        if (w>h){

            bottom = this.objStartY + this.objWallThickness;
            left = Math.min(this.objStartX, this.objEndX);
            right = Math.max(this.objStartX, this.objEndX);
        } else {

            right = this.objStartX + this.objWallThickness;
            top = Math.min(this.objStartY, this.objEndY);
            bottom = Math.max(this.objStartY, this.objEndY);

        }
    } else {
        top = Math.min(this.objStartY, this.objEndY);
        right = Math.max(this.objStartX, this.objEndX);
        bottom = Math.max(this.objStartY, this.objEndY);
        left = Math.min(this.objStartX, this.objEndX);
    }

    this.objStartX = left;
    this.objEndX = right;
    this.objStartY = top;
    this.objEndY = bottom;

}


/* Returns the coordinates of the small boxes appear when scale an object */
CanvasItem.prototype.getResizeCornerCoordinates = function (){
    var coordinates = {
        NE: { SX: (this.objEndX-this.scalerSize)	, EX: (this.objEndX)	, SY: this.objStartY, EY: this.objStartY+this.scalerSize},
        SE: { SX: this.objEndX-this.scalerSize	, EX: this.objEndX	, SY: this.objEndY-this.scalerSize	, EY: this.objEndY},
        SW: { SX: this.objStartX	, EX: this.objStartX+this.scalerSize	, SY: this.objEndY-this.scalerSize	, EY: this.objEndY},
        NW: { SX: this.objStartX	, EX: this.objStartX+this.scalerSize	, SY: this.objStartY	, EY: this.objStartY+this.scalerSize}
    };


    return coordinates;
}

/* Returns the direction object scales by detecting which corner user has clicked */
CanvasItem.prototype.getScaleDirection = function(x,y){

    var coor = this.getResizeCornerCoordinates();

    if ((x >= coor.NE.SX ) && (x <= coor.NE.EX) && (y >= coor.NE.SY) && (y <= coor.NE.EY)) {
        return ObjectDirection.NE;
    } else if ((x >= coor.SE.SX ) && (x <= coor.SE.EX) && (y >= coor.SE.SY) && (y <= coor.SE.EY)) {
        return ObjectDirection.SE;
    } else if ((x >= coor.SW.SX ) && (x <= coor.SW.EX) && (y >= coor.SW.SY) && (y <= coor.SW.EY)) {
        return ObjectDirection.SW;
    } else if ((x >= coor.NW.SX ) && (x <= coor.NW.EX) && (y >= coor.NW.SY) && (y <= coor.NW.EY)) {
        return ObjectDirection.NW;
    } else {
        return null;
    }
}

/* Scales up or down the object by a given factor */
CanvasItem.prototype.scale = function (oldScaleFactor, newScaleFactor){
    this.objStartX = (this.objStartX / oldScaleFactor) * newScaleFactor;
    this.objEndX = (this.objEndX / oldScaleFactor) * newScaleFactor;
    this.objStartY = (this.objStartY / oldScaleFactor) * newScaleFactor;
    this.objEndY = (this.objEndY / oldScaleFactor) * newScaleFactor;
}














