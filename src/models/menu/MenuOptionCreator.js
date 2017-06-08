import ForestActions from './ActionCreators/ForestActions'
import GrassActions from './ActionCreators/GrassActions'
import WaterActions from './ActionCreators/WaterActions'
export default class MenuOptionCreator {
  constructor () {
    this.tileOptions = new Map()
    this.tileOptions.set("forest", ForestActions)
    this.tileOptions.set("grass", GrassActions)
    this.tileOptions.set("water", WaterActions)

  }

  getActions (tile) {
    if(tile.structure == null){
      return this.tileOptions(tile.tileType)
    }

    /*var options = this.structureOptions(tile.structure)
    options.concat(this.extraOptions(tile))

    return options*/

    return []
  }

  //ERROR
  tileOptions (tileType) {
    return tileTypeOptions.get(tileType.name)()
  }

  structureOptions (structure) {
    return []
  }

  extraOptions (tile) {
    return []
  }
}
