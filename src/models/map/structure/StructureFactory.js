import Structure from './Structure'
import ProducerFactory from './producers/ProducerFactory'
import StructureNameGenerator from '../../namegeneration/StructureNameGenerator'
import StructureNameParts from '../../namegeneration/StructureNameParts'
import utils from '../../../utils'

/**
 * Creates a structure for the player
 */
export default class StructureFactory {

  /**
   * @param {GameTimer} gameTimer
   * @param {Player} player
   */
  constructor ({ gameTimer, player }) {
    this.gameTimer = gameTimer
    this.player = player
    this.namer = new StructureNameGenerator({
      frontAdjectives: StructureNameParts[0],
      names: StructureNameParts[1],
      endAdjectives: StructureNameParts[2],
      hyperboles: StructureNameParts[3],
      random: utils.randomNoBounds,
      randomWithBounds: utils.randomWithBounds
    })
  }

  /**
   * Builds a structure on the tile given as a parameter
   *
   * @param {ModelTile} tile
   * @param {StructureType} structureType
   */
  buildBuilding (tile, structureType) {
    if (!this.checkMoney(structureType)) return

    tile.structure = new Structure({
      tile: tile,
      owner: this.namer.createOwnerName(),
      name: this.namer.createBuildingName(structureType.name),
      size: 10,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTimeEvent.year,
      producer: this.createProducer(structureType, tile),
      cost: structureType.cost
    })
    this.player.addStructure(tile.structure)
  }

  /**
   * Checks if the player has enough money for a given type of structure 
   * decreases players cash if true
   * 
   * @param {StructureType} structureType 
   */
  checkMoney (structureType) {
    if (!this.player.enoughCashFor(structureType.cost)) {
      return false
    }
    this.player.cash -= structureType.cost
    return true
  }
  /**
   * @param {StructureType} structureType 
   * @param {?} tile 
   */
  createProducer (structureType, tile) {
    return ProducerFactory.createProducer(structureType, tile)
  }
}
