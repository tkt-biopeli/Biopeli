export default class CameraMover {
  constructor ({game, xSpeed, ySpeed}) {
    this.game = game
    this.x = xSpeed
    this.y = ySpeed
  }

  update () {
    if (this.game.cursors.up.isDown) {
      this.game.camera.y -= this.y
    } else if (this.game.cursors.down.isDown) {
      this.game.camera.y += this.y
    }

    if (this.game.cursors.left.isDown) {
      this.game.camera.x -= this.x
    } else if (this.game.cursors.right.isDown) {
      this.game.camera.x += this.x
    }
  }
}
