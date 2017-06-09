import ForestActions from './ActionCreators/ForestActions'
import GrassActions from './ActionCreators/GrassActions'
import WaterActions from './ActionCreators/WaterActions'
export default class MenuOptionCreator {
  constructor ({structureTypes}) {
    this.tileOptions = new Map()
    this.tileOptions.set("forest", ForestActions)
    this.tileOptions.set("grass", GrassActions)
    this.tileOptions.set("water", WaterActions)

    this.structureTypes = structureTypes
  }

  getActions (tile) {
    if(tile.structure == null){
      return this.tileTypeOptions(tile)
    }

    /*var options = this.structureOptions(tile.structure)
    options.concat(this.extraOptions(tile))

    return options*/

    return []
  }

  tileTypeOptions (tile) {
    return this.tileOptions.get(tile.tileType.name)(tile, this.structureTypes)
  }
/*
  structureOptions (structure) {
    return []
  }

  extraOptions (tile) {
    return []
  }*/
}
