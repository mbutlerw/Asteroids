describe("Player", function(){

  var game = jasmine.createSpyObj("game", ["update", "addBody", "respawnPlayer"]);
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create a player", function(){
    var player = new Player(game, gameSize);
    expect(new Player(game, gameSize) instanceof Player).toEqual(true);
    expect(player.angle).toEqual(0);
    });
  });

  describe("update", function() {

    var player = new Player(game, gameSize);

    it("should decrease poweredUp by one", function() {
      player.poweredUp = 20;
      player.update();
      expect(player.poweredUp).toEqual(19);
    });

    it("should decrease overHeated by one", function() {
      player.overHeated = 20;
      player.update();
      expect(player.overHeated).toEqual(19);
    });

    it("should decrease repairing by one", function() {
      player.repairing = 20;
      player.update();
      expect(player.repairing).toEqual(19);
    });
  });

  describe("turnLeft", function() {
    it("should turn the player anticlockwise", function() {
      var player = new Player(game, gameSize);
      player.turnLeft();
      expect(player.angle).toEqual(-4);
    });
  });

  describe("turnRight", function() {
    it("should turn the player anticlockwise", function() {
      var player = new Player(game, gameSize);
      player.turnRight();
      expect(player.angle).toEqual(4);
    });
  });

  describe("thrust", function() {
    it("should change the players velocity", function() {
      var player = new Player(game, gameSize);
      player.thrust(0);
      expect(player.angle).toEqual(0);
      expect(player.velocity).toEqual({x: 0.1, y: 0});
    });
  });

  describe("shootBullets", function() {
    it("should add 20 to overHeated", function() {
      var player = new Player(game, gameSize);
      player.shootBullets(0)
      expect(player.overHeated).toEqual(20);
    });
  });

  //TEST FOR THE ADDITION OF A BULLET IN THE GAME //

  describe("shootShotGun", function() {
    it("should add 20 to overHeated", function() {
      var player = new Player(game, gameSize);
      player.shootShotGun(0)
      expect(player.overHeated).toEqual(20);
    });
  });

  describe("positioner", function() {
    it("should respawn a player in the center of the screen", function() {
      var player = new Player(game, gameSize);
      player.game.respawnPlayer = true;
      player.positioner();
      expect(player.center).toEqual({x: 400, y: 300});
      expect(player.velocity).toEqual({x: 0, y: 0});
      expect(player.game.respawnPlayer).toEqual(false);
    });
  });


  describe("screenWrapping", function(){
    it("should move the player from the right of the canvas to the left", function(){
      var player = new Player(game, gameSize);
      player.center = {x: 826, y: 300}, {x: 50, y: 50};
      player.screenWrapping();
      expect(player.center.x).toEqual(0);
    });

    it("should move the player from the left of the canvas to the right", function(){
      var player = new Player(game, gameSize);
      player.center = {x: -1, y: 300}, {x: 50, y: 50};
      player.screenWrapping();
      expect(player.center.x).toEqual(800);
    });

    it("should move the player from the bottom of the canvas to the top", function(){
      var player = new Player(game, gameSize);
      player.center = {x: 400, y: 601}, {x: 50, y: 50};
      player.screenWrapping();
      expect(player.center.y).toEqual(0);
    });

    it("should move the player from the top of the canvas to the bottom", function(){
      var player = new Player(game, gameSize);
      player.center = {x: 400, y: -1}, {x: 50, y: 50};
      player.screenWrapping();
      expect(player.center.y).toEqual(600);
    });
  });

  describe("draw", function() {
    it("should call the stroke function", function() {
      var screen = jasmine.createSpyObj("screen", ["clearRect", "fillRect", "translate", "rotate", "strokeText", "lineTo", "moveTo", "beginPath", "save", "stroke", "strokeStyle", "restore"]);
      var player = new Player(game, gameSize);
      player.draw(screen);
      expect(screen.stroke).toHaveBeenCalled;
    });
  });

  describe("drawPowerLevel", function() {
    it("should display the players power level", function() {
       var screen = jasmine.createSpyObj("screen", [ "beginPath", "save", "fillStyle", "fillRect"]);
       var player = new Player(game, gameSize);
       player.drawPowerLevel(screen);
       expect(screen.save).toHaveBeenCalled;
       expect(screen.fillStyle).toEqual("yellow");
       expect(screen.fillRect).toHaveBeenCalledWith(20, 20, 0, 5);
       expect(screen.beginPath).toHaveBeenCalled;
    });
  });

  describe("drawLives", function() {
    it("should display the players current lives", function() {
       var screen = jasmine.createSpyObj("screen", [ "lineTo", "moveTo", "strokeStyle"]);
       var player = new Player(game, gameSize);
       player.drawLives(screen);
       expect(screen.moveTo).toHaveBeenCalledWith(780, 15);
       expect(screen.lineTo).toHaveBeenCalledWith(785, 35);
       expect(screen.lineTo).toHaveBeenCalledWith(775, 35);
       expect(screen.lineTo).toHaveBeenCalledWith(780, 15);
       expect(screen.strokeStyle).toEqual("white");
    });
  });

  describe("drawPlayer", function() {
    it("should display the player", function() {
      var screen = jasmine.createSpyObj("screen", [ "lineTo", "moveTo", "strokeStyle"]);
       var player = new Player(game, gameSize);
       player.drawPlayer(screen);
       expect(screen.moveTo).toHaveBeenCalledWith(400, 290);
       expect(screen.lineTo).toHaveBeenCalledWith(405, 310);
       expect(screen.lineTo).toHaveBeenCalledWith(395, 310);
       expect(screen.lineTo).toHaveBeenCalledWith(400, 290);
    });
  });

  describe("drawThrust", function() {
    it("should display the thruster", function() {
      var screen = jasmine.createSpyObj("screen", [ "lineTo", "moveTo", "strokeStyle", "translate", "rotate", "restore"]);
       var player = new Player(game, gameSize);
       player.drawThrust(screen);
       expect(screen.translate).toHaveBeenCalledWith(400, 300);
       expect(screen.rotate).toHaveBeenCalledWith(0);
       expect(screen.translate).toHaveBeenCalledWith(-400, -300);
       expect(screen.moveTo).toHaveBeenCalledWith(403, 312);
       expect(screen.lineTo).toHaveBeenCalledWith(400, 315);
       expect(screen.lineTo).toHaveBeenCalledWith(397, 312);
       expect(screen.lineTo).toHaveBeenCalledWith(403, 312);
       expect(screen.strokeStyle).toEqual("white");
       expect(screen.restore).toHaveBeenCalled();
    });
  });
});
