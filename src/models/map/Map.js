import ModelTile from './ModelTile'
import TileType from './TileType'
import Structure from './Structure'

/**
 * Description goes here
 */
export default class Map {

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor ({ gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.grid = []
    this.selectedTile = undefined
  }

  /**
   * Description goes here
   * @param {Number} gx 
   * @param {Number} gy 
   * @param {*} tileType 
   */
  addTileWithGridCoordinates (gx, gy, tileType) {
    var tile = new ModelTile({x: gx, y: gy, type: tileType, structure: null})
    this.grid[gy * this.gridSizeX + gx] = tile
  }

  /**
   * Description goes here
   * @param {Number} px 
   * @param {Number} py 
   * @param {*} tileType 
   */
  addTileWithPixelCoordinates (px, py, tileType) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    this.addTileWithGridCoordinates(gx, gy, tileType)
  }

  /**
   * Description goes here
   * @param {Number} gx 
   * @param {Number} gy 
   * @return {Tile}
   */
  getTileWithGridCoordinates (gx, gy) {
    return this.grid[gy * this.gridSizeX + gx]
  }

  /**
   * Description goes here
   * @param {Number} px 
   * @param {Number} py 
   */
  getTileWithPixelCoordinates (px, py) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    return this.getTileWithGridCoordinates(gx, gy)
  }

  /**
   * Description goes here
   * @param {Number} gx 
   * @param {Number} gy 
   */
  removeTileWithGridCoordinates (gx, gy) {
    this.grid[gy * this.gridSizeX + gx] = undefined
  }

  /**
   * Description goes here
   * @param {Number} px 
   * @param {Number} py 
   */
  removeTileWithPixelCoordinates (px, py) {
    this.grid[this.pixelsToGridX(py) * this.gridSizeX + this.pixelsToGridX(px)] = undefined
  }

  /**
   * TEST DATA
   */
  createMapHalfForestHalfWater () {
    var limit = 0.2
    var tileTypes = TileType.call()
    var r = Math.random()

    for (var i = 0; i < this.gridSizeY; i++) {
      if (i % 2 === 0) {
        for (var j = 0; j < this.gridSizeX; j++) {
          if (r > limit) {
            this.addTileWithGridCoordinates(j, i, tileTypes.grass)
          } else {
            this.addTileWithGridCoordinates(j, i, tileTypes.grass)
          }
        }
      } else {
        for (var k = 0; k < this.gridSizeX; k++) {
          r = Math.random()
          if (r > limit) {
            this.addTileWithGridCoordinates(k, i, tileTypes.grass)
          } else {
            if (r > 0.08) {
              this.addTileWithGridCoordinates(k, i, tileTypes.forest)
            } else {
              this.addTileWithGridCoordinates(k, i, tileTypes.water)
            }
          }
          // last tile check
          if (i === (this.gridSizeY - 1) && k === (this.gridSizeX - 1)) {
            this.removeTileWithGridCoordinates(k, i)
          }
        }
      }
    }
  }

  // Pixel-Grid-Pixel conversion helpers

  /**
   * Description goes here
   * @param {Number} x 
   * @return {Number}
   */
  pixelsToGridX (x) {
    return Math.floor(x / this.tileWidth)
  }

  /**
   * Description goes here
   * @param {Number} y 
   * @return {Number}
   */
  pixelsToGridY (y) {
    return Math.floor(y / this.tileHeight)
  }

  /**
   * Description goes here
   * @param {Number} x 
   * @return {Number}
   */
  gridToPixelsX (x) {
    return x * this.tileWidth
  }

  /**
   * Description goes here
   * @param {Number} y 
   * @return {Number}
   */
  gridToPixelsY (y) {
    return y * this.tileHeight
  }
}
