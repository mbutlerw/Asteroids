var Keyboarder = function (player1, player2) {

  player1 = player1;
  player2 = player2;
  // var keyState = {};

  // window.onkeydown = function(e) {
  //   keyState[e.keyCode] = true;
  // };
  //
  // window.onkeyup = function(e) {
  //   keyState[e.keyCode] = false;
  // };
  //
  // this.isDown = function(keyCode) {
  //   return keyState[keyCode] === true;
  // };

  var keys = {
    37:{down:false, action: function(){player1.left();}},
    39:{down:false, action: function(){player1.right();}},
    38:{down:false, action: function(){player1.up();}},
    32:{down:false, action: function(){player1.shoot();}},
    65:{down:false, action: function(){player2.left();}},
    68:{down:false, action: function(){player2.right();}},
    87:{down:false, action: function(){player2.up();}},
    16:{down:false, action: function(){player2.shoot();}},
  };

  this.KEYS = keys;

  document.body.addEventListener("keydown", function(e) {
    if (keys[e.keyCode]) {
      keys[e.keyCode].down = true;
    }
  });

  document.body.addEventListener("keyup", function(e) {
    if (keys[e.keyCode]) {
      keys[e.keyCode].down = false;
    }
  });

};


Keyboarder.prototype= {

  update: function() {
    for (var key in this.KEYS) {
      if (this.KEYS[key].down) {
        this.KEYS[key].action();
      }
    }
  }
}


window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 87, 65, 16, 68].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);
