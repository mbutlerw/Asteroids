describe("Asteroid", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create an asteroid", function(){
      expect(new Asteroid(gameSize, {x: 200, y: 200}, {x: 40, y: 40}) instanceof Asteroid).toEqual(true);
    });
  });
});
