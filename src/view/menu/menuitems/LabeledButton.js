import config from '../../../config'

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
  constructor ({ game, viewGroup, label, fontSize, asset, x, y, callback, context, buttonWidth, buttonHeight }) {
    var style = {font: fontSize + 'px Arial', fill: '#ffff00', align: 'center'}

    var button = game.make.button(x, y, asset, callback, context)
    viewGroup.add(button)
    // this method call creates a 'text' object and adds it to viewGroup
    var text = game.add.text(
      Math.floor(x + buttonWidth / 2),
      Math.floor(y + buttonHeight / 2), label, style, viewGroup)
    text.anchor.set(0.5, 0.5)

    this.x = x
    this.y = y
    this.callback = callback
    this.context = context
  }
}
