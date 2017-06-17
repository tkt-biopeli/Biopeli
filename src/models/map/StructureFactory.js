import Structure from './Structure'

/**
 * Description goes here
 */
export default class StructureFactory {

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor ({tile, structureTypes}) {
    this.tile = tile
    this.structureTypes = structureTypes
  }

  /**
   * Description goes here
   */
  buildGranary () {
    this.buildBuilding(this.structureTypes.granary)
  }

  /**
   * Description goes here
   */
  buildFarm () {
    this.buildBuilding(this.structureTypes.farm)
  }

  /**
   * Description goes here
   * @param {StructureType} structureType 
   */
  buildBuilding (structureType) {
    this.tile.structure = new Structure({
      tile: this.tile,
      structureType: structureType
    })
  }
}
