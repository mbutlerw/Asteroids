describe("Bullet", function(){
  var gameSize = {x: 800, y: 600}

  describe("new", function(){
    it("should create a bullet", function(){
      var center = { x: 1, y: 2 };
      var velocity = { x: 3, y: 4 };

      expect(new Bullet(center, velocity, gameSize) instanceof Bullet).toEqual(true);
    });
  });

  describe("update", function(){
    it("should move bullet one step of the velocity", function(){
      var center = { x: 1, y: 2 };
      var velocity = { x: 3, y: 4};
      var bullet = new Bullet(center, velocity, gameSize);

      bullet.update();
      expect(center.x).toEqual(4);
      expect(center.y).toEqual(6);
    });

    it("reduces the lifeSpan of the entity by 1", function(){
      var bullet = new Bullet({x: 400, y: 300}, {x: 3, y: 3}, gameSize)

      bullet.update()

      expect(bullet.lifeSpan).toEqual(39)
    })

  });

  describe("screenWrapping", function(){
    it("should move the player from the right of the canvas to the left", function(){
      var bullet = new Bullet({x: 802, y: 300}, {x: 3, y: 3}, gameSize)
      bullet.screenWrapping()
      expect(bullet.center.x).toEqual(0)
    })

    it("should move the player from the left of the canvas to the right", function(){
      var bullet = new Bullet({x: -1, y: 300}, {x: 3, y: 3}, gameSize)
      bullet.screenWrapping()
      expect(bullet.center.x).toEqual(800)
    })

    it("should move the player from the bottom of the canvas to the top", function(){
      var bullet = new Bullet({x: 400, y: 601}, {x: 3, y: 3}, gameSize)
      bullet.screenWrapping()
      expect(bullet.center.y).toEqual(0)
    })

    it("should move the player from the top of the canvas to the bottom", function(){
      var bullet = new Bullet({x: 400, y: -1}, {x: 3, y: 3}, gameSize)
      bullet.screenWrapping()
      expect(bullet.center.y).toEqual(600)
    })
  })

  describe("calcVertices", function(){
    it("calculates vertices based on object center",function (){
      var bullet = new Bullet({x: 400, y: 300}, {x: 3, y: 3}, gameSize)
      bullet.calcVertices()
      expect(bullet.vertices[0]).toEqual({x: 398.5, y: 298.5})
      expect(bullet.vertices[1]).toEqual({x: 401.5, y: 298.5})
      expect(bullet.vertices[2]).toEqual({x: 401.5, y: 301.5})
      expect(bullet.vertices[3]).toEqual({x: 398.5, y: 301.5})

    })
  })

  describe("draw", function() {
    it("calls draw functions on canvas", function() {
      var bullet = new Bullet({x: 400, y: 300}, {x: 3, y: 3}, gameSize)
      var screen = jasmine.createSpyObj("screen", ["fillStyle", "fillRect"]);

      bullet.draw(screen)

      expect(screen.fillStyle).toEqual("white")
      expect(screen.fillRect).toHaveBeenCalledWith(398.5, 298.5, 3, 3);

    })
  })
});
