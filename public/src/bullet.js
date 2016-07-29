function Bullet(center, velocity, gameSize) {
  this.type = 'bullet';
  this.size = { x: 3, y: 3};
  this.center = center;
  this.velocity = velocity;
  this.lifeSpan = 40;
  this.gameSize = gameSize;
}

Bullet.prototype = {
  update: function () {
    this.lifeSpan -= 1;
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;

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
    screen.fillStyle = 'white';
    screen.fillRect(this.center.x - this.size.x / 2,
                    this.center.y - this.size.y / 2,
                    this.size.x,
                    this.size.y);
  }
};
