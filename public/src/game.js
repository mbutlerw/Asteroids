function Game(gameSize) {
  this.gameSize = gameSize;
  this.liveBodies = [];
  this.level = 1;
  this.respawnPlayer = false;
  this.deadBodies = []
  this.respawnTime = 0
}

Game.prototype = {
  update: function() {

    this.respawnTime -= 1
    if (this.respawnTime === 0) { this.liveBodies.push(this.deadBodies.pop()) }

    for (var i = 0; i < this.liveBodies.length; i++) {
      this.liveBodies[i].update();
    }

    for (var i = 0; i < this.deadBodies.length; i++) {
      this.deadBodies[i].update();
    }

    this.collisionDetection();
    this.statusCheck();
  },

  draw: function(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);

    for (var i = 0; i < this.liveBodies.length; i++) {
      this.liveBodies[i].draw(screen);
    }

    for (var i = 0; i < this.deadBodies.length; i++) {
      this.deadBodies[i].draw(screen);
    }

    screen.strokeStyle = 'white';
    screen.font = "50px Helvetica";
    screen.strokeText(this.level, 390, 50);
  },

  addBody: function(body) {
    this.liveBodies.push(body);
  },

  collisionDetection: function() {
    var bodies = this.liveBodies;
    var self = this;
    var newBodies = [];

    var NotcollidingWithAnything = function(b1) {

      if (bodies.filter (function (b2) { return colliding(b1, b2); }).length === 0) {

        return true

      } else {

          if (b1.type === "asteroid") {
            if (randomPowerUpChecker() === true) {
              newBodies.push(new Powerup(self.gameSize, { x:b1.center.x, y: b1.center.y }, 10))
            }
            if (b1.size.x >= 70) {
              sounds.largeExplosion.play()
              for(let i = 0; i < 3; i++) {
                var size = randomSizeGenerator(30, 40)
                newBodies.push(new Asteroid(self.gameSize, { x:b1.center.x + i, y: b1.center.y + i}, { x: size, y: size}))
              }
            } else if (b1.size.x >= 30) {
              sounds.mediumExplosion.play()
              for(let i = 0; i < 3; i++) {

                var size = randomSizeGenerator(10, 15)
                newBodies.push(new Asteroid(self.gameSize, { x:b1.center.x + i, y: b1.center.y + i}, { x: size, y: size}))
              }
            } else {
              sounds.smallExplosion.play()
            }

          } else if (b1.type === "powerup") {
              var player = bodies.filter(function(body){
                return body.type === 'player';
              })[0]
            if (player.poweredUp < 3600) { player.poweredUp += 480 }

          } else if (b1.type === "player") {
            b1.center = { x: 400, y: 300}
            b1.velocity = {x: 0, y: 0}
            b1.angle = 0
            if (b1.lifeSpan != 1) {
              b1.repairing = 120
              b1.lifeSpan -= 1
              self.respawnTime = 120
              self.deadBodies.push(b1)
            }
          }
      };
  }
    this.liveBodies = (this.liveBodies.filter(NotcollidingWithAnything).concat(newBodies))

    this.liveBodies = this.liveBodies.filter(function(body) {
      return body.lifeSpan > 0;
    });
  },

  statusCheck: function() {
    var numberOfPlayers = 0;
    var numberOfAsteroids = 0;

    self = this;

    this.liveBodies.forEach(function (body) {
      if (body.type == 'player') { numberOfPlayers += 1;}
      if (body.type == 'asteroid') {numberOfAsteroids += 1;}
    });

    this.deadBodies.forEach(function (body) {
      if (body.type == 'player') { numberOfPlayers += 1;}
      if (body.type == 'asteroid') {numberOfAsteroids += 1;}
    });

    if (numberOfPlayers === 0) {
      this.gameOverReset();
    }

    if (numberOfAsteroids === 0 && numberOfPlayers === 1) {
      this.levelAdvance();
    }
  },

  gameOverReset: function () {
    this.level = 1;
    this.liveBodies = [];
    this.addBody(new Player(this, this.gameSize));

    Asteroid.createAll(this.gameSize, this.level).forEach(function(asteroid) {
      self.addBody(asteroid);
    }); 
  },

  levelAdvance: function () {
     this.level += 1;
      this.respawnPlayer = true;
      Asteroid.createAll(this.gameSize, this.level).forEach(function(asteroid) {
        self.addBody(asteroid);
      });
  }
};
