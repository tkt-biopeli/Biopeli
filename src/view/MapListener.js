import Map from '../models/map/Map'
import Structure from '../models/map/Structure'

export default class MapListener {

  constructor ({game, map, tileTypes, structureTypes}) {
    this.map = map
    this.game = game
    this.tileTypes = tileTypes
    this.structureTypes = structureTypes
  }

  update (events) {
    var event = events.pointer
    if(event != undefined && event.x <= (this.game.camera.width - 256)){
      var x = event.x + this.game.camera.x
      var y = event.y + this.game.camera.y

      var tile = this.map.getTileWithPixelCoordinates(x, y)

      if (typeof tile !== 'undefined') {
        tile.structure = new Structure ({
          tile: tile,
          structureType: this.structureTypes.farm
        })
      }
    }
  }
}
