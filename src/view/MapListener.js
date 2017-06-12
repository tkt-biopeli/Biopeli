export default class MapListener {
  constructor ({ game, map, menuOptionCreator, menu }) {
    this.game = game
    this.map = map
    this.menuOptionCreator = menuOptionCreator
    this.menu = menu
  }

  update (pointerEvent) {
    if (this.pointerInMapArea(pointerEvent)) {
      var tile = this.getTileFromMap(pointerEvent)
      if (!this.validTile(tile)) return
      this.updateMenuOptions(tile)
    }
  }

  pointerInMapArea (pointerEvent) {
    return (pointerEvent !== undefined && pointerEvent.x <= this.menu.menuView.leftBorder)
  }

  getTileFromMap (pointerEvent) {
    var x = pointerEvent.x + this.game.camera.x
    var y = pointerEvent.y + this.game.camera.y

    return this.map.getTileWithPixelCoordinates(x, y)
  }

  validTile (tile) {
    if (typeof tile === 'undefined') {
      return false
    } else if (tile === this.menu.selectedTile) {
      this.menu.reset()

      return false
    }

    return true
  }

  updateMenuOptions (tile) {
    this.menu.chooseTile(tile, this.menuOptionCreator.getActions(tile))
  }
}
