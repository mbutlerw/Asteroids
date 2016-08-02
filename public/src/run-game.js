window.addEventListener('load', function(){
  var canvas = document.getElementById('gameCanvas');
  var screen = canvas.getContext('2d');
  var gameSize = {x: canvas.width, y: canvas.height } ;
  this.gameSize = {x: canvas.width, y: canvas.height } ;

  window.sounds = {
    largeExplosion: new Audio('audio/bangLarge.wav'),
    smallExplosion: new Audio('audio/bangSmall.wav'),
    mediumExplosion: new Audio('audio/bangMedium.wav'),
    thruster: new Audio('audio/thrust.wav'),
    fire: new Audio('audio/fire.wav')
  }


  var game = new Game(gameSize);
  document.getElementById("level").innerHTML = game.level;

  game.addBody(new Player(game, this.gameSize));
  Asteroid.createAll(gameSize, game.level).forEach(function(asteroid) {
    game.addBody(asteroid);
  });


  var tick = function () {
    game.update();
    game.draw(screen, gameSize);
    requestAnimationFrame(tick);
  };

  tick();
});
