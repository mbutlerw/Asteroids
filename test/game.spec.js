describe("Game", function(){
  describe("new", function(){

    var gameSize = {x: 800, y: 600};

    it("should create a game", function(){
      var game = new Game(gameSize);
      expect(new Game('canvasID') instanceof Game).toEqual(true);
    });
  });
});
