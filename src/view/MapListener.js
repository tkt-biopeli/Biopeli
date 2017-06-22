
/**
 * Description goes here
 */
export default class MapListener {
  /**
   * Description goes here
   *
   * @param {Object} param - Parameter object
   *
   * @param {Phaser.Game} param.game
   * @param {Map} param.map
   * @param {MenuOptionCreator} param.menuOptionCreator
   * @param {Menu} param.menu
   */
  constructor ({ game, map, menuOptionCreator, menu }) {
    this.game = game
    this.map = map
    this.menuOptionCreator = menuOptionCreator
    this.menu = menu
  }

  /**
   * Description goes here
   *
   * @param {{x: number, y: number}} pointerEvent
   */
  update (pointerEvent) {
    if (this.pointerInMapArea(pointerEvent)) {
      var tile = this.getTileFromMap(pointerEvent)
      if (!this.validTile(tile)) return
      this.updateMenuOptions(tile)
    }
  }

  /**
   * Description goes here
   *
   * @param {{x: number, y: number}} pointerEvent
   *
   * @return {boolean}
   */
  pointerInMapArea (pointerEvent) {
    return (pointerEvent !== undefined && pointerEvent.x <= this.menu.menuView.leftBorderCoordinate)
  }

  /**
   * Description goes here
   *
   * @param {{x: number, y: number}} pointerEvent
   *
   * @return {ModelTile}
   */
  getTileFromMap (pointerEvent) {
    var x = pointerEvent.x + this.game.camera.x
    var y = pointerEvent.y + this.game.camera.y
    return this.map.getTileWithPixelCoordinates(x, y)
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   *
   * @return {Boolean}
   */
  validTile (tile) {
    if (typeof tile === 'undefined') {
      return false
    } else if (tile === this.menu.selectedTile) {
      this.menu.reset()

      return false
    }

    return true
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   */
  updateMenuOptions (tile) {
    this.menu.chooseTile(tile, this.menuOptionCreator.getActions(tile))
  }
}
