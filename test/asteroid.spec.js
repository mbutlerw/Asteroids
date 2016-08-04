describe("Asteroid", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create an asteroid", function(){
      expect(new Asteroid(gameSize, {x: 200, y: 200}, {x: 50, y: 50}) instanceof Asteroid).toEqual(true);
    });
  });

  describe("update", function(){
    it("updates the angle of the entity by +1", function(){
      var asteroid = new Asteroid(gameSize, {x: 400, y: 300}, {x: 50, y: 50})
      asteroid.update()
      expect(asteroid.angle).toEqual(1)
    })

    it("updates the center of the entity by its velocity", function(){
      var asteroid = new Asteroid(gameSize, {x: 400, y: 300}, {x: 50, y: 50})
      var currentCenter = {x: 400, y: 300}
      var velocity = asteroid.velocity

      asteroid.update()


      expect(asteroid.center).toEqual({ x: currentCenter.x + velocity.x, y: currentCenter.y + velocity.y})
    })
  })

  describe("screenWrapping", function(){
    it("should move the player from the right of the canvas to the left", function(){
      var asteroid = new Asteroid(gameSize, {x: 826, y: 300}, {x: 50, y: 50})
      asteroid.screenWrapping()
      expect(asteroid.center.x).toEqual(0)
    })

    it("should move the player from the left of the canvas to the right", function(){
      var asteroid = new Asteroid(gameSize, {x: -1, y: 300}, {x: 50, y: 50})
      asteroid.screenWrapping()
      expect(asteroid.center.x).toEqual(800)
    })

    it("should move the player from the bottom of the canvas to the top", function(){
      var asteroid = new Asteroid(gameSize, {x: 400, y: 626}, {x: 50, y: 50})
      asteroid.screenWrapping()
      expect(asteroid.center.y).toEqual(0)
    })

    it("should move the player from the top of the canvas to the bottom", function(){
      var asteroid = new Asteroid(gameSize, {x: 400, y: -1}, {x: 50, y: 50})
      asteroid.screenWrapping()
      expect(asteroid.center.y).toEqual(600)
    })
  })

  describe("calcVertices", function(){
    it("calculates vertices based on object center",function (){
      var asteroid = new Asteroid(gameSize, {x: 400, y: 300}, {x: 80, y: 80})
      asteroid.calcVertices()
      expect(asteroid.vertices[0]).toEqual({x: 360, y: 260})
      expect(asteroid.vertices[1]).toEqual({x: 440, y: 260})
      expect(asteroid.vertices[2]).toEqual({x: 440, y: 340})
      expect(asteroid.vertices[3]).toEqual({x: 360, y: 340})

    })
  })

  describe("draw", function() {
    it("calls draw functions on canvas", function() {
      var asteroid = new Asteroid(gameSize, {x: 200, y: 200}, {x: 50, y: 50})
      var screen = jasmine.createSpyObj("screen", ["clearRect", "strokeText", "lineTo", "moveTo", "beginPath", "save", "stroke", "strokeStyle", "restore"]);

      asteroid.draw(screen)

      expect(screen.save).toHaveBeenCalled();
      expect(screen.beginPath).toHaveBeenCalled();
      expect(screen.moveTo).toHaveBeenCalledWith(175, 175);
      expect(screen.lineTo).toHaveBeenCalledWith(225, 175);
      expect(screen.lineTo).toHaveBeenCalledWith(225, 225);
      expect(screen.lineTo).toHaveBeenCalledWith(175, 225);
      expect(screen.stroke).toHaveBeenCalled();
      expect(screen.restore).toHaveBeenCalled();
    })
  })

  describe("createAll", function() {
    it("creates # number of asteroids", function(){
      expect(Asteroid.createAll({x: 800, y: 600}, 8).length).toEqual(8)
    })

    it("what is creates are asteroids", function(){
      expect(Asteroid.createAll({x: 800, y: 600}, 5)[3] instanceof Asteroid).toEqual(true)
    })
  })
});
