function Game(gameSize) {
  this.gameSize = gameSize;
  this.bodies = [];
  this.sndLarge = new Audio('audio/bangLarge.wav');
  this.sndSmall = new Audio('audio/bangSmall.wav');
  this.sndMedium = new Audio('audio/bangMedium.wav');
}

  Game.prototype = {
    update: function() {

      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }

      this.collisionDetection();
      this.gameOver();
    },
    draw: function(screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);

      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(screen);
      }
    },
    addBody: function(body) {
      this.bodies.push(body);
    },
    collisionDetection: function() {
      var bodies = this.bodies;
      var explosion = this.sndLarge;

      var notCollidingWithAnything = function(b1) {
        if (bodies.filter (function (b2) { return Game.colliding(b1, b2); }).length === 0) 

        {return true }

        else { explosion.play() }
      };

        // 

      this.bodies = this.bodies.filter(notCollidingWithAnything);

      this.bodies = this.bodies.filter(function(body) {
        return body.lifeSpan > 0;
      });
    },
    gameOver: function() {
      var pnum = 0;
      var anum = 0;

      self = this;

      this.bodies.forEach(function (body) {
        if (body.type == 'player') { pnum += 1;}
        if (body.type == 'asteroid') {anum += 1;}
      });

      if (pnum === 0|| anum === 0) {
        this.bodies = [];
        this.addBody(new Player(this, this.gameSize));
        Asteroid.createAll(this.gameSize).forEach(function(asteroid) {
          self.addBody(asteroid);
        });
      }
    }
  };

// Game.drawBody = function(screen, body) {
//   screen.fillRect(body.center.x - body.size.x / 2,
//                   body.center.y - body.size.y / 2,
//                   body.size.x,
//                   body.size.y)
// };

Game.colliding = function(b1, b2) {
  // console.log(b1);

  return !(b1 === b2 ||
             (b1 instanceof Asteroid  && b2 instanceof Asteroid) ||
             (b1 instanceof Player && b2 instanceof Bullet) ||
             (b1 instanceof Bullet && b2 instanceof Player) ||
             b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
             b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
             b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
             b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);

  // if (!miss) { 
  //   this.sndLarge.play();
  // }
  
};
