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
  constructor({ gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.grid = []
  }

  /**
   * returns a hashmap containing lists of tiles with the distance n
   * @param {*} n the distance n
   * @param {*} tile the tile from wich radius is calculated
   */
  getTilesInRadius (n, tile) {
    var hashmap = {}
    var x = tile.x
    var y = tile.y
    for (var j = y - n; j < y + n; j++) {
      for (var i = x - n; i < x + n; i++) {
        if (i >= this.gridSizeX && j >= this.gridSizeY) {
          hashmap[getDistance(n, i, j)] = (this.getTileWithGridCoordinates(i, j))
        }
      }
    }
    return hashmap
  }

  /**
   * calculates the distance of x and y from n
   * @param {*} n integer n
   * @param {*} x integer x
   * @param {*} y integer y
   */
  getDistance (n, x, y) {
    var distance = 0
    if (y == n) {
      return x
    }
    if (x == n) {
      return y
    }
    distance += calculateIntoPositive(n, x)
    distance += calculateIntoPositive(n, y)
    Math.round(distance / 2)
    return distance
  }

  /**
   * turns the difference in integers into positives
   * @param {*} n integer n
   * @param {*} z second integer
   */
  calculateIntoPositive (n, z) {
    var number
    if (x > z) {
      number += x - z
    } else {
      number += z - x
    }
    return number
  }

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
