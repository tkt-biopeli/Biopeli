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
  constructor ({ x, y, type, structure, moisture, fertility }) {
    this.x = x
    this.y = y
    this.tileType = type
    this.structure = structure

    this.flowers = type.flowers
    this.moisture = moisture
    this.fertility = fertility

    this.owner = null
  }

  getFlowers () {
    return this.setInLimits(this.flowers, 0, 10)
  }

  getFertility () {
    return this.setInLimits(this.fertility, 0, 100)
  }

  getMoisture () {
    return this.setInLimits(this.moisture, 0, 100)
  }

  setInLimits (value, min, max) {
    return value < min ? min : value > max ? max : value
  }

  equals (tile) {
    return this.x === tile.x && this.y === tile.y
  }
}
