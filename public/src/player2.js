function Player2(game, gameSize, xPosition) {
    this.type = 'player';
    this.game = game;
    this.size = { x: 10, y: 20};
    this.center = { x: xPosition, y: gameSize.y / 2 };
    this.angle = 0;
    this.velocity = { x: 0, y: 0};
    this.gameSize = gameSize;
    this.overHeated = 0;
    this.lifeSpan = 1;
  }

  Player2.prototype = {
    update: function() {
      if (this.overHeated > 0) {this.overHeated -= 1;}

      this.velocity.x = this.velocity.x * 0.99;
      this.velocity.y = this.velocity.y * 0.99;

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

    left: function() {
      this.angle -= 4;
    },

    right: function() {
      this.angle += 4;
    },

    up: function() {
      var angle = ((this.angle - 90) * Math.PI) / 180;
      this.velocity.x += Math.cos(angle) * 0.1;
      this.velocity.y += Math.sin(angle) * 0.1;
    },

    shoot: function() {
      if (this.overHeated === 0) {
        var angle = ((this.angle - 90) * Math.PI) / 180;
        var bullet = new Bullet({ x: this.center.x, y: this.center.y}, { x: Math.cos(angle) * 10, y: Math.sin(angle) * 10}, this.gameSize);
        this.game.addBody(bullet);
        this.overHeated = 20;
      }
    },

    draw: function(screen) {
      screen.save();
      screen.translate(this.center.x, this.center.y);
      screen.rotate(this.angle * Math.PI / 180);
      screen.translate(-this.center.x, -this.center.y);
      screen.beginPath();
      screen.moveTo(this.center.x, this.center.y - 10);
      screen.lineTo(this.center.x + 5, this.center.y + 10);
      screen.lineTo(this.center.x - 5, this.center.y + 10);
      screen.lineTo(this.center.x, this.center.y - 10);
      screen.strokeStyle = 'white';
      screen.stroke();
      // if (true) {
      //   screen.moveTo(this.center.x + 3, this.center.y + 12);
      //   screen.lineTo(this.center.x, this.center.y + 15);
      //   screen.lineTo(this.center.x - 3, this.center.y + 12);
      //   screen.lineTo(this.center.x + 3, this.center.y + 12);
      //   screen.strokeStyle = 'white';
      //   screen.stroke();
      // }
      screen.restore();
    },
  };
