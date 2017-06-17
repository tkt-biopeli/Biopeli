
/**
 * Description goes here
 */
export default class Structure{

  /**
   * Description goes here
   * @param {*} param0 
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
