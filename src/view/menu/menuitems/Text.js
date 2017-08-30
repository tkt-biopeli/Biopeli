
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
  constructor ({ game, component, menuSize, viewGroup, text, fontSize, x, y, anchor }) {
    this.type = 'text'
    this.component = component

    this.style = {
      font: fontSize + 'px Arial',
      fill: '#ffff00',
      align: 'center'
    }
    this.text = game.add.text(x, y, text, this.style, viewGroup)
    this.text.anchor.set(anchor.x, anchor.y)
    this.text.wordWrap = true
    this.text.wordWrapWidth = menuSize
    this.setComponentSize()
  }

  update (component, text, fontSize, x, y) {
    this.component = component
    this.style.font = fontSize + 'px Arial'

    this.text.text = text
    this.text.x = x
    this.text.y = y

    this.setComponentSize()
  }

  setComponentSize () {
    this.component.height = this.text.height
    this.component.width = this.text.width
  }

  destroy () {
    this.text.destroy()
  }
}
