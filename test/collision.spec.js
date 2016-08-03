describe("Colliding:", function() {
  describe("exceptions - ", function() {

    it("two asteroids cannot collide", function() {
      var asteroid1 = new Asteroid({x: 800, y: 600}, {x:400, y:300}, {x:10, y:10});
      var asteroid2 = new Asteroid({x: 800, y: 600}, {x:400, y:300}, {x:10, y:10});
      expect(colliding(asteroid1, asteroid2)).toEqual(false);
    });

    it("a bullet and a player cannot collide", function() {
      var game = jasmine.createSpyObj("game", [""]);

      var player = new Player(game, {x: 800, y: 600});
      var bullet = new Bullet({x: 389, y: 300}, {x: 10, y: 0});
      expect(colliding(player, bullet)).toEqual(false);
    });

    it("an asteroid and a powerUp cannot collide", function() {
      var asteroid = new Asteroid({x: 800, y: 600}, {x: 400, y: 300}, {x: 10, y: 10});
      var powerUp = new Powerup({x: 800, y: 600}, {x: 400, y: 300}, {x: 15, y: 15})
      expect(colliding(asteroid, powerUp)).toEqual(false);
    });

    it("a bullet and a powerUp cannot collide", function() {
      var powerUp = new Powerup({x: 800, y: 600}, {x: 400, y: 300}, {x: 15, y: 15});
      var bullet = new Bullet({x: 385, y: 300}, {x: 10, y: 0});
      expect(colliding(bullet, powerUp)).toEqual(false);
    });

    it("a player and a powerUp cannot collide", function() {
      var game = jasmine.createSpyObj("game", [""]);

      var powerUp = new Powerup({x: 800, y: 600}, {x: 400, y: 300}, {x: 15, y: 15});
      var player = new Player(game, {x: 800, y: 600});
      expect(colliding(player, powerUp)).toEqual(false);
    });
  });

  describe("bullet to asteroid collision - ", function() {

    it("bullet and asteroid collide", function() {
      var asteroid = new Asteroid({x: 800, y: 600}, {x: 400, y: 300}, {x: 10, y: 10});
      var bullet = new Bullet({x: 389, y: 300}, {x: 0, y: 0});
      expect(colliding(asteroid, bullet)).toEqual(true);
    });

    it("asteroid and bullet collide", function() {
      var asteroid = new Asteroid({x: 800, y: 600}, {x: 400, y: 300}, {x: 10, y: 10});
      var bullet = new Bullet({x: 389, y: 300}, {x: 0, y: 0});
      expect(colliding(bullet, asteroid)).toEqual(true);
    });

    it("a bullet with no velocity will not extend its collision detection", function() {
      var asteroid = new Asteroid({x: 800, y: 600}, {x: 400, y: 300}, {x: 10, y: 10});
      var bullet = new Bullet({x: 385, y: 300}, {x: 0, y: 0});
      expect(colliding(asteroid, bullet)).toEqual(false);
    });

    it("a bullet with velocity will extend its collision detection by its velocity", function() {
      var asteroid = new Asteroid({x: 800, y: 600}, {x: 400, y: 300}, {x: 10, y: 10});
      var bullet = new Bullet({x: 389, y: 300}, {x: 10, y: 0});
      expect(colliding(asteroid, bullet)).toEqual(true);
    });
  });

  describe("asteroid to player collision - ", function() {
    it("an asteroid and a player can collide", function() {
      var game = jasmine.createSpyObj("game", [""]);

      var asteroid = new Asteroid({x: 800, y: 600}, {x:400, y:300}, {x:10, y:10});
      var player = new Player(game, {x: 800, y: 600});
      expect(colliding(asteroid, player)).toEqual(true);
    });
  });

  describe("powerUp to player collision", function() {
    it("a powerUp and a player can collide", function() {
      var game = jasmine.createSpyObj("game", [""]);

      var powerUp = new Powerup({x: 800, y: 600}, {x: 405, y: 300}, {x: 10, y: 10});
      var player = new Player(game, {x: 800, y: 600});
      expect(colliding(powerUp, player)).toEqual(true);
    })
  });
});
