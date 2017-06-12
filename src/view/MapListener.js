export default class MapListener {
  constructor({ game, map, menuOptionCreator, menuView }) {
    this.map = map
    this.game = game
    this.menuOptionCreator = menuOptionCreator
    this.menuView = menuView
  }

  update (pointerEvent) {
    var tile = this.getTileFromMap(pointerEvent)

    tile = this.selectInMap(tile)

    this.updateMenuOptions(tile)
  }

  getTileFromMap (pointerEvent) {
    if (pointerEvent !== undefined && pointerEvent.x <= (this.menuView.leftBorder)) {
      var x = pointerEvent.x + this.game.camera.x
      var y = pointerEvent.y + this.game.camera.y

      return this.map.getTileWithPixelCoordinates(x, y)
    }
  }

  selectInMap (tile) {
    if (tile === this.map.selectedTile) {
      this.map.selectedTile = undefined
    } else {
      this.map.selectedTile = tile
    }

    return this.map.selectedTile
  }

  updateMenuOptions (tile) {
    if (typeof tile !== 'undefined') {
      this.menuView.setButtonActions(this.menuOptionCreator.getActions(tile))
    }
  }
}
