var cptRED = 0;

var cptGREEN = 1;

var cptBLUE = 2;


function XYPoint(x,y)
{
    if(this instanceof XYPoint)
    {
        this.x = x;
        this.y = y;
    }
    else
    {
        return new XYPoint(x,y);
    }
}

/**
 * Get Color points according to light model
 * @param model string Ex: LLC010
 * @returns {Array}
 */
function colorPointsForModel(model)
{

    var colorPoints = [];

    if(model === 'LCT001')
    {
        colorPoints.push(XYPoint(0.675, 0.322));
        colorPoints.push(XYPoint(0.4091, 0.518));
        colorPoints.push(XYPoint(0.167, 0.04));
    }
    else if(model === 'LLC006' || model === 'LLC007')
    {
        colorPoints.push(XYPoint(0.704, 0.296));
        colorPoints.push(XYPoint(0.2151, 0.7106));
        colorPoints.push(XYPoint(0.138, 0.08));
    }
    else
    {
        // Default construct triangle wich contains all values
        colorPoints.push(XYPoint(1.0, 0.0));
        colorPoints.push(XYPoint(0.0, 1.0));
        colorPoints.push(XYPoint(0.0, 0.0));
    }
    return colorPoints;
}


/**
 * Method to see if the given XY value is within the reach of the lamps.
 *
 * @param p the point containing the X,Y value
 * @param colorPoints color points array containing RGB XYPoints
 * @return true if within reach, false otherwise.
 */

function checkPointInLampsReach(p, colorPoints)
{
    var red = colorPoints[0];
    var green = colorPoints[1];
    var blue = colorPoints[2];

    var v1 = XYPoint(green.x - red.x, green.y - red.y);
    var v2 = XYPoint(blue.x - red.x, blue.y - red.y);

    var q = XYPoint(p.x - red.x, p.y - red.y);

    var s = crossProduct(q, v2) / crossProduct(v1, v2);
    var t = crossProduct(v1, q) / crossProduct(v1, v2);

    return ( (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0) );
}

/**
 * Is Not a number?
 * Note: NaN is the only JavaScript value that is treated as unequal to itself
 * @param val
 * @returns {boolean}
 */
function isNaN(val)
{
    return val !== val;
}

/**
 * Calculates crossProduct of two 2D vectors / points.
 *
 * @param p1 first point used as vector
 * @param p2 second point used as vector
 * @return crossProduct of vectors
 */
function crossProduct(p1, p2)
{
    return (p1.x * p2.y - p1.y * p2.x);
}

/**
 * Converts RGB to XY and Brightness
 * @param r integer 0-255
 * @param g integer 0-255
 * @param b integer 0-255
 * @param model string
 */

function RGBtoXY(red, green, blue, model)
{

    if(red > 1 || green > 1 || blue > 1)
    {
        red /= 255;
        green /= 255;
        blue /= 255;
    }

    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

    var X = red * 0.649926 + green * 0.103455 + blue * 0.197109;
    var Y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
    var Z = red * 0.0000000 + green * 0.053077 + blue * 1.035763;

    var cx = X / (X + Y + Z);
    var cy = Y / (X + Y + Z);

    if (isNaN(cx)) {
        cx = 0.0;
    }

    if (isNaN(cy)) {
        cy = 0.0;
    }

//Check if the given XY value is within the colourreach of our lamps.
    var xyPoint = XYPoint(cx, cy);

    var colorPoints = colorPointsForModel(model);

    var inReachOfLamps = checkPointInLampsReach(xyPoint, colorPoints);

    if (!inReachOfLamps)
    {
        //It seems the colour is out of reach
        //let's find the closest colour we can produce with our lamp and send this XY value out.

        //Find the closest point on each line in the triangle.

        var pAB =getClosestPointToPoints( colorPoints[cptRED], colorPoints[cptGREEN], xyPoint);

        var pAC =getClosestPointToPoints( colorPoints[cptBLUE], colorPoints[cptRED], xyPoint);

        var pBC =getClosestPointToPoints( colorPoints[cptGREEN], colorPoints[cptBLUE], xyPoint);

        //Get the distances per point and see which point is closer to our Point.
        var dAB = getDistanceBetweenTwoPoints(xyPoint, pAB);
        var dAC = getDistanceBetweenTwoPoints(xyPoint, pAC);
        var dBC = getDistanceBetweenTwoPoints(xyPoint, pBC);

        var lowest = dAB;

        var closestPoint = pAB;

        if (dAC < lowest) {
            lowest = dAC;
            closestPoint = pAC;
        }
        if (dBC < lowest) {
            lowest = dBC;
            closestPoint = pBC;
        }

        //Change the xy value to a value which is within the reach of the lamp.
        cx = closestPoint.x;
        cy = closestPoint.y;
    }

    return {
        x: cx,
        y: cy,
        bri: Y
    };
}

