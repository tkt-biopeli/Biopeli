export default class AnimatedBar {
  constructor ({ game, width, height, x, y }) {
    this.game = game
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.colors = { background: '#2e221f', bar: '#67244f' }
    this.duration = 250

    this.draw()
  }

  draw () {
    let bitmapBg = this.game.add.bitmapData(this.width, this.height)
    bitmapBg.ctx.fillStyle = this.colors.background
    bitmapBg.ctx.beginPath()
    bitmapBg.ctx.rect(0, 0, this.width, this.height)
    bitmapBg.ctx.fill()

    this.background = this.game.add.sprite(this.x, this.y, bitmapBg)
    this.background.fixedToCamera = true

    let bitmapBar = this.game.add.bitmapData(this.width, this.height)
    bitmapBar.ctx.fillStyle = this.colors.bar
    bitmapBar.ctx.beginPath()
    bitmapBar.ctx.rect(0, 0, this.width, this.height)
    bitmapBar.ctx.fill()

    this.bar = this.game.add.sprite(this.x, this.y, bitmapBar)
    this.bar.fixedToCamera = true
  }

  setPercentage (value) {
    let inPixels = value * this.width / 100
    this.game.add.tween(this.bar).to({ width: inPixels }, this.duration, 'Linear', true)
  }
}
