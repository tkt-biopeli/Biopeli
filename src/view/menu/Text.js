
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
  constructor({ game, viewGroup, text, fontSize, x, y }) {
    var style = { font: fontSize + 'px Arial', fill: '#ffff00', align: 'center' }
    this.text = game.add.text(x, y, text, style, viewGroup)
  }

  setText(text) {
    this.text.text = text
  }
}
