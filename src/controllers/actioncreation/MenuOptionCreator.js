import ButtonComponent from '../components/ButtonComponent'
import config from '../../config'

/**
 * The instance of this class creates button actions for the MenuView buttons.
 */
export default class MenuOptionCreator {
  /**
   * Player and StructureFactory are given to the constructor as parameters.
   *
   * @param {Player} param.player
   * @param {StructureFactory} param.structureFactory
   */
  constructor ({ player, structureFactory }) {
    this.player = player
    this.structureFactory = structureFactory
  }

  /**
   * The function returns an array of button actions if there are no structures
   * on the tile. Otherwise, it returns an empty array.
   *
   * @param {ModelTile} tile - the selected tile
   *
   * @return {ButtonAction[]} array of button actions or an empty array
   */
  getActions (tile) {
    if (tile.structure == null) {
      return this.buttonActionsForTile(tile)
    }

    return []
  }

  /**
   * The function first checks which structures can be build on the selected tile,
   * and then creates a button action for each of them.
   *
   * @param {ModelTile} tile - the selected tile
   *
   * @return {ButtonAction[]} array of button actions for the structure type
   */
  buttonActionsForTile (tile) {
    var allowedStructures = tile.tileType.allowedStructures

    return allowedStructures.map(
      structureType => new ButtonComponent({
        name: 'Build a ' + structureType.name,
        functionToCall: () => { this.structureFactory.buildBuilding(tile, structureType) },
        context: this.structureFactory,
        height: config.menuButtonHeight,
        width: config.menuButtonWidth
      }))
  }
}
