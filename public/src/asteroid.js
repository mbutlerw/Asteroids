function Asteroid(gameSize, center, size) {
  this.type = 'asteroid'
  this.size = size;
  this.gameSize = gameSize
  this.center = center
  this.angle = 0;
  this.velocity = { x: randomVelocity(), y: randomVelocity() };
  this.lifeSpan = 1
  this.vertices = [
          { x: center.x - size / 2, y: center.y - size / 2},
          { x: center.x + size / 2, y: center.y - size / 2},
          { x: center.x + size / 2, y: center.y + size / 2},
          { x: center.x - size / 2, y: center.y + size / 2}
    ]
}

Asteroid.prototype = {
  update: function() {
    this.positioner();
  },

  positioner: function () {
    
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;

    this.calcVertices(this.center.x, this.center.y);

    this.screenWrapping();

    var self = this
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = calcNextVertexCoord(this.vertices[i], self.center, self.angle)
    }

    this.angle += 1;
  },

  screenWrapping: function () {

    if (this.center.x - (this.size.x / 2) > this.gameSize.x) {
      this.center.x = 0;
      this.calcVertices(this.center.x, this.center.y);
    }
    if (this.center.x < 0) {
      this.center.x = this.gameSize.x;
      this.calcVertices(this.center.x, this.center.y);
    }
    if (this.center.y > this.gameSize.y) {
      this.center.y = 0;
      this.calcVertices(this.center.x, this.center.y);
    }
    if (this.center.y < 0) {
      this.center.y = this.gameSize.y;
      this.calcVertices(this.center.x, this.center.y);
    }
  },

  calcVertices: function (centerX, centerY) {
    this.vertices = [
            { x: centerX - this.size.x / 2, y: centerY - this.size.y / 2},
            { x: centerX + this.size.x / 2, y: centerY - this.size.y / 2},
            { x: centerX + this.size.x / 2, y: centerY + this.size.y / 2},
            { x: centerX - this.size.x / 2, y: centerY + this.size.y / 2}
      ] 

    },

  draw: function(screen) {
    screen.save()
    screen.beginPath();
    screen.moveTo(this.vertices[0].x, this.vertices[0].y);
    screen.lineTo(this.vertices[1].x, this.vertices[1].y);
    screen.lineTo(this.vertices[2].x, this.vertices[2].y);
    screen.lineTo(this.vertices[3].x, this.vertices[3].y);
    screen.lineTo(this.vertices[0].x, this.vertices[0].y);
    screen.strokeStyle = 'white'
    screen.stroke()
    screen.restore()
  },
};


Asteroid.createAll = function(gameSize, level) {
  var asteroids = [];
  for (var i = 0; i < level; i++) {
    var size = randomSizeGenerator(70, 80)
    var spawnX = randomSpawnPoint(0, gameSize.x, ((gameSize.x / 2) - 100), ((gameSize.x / 2) + 100));
    var spawnY = randomSpawnPoint(0, gameSize.y, ((gameSize.y / 2) - 100), ((gameSize.y / 2) + 100));

    asteroids.push(new Asteroid(gameSize, { x: spawnX, y: spawnY }, { x: size, y: size }));
  }
  return asteroids;
};
