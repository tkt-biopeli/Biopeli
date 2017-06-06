export default class InputHandler{
	constructor(game){
    this.game = game
  }

  getEvents(){
    var cursorEvent, pointerEvent

    // cursor
    var cursors = this.game.cursors
    cursorEvent = {
      up: cursors.up.isDown,
      down: cursors.down.isDown,
      left: cursors.left.isDown,
      right: cursors.right.isDown
    }

    // pointer
    var ptr = this.game.input.activePointer
    if(ptr.isDown){
      pointerEvent = {
        x: ptr.position.x,
        y: ptr.position.y
      }
    }

    return {
      cursor: cursorEvent, 
      pointer: pointerEvent // undefined if pointer is not down, otherwise {x,y} obj
    }
  }
}