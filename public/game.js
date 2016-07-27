(function(){
  var Game = function(canvasID) {
    var canvas = document.getElementById(canvasID);
    var screen = canvas.getContext('2d');
    var gameSize = {x: canvas.width, y: canvas.height } ;
    this.gameSize = {x: canvas.width, y: canvas.height } ;

    this.bodies = [new Player(this, gameSize), new Asteroid(gameSize), new Asteroid(gameSize), new Asteroid(gameSize), new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize)];


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

      var pnum = 0
      var anum = 0

      this.bodies.forEach(function (body) {
        if (body.type == 'player') { pnum += 1}
        if (body.type == 'asteroid') {anum += 1}
      })

      if (pnum === 0|| anum === 0) {  this.bodies = [new Player(this, this.gameSize), new Asteroid(this.gameSize), new Asteroid(this.gameSize), new Asteroid(this.gameSize), new Asteroid(this.gameSize),new Asteroid(this.gameSize),new Asteroid(this.gameSize),new Asteroid(this.gameSize),new Asteroid(this.gameSize),new Asteroid(this.gameSize),new Asteroid(this.gameSize)]}

      var bodies = this.bodies
      var notCollidingWithAnything = function(b1) {
        return bodies.filter(function (b2) { return colliding(b1, b2) }).length === 0

      }

      this.bodies = this.bodies.filter(notCollidingWithAnything)
      this.bodies = this.bodies.filter(function(body) {
        return body.lifeSpan > 0
      })

      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update()
      }
    },
    draw: function(screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);

      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(screen);
      }
    },
    addBody: function(body) {
      this.bodies.push(body);
    }
  };


  var Player = function(game, gameSize) {
    this.type = 'player'
    this.game = game;
    this.size = { x: 10, y: 20};
    this.center = { x: gameSize.x / 2, y: gameSize.y / 2 };
    this.angle = 0;
    this.keyboarder = new Keyboarder();
    this.velocity = { x: 0, y: 0};
    this.gameSize = gameSize;
    this.overHeated = 0
    this.lifeSpan = 1

  };

  Player.prototype = {
    update: function() {
      if (this.overHeated > 0) {this.overHeated -= 1}

      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.angle -= 4;
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.angle += 4;
      }

      if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
       var angle = ((this.angle - 90) * Math.PI) / 180
       this.velocity.x += Math.cos(angle) * 0.1;
       this.velocity.y += Math.sin(angle) * 0.1;
     }

     if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE) && this.overHeated === 0) {
        var angle = ((this.angle - 90) * Math.PI) / 180
        var bullet = new Bullet({ x: this.center.x, y: this.center.y}, { x: Math.cos(angle) * 10, y: Math.sin(angle) * 10}, this.gameSize)
        this.game.addBody(bullet)
        this.overHeated = 20
      }


        this.velocity.x = this.velocity.x * 0.99
        this.velocity.y = this.velocity.y * 0.99




     this.center.x += this.velocity.x;
     this.center.y += this.velocity.y;

     if (this.center.x - (this.size.x / 2) > this.gameSize.x) {
       this.center.x = 0;
     }
     if (this.center.x < 0) {
       this.center.x = this.gameSize.x;
     }
     if (this.center.y > this.gameSize.y) {
       this.center.y = 0;
     }
     if (this.center.y < 0) {
       this.center.y = this.gameSize.y;
     }

    },

    draw: function(screen) {
      screen.save()
      screen.translate(this.center.x, this.center.y);
      screen.rotate(this.angle * Math.PI / 180);
      screen.translate(-this.center.x, -this.center.y);
      screen.beginPath();
      screen.moveTo(this.center.x, this.center.y - 10);
      screen.lineTo(this.center.x + 5, this.center.y + 10);
      screen.lineTo(this.center.x - 5, this.center.y + 10);
      screen.lineTo(this.center.x, this.center.y - 10);
      screen.strokeStyle = 'white'
      screen.stroke()
      if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
       screen.moveTo(this.center.x + 3, this.center.y + 12)
       screen.lineTo(this.center.x, this.center.y + 15);
       screen.lineTo(this.center.x - 3, this.center.y + 12);
       screen.lineTo(this.center.x + 3, this.center.y + 12);
       screen.strokeStyle = 'white'
       screen.stroke()
      }
      screen.restore()

    },

  };

  var Asteroid = function(gameSize) {
    var size = randomNumberFromRange(40, 80)
    this.type = 'asteroid'
    this.size = { x: size, y: size };
    this.gameSize = gameSize
    this.spawnX = randomRangeNotIncluding(0, gameSize.x, ((gameSize.x / 2) - 100), ((gameSize.x / 2) + 100));
    this.spawnY = randomRangeNotIncluding(0, gameSize.y, ((gameSize.y / 2) - 100), ((gameSize.y / 2) + 100));
    this.center = { x: this.spawnX, y: this.spawnY};
    this.angle = 0;
    this.velocity = { x: randomRange(), y: randomRange() };
    this.lifeSpan = 1
  };

  Asteroid.prototype = {
    update: function() {
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
      this.angle += 1;
      if (this.center.x - (this.size.x / 2) > this.gameSize.x) {
        this.center.x = 0;
      }
      if (this.center.x < 0) {
        this.center.x = this.gameSize.x;
      }
      if (this.center.y > this.gameSize.y) {
        this.center.y = 0;
      }
      if (this.center.y < 0) {
        this.center.y = this.gameSize.y;
      }
    },


    draw: function(screen) {
      screen.save()
      screen.strokeStyle = 'white';
      screen.translate(this.center.x, this.center.y);
      screen.rotate(this.angle * Math.PI / 180);
      screen.translate(-this.center.x, -this.center.y);
      screen.strokeRect(this.center.x - this.size.x / 2,
                      this.center.y - this.size.y / 2,
                      this.size.x,
                      this.size.y
                    );
      screen.restore()

    },
  };


  var Bullet = function(center, velocity, gameSize) {
    this.type = 'bullet'
    this.size = { x: 3, y: 3}
    this.center = center
    this.velocity = velocity
    this.lifeSpan = 40
    this.gameSize = gameSize;
  }

  Bullet.prototype = {
    update: function () {
      this.lifeSpan -= 1
      this.center.x += this.velocity.x
      this.center.y += this.velocity.y

      if (this.center.x - (this.size.x / 2) > this.gameSize.x) {
        this.center.x = 0;
      }
      if (this.center.x < 0) {
        this.center.x = this.gameSize.x;
      }
      if (this.center.y > this.gameSize.y) {
        this.center.y = 0;
      }
      if (this.center.y < 0) {
        this.center.y = this.gameSize.y;
      }

    },

    draw: function(screen) {
      screen.fillStyle = 'white'
      screen.fillRect(this.center.x - this.size.x / 2,
                      this.center.y - this.size.y / 2,
                      this.size.x,
                      this.size.y)
    }
  }


  var randomRangeNotIncluding = function(min, max, minEx, maxEx) {

  	var diff = maxEx - minEx

  	var num = Math.floor(Math.random() *  (max - diff));
  	if (num >= minEx) {
  		num += diff;
  	} else if ( num < min) {
  		num += min
  	}

  	return num
  }

  var randomRange = function() {
    var num = Math.random();
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return num;
  }

  var randomNumberFromRange = function (min, max) {
  return Math.random() * (max - min) + min;
  }


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

  var colliding = function(b1, b2) {
  return !(b1 === b2 ||
           (b1 instanceof Asteroid  && b2 instanceof Asteroid) ||
           (b1 instanceof Player && b2 instanceof Bullet) ||
           (b1 instanceof Bullet && b2 instanceof Player) ||
           b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
           b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
           b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
           b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2)
  }

  window.onload = function() {
    new Game("gameCanvas");
  };

  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


})();
