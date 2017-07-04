
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
  constructor ({game, viewGroup, text, fontSize, x, y, anchor}) {
    var style = {font: fontSize + 'px Arial', fill: '#ffff00', align: 'center'}
    this.text = game.add.text(x, y, text, style, viewGroup)
    this.text.anchor.set(anchor.x, anchor.y)
  }

  setText (text) {
    this.text.text = text
  }
}
