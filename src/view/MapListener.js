
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
  constructor ({ game, map, menuOptionCreator, menuController }) {
    this.game = game
    this.map = map
    this.menuOptionCreator = menuOptionCreator
    this.menuController = menuController
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
    return (pointerEvent !== undefined && pointerEvent.x <= this.menuController.menuView.layout.menuRect.x)
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
    } else if (tile === this.menuController.selectedTile) {
      this.menuController.reset()

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
    this.menuController.chooseTile(tile, this.menuOptionCreator.getActions(tile))
  }
}
