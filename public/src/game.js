function Game(gameSize) {
  this.gameSize = gameSize;
  console.log(gameSize);
  this.bodies = [new Player(this, gameSize), new Asteroid(gameSize), new Asteroid(gameSize), new Asteroid(gameSize), new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize),new Asteroid(gameSize)];
}

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
