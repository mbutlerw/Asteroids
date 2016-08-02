function Game(gameSize) {
  this.gameSize = gameSize;
  this.bodies = [];
  this.level = 1;
  this.respawnPlayer = false;

}

Game.prototype = {
  update: function() {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }

    this.collisionDetection();
    this.statusCheck();
  },
  draw: function(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].draw(screen);
    }
    screen.strokeStyle = 'white';
    screen.font = "50px Helvetica";
    screen.strokeText(this.level, 390, 50);
  },
  addBody: function(body) {
    this.bodies.push(body);
  },
  collisionDetection: function() {
    var bodies = this.bodies;
    var self = this;
    var newbodies = [];
    var NotcollidingWithAnything = function(b1) {


      if (bodies.filter (function (b2) { return colliding(b1, b2); }).length === 0) {
        return true
      } else {
          if (b1.type === "asteroid") {
            if (randomPowerUpChecker() === true) {
              newbodies.push(new Powerup(self.gameSize, { x:b1.center.x, y: b1.center.y }, 10))
              console.log(bodies);
            }
            if (b1.size.x >= 70) {
              sounds.largeExplosion.play()
              for(let i = 0; i < 3; i++) {
                var size = randomNumberFromRange(30, 40)
                newbodies.push(new Asteroid(self.gameSize, { x:b1.center.x + i, y: b1.center.y + i}, { x: size, y: size}))
              }
            } else if (b1.size.x >= 30) {
              sounds.mediumExplosion.play()
              for(let i = 0; i < 3; i++) {
                var size = randomNumberFromRange(10, 15);
                newbodies.push(new Asteroid(self.gameSize, { x:b1.center.x + i, y: b1.center.y + i}, { x: size, y: size}))
              }
            } else {
              sounds.smallExplosion.play()
            }

          }
        }
      };


    this.bodies = (this.bodies.filter(NotcollidingWithAnything).concat(newbodies))


    this.bodies = this.bodies.filter(function(body) {
      return body.lifeSpan > 0;
    });
  },
  statusCheck: function() {
    var pnum = 0;
    var anum = 0;

    self = this;

    this.bodies.forEach(function (body) {
      if (body.type == 'player') { pnum += 1;}
      if (body.type == 'asteroid') {anum += 1;}
    });

    if (pnum === 0) {
      this.level = 1;
      this.bodies = [];
      this.addBody(new Player(this, this.gameSize));
      Asteroid.createAll(this.gameSize, this.level).forEach(function(asteroid) {
        self.addBody(asteroid);
      });
      document.getElementById("level").innerHTML = this.level;
    }
    if (anum === 0 && pnum === 1) {
      this.level += 1;
      this.respawnPlayer = true;
      Asteroid.createAll(this.gameSize, this.level).forEach(function(asteroid) {
        self.addBody(asteroid);
      });
      document.getElementById("level").innerHTML = this.level;
    }
  }
};
