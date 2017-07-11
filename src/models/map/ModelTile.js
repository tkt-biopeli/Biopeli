/**
* Description goes here
*/
export default class {
  /**
  * Description goes here
  * @param {object} param
  * @param {number} param.x
  * @param {number} param.y
  * @param {TileType} param.type
  * @param {Structure} param.structure
  */
  constructor ({ x, y, type, structure }) {
    this.x = x
    this.y = y
    this.tileType = type
    this.structure = structure
    this.flowers = type.flowers
  }

  getRadius(n) {
    var tiles = []
    }
  
}
