// ------ item interface duck type
// id;   -- item id
// name;
// price;
// -------------------------------


/////////////////////////////////////////////////////////////////////////////
/* PackItem
- pack item does not inherit from CanvasItem structure
- this object is used to keep the product list of a pack 
*/
/////////////////////////////////////////////////////////////////////////////
function PackItem(){
    this.uid = -1;  // unique project item id
    this.is_std_inclusion = false;

    //---- item interface duck type
    this.id = -1;   // pack id
    this.name = "";
    this.price = 0;
    //----------------------------

    this.objType = ObjectType.PACK;
    this.product_list = [];
}

PackItem.prototype.getUniqueItemID = function(){
    return this.uid;
}

PackItem.prototype.setUniqueItemID = function(id){
    this.uid = id;
}

/* Sets the pack_id*/
PackItem.prototype.setPackID = function(id){
    this.id = id;
}

/* Gets the pack_id*/
PackItem.prototype.getPackID = function(){
    return this.id;
}

/* Sets the name*/
PackItem.prototype.setName = function(name){
    this.name = name;
}

/* Gets the name*/
PackItem.prototype.getName = function(){
    return this.name;
}

/* Sets the price*/
PackItem.prototype.setPrice = function(price){
    this.price = parseFloat(price);
}

/* Gets the price*/
PackItem.prototype.getPrice = function(){
    return this.price;
}

PackItem.prototype.pushProduct =  function(product){
    //todo check is product
    this.product_list.push(product);
};

PackItem.prototype.getProductList =  function(product){
    return this.product_list;
};

PackItem.prototype.getType = function(){
    return this.objType;
};

PackItem.prototype.setStatus = function(status){
    //TODO is this method really needed for pack ?? 
}

/* copy properties */
PackItem.prototype.copyProperties = function (params){
    for(var key in params) {
        if(key in this){
            if (Array.isArray(params[key])) {
                this[key] = [];
                var destinationArr = this[key];
                var sourceArray = params[key];
                for (var index = 0; index < sourceArray.length; index++) {
                    destinationArr.push(sourceArray[index]);
                }
            }
            else{
                this[key] = params[key];
            }
        }
    } 
}

/////////////////////////////////////////////////////////////////////////////
/* ProductItem */
/////////////////////////////////////////////////////////////////////////////
ProductItem.prototype = new CanvasItem();
ProductItem.prototype.constructor = ProductItem;
function ProductItem(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.PRODUCT;

    //---- item interface duck type --Start  //please dont change variable names
    this.id = -1;   // product id
    this.name = "";
    this.price = 0;
    //---------------------------- --End

    this.tooltip = true;
    this.visibility = true;
    this.itemCode = -1;
    this.imgPath = "";
    this.symbolPath = "";
    this.category_type = "";
    this.notes = ""

    this.isInsidePack = false;
    this.parentPackId = null; //only valid for pack items 

    // this.scalerSize = 10;
    this.width = 40;
    this.height = 40;
}

/* Sets the name*/
ProductItem.prototype.setName = function(name){
    this.name = name;
}

/* Gets the name*/
ProductItem.prototype.getName = function(){
    return this.name;
}

/* Sets the id*/
ProductItem.prototype.setProductID = function(id){
    this.id = id;
}

/* Gets the id*/
ProductItem.prototype.getProductID = function(){
    return this.id;
}

/* Sets the id*/
ProductItem.prototype.setParentPackID = function(packId){
    this.parentPackId = packId;
}

/* Gets the id*/
ProductItem.prototype.getParentPackID = function(){
    return this.parentPackId;
}

/* Sets the price*/
ProductItem.prototype.setPrice = function(price){
    this.price = parseFloat(price);
}

/* Gets the price*/
ProductItem.prototype.getPrice = function(){
    return this.price;
}

ProductItem.prototype.setContainingPack = function(pack){
    if (pack instanceof PackItem) {
        this.parent_pack = pack;
    }
}

ProductItem.prototype.getContainingPack = function(){
    return this.parent_pack;
}

