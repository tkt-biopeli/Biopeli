export default class AnimatedBar {
  constructor ({ game, group, vertical, width, height, x, y, percent }) {
    this.type = 'bar'
    this.game = game
    this.vertical = vertical
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.colors = { background: '#2e221f', bar: '#67244f' }
    this.duration = 250
    this.group = group
    this.percent = percent
    this.draw()
  }

  update (x, y, percent) {
    this.background.x = x
    this.background.y = y

    this.bar.x = x
    this.bar.y = y
    this.setPercentage(percent)
  }

  destroy () {
    this.bar.destroy()
    this.background.destroy()
  }

  draw () {
    this.background = this.constructBitmapAndAddToGroup(this.colors.background)
    this.bar = this.constructBitmapAndAddToGroup(this.colors.bar)

    if (this.vertical) {
      this.bar.height = this.height * this.percent
    } else {
      this.bar.width = this.width * this.percent
    }
  }

  constructBitmapAndAddToGroup (fillStyle) {
    let bitmapElement = this.game.add.bitmapData(this.width, this.height)
    bitmapElement.ctx.fillStyle = fillStyle
    bitmapElement.ctx.beginPath()
    bitmapElement.ctx.rect(0, 0, this.width, this.height)
    bitmapElement.ctx.fill()
    return this.group.create(this.x, this.y, bitmapElement, null, this.group)
  }

  /**
   * Animate bar fill to new value
   * @param {number} value - Percentage value between [0, 1]
   * @memberof AnimatedBar
   */
  setPercentage (value) {
    if (!this.vertical) {
      let inPixels = value * this.width <= this.width 
        ? value * this.width 
        : this.width
      this.game.add
        .tween(this.bar)
        .to({ width: inPixels }, this.duration, 'Linear', true)
    } else {
      let inPixels = value * this.height <= this.height 
        ? value * this.height 
        : this.height
      this.game.add
        .tween(this.bar)
        .to({ height: inPixels }, this.duration, 'Linear', true)
    }
  }
}
