
/**
 * Description goes here
 */
export default class {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {number} param.x
   * @param {number} param.y
   * @param {TileType} param.type
   * @param {Structure} param.structure
   */
  constructor ({x, y, type, structure}) {
    this.x = x
    this.y = y
    this.tileType = type
    this.structure = structure
    this.potential = 10
  }

  /**
   * Generates the constant produce 
   * @see Structure
   * 
   * @return {number} - The number of turnips produced
   */
  produce () {
    return this.structure.produce()
  }  

  /**
   * Generates the seasonal produce 
   * @see Structure
   * 
   * @return {number} - The number of turnips produced
   */
  produceSeason () {
    return this.structure.produceSeason()
  }
}
