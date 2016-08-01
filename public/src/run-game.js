window.addEventListener('load', function(){
  var canvas = document.getElementById('gameCanvas');
  var screen = canvas.getContext('2d');

  // var background = new Image();
  // background.src = "star-background.jpg";

  // background.onload = function(){ 
  //   screen.drawImage(background,0,0);  console.log("HELLO"); 
  // }
  
  var gameSize = {x: canvas.width, y: canvas.height } ;
  this.gameSize = {x: canvas.width, y: canvas.height } ;
  var game = new Game(gameSize);

  game.addBody(new Player(game, this.gameSize));
  Asteroid.createAll(gameSize).forEach(function(asteroid) {
    game.addBody(asteroid);
  });

  var sndLarge = new Audio('audio/bangLarge.wav');
  var sndMedium = new Audio('audio/bangMedium.wav');
  var sndSmall = new Audio('audio/bangSmall.wav');
  
  var tick = function () {
    game.update();
    game.draw(screen, gameSize);
    requestAnimationFrame(tick);
  };

  tick();
});
