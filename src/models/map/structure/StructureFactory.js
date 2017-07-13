import Structure from './Structure'
import ProducerFactory from './producers/ProducerFactory'
import StructureNameGenerator from '../../namegeneration/StructureNameGenerator'
import StructureNameParts from '../../namegeneration/StructureNameParts'

/**
 * Description goes here
 */
export default class StructureFactory {
  /**
   * Description goes here
   *
   * @param {object} param
   * @param {GameTimer} param.gameTimer
   */
  constructor ({ gameTimer, player }) {
    this.gameTimer = gameTimer
    this.player = player
    this.namer = new StructureNameGenerator({
      frontAdjectives: StructureNameParts[0],
      names: StructureNameParts[1],
      endAdjectives: StructureNameParts[2],
      hyperboles: StructureNameParts[3]
    })
  }

  /**
   * Builds a structure on the tile defined in the constructor
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

  checkMoney (structureType) {
    if (!this.player.enoughCashFor(structureType.cost)) {
      return false
    }
    this.player.cash -= structureType.cost
    return true
  }

  createProducer (structureType, tile) {
    return ProducerFactory.createProducer(structureType, tile)
  }
}
