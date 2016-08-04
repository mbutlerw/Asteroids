describe("Asteroid", function(){
  var gameSize = {x: 800, y: 600};

  describe("new", function(){
    it("should create an asteroid", function(){
      expect(new Asteroid(gameSize, {x: 200, y: 200}, {x: 40, y: 40}) instanceof Asteroid).toEqual(true);
    });
  });

  describe("draw", function() {
    it("calls draw functions on canvas", function() {
      screen.save()
      screen.beginPath();
      screen.moveTo(this.vertices[0].x, this.vertices[0].y);
      screen.lineTo(this.vertices[1].x, this.vertices[1].y);
      screen.lineTo(this.vertices[2].x, this.vertices[2].y);
      screen.lineTo(this.vertices[3].x, this.vertices[3].y);
      screen.lineTo(this.vertices[0].x, this.vertices[0].y);
      screen.strokeStyle = 'white'
      screen.stroke()
      screen.restore()
    })
  })
});
