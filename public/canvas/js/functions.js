/* Returns the gradient of a line (x1,y1) - (x2,y2) */
function getGradientOfLine(x1,y1,x2,y2){
	var m = 0;
	
	if (x1==x2){
		m = 999999;
	} else {
		m = (y2-y1)/(x2-x1);
	}
	return m.toFixed(2);
}

/* Returns the constant of a line (x1,y1) - (x2,y2) */
function getConstantOfLine(x1,y1,x2,y2){
	
	var c = 0;
	if (x1 == x2){
		c = 0;
	} else {
		c = (x1 * y2 - x2 * y1)/(x1 - x2);
	}
	return c.toFixed(2);
}


/* Gets the line with minimum gradient. l1x1 = line one x1, etc... */
function getStartLine(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2){
	
	var g1 = getGradientOfLine(l1x1,l1y1,l1x2,l1y2);
	var g2 = getGradientOfLine(l2x1,l2y1,l2x2,l2y2);
	var line = null;
	
	if (g1 < g2){
		line = 1;
	} else {
		line = 2;
	}
	return line;	
}

/* Returns the angle between two lines in Radians */
function getAngleBetweenTwoLines(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2){
	var m1 = getGradientOfLine(l1x1,l1y1,l1x2,l1y2);
	var m2 = getGradientOfLine(l2x1,l2y1,l2x2,l2y2);
	
	//return (Math.atan(Math.abs( (m1-m2) / (1+ m1*m2))) * 180 / Math.PI).toFixed(0); //Degrees
	return (Math.atan(Math.abs( (m1-m2) / (1+ m1*m2))));
}
	

/* Returns an object containing the cross section point between two lines. l1x1 = line one x1, etc... */
function getCrossSectionBetweenTwoLines(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2){
	var m1 = getGradientOfLine(l1x1,l1y1,l1x2,l1y2);
	var m2 = getGradientOfLine(l2x1,l2y1,l2x2,l2y2);
	
	var c1 = getConstantOfLine(l1x1,l1y1,l1x2,l1y2);
	var c2 = getConstantOfLine(l2x1,l2y1,l2x2,l2y2);
	
	
	console.log(m1+" "+m2+" "+c1+" "+c2);
	var crossX = ((c2-c1)/(m1-m2));
	var crossY = (m1 *crossX + c1);
	
	return {x:crossX, y:crossY};
}






	
	
