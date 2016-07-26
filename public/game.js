(function(){
  var Game = function(canvasID) {
    var canvas = document.getElementById(canvasID);
    var screen = canvas.getContext('2d');
    var gameSize = {x: canvas.width, y: canvas.height } ;

    this.bodies = [new Player(this, gameSize)];

    var self = this;
    var tick = function () {
      self.update();
      self.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();
  };

  Game.prototype = {
    update: function() {
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }
    },
    draw: function(screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      // screen.fillStyle = 'black';
      // screen.fillRect(0,0, gameSize.x, gameSize.y);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(screen);
      }
    },
    addBody: function(body) {
      this.bodies.push(body);
    }
  };

  var Player = function(game, gameSize) {
    this.game = game;
    this.size = { x: 15, y: 15};
    this.center = { x: gameSize.x / 2, y: gameSize.y / 2 };
    this.angle = 0;
    this.keyboarder = new Keyboarder();
    this.vx = 0;
    this.vy = 0;
    // this.transformation = this.angle * Math.PI / 180;

  };

  Player.prototype = {
    update: function() {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.angle -= 2;
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.angle += 2;
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        vy
      }
    },
    draw: function(screen) {
      // screen.save();
      // screen.setTransform(1,0,0,1,0,0);
      // screen.translate(x)
      screen.fillStyle = 'white';
      screen.translate(this.center.x, this.center.y);
      screen.rotate(this.angle * Math.PI / 180);
      screen.translate(-this.center.x, -this.center.y);
      screen.fillRect(this.center.x - this.size.x / 2,
                      this.center.y - this.size.y / 2,
                      this.size.x,
                      this.size.y
                    );
      screen.translate(this.center.x, this.center.y);
      screen.rotate(- this.angle * Math.PI / 180);
      screen.translate(- this.center.x, - this.center.y);
    },
    setupRotation: function() {

    }

  };

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

  window.onload = function() {
    new Game("gameCanvas");
  };
})();
