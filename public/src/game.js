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

    var notCollidingWithAnything = function(b1) {
      return bodies.filter(function (b2) { return Game.colliding(b1, b2); }).length === 0;
    };

    this.bodies = this.bodies.filter(notCollidingWithAnything);

    this.bodies = this.bodies.filter(function(body) {
      return body.lifeSpan > 0;
    });
  },
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
             (b1 instanceof Player2 && b2 instanceof Bullet) ||
             (b1 instanceof Bullet && b2 instanceof Player2) ||
             b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
             b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
             b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
             b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
  };
