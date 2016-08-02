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

    var notCollidingWithAnything = function(b1) {
        if (bodies.filter (function (b2) { return colliding(b1, b2); }).length === 0)

        {return true }

        else { sounds.largeExplosion.play() }
      };


    this.bodies = this.bodies.filter(notCollidingWithAnything);

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
      console.log(this.level);
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
      console.log(this.level);
      Asteroid.createAll(this.gameSize, this.level).forEach(function(asteroid) {
        self.addBody(asteroid);
      });
      document.getElementById("level").innerHTML = this.level;
    }
  }
};
