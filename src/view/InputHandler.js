export default class InputHandler {
  constructor({ game, mapListener, cameraMover }) {
    this.game = game
    this.mapListener = mapListener
    this.cameraMover = cameraMover    

    this.initialize()
  }

  initialize () {
    this.game.input.onDown.add(this.onPointerDown, this)
    var cursors = this.game.cursors
    cursors.up.onDown.add(this.onCursorDown, this)
    cursors.down.onDown.add(this.onCursorDown, this)
    cursors.left.onDown.add(this.onCursorDown, this)
    cursors.right.onDown.add(this.onCursorDown, this)
  }

  onPointerDown () {
    var ptr = this.game.input.activePointer
    var pointerEvent = {
      x: ptr.position.x,
      y: ptr.position.y
    }

    this.mapListener.update(pointerEvent)
  }

  onCursorDown () {
    var cursors = this.game.cursors
    var cursorEvent = {
      up: cursors.up.isDown,
      down: cursors.down.isDown,
      left: cursors.left.isDown,
      right: cursors.right.isDown
    }

    this.cameraMover.update({cursor:cursorEvent})
  }

}
