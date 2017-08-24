export default class Pause {
  constructor ({ game }) {
    this.game = game
  }

  pause () {
    this.game.game.paused = true
    this.paused = true
    this.drawScreen()
  }

  unpause () {
    this.pausebg.destroy()
    this.pausePopup.destroy()
    this.game.game.paused = false
    this.paused = false
  }

  drawScreen () {
    let x = this.game.camera.x
    let y = this.game.camera.y
    let width = this.game.camera.width
    let height = this.game.camera.height

    let bg = this.game.add.graphics()
    bg.beginFill(0x000000, 0.7)
    bg.drawRect(x, y, width, height)
    bg.endFill()
    this.pausebg = bg

    this.pausePopup = this.game.add.sprite(x + (width / 2), y + (height / 2), 'pause_info')
    this.pausePopup.anchor.set(0.5, 0.5)
  }
}
