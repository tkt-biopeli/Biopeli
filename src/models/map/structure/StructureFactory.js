import Structure from './Structure'
import StructureProduction from './StructureProduction'
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
   *
   * @param {ModelTile} param.tile
   * @param {GameTimer} param.gameTimer
   */
  constructor ({ gameTimer, player }) {
    this.gameTimer = gameTimer
    this.player = player
    this.namer = new StructureNameGenerator({
      frontAdjectives: StructureNameParts[0],
      names: StructureNameParts[1],
      endAdjectives: StructureNameParts[2]
    })
  }

  /**
   * Builds a structure on the tile defined in the constructor
   *
   * @param {ModelTile} tile
   * @param {StructureType} structureType
   */
  buildBuilding (tile, structureType) {
    tile.structure = new Structure({
      tile: tile,
      owner: this.namer.createOwnerName(),
      name: this.namer.createBuildingName(structureType.name),
      size: 10,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTime.year,
      produceFn: this.createProductionFn(structureType)
    })
    this.player.addStructure(tile.structure)
  }

  createProductionFn (structureType) {
    var productionFn = StructureProduction.createProductionFn(structureType)
    return productionFn
  }
}
