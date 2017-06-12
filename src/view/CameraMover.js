
export default class CameraMover {
  constructor ({ game, xSpeed, ySpeed }) {
    this.game = game
    this.x = xSpeed
    this.y = ySpeed
  }

  /**
   * @param  events - see InputHandler
   */
  update (events) {
    var event = events.cursor
    var tx = this.game.camera.x
    var ty = this.game.camera.y

    if (event.up) {
      ty -= this.y
    } else if (event.down) {
      ty += this.y
    }

    if (event.left) {
      tx -= this.x
    } else if (event.right) {
      tx += this.x
    }

    this.tweenCameraTo(tx, ty)
  }

  tweenCameraTo (tx, ty) {
    // .to parameters(properties object = new coordinates, duration, type of Easing, autoStart)
    this.game.add.tween(this.game.camera).to({ y: ty, x: tx }, 500, 'Linear', true)
  }
}
