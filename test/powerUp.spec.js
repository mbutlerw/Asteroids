describe("Powerup", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create a powerUp object", function(){
      expect(new Powerup(gameSize, {x: 200, y: 200}, 10 ) instanceof Powerup).toEqual(true);
    });
  });

  describe("update", function(){
    it("reduces the lifeSpan of the entity by 1", function(){
      var powerup = new Powerup(gameSize, {x: 400, y: 300}, 10 )

      powerup.update()

      expect(powerup.angle).toEqual(1)
    })

    it("updates the center of the entity by its velocity", function(){
      var powerup = new Powerup(gameSize, {x: 400, y: 300}, 10)
      var currentCenter = {x: 400, y: 300}
      var velocity = powerup.velocity

      powerup.update()


      expect(powerup.center).toEqual({ x: currentCenter.x + velocity.x, y: currentCenter.y + velocity.y})
    })
  })

  describe("screenWrapping", function(){
    it("should move the player from the right of the canvas to the left", function(){
      var powerup = new Powerup(gameSize, {x: 806, y: 306}, 10)
      powerup.screenWrapping()
      expect(powerup.center.x).toEqual(0)
    })

    it("should move the player from the left of the canvas to the right", function(){
      var powerup = new Powerup(gameSize, {x: -1, y: 300}, 10)
      powerup.screenWrapping()
      expect(powerup.center.x).toEqual(800)
    })

    it("should move the player from the bottom of the canvas to the top", function(){
      var powerup = new Powerup(gameSize, {x: 400, y: 606}, 10)
      powerup.screenWrapping()
      expect(powerup.center.y).toEqual(0)
    })

    it("should move the player from the top of the canvas to the bottom", function(){
      var powerup = new Powerup(gameSize, {x: 400, y: -1}, 10)
      powerup.screenWrapping()
      expect(powerup.center.y).toEqual(600)
    })
  })

  describe("calcVertices", function(){
    it("calculates vertices based on object center",function (){
      var powerup = new Powerup(gameSize, {x: 400, y: 300}, 10)
      powerup.calcVertices()
      expect(powerup.vertices[0]).toEqual({x: 395, y: 295})
      expect(powerup.vertices[1]).toEqual({x: 405, y: 295})
      expect(powerup.vertices[2]).toEqual({x: 405, y: 305})
      expect(powerup.vertices[3]).toEqual({x: 395, y: 305})

    })
  })

  describe("draw", function() {
    it("calls draw functions on canvas", function() {
      var powerup = new Powerup(gameSize, {x: 200, y: 200}, 10)
      var screen = jasmine.createSpyObj("screen", ["clearRect", "strokeText", "lineTo", "moveTo", "beginPath", "save", "stroke", "strokeStyle", "restore"]);

      powerup.draw(screen)

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
    it("creates # number of powerups", function(){
      expect(Powerup.createAll({x: 800, y: 600}, 8).length).toEqual(8)
    })

    it("what is creates are powerups", function(){
      expect(Powerup.createAll({x: 800, y: 600}, 5)[3] instanceof Powerup).toEqual(true)
    })
  })
});
