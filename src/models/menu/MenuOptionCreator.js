import ForestActions from './ActionCreators/ForestActions'
import GrassActions from './ActionCreators/GrassActions'
import WaterActions from './ActionCreators/WaterActions'

/**
 * Description goes here
 */
export default class MenuOptionCreator {
  /**
   * Description goes here
   *
   * @param {object} param
   * @param {StructureType} structureTypes
   */
  constructor ({ structureTypes, player }) {
    this.tileOptions = new Map()
    this.tileOptions.set('forest', ForestActions)
    this.tileOptions.set('grass', GrassActions)
    this.tileOptions.set('water', WaterActions)
    this.structureTypes = structureTypes
    this.player = player
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   *
   * @return { ???[] }
   */
  getActions (tile) {
    if (tile.structure == null) {
      return this.tileTypeOptions(tile)
    }

    /* var options = this.structureOptions(tile.structure)
    options.concat(this.extraOptions(tile))

    return options */

    return []
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   *
   * @return { ??? }
   */
  tileTypeOptions (tile) {
    return this.tileOptions.get(tile.tileType.name)(tile, this.structureTypes, this.gameTimer, this.player)
  }
  /*
    structureOptions (structure) {
      return []
    }

    extraOptions (tile) {
      return []
    }
  */
}
