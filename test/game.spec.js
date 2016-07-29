describe("Game", function(){
  var game = new Game(gameSize);
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create a game", function(){
      expect(new Game('canvasID') instanceof Game).toEqual(true);
    });
  });

  describe("update", function(){
    it("should call update on a body", function(){
      var game = new Game(gameSize);
      var body = jasmine.createSpyObj("body", ["update"]);

      game.bodies = [];
      game.addBody(body);
      game.update();
      expect(body.update).toHaveBeenCalled();
    });
  });
  describe("draw", function(){
    var body = jasmine.createSpyObj("body", ["draw"]);
    var screen = jasmine.createSpyObj("screen", ["clearRect"]);

    it("should clear the screen", function(){
      game.draw(screen, gameSize);
      expect(screen.clearRect).toHaveBeenCalled();
    });

    it("should call draw on a body", function(){
      game.addBody(body);
      game.draw(screen, gameSize);
      expect(body.draw).toHaveBeenCalled();
    });
  });
  // 
  // describe("bodiesNotColliding", function(){
  //   it("should call draw on a body", function(){
  //     var game = new Game(gameSize);
  //     spyOn(Game, "colliding").and.returnValue(true);
  //     var body1 = {};
  //     var body2 = {};
  //
  //     game.addBody(body1);
  //     game.addBody(body2);
  //     console.log(game.bodies);
  //     console.log(game.notCollidingWithAnything);
  //     expect(game.notCollidingWithAnything).toEqual([]);
  //   });
  //
  //   it("should return all bodies if none colliding", function(){
  //     var game = new Game(gameSize);
  //     spyOn(Game, "colliding").andReturnValue(false);
  //
  //     game.addBody(body1);
  //     game.addBody(body2);
  //     expect(game.notCollidingWithAnything).toEqual([body1, body2]);
  //   });
  // });
  // describe("addBody", function(){
  //   it("should be able to add body", function(){
  //     var game = new Game(gameSize);
  //     var body = jasmine.createSpyObj("body", ["update"]);
  //
  //     game.addBody(body);
  //     game.update();
  //     expect(body.update).toHaveBeenCalled();
  //   });
  // });
  //
  // describe("Game.drawBody", function(){
  //   it("should draw a body in the body's position", function(){
  //     var screen = jasmine.createSpyObj("screen", ["fillRect"]);
  //     var body = { center: { x: 1, y: 2}, size: { x: 3, y: 3 } };
  //
  //     game.draw(screen, gameSize);
  //     expect(screen.fillRect).toHaveBeenCalledWith(0.5, 0.5, 3, 3);
  //   });
  // });
});
