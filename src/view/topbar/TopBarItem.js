/**
 * Class representing a single item on the game screen's top info bar
 *
 * @export
 * @class TopBarItem
 */
export default class TopBarItem {
  /**
   * Creates an instance of TopBarItem.
   * @param {object} param
   * @param {object} param.itemCfg - Item configuration object
   * @param {object} param.settings - TopBar settings object
   * @param {number} param.leftPadding - Base x-coordinate for calculations
   * @param {number} param.totalWidth - Total width available for calculations
   * @param {function} param.callback - Callback function for item value
   * @memberof TopBarItem
   */
  constructor ({itemCfg, settings, leftPadding, totalWidth, callback}) {
    this.value = { source: callback, x: 0, y: 0 }
    this.icon = {asset: itemCfg.asset, x: 0, y: 0}
    this.type = itemCfg.type
    this.width = Math.floor(totalWidth * itemCfg.widthPct)
    this.graphic = undefined
    this.calculateLocation(settings, leftPadding)
  }

  calculateLocation (settings, leftPadding) {
    this.icon.x = leftPadding
    this.value.x = leftPadding + settings.iconWidth + settings.iconPadding
    this.value.y = settings.verticalPadding
    this.value.width = this.width - settings.iconWidth - settings.iconPadding
  }
}
