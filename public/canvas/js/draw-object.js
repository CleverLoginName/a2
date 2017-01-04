/* Contains the object types drawable in the app */
var ObjectType = {
    CIRCLE:1,
    SQUARE:2,
    WALL:3,
    CONT_WALL:4,
    LIGHT_BULB:5,
    LIGHT_SWITCH:6,
    TEXT:7,
    CHANGE:8
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
function DrawObject (){
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
DrawObject.prototype.updateBorder = function(){

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
DrawObject.prototype.getCenter = function(){

    var tmpX = (parseInt(this.objStartX) + parseInt(this.objEndX))/2;
    var tmpY = (parseInt(this.objStartY)+ parseInt(this.objEndY))/2;

    return { x: tmpX, y:tmpY};
}

/* Gets the rotation of the object */
DrawObject.prototype.getRotation = function(){
    return this.rotation;
}


/* Sets the rotation of the object
 * r is angle in radians
 */
DrawObject.prototype.setRotation = function(r){
    this.rotation = (r % (2* Math.PI));
}

/* Gets the type */
DrawObject.prototype.getType = function(){
    return this.objType;
}

/* Sets the boundaries of any object */
DrawObject.prototype.setPoints = function(sX, sY, eX, eY){
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

DrawObject.prototype.getStatus = function(){
    return this.objStatus;
}

DrawObject.prototype.setStatus = function(status){
    this.objStatus = status;
}

DrawObject.prototype.getObjStartX = function(){
    return this.objStartX;
}

DrawObject.prototype.getObjStartY = function(){
    return this.objStartY;
}

DrawObject.prototype.getObjEndX = function(){
    return this.objEndX;
}

DrawObject.prototype.getObjEndY = function(){
    return this.objEndY;
}

DrawObject.prototype.getObjWidth = function(){
    return (this.objEndX-this.objStartX);
}

DrawObject.prototype.getObjHeight = function(){
    return (this.objEndY - this.objStartY);
}





/* Returns whether any given point is inside the object. Useful in detection object user clicks for dragging, etc...
 */
DrawObject.prototype.pointInsideObj = function(targetX, targetY){

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
DrawObject.prototype.moveObjTo = function(newStartX, newStartY){

    var objWidth = this.getObjWidth();
    var objHeight = this.getObjHeight();

    this.objStartX =  parseInt(newStartX);
    this.objStartY = parseInt(newStartY);

    this.objEndX = parseInt(newStartX) + parseInt(objWidth);
    this.objEndY = parseInt(newStartY) + parseInt(objHeight);

}


/* Changes the boundaris of the object w.r.t. the direction object is being resized.
 * Offset is the difference mouse pointer is at w.r.t. the object */
DrawObject.prototype.resize = function (direction, newX, newY, offsetX, offsetY){

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
DrawObject.prototype.updateCoordinatesToOrder = function(){
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
DrawObject.prototype.getResizeCornerCoordinates = function (){
    var coordinates = {
        NE: { SX: (this.objEndX-this.scalerSize)	, EX: (this.objEndX)	, SY: this.objStartY, EY: this.objStartY+this.scalerSize},
        SE: { SX: this.objEndX-this.scalerSize	, EX: this.objEndX	, SY: this.objEndY-this.scalerSize	, EY: this.objEndY},
        SW: { SX: this.objStartX	, EX: this.objStartX+this.scalerSize	, SY: this.objEndY-this.scalerSize	, EY: this.objEndY},
        NW: { SX: this.objStartX	, EX: this.objStartX+this.scalerSize	, SY: this.objStartY	, EY: this.objStartY+this.scalerSize}
    };


    return coordinates;
}

/* Returns the direction object scales by detecting which corner user has clicked */
DrawObject.prototype.getScaleDirection = function(x,y){

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
DrawObject.prototype.scale = function (oldScaleFactor, newScaleFactor){
    this.objStartX = (this.objStartX / oldScaleFactor) * newScaleFactor;
    this.objEndX = (this.objEndX / oldScaleFactor) * newScaleFactor;
    this.objStartY = (this.objStartY / oldScaleFactor) * newScaleFactor;
    this.objEndY = (this.objEndY / oldScaleFactor) * newScaleFactor;
}


/* Circle object inherit from Draw object */
Circle.prototype = new DrawObject();
Circle.prototype.constructor = Circle;
function Circle(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.CIRCLE;
    this.scalerSize = 10;
}

/* Square object inherit from Draw object */
Square.prototype = new DrawObject();
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

/***BOM Functionalities **/

function getRawCount(x){
    x.rowIndex

}

/***Create Rows in BOM Table ***/
function addRow(name,price,discount,energy,visible) {

    this.productName = name;
    this.price = price;
    this.discount = discount;
    this.energy =energy;
    this.visible = visible;

    var table = document.getElementById("productInfo");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var checkedStatus = visible ? "checked" :  "";
    console.log("checkedStatus: "+checkedStatus+" vibL: "+visible);
    row.insertCell(0).innerHTML= productName;
    row.insertCell(1).innerHTML= price;
    row.insertCell(2).innerHTML= discount;
    row.insertCell(3).innerHTML= energy;
    row.insertCell(4).innerHTML= '<input type="checkbox" '+checkedStatus+' name="'+name+'" value = "Delete" onClick="Javacsript:setBulbStatus(this)">';
}

/***Add Values to BOM table ***/
function addToTable(bulb){
    addRow(bulb.name,'$200','4%','100',bulb.visibility);
}

/***Set Visibility on Design Canvas ***/
function setBulbStatus(inputElement){
    drawElements.find(function(bulb){
        if (bulb.getType() == ObjectType.LIGHT_BULB && inputElement.name == bulb.getName()){
            //alert('call for Lights');
            bulb.setVisibility(inputElement.checked);
            drawAllObjects();
            return true;
        }

        if (bulb.getType() == ObjectType.LIGHT_SWITCH && inputElement.name == bulb.getName()){
            alert('call for switches');
            bulb.setVisibility(inputElement.checked);
            drawAllObjects();
            return true;
        }
    });
}

/***End BOM Functionalities **/







/* LightBulb object inherit from Draw Object
 */
LightBulb.prototype = new DrawObject();
LightBulb.prototype.constructor = LightBulb;
function LightBulb(){

    this.switchStatus = LightBulbStatus.ON;
    this.rayRadius = 100;
    this.color = Color.ORANGE;
    this.radius = 20;

    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.LIGHT_BULB;
    this.scalerSize = 10;

    if (typeof bname !== 'undefined') {this.name = bname;}else{this.name = '';}
    if (typeof power !== 'undefined') {this.lightpower = power;}else{this.lightpower = '';}
    if (typeof b_tooltip !== 'undefined') { this.tooltip = b_tooltip;}else{ this.tooltip = '';}
    this.visibility = true;
    if (typeof elev !== 'undefined') { this.elevation = elev;}else{this.elevation = '';}
    if (typeof angle !== 'undefined') { this.angle = angle;}else{this.angle = '';}
    this.tooltip = true;
    this.iconpath = bulb_icon;

   // this.price = bulbPrice;
    //this.itemCode = set_itemCode;
   // this.imgPath= lightImagePath;

    this.connections = [];
    this.label = "Anonymous";
    this.notes = "" //todo move to parent class
    //Set to Zero to stop the raycasting
    this.rayLength = 0;
}



/* Set image path */
LightBulb.prototype.setImgPath = function (path) {
    this.imgPath = path;
}

/* Get image path */
LightBulb.prototype.getImgPath = function () {
    return this.imgPath;
}

/* Set image path */
LightBulb.prototype.setLightPower = function (lightpower) {
	this.power = lightpower;
}

/* Get image path */
LightBulb.prototype.getLightPower = function () {
	return this.power;
}

/* Scales up or down the object by a given factor */
LightBulb.prototype.scale = function (oldScaleFactor, newScaleFactor){
    DrawObject.prototype.scale.call(this, oldScaleFactor, newScaleFactor);
    this.rayLength = (this.rayLength / oldScaleFactor) * newScaleFactor;
}

/* Sets the coordinates of the light bulb. */
LightBulb.prototype.setCoordinates = function(x,y){
    this.objStartX  = parseInt(x)- parseInt(this.radius);
    this.objEndX =  parseInt(x) + parseInt(this.radius);
    this.objStartY =   parseInt(y) - parseInt(this.radius);
    this.objEndY =  parseInt(y) + parseInt(this.radius);
}


LightBulb.prototype.getIconPath = function(){
    return (this.iconpath);
}

LightBulb.prototype.setIconPath = function(path){
    this.iconpath = path;

}

LightBulb.prototype.setProductInfo = function(productInfo){
    this.productInfo  = productInfo;
}

LightBulb.prototype.getProductInfo = function(){
    return this.productInfo;
}

/* Sets the label of a Bulb */
LightBulb.prototype.setLabel = function(lab){
    this.label = lab;
    this.setName(lab);
}

/* Gets the label of a Bulb */
LightBulb.prototype.getLabel = function(){
    return this.label;
}

/* Sets the name of a Bulb */
LightBulb.prototype.setName = function(name){
    this.name = "Down Light T"+name;
}

/* Gets the name of a Bulb */
LightBulb.prototype.getName = function(){
    return this.name;
}

/* Sets the ray length of a Bulb */
LightBulb.prototype.setRayLength= function(rl){
    this.rayLength = rl;
}

/* Gets the ray length  of a Bulb */
LightBulb.prototype.getRayLength = function(){
    return this.rayLength;
}

/* Get coordinates . There used to some calculations in here but eventually we got rid of them */
LightBulb.prototype.getCoordinates = function(){
    var retX = this.objStartX;
    var retY = this.objStartY;
    var coordinates = {x:retX, y:retY};
    return coordinates;
}

/* Get light bulb physical radius */
LightBulb.prototype.getRadius = function(){
    return this.radius;
}


/* Adds light to light connection */
LightBulb.prototype.addLightBulbObj = function(obj){
    if (obj.getType() == ObjectType.LIGHT_BULB){
        if (obj.getLabel() != this.label){
            this.connections.push(obj);
        } else {
            console.log('Trying to link bulb to itself');
        }
    } else {
        console.log('Trying to add non bulb to switch');
    }
}


/* Set Light bulb connections array */
LightBulb.prototype.setConnections = function(con){
    this.connections = con;
}

/* Get connections from a light */
LightBulb.prototype.getConnections = function(){
    return this.connections;
}


/* Light switch */
LightSwitch.prototype = new DrawObject();
LightSwitch.prototype.constructor = LightSwitch;
function LightSwitch(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.LIGHT_SWITCH;
    this.scalerSize = 10;
    this.radius = 20;

    this.s_elevation = s_elev;
    this.s_angle = s_angle;
    this.s_visibility = true;
    this.name = s_bname;
    this.type = s_type;
    this.tooltip = s_tooltip;
    this.price = switchPrice;
    this.itemCode = set_itemCode;
    this.imgPath = switchImagePath;
    this.connections = [];
}

/* Set image path */
LightSwitch.prototype.setImgPath = function (path) {
    this.imgPath = path;
}

/* Get image path */
LightSwitch.prototype.getImgPath = function () {
    return this.imgPath;
}

/* Sets the coordinates of the light switch. */
LightSwitch.prototype.setCoordinates = function(x,y){
    this.objStartX  = parseInt(x)- this.radius;
    this.objEndX = parseInt(x) + this.radius;
    this.objStartY =  parseInt(y) - this.radius;
    this.objEndY = parseInt(y)+ this.radius;
}

/* Get coordinates of light switch */
LightSwitch.prototype.getCoordinates = function(){
    var retX = this.objStartX;
    var retY = this.objStartY;

    var coordinates = {x:retX, y:retY};
    return coordinates;
}

/* Adds light to switch connection */
LightSwitch.prototype.addLightBulbObj = function(obj){
    if (obj.getType() == ObjectType.LIGHT_BULB){
        this.connections.push(obj);
    } else {
        console.log('Trying to add non bulb to switch');
    }
}

/* Get connections from a switch */
LightSwitch.prototype.getConnections = function(){
    return this.connections;
}

/* Set Light switch connections array */
LightSwitch.prototype.setConnections = function(con){
    this.connections = con;
}



/* Get light bulb physical radius */
LightSwitch.prototype.getRadius = function(){
    return this.radius;
}


/* Wall object inherit from Draw object */
Wall.prototype = new DrawObject();
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

/* Continuous wall object inherit from Draw object. Unlike other primitive object classes, this class 
 * keeps an array of points in order to maintain the drew figure (objVerticesArr). */
CWall.prototype = new DrawObject();
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
    console.log("xScale :" + xScale + "yScale :" + yScale);
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
 * This is implemented in DrawObject, but need specialization here because the way CWall constructed is different.
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


/* Text object inherit from Draw object. Unlike other primitive object classes, this class 
 * keeps a text, fontSize, fontColor variables to hold the displaying text. */
DrawText.prototype = new DrawObject();
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
    DrawObject.prototype.scale.call(this, oldScaleFactor, newScaleFactor);
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

function addRow(name,price,discount,energy,visible) {
    
    this.productName = name;
    this.price = price;
    this.discount = discount;
    this.energy =energy;
    this.visible = visible;

    var table = document.getElementById("productInfo");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    var checkedStatus = visible ? "checked" :  "";
    //console.log("checkedStatus: "+checkedStatus+" vibL: "+visible);
    row.insertCell(0).innerHTML= productName;
    row.insertCell(1).innerHTML= price;
    row.insertCell(2).innerHTML= discount;
    row.insertCell(3).innerHTML= energy;
    row.insertCell(4).innerHTML= '<input type="checkbox" '+checkedStatus+' name="'+name+'" value = "Delete" onClick="Javacsript:setBulbStatus(this)">';
 }

function addToTable(bulb){
	//alert(bulb.visibility);
	addRow(bulb.name,'$200','4%','100',bulb.visibility);
}

function addToSwitchTable(bulb){
	//alert(bulb.visibility);
	addRow(bulb.name,'$200','4%','100',bulb.s_visibility);
}

function setBulbStatus(inputElement){
	drawElements.find(function(bulb){
		if (bulb.getType() == ObjectType.LIGHT_BULB && inputElement.name == bulb.getName()){
			//alert('call for Lights');
			bulb.setVisibility(inputElement.checked);
			drawAllObjects();
			return true;
		}
		
		if (bulb.getType() == ObjectType.LIGHT_SWITCH && inputElement.name == bulb.getName()){
			alert('call for switches');
			bulb.setVisibility(inputElement.checked);
			drawAllObjects();
			return true;
		}
	});
}

LightBulb.prototype.setVisibility = function(visibility){
	this.visibility  = visibility;
}

LightBulb.prototype.getVisibility = function(){
	return this.visibility;
}





