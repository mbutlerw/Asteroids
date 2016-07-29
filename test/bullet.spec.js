describe("Bullet", function(){
  describe("new", function(){
    it("should create a bullet", function(){
      var center = { x: 1, y: 2 };
      var velocity = { x: 3, y: 4 };
      var gameSize = {x: 800, y: 600};

      expect(new Bullet(center, velocity, gameSize) instanceof Bullet).toEqual(true);
    });
  });

  describe("update", function(){
    it("should move bullet one step of the velocity", function(){
      var center = { x: 1, y: 2 };
      var velocity = { x: 3, y: 4};
      var gameSize = {x: 800, y: 600};
      var bullet = new Bullet(center, velocity, gameSize);

      bullet.update();
      expect(center.x).toEqual(4);
      expect(center.y).toEqual(6);
    });
  });
});
