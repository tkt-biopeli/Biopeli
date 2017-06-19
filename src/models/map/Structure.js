
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
  constructor ({tile, name, size, structureType}) {
    this.tile = tile
    this.name = name
    this.size = size
    this.structureType = structureType
  }

  /**
   * Description goes here
   */
  asset(){
    return this.structureType.asset
  }
}
