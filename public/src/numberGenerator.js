var randomRangeNotIncluding = function(min, max, minEx, maxEx) {

  var diff = maxEx - minEx;

  var num = Math.floor(Math.random() *  (max - diff));
  if (num >= minEx) {
    num += diff;
  } else if ( num < min) {
    num += min;
  }
  return num;
};

var randomRange = function() {
  var num = Math.random();
  num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  return num;
};

var randomNumberFromRange = function (min, max) {
return Math.random() * (max - min) + min;
}

var calcNextVertexCoord = function (vertex, center, rotation) {
  var x = vertex.x
	var y = vertex.y
	var p = center.x
	var q = center.y
	var angle = -degToRad(rotation)
	var nextvert = { x: 0,y: 0}
	nextvert.x = (x - p) * Math.cos(angle) - (y - q) * Math.sin(angle) + p
	nextvert.y = (x - p) * Math.sin(angle) + (y - q) * Math.cos(angle) + q
	return nextvert
}

var degToRad = function (degrees) {
	return degrees * (Math.PI/180)
}

var randomPowerUpChecker = function() {
  var num = Math.random();
  if (num <= 0.20) {
    return true;
  } else {
    return false;
  }
}
