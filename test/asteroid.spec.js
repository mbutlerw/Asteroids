describe("Asteroid", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create an asteroid", function(){
      expect(new Asteroid(gameSize) instanceof Asteroid).toEqual(true);
    });
  });

  // describe("draw", function(){
  //   it("should call Game.drawBody with screen and body", function(){
  //     var asteroid = new Asteroid();
  //     var screen = {};
  //     spyOn(Game, ["drawBody"]);
  //
  //     asteroid.draw(screen);
  //     expect(Game.drawBody).toHaveBeenCalledWith(screen, asteroid);
  //   });
  // });
});
