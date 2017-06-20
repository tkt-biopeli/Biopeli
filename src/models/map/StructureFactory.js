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
  constructor ({tile, structureTypes, gameTimer}) {
    this.tile = tile
    this.structureName = "joku nimi"
    this.structureSize = "joku koko"
    this.structureTypes = structureTypes
    this.gameTimer = gameTimer
  }

  /**
   * Description goes here
   */
  buildDairyFarm () {
    this.buildBuilding(this.structureTypes.dairyFarm)
  }

  buildBerryFarm () {
    this.buildBuilding(this.structureTypes.berryFarm)
  }

  /**
   * Description goes here
   */
  buildFarm () {
    this.buildBuilding(this.structureTypes.farm)
  }

  /**
   * Description goes here
   * 
   * @param {StructureType} structureType 
   */
  buildBuilding (structureType) {
    this.tile.structure = new Structure({
      tile: this.tile,
      name: this.structureName,
      size: this.structureSize,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTime.year()
    })
  }
}
