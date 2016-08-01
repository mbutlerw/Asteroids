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

  describe("bodiesNotColliding", function(){
    var body1 = {};
    var body2 = {};

    it("should call draw on a body", function(){
      spyOn(Game, "colliding").and.returnValue(true);

      game.addBody(body1);
      game.addBody(body2);
      game.collisionDetection();
      expect(game.bodies).toEqual([]);
    });
    
  });
  describe("addBody", function(){
    it("should be able to add body", function(){
      var game = new Game(gameSize);
      var body = jasmine.createSpyObj("body", ["update"]);

      game.addBody(body);
      expect(game.bodies).toEqual([body]);
    });
  });
});
