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
    var screen = jasmine.createSpyObj("screen", ["clearRect", "strokeText"]);

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

  describe("addBody", function(){
    it("should be able to add body", function(){
      var game = new Game(gameSize);
      var body = jasmine.createSpyObj("body", ["update"]);

      game.addBody(body);
      expect(game.liveBodies).toEqual([body]);
    });
  });

  describe("statusCheck", function() {
    it("should check the number of 'live' entities in the game", function(){
      var game = new Game(gameSize);
      game.statusCheck()
      expect(game.liveBodies.length).toEqual(2);

    });
  });

   describe("gameOverReset", function () {
      it("should reset game from level 2 to game level 1", function() {
      var game = new Game(gameSize);
      game.levelAdvance()
      game.gameOverReset()
      expect(game.level).toEqual(1)
  }); 
  });

  describe("levelAdvance", function () {
    it("should advance game level 1 to game level 2", function() {
    var game = new Game(gameSize);
    game.levelAdvance()
    expect(game.level).toEqual(2)
  });
  });  
});
