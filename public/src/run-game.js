window.addEventListener('load', function(){
  var canvas = document.getElementById('gameCanvas');
  var screen = canvas.getContext('2d');
  var gameSize = {x: canvas.width, y: canvas.height } ;
  this.gameSize = {x: canvas.width, y: canvas.height } ;
  var game = new Game(gameSize);
  var player1 = new Player(game, this.gameSize, 500, screen);
  var player2 = new Player2(game, this.gameSize, 300, screen);
  var keyboarder = new Keyboarder(player1, player2);

  game.addBody(player1);
  game.addBody(player2);

  Asteroid.createAll(gameSize).forEach(function(asteroid) {
    game.addBody(asteroid);
  });

  var tick = function () {
    keyboarder.update();
    game.update();
    respawn();
    game.draw(screen, gameSize);
    requestAnimationFrame(tick);
  };

  var respawn = function() {
    var pnum = 0;
    var anum = 0;

    self = game;

    game.bodies.forEach(function (body) {
      if (body.type == 'player') { pnum += 1;}
      if (body.type == 'asteroid') {anum += 1;}
    });

    if (pnum === 0|| anum === 0) {
      game.bodies = [];
      game.addBody(player1);
      player1.center = { x: 500, y: gameSize.y / 2 };
      player1.velocity = { x: 0, y: 0};
      player1.angle = 0;
      game.addBody(player2);
      player2.center = { x: 300, y: gameSize.y / 2 };
      player2 .velocity = { x: 0, y: 0};
      player2.angle = 0;
      Asteroid.createAll(game.gameSize).forEach(function(asteroid) {
        self.addBody(asteroid);
      });
    }
  }

  tick();
});
