import ModelTile from './ModelTile'
import MapGen from './MapGen'

/**
 * Generates the map with given measurements for grid and tiles
 */
export default class Map {
  /**
   * @param {object} param - Parameter object
   *
   * @param {number} param.gridSizeX
   * @param {number} param.gridSizeY
   * @param {number} param.tileWidth
   * @param {number} param.tileHeight
   */
  constructor ({ gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.grid = []
  }

  // to be added
  getTilesInRadius (n, tile) { }

  /**
   * @param {Number} gx
   * @param {Number} gy
   * @param {TileType} tileType
   */
  addTileWithGridCoordinates (gx, gy, tileType) {
    var tile = new ModelTile({ x: gx, y: gy, type: tileType, structure: null })
    this.grid[gy * this.gridSizeX + gx] = tile
    return tile
  }

  /**
   * @param {Number} px
   * @param {Number} py
   * @param {TileType} tileType
   */
  addTileWithPixelCoordinates (px, py, tileType) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    return this.addTileWithGridCoordinates(gx, gy, tileType)
  }

  /**
   * @param {Number} gx
   * @param {Number} gy
   *
   * @return {ModelTile}
   */
  getTileWithGridCoordinates (gx, gy) {
    return this.grid[gy * this.gridSizeX + gx]
  }

  /**
   * @param {Number} px
   * @param {Number} py
   *
   * @return {ModelTile}
   */
  getTileWithPixelCoordinates (px, py) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    return this.getTileWithGridCoordinates(gx, gy)
  }

  /**
   * @param {Number} gx
   * @param {Number} gy
   */
  removeTileWithGridCoordinates (gx, gy) {
    this.grid[gy * this.gridSizeX + gx] = undefined
  }

  /**
   * @param {Number} px
   * @param {Number} py
   */
  removeTileWithPixelCoordinates (px, py) {
    this.grid[this.pixelsToGridX(py) * this.gridSizeX + this.pixelsToGridX(px)] = undefined
  }

  /**
   * Generates the game map
   *
   * @param {number} seed - optional seed for map generation
   * @todo seed does not work
   */
  createMap (seed) {
    var mapgen = new MapGen({
      height: this.gridSizeY,
      width: this.gridSizeX,
      seed: seed
    })

    var x, y
    for (x = 0; x < this.gridSizeX; x++) {
      for (y = 0; y < this.gridSizeY; y++) {
        this.addTileWithGridCoordinates(x, y, mapgen.typeAt(x, y))
      }
    }
  }

  // Pixel-Grid-Pixel conversion helpers

  /**
   * @param {Number} x
   * @return {Number}
   */
  pixelsToGridX (x) {
    return Math.floor(x / this.tileWidth)
  }

  /**
   * @param {Number} y
   * @return {Number}
   */
  pixelsToGridY (y) {
    return Math.floor(y / this.tileHeight)
  }

  /**
   * @param {Number} x
   * @return {Number}
   */
  gridToPixelsX (x) {
    return x * this.tileWidth
  }

  /**
   * @param {Number} y
   * @return {Number}
   */
  gridToPixelsY (y) {
    return y * this.tileHeight
  }
}
