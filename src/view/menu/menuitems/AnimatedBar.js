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

  update(x, y, percent){
    this.background.x = x
    this.background.y = y
    
    this.bar.x = x
    this.bar.y = y
    this.setPercentage(percent)
  }

  destroy(){
    this.bar.destroy()
    this.background.destroy()
  }

  draw () {
    let bitmapBg = this.game.add.bitmapData(this.width, this.height)
    bitmapBg.ctx.fillStyle = this.colors.background
    bitmapBg.ctx.beginPath()
    bitmapBg.ctx.rect(0, 0, this.width, this.height)
    bitmapBg.ctx.fill()
    this.background = this.group.create(this.x, this.y, bitmapBg, null, this.group)

    var percentageSize = this.getPercentageSize()

    let bitmapBar = this.game.add.bitmapData(this.width, this.height)
    bitmapBar.ctx.fillStyle = this.colors.bar
    bitmapBar.ctx.beginPath()
    bitmapBar.ctx.rect(0, 0, percentageSize.width, percentageSize.height)
    bitmapBar.ctx.fill()
    this.bar = this.group.create(this.x, this.y, bitmapBar, null, this.group)
  }

  getPercentageSize () {
    if (this.vertical) {
      return {
        width: this.width,
        height: this.height * this.percent
      }
    } else {
      return {
        width: this.width * this.percent,
        height: this.height
      }
    }
  }

  /**
   * Animate bar fill to new value
   * @param {number} value - Percentage value between [0, 100]
   * @memberof AnimatedBar
   */
  setPercentage (value) {
    if (this.vertical) {
      let inPixels = value * this.width
      this.game.add.tween(this.bar).to({ width: inPixels }, this.duration, 'Linear', true)
    } else {
      let inPixels = value * this.height
      this.game.add.tween(this.bar).to({ height: inPixels }, this.duration, 'Linear', true)
    }
  }
}
