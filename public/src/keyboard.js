var Keyboarder = function () {
  var keyState = {}

  window.onkeydown = function(e) {
    keyState[e.keyCode] = true
  }

  window.onkeyup = function(e) {
    keyState[e.keyCode] = false
  }

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true
  }

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32, UP: 38 }
}

window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
