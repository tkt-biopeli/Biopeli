import Structure from './Structure'
import StructureTypes from './StructureType'
import StructureProduction from './StructureProduction'

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
  constructor ({gameTimer, player}) {
    this.gameTimer = gameTimer
    this.player = player
  }
  
  /**
   * Builds an structure on the tile defined in the constructor
   *
   * @param {ModelTile} tile
   * @param {StructureType} structureType
   */
  buildBuilding (tile, structureType) {
    tile.structure = new Structure({
      tile: tile,
      name: 'joku nimi',
      size: 10,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTime.year,
      produceFn: this.createProductionFn(structureType)
    })
    this.player.addStructure(tile.structure)
  }
  
  createProductionFn (structureType) {
    var productionFn = StructureProduction.createProductionFn()
    return productionFn
  }
}
