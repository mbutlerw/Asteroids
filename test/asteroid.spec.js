describe("Asteroid", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create an asteroid", function(){
      expect(new Asteroid(gameSize) instanceof Asteroid).toEqual(true);
    });
  });
});