/* Set symbol path */
ProductItem.prototype.setSymbolPath = function (path) {
    this.symbolPath = path;
}

/* Get symbol path */
ProductItem.prototype.getSymbolPath = function () {
    return this.symbolPath;
}

/* Set image path */
ProductItem.prototype.setImgPath = function (path) {
    this.imgPath = path;
}

/* Get image path */
ProductItem.prototype.getImgPath = function () {
    return this.imgPath;
}

ProductItem.prototype.setCatType = function (type) {
    this.category_type = type;
}

ProductItem.prototype.getCatType = function () {
    return this.category_type;
}

ProductItem.prototype.setVisibility = function(visibility){
	this.visibility  = visibility;
}

ProductItem.prototype.getVisibility = function(){
	return this.visibility;
}

/* Sets the coordinates of the ProductItem. */
ProductItem.prototype.setCoordinates = function(x,y){
    this.objStartX  = parseInt(x)- this.width / 2;
    this.objEndX = parseInt(x) + this.width / 2;
    this.objStartY =  parseInt(y) - this.height / 2;
    this.objEndY = parseInt(y)+ this.height / 2;
}

/* Get coordinates of ProductItem */
ProductItem.prototype.getCoordinates = function(){
    var retX = this.objStartX;
    var retY = this.objStartY;

    var coordinates = {x:retX, y:retY};
    return coordinates;
}


/////////////////////////////////////////////////////////////////////////////
/* LightBulb object inherit from Draw Object
 */
/////////////////////////////////////////////////////////////////////////////
LightBulb.prototype = new ProductItem();
LightBulb.prototype.constructor = LightBulb;
function LightBulb(){

    this.switchStatus = LightBulbStatus.ON;
    this.rayRadius = 100;
    this.color = Color.ORANGE;

    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.LIGHT_BULB;

    this.elevation = 0;
    this.angle = 0;
    this.lightpower = 0;
    // this.category_type1 = cat_type;

    this.connections = [];
    this.label = "Anonymous";
    this.selectionColour ;
    //Set to Zero to stop the raycasting
    this.rayLength = 0;
}

/* Scales up or down the object by a given factor */
LightBulb.prototype.scale = function (oldScaleFactor, newScaleFactor){
    CanvasItem.prototype.scale.call(this, oldScaleFactor, newScaleFactor);
    this.rayLength = (this.rayLength / oldScaleFactor) * newScaleFactor;
}

// LightBulb.prototype.setProductInfo = function(productInfo){
//     this.productInfo  = productInfo;
// }

// LightBulb.prototype.getProductInfo = function(){
//     return this.productInfo;
// }

LightBulb.prototype.setSelectionColour = function (type) {
    this.selectionColour = type;
}

/* Get image path */
LightBulb.prototype.getSelectionColour = function () {
    return this.selectionColour;
}

LightBulb.prototype.setConectingMood = function (type) {
    this.conectingMood = type;
}

/* Get image path */
LightBulb.prototype.getConectingMood = function () {
    return this.conectingMood;
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

// /* Sets the name of a Bulb */
// LightBulb.prototype.setName = function(name){
//     this.name = "Down Light T"+name;
// }

/* Sets the ray length of a Bulb */
LightBulb.prototype.setRayLength= function(rl){
    this.rayLength = rl;
}

/* Gets the ray length  of a Bulb */
LightBulb.prototype.getRayLength = function(){
    return this.rayLength;
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

/////////////////////////////////////////////////////////////////////////////
/* Light switch */
/////////////////////////////////////////////////////////////////////////////
LightSwitch.prototype = new ProductItem();
LightSwitch.prototype.constructor = LightSwitch;
function LightSwitch(){
    this.objStatus = ObjectStatus.DRAW;
    this.objType = ObjectType.LIGHT_SWITCH;
    this.scalerSize = 10;
    this.radius = 20;

    this.elevation = s_elev;
    this.angle = s_angle;
    this.type = s_type;
    this.connections = [];
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



