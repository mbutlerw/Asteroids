describe("Keyboarder", function(){

  it("keyState is empty by default", function() {
    var keyboard = new Keyboarder
    expect(keyboard.keyState).toEqual({})
  })

  it("window.onkeydown sets the event keyCode to true", function(){
    var keyboard = new Keyboarder
    var eventSpy = { keyCode: 37 }
    window.onkeydown(eventSpy)
    expect(keyboard.isDown(37)).toEqual(true)
  })

  it("window.onkeyup sets the event keyCode to false", function(){
    var keyboard = new Keyboarder
    var eventSpy = { keyCode: 39 }
    window.onkeydown(eventSpy)
    expect(keyboard.isDown(39)).toEqual(true)
    window.onkeyup(eventSpy)
    expect(keyboard.isDown(39)).toEqual(false)
  })


})
