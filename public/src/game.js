function Game(gameSize) {
  this.gameSize = gameSize;
  this.bodies = [];

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
    var self = this
    var newbodies = []
    var NotcollidingWithAnything = function(b1) {

        if (bodies.filter (function (b2) { return colliding(b1, b2); }).length === 0) {
          return true
        }

        else {
            sounds.largeExplosion.play()
            if (b1.type === "asteroid") {
              if (b1.size.x >= 70) {
                for(let i = 0; i < 3; i++) {
                  var size = randomNumberFromRange(30, 40)
                  newbodies.push(new Asteroid(self.gameSize, { x:b1.center.x + i, y: b1.center.y + i}, { x: size, y: size}))
                }
              } else if (b1.size.x >= 30) {
                for(let i = 0; i < 3; i++) {
                  var size = randomNumberFromRange(10, 15)
                  newbodies.push(new Asteroid(self.gameSize, { x:b1.center.x + i, y: b1.center.y + i}, { x: size, y: size}))
                }
              }

            }
          }
      };

     this.bodies = (this.bodies.filter(NotcollidingWithAnything).concat(newbodies))

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
      Asteroid.createAll(this.gameSize, 10).forEach(function(asteroid) {
        self.addBody(asteroid);
      });
    }
  }
};
