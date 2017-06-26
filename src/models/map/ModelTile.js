
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
   * Calls the update function associated with the structure if one exists
   */
  update () {
    if (this.structure !== undefined) {
      this.structure.update()
    }
  }
}
