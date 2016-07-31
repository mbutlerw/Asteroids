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
};
