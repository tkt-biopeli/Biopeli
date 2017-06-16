import config from '../config'

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
    var tx = this.game.camera.x + this.updateCoordinate(event.left, event.right, this.x)
    var ty = this.game.camera.y + this.updateCoordinate(event.up, event.down, this.y)

    this.tweenCameraTo(tx, ty)
  }

  updateCoordinate (eventForNegDirection, eventForPosDirection, increment) {
    var delta = 0

    if (eventForNegDirection) {
      delta -= increment
    } else if (eventForPosDirection) {
      delta += increment
    }
    return delta
  }

  tweenCameraTo (tx, ty) {
    // .to parameters(properties object = new coordinates, duration, type of Easing, autoStart)
    this.game.add.tween(this.game.camera).to({ y: ty, x: tx }, config.tweenCameraDuration, 'Linear', true)
  }
}
