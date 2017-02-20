/* This CanvasHelper class will hold data related to canvas operations
 * e.g zoom, pan etc... */
function CanvasHelper(obj){
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
};

/* Note : Canvas Xy is the cordinates which are saved in canvas items
 * ViewportXy is the mouse cordinates or the zoomed and panned cordinates */
CanvasHelper.prototype.convertCanvasXyToViewportXy = function (point) {
	c_x = (point.x + this.panX) * this.zoom;
	c_y = (point.y + this.panY) * this.zoom;

	return { x:c_x, y:c_y };
}

/* Note : Canvas Xy is the cordinates which are saved in canvas items
 * ViewportXy is the mouse cordinates or the zoomed and panned cordinates */
CanvasHelper.prototype.convertViewportXyToCanvasXy = function (point) {
	r_x = point.x / this.zoom - this.panX;
	r_y = point.y / this.zoom - this.panY;

	return { x:r_x, y:r_y };
}