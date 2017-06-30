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
      return this.buttonActionsForTile(tile)
    }

    return []
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   *
   * @return { ??? }
   */
  buttonActionsForTile (tile) {
    var allowedStructures = tile.tileType.allowedStructures
    
    return allowedStructures.map(
      structureType => new ButtonAction({
        name: 'Build a ' + structureType.name,
        functionToCall: () => {this.structureFactory.buildBuilding(tile, structureType)},
        context: this.structureFactory
      }))
    
  }
}
