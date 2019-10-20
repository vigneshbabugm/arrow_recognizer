// Code for your features in this file. The extractFeatures function returns the array  feature values.

// This is how many arrows and non-arrows will be processed. A value of 10 will calculate features for 10 arrows and 10 non-arrows.
// A value of 0 will calculate features for all arrows and non-arrows in the dataset.
exports.sketchCount =0;

// Name of the output file
exports.outputFile = './features.csv';

/**
 *
 *
 * Takes in a stroke and returns an array of feature values
 * A stroke is an array of Points. A point has properties x, y, and time (in ms since epoch).
 * The first 13 values are Rubine's 13 features in number order.
 * The next 11 values are Long's features 12-22 in his paper.
 * The remaining are own features.
 */
exports.extractFeatures = function(stroke) {
	
    //let f2 = 2; // Example
    return [
        rubineFeature1(stroke),
        rubineFeature2(stroke),
        rubineFeature3(stroke),
        rubineFeature4(stroke),
        rubineFeature5(stroke),
        rubineFeature6(stroke),
        rubineFeature7(stroke),
        rubineFeature8(stroke),
        rubineFeature9(stroke),
        rubineFeature10(stroke),
        rubineFeature11(stroke),
        rubineFeature12(stroke),
        rubineFeature13(stroke),
        longFeature12(stroke),
        longFeature13(stroke),
        longFeature14(stroke),
        longFeature15(stroke),
        longFeature16(stroke),
        longFeature17(stroke),
        longFeature18(stroke),
        longFeature19(stroke),
        longFeature20(stroke),
        longFeature21(stroke),
        longFeature22(stroke),
        myFeature1(stroke),
        myFeature2(stroke),
        myFeature3(stroke),
        myFeature4(stroke),
        myFeature5(stroke),
        myFeature6(stroke),
        myFeature7(stroke),
        myFeature8(stroke)
       
    ];
};



//feature calculation
function rubineFeature1(stroke) {
	var f1;
	var x0=stroke[0].x;
	var y0=stroke[0].y; //values of the first point 
    if(stroke.length>=3){
    	var x2=stroke[2].x;
    	var y2=stroke[2].y; //Calculating the 3rd point
    }else{
    	var x2=stroke[1].x;
    	var y2=stroke[1].y;
    }
    var distance01=(Math.sqrt(Math.pow(x2-x0,2)+Math.pow(y2-y0,2)));
    if(distance01==0){
    	return 0;
    }else{
    	f1=(x2-x0)/distance01;
    	return f1;
    }
}
function rubineFeature2(stroke){
	var f2;
	var x0=stroke[0].x;
	var y0=stroke[0].y; //values of the first point 
    if(stroke.length>=3){
    	var x2=stroke[2].x;
    	var y2=stroke[2].y; //Calculating the 3rd point
    }else{
    	var x2=stroke[1].x;
    	var y2=stroke[1].y;
    }
    var distance01=(Math.sqrt(Math.pow(x2-x0,2)+Math.pow(y2-y0,2)));
    if(distance01==0){
    	return 0;
    }else{
    	f2=(y2-y0)/distance01;
    	return f2;
    }
}
function rubineFeature3(stroke){
	var xMax=Number.MIN_VALUE;
	var yMax=Number.MIN_VALUE;
	var xMin=Number.MAX_VALUE;
	var yMin=Number.MAX_VALUE;
	var i;
	for(i=0;i<stroke.length;i++){
		xMax=Math.max(stroke[i].x,xMax);
		yMax=Math.max(stroke[i].y,yMax);
		xMin=Math.min(stroke[i].x,xMin);
		yMin=Math.min(stroke[i].y,yMin);
	}
	var f3=Math.sqrt(Math.pow(xMax-xMin,2)+Math.pow(yMax-yMin,2));
	return f3;
}
function rubineFeature4(stroke){
	var xMax=Number.MIN_VALUE;
	var yMax=Number.MIN_VALUE;
	var xMin=Number.MAX_VALUE;
	var yMin=Number.MAX_VALUE;
	var i;
	for(i=0;i<stroke.length;i++){
		xMax=Math.max(stroke[i].x,xMax);
		yMax=Math.max(stroke[i].y,yMax);
		xMin=Math.min(stroke[i].x,xMin);
		yMin=Math.min(stroke[i].y,yMin);
	}
	return Math.atan2((yMax-yMin),(xMax-xMin));
}
function rubineFeature5(stroke){
	var x0=stroke[0].x;
	var y0=stroke[0].y;
	var xLast=stroke[stroke.length-1].x;
	var yLast=stroke[stroke.length-1].y;

	return Math.sqrt(Math.pow(xLast-x0,2)+Math.pow(yLast-y0,2));
}

