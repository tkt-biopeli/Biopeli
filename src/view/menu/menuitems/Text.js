
/**
 * Description goes here
 */
export default class Text {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {Phaser.Game} param.game
   * @param {} param.viewGroup
   * @param {} param.text
   * @param {} param.fontSize
   * @param {number} param.x
   * @param {number} param.y
   */
  constructor ({ game, menuSize, viewGroup, text, fontSize, x, y, anchor }) {
    this.type = 'text'

    this.style = {
      font: fontSize + 'px Arial',
      fill: '#ffff00',
      align: 'center'
    }
    this.text = game.add.text(x, y, text, this.style, viewGroup)
    this.text.anchor.set(anchor.x, anchor.y)
    this.text.wordWrap = true
    this.text.wordWrapWidth = menuSize
  }

  update (text, fontSize, x, y) {
    this.style.font = fontSize + 'px Arial'

    this.text.text = text
    this.text.x = x
    this.text.y = y
  }

  destroy () {
    this.text.destroy()
  }
}
