function Asteroid(gameSize) {
  var size = randomNumberFromRange(40, 80);
  this.type = 'asteroid';
  this.size = { x: size, y: size };
  this.gameSize = gameSize;
  this.spawnX = randomRangeNotIncluding(0, gameSize.x, ((gameSize.x / 2) - 100), ((gameSize.x / 2) + 100));
  this.spawnY = randomRangeNotIncluding(0, gameSize.y, ((gameSize.y / 2) - 100), ((gameSize.y / 2) + 100));
  this.center = { x: this.spawnX, y: this.spawnY};
  this.angle = 0;
  this.velocity = { x: randomRange(), y: randomRange() };
  this.lifeSpan = 1;
}

  var sndLarge = new Audio('audio/bangLarge.wav');
  var sndMedium = new Audio('audio/bangMedium.wav');
  var sndSmall = new Audio('audio/bangSmall.wav');

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
    screen.save();
    screen.strokeStyle = 'white';
    screen.translate(this.center.x, this.center.y);
    screen.rotate(this.angle * Math.PI / 180);
    screen.translate(-this.center.x, -this.center.y);
    screen.strokeRect(this.center.x - this.size.x / 2,
                    this.center.y - this.size.y / 2,
                    this.size.x,
                    this.size.y
                  );
    screen.restore();

  },
};

Asteroid.createAll = function(gameSize) {
  var ASTEROID_COUNT = 10;

  var asteroids = [];
  for (var i = 0; i < ASTEROID_COUNT; i++) {
    asteroids.push(new Asteroid(gameSize));
  }

  return asteroids;
};
