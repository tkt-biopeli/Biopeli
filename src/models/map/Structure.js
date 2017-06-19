
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
    if(structureType.createUpdateFn == undefined){
      this.updateFn = function(){}
    }else{
      this.updateFn = structureType.createUpdateFn()
    }
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
    this.updateFn()
  }
}
