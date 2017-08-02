/**
 * Description goes here
 */
export default class LabeledButton {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {Phaser.Game} param.game
   * @param { ??? } param.viewGroup
   * @param { ??? } param.label
   * @param {number} param.
   * @param {number} param.
   * @param { ??? } param.callback
   * @param { ??? } param.context
   * @param {number} param.buttonWidth
   * @param {number} param.buttonHeight
   */
  constructor ({ game, viewGroup, label, fontSize, asset, 
      x, y, callback, context, buttonWidth, buttonHeight }) {
    this.type = 'button'

    this.style = {
      font: fontSize + 'px Arial',
      fill: '#ffff00',
      align: 'center' 
    }
    this.group = viewGroup

    this.button = game.make.button(x, y, asset, callback, context)
    viewGroup.add(this.button)
    // this method call creates a 'text' object and adds it to viewGroup
    this.text = game.add.text(
      Math.floor(x + buttonWidth / 2),
      Math.floor(y + buttonHeight / 2), label, this.style, viewGroup)
    this.text.anchor.set(0.5, 0.5)

    this.x = x
    this.y = y
    this.asset = asset
    this.width = buttonWidth
    this.height = buttonHeight
    this.callback = callback
    this.context = context
  }

  update (label, fontSize, x, y, callback, context) {
    this.button.x = x
    this.button.y = y
    this.button.callback = callback
    this.button.context = context

    this.style.font = fontSize + 'px Arial'
    this.text.text = label
    this.text.x = Math.floor(x + this.width / 2)
    this.text.y = Math.floor(y + this.height / 2)
  }

  destroy () {
    this.group.removeChild(this.button)
    this.text.destroy()
    this.button.destroy()
  }
}
