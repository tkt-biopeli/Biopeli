import TextComponent from '../../../src/controllers/components/TextComponent'
/**
* This is a model of a tile on the map
*/
export default class {
  /**
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
}
