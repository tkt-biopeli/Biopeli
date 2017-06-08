import Structure from '../models/map/Structure'

export default class MapListener {
  constructor ({game, map, tileTypes, structureTypes, menuWidth}) {
    this.map = map
    this.game = game
    this.tileTypes = tileTypes
    this.structureTypes = structureTypes
    this.menuWidth = menuWidth
  }

  update (events) {
    var event = events.pointer
    if (event !== undefined && event.x <= (this.game.camera.width - this.menuWidth)) {
      var x = event.x + this.game.camera.x
      var y = event.y + this.game.camera.y

      var tile = this.map.getTileWithPixelCoordinates(x, y)

      if (typeof tile !== 'undefined') {
        tile.structure = new Structure({
          tile: tile,
          structureType: this.structureTypes.farm
        })
      }
    }
  }
}
