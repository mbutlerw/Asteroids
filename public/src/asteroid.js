function Asteroid(gameSize) {
  var size = randomNumberFromRange(40, 80)
  this.type = 'asteroid'
  this.size = { x: size, y: size };
  this.gameSize = gameSize
  this.spawnX = randomRangeNotIncluding(0, gameSize.x, ((gameSize.x / 2) - 100), ((gameSize.x / 2) + 100));
  this.spawnY = randomRangeNotIncluding(0, gameSize.y, ((gameSize.y / 2) - 100), ((gameSize.y / 2) + 100));
  this.center = { x: this.spawnX, y: this.spawnY }
  this.angle = 0;
  this.velocity = { x: randomRange(), y: randomRange() };
  this.lifeSpan = 1
  this.vertices = [
        { x: this.center.x - this.size.x / 2, y: this.center.y - this.size.y / 2},
        { x: this.center.x + this.size.x / 2, y: this.center.y - this.size.y / 2},
        { x: this.center.x + this.size.x / 2, y: this.center.y + this.size.y / 2},
        { x: this.center.x - this.size.x / 2, y: this.center.y + this.size.y / 2}
  ]

}

Asteroid.prototype = {
  update: function() {





    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;

    this.vertices = [
          { x: this.center.x - this.size.x / 2, y: this.center.y - this.size.y / 2},
          { x: this.center.x + this.size.x / 2, y: this.center.y - this.size.y / 2},
          { x: this.center.x + this.size.x / 2, y: this.center.y + this.size.y / 2},
          { x: this.center.x - this.size.x / 2, y: this.center.y + this.size.y / 2}
    ]

    var self = this
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = calcNextVertexCoord(this.vertices[i], self.center, self.angle)
    }

    this.angle += 1;
    if (this.center.x - (this.size.x / 2) > this.gameSize.x) {
      this.center.x = 0;
      this.vertices = [
            { x: this.center.x - this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y + this.size.y / 2},
            { x: this.center.x - this.size.x / 2, y: this.center.y + this.size.y / 2}
      ]
    }
    if (this.center.x < 0) {
      this.center.x = this.gameSize.x;
      this.vertices = [
            { x: this.center.x - this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y + this.size.y / 2},
            { x: this.center.x - this.size.x / 2, y: this.center.y + this.size.y / 2}
      ]
    }
    if (this.center.y > this.gameSize.y) {
      this.center.y = 0;
      this.vertices = [
            { x: this.center.x - this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y + this.size.y / 2},
            { x: this.center.x - this.size.x / 2, y: this.center.y + this.size.y / 2}
      ]
    }
    if (this.center.y < 0) {
      this.center.y = this.gameSize.y;
      this.vertices = [
            { x: this.center.x - this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y - this.size.y / 2},
            { x: this.center.x + this.size.x / 2, y: this.center.y + this.size.y / 2},
            { x: this.center.x - this.size.x / 2, y: this.center.y + this.size.y / 2}
      ]
    }
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
