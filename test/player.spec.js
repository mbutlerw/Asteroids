describe("Player", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create a player", function(){
      var game = jasmine.createSpyObj("game", ["update"]);

      expect(new Player(game, gameSize) instanceof Player).toEqual(true);
    });
  });
});