function rubineFeature6(stroke){
	var x0=stroke[0].x;
	var y0=stroke[0].y;
	var xLast=stroke[stroke.length-1].x;
	var yLast=stroke[stroke.length-1].y;
	
	var f5=Math.sqrt(Math.pow(xLast-x0,2)+Math.pow(yLast-y0,2));
	if(f5==0){
		return 0;
	}else{
		return ((xLast-x0)/f5); 
	}
}
function rubineFeature7(stroke){
	var x0=stroke[0].x;
	var y0=stroke[0].y;
	var xLast=stroke[stroke.length-1].x;
	var yLast=stroke[stroke.length-1].y;
	
	var f5=Math.sqrt(Math.pow(xLast-x0,2)+Math.pow(yLast-y0,2));
	if(f5==0){
		return 0;
	}else{
		return ((yLast-y0)/f5); 
	}
}

function rubineFeature8(stroke){
	var totalLength=null;
	var differenceX=null;
	var differenceY=null;
	var i=null;
	for(i=0;i<stroke.length-1;i++){
		differenceX=Math.pow((stroke[i+1].x-stroke[i].x),2);
		differenceY=Math.pow((stroke[i+1].y-stroke[i].y),2);
		totalLength+=(Math.sqrt(differenceX+differenceY));
	}
	return totalLength;
}
function rubineFeature9(stroke){
	var differenceXMinus=null;
	var differenceYMinus=null;
	var differenceX=null;
	var differenceY=null;
	var angle=null;
	var totalAngle=null;
	var i=null;

	for(i=1;i<stroke.length-1;i++){
		differenceX=(stroke[i+1].x-stroke[i].x);
		differenceY=(stroke[i+1].y-stroke[i].y);
		differenceXMinus=(stroke[i].x-stroke[i-1].x);
		differenceYMinus=(stroke[i].y-stroke[i-1].y);
		var numerator=(differenceX * differenceYMinus)-(differenceXMinus * differenceY);
		var denominator=(differenceXMinus * differenceX)+(differenceYMinus * differenceY);
		angle=Math.atan2(numerator,denominator);
		totalAngle = totalAngle+angle;
	}
	return totalAngle;
}
function rubineFeature10(stroke){
	var differenceXMinus=null;
	var differenceYMinus=null;
	var differenceX=null;
	var differenceY=null;
	var angle=null;
	var totalAbsoluteAngle=null;
	var i=null;

	for(i=1;i<stroke.length-1;i++){
		differenceX=stroke[i+1].x-stroke[i].x;
		differenceY=stroke[i+1].y-stroke[i].y;
		differenceXMinus=stroke[i].x-stroke[i-1].x;
		differenceYMinus=stroke[i].y-stroke[i-1].y;
		var numerator=(differenceX * differenceYMinus)-(differenceXMinus * differenceY);
		var denominator=(differenceXMinus * differenceX)+(differenceYMinus * differenceY);
		angle=Math.atan2(numerator,denominator);
		var absAngle=Math.abs(angle);
		totalAbsoluteAngle=totalAbsoluteAngle+absAngle;
	}
	return totalAbsoluteAngle;
}
function rubineFeature11(stroke){
	var differenceXMinus=null;
	var differenceYMinus=null;
	var differenceX=null;
	var differenceY=null;
	var angle=null;
	var totalAngleSquare=null;
	var i=null;

	for(i=1;i<stroke.length-1;i++){
		differenceX=stroke[i+1].x-stroke[i].x;
		differenceY=stroke[i+1].y-stroke[i].y;
		differenceXMinus=stroke[i].x-stroke[i-1].x;
		differenceYMinus=stroke[i].y-stroke[i-1].y;
		var numerator=(differenceX * differenceYMinus)-(differenceXMinus * differenceY);
		var denominator=(differenceXMinus * differenceX)+(differenceYMinus * differenceY);
		angle=Math.atan2(numerator,denominator);
		var absAngle=Math.abs(angle);
		totalAngleSquare=totalAngleSquare+Math.pow(absAngle,2);
	}
	return totalAngleSquare;
}
function rubineFeature12(stroke){
	var previousPoint=stroke[0];
	var squaredMaxSpeed=0;
	var differenceXSquared;
	var differenceYSquared;
	var timeDifferenceSquared;
	var i;
	for(i=1;i<stroke.length;i++){
		differenceXSquared=Math.pow(stroke[i].x-previousPoint.x,2);
		differenceYSquared=Math.pow(stroke[i].y-previousPoint.y,2);
		timeDifferenceSquared=Math.pow(stroke[i].time-previousPoint.time,2);
		if(timeDifferenceSquared==0){
			var sqSpeed=(differenceXSquared+differenceYSquared)/(1+timeDifferenceSquared);//Maniputing the denominator to avoid divide by zero error;
		}else{
			var sqSpeed=(differenceXSquared+differenceYSquared)/timeDifferenceSquared;
		}
		
		squaredMaxSpeed=Math.max(squaredMaxSpeed,sqSpeed);
		previousPoint=stroke[i];
	}
	return squaredMaxSpeed;
}
function rubineFeature13(stroke){
	var lastPointTime=stroke[stroke.length-1].time;
	var initialPointTime=stroke[0].time;
	var timeDifference=(lastPointTime-initialPointTime);

	return timeDifference;
}
function longFeature12(stroke){
	var rF4= rubineFeature4(stroke);
	var lF12= Math.abs(Math.PI-rF4);
	return lF12;
}
function longFeature13(stroke){
	var differenceXMinus=null;
	var differenceYMinus=null;
	var differenceX=null;
	var differenceY=null;
	var angle=null;
	var curviness=null;
	var i=null;

	for(i=1;i<stroke.length-1;i++){
		differenceX=stroke[i+1].x-stroke[i].x;
		differenceY=stroke[i+1].y-stroke[i].y;
		differenceXMinus=stroke[i].x-stroke[i-1].x;
		differenceYMinus=stroke[i].y-stroke[i-1].y;
		var numerator=(differenceX * differenceYMinus)-(differenceXMinus * differenceY);
		var denominator=(differenceXMinus * differenceX)+(differenceYMinus * differenceY);
		angle=Math.atan2(numerator,denominator);
		var absAngle=Math.abs(angle);
		var curveAngle=(19*Math.PI)/180;
		if(absAngle<curveAngle){
			curviness=curviness+absAngle;
		}else{
			angle=0;
			curviness=curviness+angle;
		}
	}
	return curviness;
}
function longFeature14(stroke){
	var rF8=rubineFeature8(stroke);
	var rF9=rubineFeature9(stroke);
	if(rF8==0){
		return 0;
	}else{
		return rF9/rF8;
	}
}
function longFeature15(stroke){
	var rF8=rubineFeature8(stroke);
	var rF5=rubineFeature5(stroke);
	if(rF5==0){
		return 0;
	}else{
		return rF8/rF5;
	}
}
function longFeature16(stroke){
	var rF8=rubineFeature8(stroke);
	var rF3=rubineFeature3(stroke);
	if(rF3==0){
		return 0;
	}else{
		return rF8/rF3;
	}
}
function longFeature17(stroke){
	var rF5=rubineFeature5(stroke);
	var rF3=rubineFeature3(stroke);
	if(rF3==0){
		return 0;
	}else{
		return rF5/rF3;
	}
}
function longFeature18(stroke){
	var xMax=Number.MIN_VALUE;
	var yMax=Number.MIN_VALUE;
	var xMin=Number.MAX_VALUE;
	var yMin=Number.MAX_VALUE;
	var i;
	for(i=0;i<stroke.length;i++){
		xMax=Math.max(stroke[i].x,xMax);
		yMax=Math.max(stroke[i].y,yMax);
		xMin=Math.min(stroke[i].x,xMin);
		yMin=Math.min(stroke[i].y,yMin);
	}
	var area=((xMax-xMin)*(yMax-yMin));
	
	return area;
}
function longFeature19(stroke){
	var longArea=longFeature18(stroke);
	if(longArea==0){
		return Number.MIN_VALUE;
	}else{
		return Math.log(longArea);
	}
}
function longFeature20(stroke){
	var rF9=rubineFeature9(stroke);
	var rF10=rubineFeature10(stroke);
	if(rF10==0){
		return 0;
	}else{
		return rF9/rF10;
	}
}
function longFeature21(stroke){
	var rF8=rubineFeature8(stroke);
	if(rF8==0){
		return Number.MIN_VALUE;
	}else{
		return Math.log(rF8);
	}
}
function longFeature22(stroke){
	var longF12=longFeature12(stroke);
	if(longF12==0){
		return Number.MIN_VALUE;
	}else{
		return Math.log(longF12);
	}
}
function myFeature16(stroke){
	return Math.log(rubineFeature3(stroke));
}
function calculateCentroidX(stroke){
	var centroidX=null;
	var sumX=null;
	for(var i=0;i<stroke.length;i++){
		sumX+=stroke[i].x;
	}
	centroidX=sumX/stroke.length;
	return centroidX;
}
function calculateCentroidY(stroke){
	var centroidY=null;
	var sumY=null;
	for(var i=0;i<stroke.length;i++){
		sumY+=stroke[i].y;
	}
	centroidY=sumY/stroke.length;
	return centroidY;
}
function distanceCentroidInitialPoint(stroke){
	var cX=calculateCentroidX(stroke);
	var cY=calculateCentroidY(stroke);
	var x0=stroke[0].x;
	var y0=stroke[0].y;
	return Math.sqrt(Math.pow(cX-x0,2)+Math.pow(cY-y0,2));
}
function distanceCentroidFinalPoint(stroke){
	var cX=calculateCentroidX(stroke);
	var cY=calculateCentroidY(stroke);
	var x0=stroke[stroke.length-1].x;
	var y0=stroke[stroke.length-1].y;
	return Math.sqrt(Math.pow(cX-x0,2)+Math.pow(cY-y0,2));
}