/**
 * Find the closest point on a line.
 * This point will be within reach of the lamp.
 *
 * @param A the point where the line starts
 * @param B the point where the line ends
 * @param P the point which is close to a line.
 * @return the point which is on the line.
 */
function getClosestPointToPoints(A,B,P)
{
    var AP = XYPoint(P.x - A.x, P.y - A.y);

    var AB = XYPoint(B.x - A.x, B.y - A.y);

    var ab2 = AB.x*AB.x + AB.y*AB.y;

    var ap_ab = AP.x*AB.x + AP.y*AB.y;

    var t = ap_ab / ab2;

    if (t < 0.0) {
        t = 0.0;
    }
    else if (t > 1.0) {
        t = 1.0;
    }

    return XYPoint(A.x + AB.x * t, A.y + AB.y * t);
}

/**
 * Find the distance between two points.
 *
 * @param one
 * @param two
 * @return the distance between point one and two
 */
// + (float)getDistanceBetweenTwoPoints:(CGPoint)one point2:(CGPoint)two {
function getDistanceBetweenTwoPoints(one, two)
{
    var dx = one.x - two.x; // horizontal difference
    var dy = one.y - two.y; // vertical difference
    return Math.sqrt(dx * dx + dy * dy);
}


function XYtoRGB(x, y, brightness, model)
{
    var xy = XYPoint(x,y);

    var colorPoints = colorPointsForModel(model);

    var inReachOfLamps = checkPointInLampsReach(xy, colorPoints);

    console.log('inReachOfLamps',inReachOfLamps);
    if (!inReachOfLamps) {
        //It seems the colour is out of reach
        //let's find the closest colour we can produce with our lamp and send this XY value out.

        //Find the closest point on each line in the triangle.
        var pAB = getClosestPointToPoints( colorPoints[cptRED], colorPoints[cptGREEN], xy);
        var pAC = getClosestPointToPoints( colorPoints[cptBLUE], colorPoints[cptRED], xy);
        var pBC = getClosestPointToPoints( colorPoints[cptGREEN], colorPoints[cptBLUE], xy);

        //Get the distances per point and see which point is closer to our Point.
        var dAB = getDistanceBetweenTwoPoints(xy, pAB);
        var dAC = getDistanceBetweenTwoPoints(xy, pAC);
        var dBC = getDistanceBetweenTwoPoints(xy, pBC);

        var lowest = dAB;
        var closestPoint = pAB;

        if (dAC < lowest) {
            lowest = dAC;
            closestPoint = pAC;
        }
        if (dBC < lowest) {
            lowest = dBC;
            closestPoint = pBC;
        }

        //Change the xy value to a value which is within the reach of the lamp.
        xy.x = closestPoint.x;
        xy.y = closestPoint.y;
    }

    var x = xy.x;
    var y = xy.y;
    var z = 1.0 - x - y;

    var Y = brightness;
    var X = (Y / y) * x;
    var Z = (Y / y) * z;

    var r = X  * 3.2410 - Y * 1.5374 - Z * 0.4986;
    var g = -X * 0.9692 + Y * 1.8760 + Z * 0.0416;
    var b = X  * 0.0556 - Y * 0.2040 + Z * 1.0570;

    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

    if(r < 0)
    {
        r = 0;
    }
    if(g < 0)
    {
        g = 0;
    }
    if(b < 0)
    {
        b = 0;
    }

    if(r > 1 || g > 1 || b > 1)
    {
        var max = Math.max(r,g,b);
        r /= max;
        g /= max;
        b /= max;
    }

    r *= 255;
    g *= 255;
    b *= 255;

    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    return {
        r: r,
        g: g,
        b: b
    };

}


function rgb2hsv (r,g,b) {
 var computedH = 0;
 var computedS = 0;
 var computedV = 0;

 //remove spaces from input RGB values, convert to int
 var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
 var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
 var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

 if ( r==null || g==null || b==null ||
     isNaN(r) || isNaN(g)|| isNaN(b) ) {
   alert ('Please enter numeric RGB values!');
   return;
 }
 if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
   alert ('RGB values must be in the range 0 to 255.');
   return;
 }
 r=r/255; g=g/255; b=b/255;
 var minRGB = Math.min(r,Math.min(g,b));
 var maxRGB = Math.max(r,Math.max(g,b));

 // Black-gray-white
 if (minRGB==maxRGB) {
  computedV = minRGB;
  return [0,0,computedV];
 }

 // Colors other than black-gray-white:
 var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
 var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
 computedH = 60*(h - d/(maxRGB - minRGB));
 computedS = (maxRGB - minRGB)/maxRGB;
 computedV = maxRGB;
 return [computedH,computedS,computedV];
}
