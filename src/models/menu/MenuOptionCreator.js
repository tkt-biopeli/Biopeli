import ForestActions from './ActionCreators/ForestActions'
import GrassActions from './ActionCreators/GrassActions'
import WaterActions from './ActionCreators/WaterActions'
import StaticTypes from '../StaticTypes'
import ButtonAction from './ButtonAction'

/**
 * Description goes here
 */
export default class MenuOptionCreator {
  /**
   * Description goes here
   *
   * @param {object} param
   * @param {Player} player
   */
  constructor ({ player, structureFactory }) {
//    this.tileOptions = new Map()
//    this.tileOptions.set('forest', ForestActions)
//    this.tileOptions.set('grass', GrassActions)
//    this.tileOptions.set('water', WaterActions)
    this.player = player
    this.structureFactory = structureFactory
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
    var allowedStructures = tile.tileType.allowedStructures
    
    return allowedStructures.map(
      structureType => new ButtonAction({
        name: 'Build a ' + structureType.name,
        functionToCall: this.structureFactory.buildBuilding(tile, structureType),
        context: this.structureFactory
      }))
    
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
