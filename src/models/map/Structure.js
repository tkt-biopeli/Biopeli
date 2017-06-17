
/**
 * Description goes here
 */
export default class Structure{

  /**
   * Description goes here
   * 
   * @param {object} param
   * 
   * @param {ModelTile} param.tile
   * @param {StructureType} param.structureType 
   */
  constructor ({tile, structureType}) {
    this.tile = tile
    this.structureType = structureType
  }

  /**
   * Description goes here
   */
  asset(){
    return this.structureType.asset
  }
}
