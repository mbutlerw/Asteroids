window.addEventListener('load', function(){
  var canvas = document.getElementById('gameCanvas');
  var screen = canvas.getContext('2d');
  var gameSize = {x: canvas.width, y: canvas.height } ;
  this.gameSize = {x: canvas.width, y: canvas.height } ;
  var game = new Game(gameSize);

  game.addBody(new Player(game, this.gameSize));
  Asteroid.createAll(gameSize).forEach(function(asteroid) {
    game.addBody(asteroid);
  });

  var tick = function () {
    game.update();
    game.draw(screen, gameSize);
    requestAnimationFrame(tick);
  };

  tick();
});
