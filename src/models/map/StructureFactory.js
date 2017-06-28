import Structure from './Structure'

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
   * @param {StructureType} param.structureTypes
   * @param {GameTimer} param.gameTimer
   */
  constructor ({structureTypes, gameTimer, player }) {
    this.structureName = 'joku nimi'
    this.structureSize = 10
    this.structureTypes = structureTypes
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
      name: this.structureName,
      size: this.structureSize,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTime.year
    })
    this.player.addStructure(tile.structure)
  }
}
