export default class CameraMover {
  constructor ({game, xSpeed, ySpeed}) {
    this.game = game
    this.x = xSpeed
    this.y = ySpeed
  }

  /**
   * 
   * @param  events - see InputHandler
   */
  update (events) {
    var event = events.cursor
    if (event.up) {
      this.game.camera.y -= this.y
    } else if (event.down) {
      this.game.camera.y += this.y
    }

    if (event.left) {
      this.game.camera.x -= this.x
    } else if (event.right) {
      this.game.camera.x += this.x
    }
  }
}
