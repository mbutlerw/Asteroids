window.onload = function() {
  var canvas = document.querySelector("#screen").components["canvas-material"];
  var screen = canvas.getContext('2d');

  var gameSize = {x: canvas.data.width, y: canvas.data.height } ;
  this.gameSize = {x: canvas.data.width, y: canvas.data.height } ;

  window.sounds = {
    largeExplosion: new Audio('audio/bangLarge.wav'),
    smallExplosion: new Audio('audio/bangSmall.wav'),
    mediumExplosion: new Audio('audio/bangMedium.wav'),
    thruster: new Audio('audio/thrust.wav'),
    fire: new Audio('audio/fire.wav')
  };

  var background = new Image();
  background.src = "../star-background.jpg";

  background.onload = function() {
    screen.drawImage(background,0,0);
  };

  var game = new Game(gameSize);

  game.addBody(new Player(game, this.gameSize));
  Asteroid.createAll(gameSize, game.level).forEach(function(asteroid) {
    game.addBody(asteroid);
  });

  window.setInterval(function(){
    game.update();
    game.draw(screen, gameSize);
    canvas.updateTexture();
  },13);
};
