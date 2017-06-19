
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
    this.updateFn = structureType.createUpdateFn()
  }

  /**
   * Description goes here
   */
  asset(){
    return this.structureType.asset
  }

  /**
   * Calls the update function of the structure type
   * @see StructureType.updateFn
   */
  update(){
    if(this.updateFn != undefined)
      this.updateFn()
  }
}
