var AFRAME = require("aframe-core");
var draw = require("aframe-draw-component").component;
AFRAME.registerComponent("draw", draw);

AFRAME.registerComponent("square", {
    dependencies: ["draw"],
    init: function() {
  		this.draw = this.el.components.draw;
  		this.draw.register(this.render.bind(this));
  	},
    update: function () {
      this.draw.render();
    },
    render: function() {
        var ctx = this.draw.ctx;
        var canvas = this.draw.canvas;
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
    }
});
