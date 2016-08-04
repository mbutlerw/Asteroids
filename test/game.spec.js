describe("Game", function(){
  var game = new Game(gameSize);
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create a game", function(){
      expect(new Game('canvasID') instanceof Game).toEqual(true);
    });
  });

  describe("update", function(){
    it("should call update on a body", function(){
      var game = new Game(gameSize);
      var body = jasmine.createSpyObj("body", ["update"]);

      game.bodies = [];
      game.addBody(body);
      game.update();
      expect(body.update).toHaveBeenCalled();
    });
  });
  describe("draw", function(){
    var body = jasmine.createSpyObj("body", ["draw"]);
    var screen = jasmine.createSpyObj("screen", ["clearRect", "strokeText"]);

    it("should clear the screen", function(){
      game.draw(screen, gameSize);
      expect(screen.clearRect).toHaveBeenCalled();
    });

    it("should call draw on a body", function(){
      game.addBody(body);
      game.draw(screen, gameSize);
      expect(body.draw).toHaveBeenCalled();
    });
  });

  describe("addBody", function(){
    it("should be able to add body", function(){
      var game = new Game(gameSize);
      var body = jasmine.createSpyObj("body", ["update"]);

      game.addBody(body);
      expect(game.liveBodies).toEqual([body]);
    });
  });

  describe("statusCheck", function() {
    it("should check the number of 'live' entities in the game", function(){
      var game = new Game(gameSize);
      var player = {type: 'player'}
      var asteroid = {type: 'asteroid'}

      game.addBody(player)
      game.addBody(asteroid)
      game.addBody(asteroid)

      game.statusCheck()

      expect(game.liveBodies.length).toEqual(3);

    });

    it("should check the number of 'dead' entities in the game", function(){
      var game = new Game(gameSize);
      var player = {type: 'player'}
      var asteroid = {type: 'asteroid'}

      game.deadBodies.push(player)
      game.deadBodies.push(asteroid)
      game.deadBodies.push(asteroid)

      game.statusCheck()

      expect(game.deadBodies.length).toEqual(3);

    });

    it("should call advance level if just a play entinity exists", function(){
      var game = new Game(gameSize);
      var player = {type: 'player'}

      game.addBody(player)


      game.statusCheck()

      expect(game.liveBodies.length).toEqual(3);

    });
  });

   describe("gameOverReset", function () {
      it("should reset game from level 2 to game level 1", function() {
      var game = new Game(gameSize);
      game.levelAdvance()
      game.gameOverReset()
      expect(game.level).toEqual(1)
    });
  });

  describe("levelAdvance", function () {
    it("should advance game level 1 to game level 2", function() {
    var game = new Game(gameSize);
    game.levelAdvance()
    expect(game.level).toEqual(2)
    });
  });

  describe("collisonDetection", function(){
    it("sets correct player state if player collision is detected", function (){
      var game = new Game(gameSize);
      var player = {type: 'player', lifeSpan: 3, center: {x: 245, y: 340}, velocity: {x: 4, y: 4}, angle: 54 }
      spyOn(window, "colliding").and.returnValue(true);
      game.addBody(player);

      game.collisionDetection()

      expect(player.repairing).toEqual(120)
      expect(player.lifeSpan).toEqual(2)
      expect(player.center).toEqual({ x: 400, y: 300})
      expect(player.velocity).toEqual({x: 0, y: 0})
      expect(player.angle).toEqual(0)

    })

    it("adds a powerup entity if asteroid collides and randomPowerUpChecker returns true", function (){
      var game = new Game(gameSize);
      var asteroid = {type: 'asteroid', size: { x: 15, y: 15}, center: { x: 15, y: 15} }
      spyOn(window, "colliding").and.returnValue(true);
      spyOn(window, "randomPowerUpChecker").and.returnValue(true);
      game.addBody(asteroid);

      game.collisionDetection()

      expect(game.liveBodies[0].type).toEqual('powerup')

    })

    it("increases poweredup on player if player collides with powerup and current power level is below 3600", function (){
      var game = new Game(gameSize);
      var player = {type: 'player', lifeSpan: 3, center: {x: 245, y: 340}, velocity: {x: 4, y: 4}, angle: 54, poweredUp: 0 }
      var powerup = {type: 'powerup'}
      spyOn(window, "colliding").and.returnValue(true);
      game.addBody(player);
      game.addBody(powerup);

      game.collisionDetection()

      expect(player.poweredUp).toEqual(480)


    })

    it("doesnt increase poweredup on player if player collides with powerup and current power level is above 3600", function (){
      var game = new Game(gameSize);
      var player = {type: 'player', lifeSpan: 3, center: {x: 245, y: 340}, velocity: {x: 4, y: 4}, angle: 54, poweredUp: 4000 }
      var powerup = {type: 'powerup'}
      spyOn(window, "colliding").and.returnValue(true);
      game.addBody(player);
      game.addBody(powerup);

      game.collisionDetection()

      expect(player.poweredUp).toEqual(4000)


    })

    it("adds 3 medium asteroids if large asteroid collides", function (){
      var game = new Game(gameSize);
      var asteroid = {type: 'asteroid', size: { x: 80, y: 80}, center: { x: 15, y: 15} }
      spyOn(window, "colliding").and.returnValue(true);
      game.addBody(asteroid);

      game.collisionDetection()

      var validBodies = game.liveBodies.filter(function(body){
        return body.size.x <= 40 && body.size.x >= 30
      })

      expect(validBodies.length).toEqual(3)

    })

    it("adds 3 small asteroids if medium asteroid collides", function (){
      var game = new Game(gameSize);
      var asteroid = {type: 'asteroid', size: { x: 40, y: 40}, center: { x: 15, y: 15} }
      spyOn(window, "colliding").and.returnValue(true);
      game.addBody(asteroid);

      game.collisionDetection()

      var validBodies = game.liveBodies.filter(function(body){
        return body.size.x <= 15 && body.size.x >= 10
      })

      expect(validBodies.length).toEqual(3)

    })

  })
});