function myFeature1(stroke){
	var initialCentroidDistance=distanceCentroidInitialPoint(stroke);
	var strokeLength=rubineFeature8(stroke);

	return (initialCentroidDistance/strokeLength);	
}
function myFeature2(stroke){
	var initialCentroidDistance=distanceCentroidInitialPoint(stroke);
	var diagonalLength=rubineFeature3(stroke);

	return (initialCentroidDistance/diagonalLength);
}
function myFeature3(stroke){
	var x0=stroke[0].x;
	var cX=calculateCentroidX(stroke);
	var initialCentroidDistance=distanceCentroidInitialPoint(stroke);

	return (cX-x0)/initialCentroidDistance;
}
function myFeature4(stroke){
	var y0=stroke[0].y;
	var cY=calculateCentroidY(stroke);
	var initialCentroidDistance=distanceCentroidInitialPoint(stroke);
	return (cY-y0)/initialCentroidDistance;
}

function minimumAngleCentroid(stroke){
	var cX=calculateCentroidX(stroke);
	var cY=calculateCentroidY(stroke);
	var xMin=Number.MAX_VALUE;
	var yMin=Number.MAX_VALUE;
	var i;
	for(i=0;i<stroke.length;i++){
		xMin=Math.min(stroke[i].x,xMin);
		yMin=Math.min(stroke[i].y,yMin);
	}

	return Math.abs(Math.atan2(yMin-cY,xMin-cX));

}

function myFeature5(stroke){
	var diagonalAngle=rubineFeature4(stroke);
	var cY=calculateCentroidY(stroke);
	var cX=calculateCentroidX(stroke);

	var centroidMinAngle=minimumAngleCentroid(stroke);

	return Math.abs(centroidMinAngle-diagonalAngle);
}
function myFeature6(stroke){
	var differenceXMinus=null;
	var differenceYMinus=null;
	var differenceX=null;
	var differenceY=null;
	var angle=null;
	var i=null;
	var k=0;

	for(i=1;i<stroke.length-1;i++){
		differenceX=stroke[i+1].x-stroke[i].x;
		differenceY=stroke[i+1].y-stroke[i].y;
		differenceXMinus=stroke[i].x-stroke[i-1].x;
		differenceYMinus=stroke[i].y-stroke[i-1].y;
		var numerator=(differenceX * differenceYMinus)-(differenceXMinus * differenceY);
		var denominator=(differenceXMinus * differenceX)+(differenceYMinus * differenceY);
		angle=Math.atan(numerator,denominator);
		var absAngle=Math.abs(angle);
		if(absAngle>(Math.PI/6)){
			k=k+1;
			
		}
		
	}
	return k;
}








