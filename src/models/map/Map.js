import ModelTile from './ModelTile'
import MapGen from './MapGen'

/**
 * Generates the map with given measurements for grid and tiles
 */
export default class MapGrid {
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

  /**
   * returns a hashmap containing lists of tiles with the distance n
   * @param {*} n the distance n
   * @param {*} tile the tile from wich radius is calculated
   */
  getTilesInRadius (n, tile) {
    var hashmap = new Map()
    var x = tile.x
    var y = tile.y
    // Init
    for (var i = 0; i <= n; i++) {
      hashmap.set(i, [])
    }

    // Calculate
    for (var j = y - n; j <= y + n; j++) {
      for (var i = x - n; i <= x + n; i++) {
        if (i <= this.gridSizeX && j <= this.gridSizeY && i >= 0 && j >= 0) {
        //  hashmap.get(this.getDistance(x, y, i, j)) += this.getTileWithGridCoordinates(i, j)
        }
      }
    }
    for (var [key, value] of hashmap) {
      console.log(key + ' = ' + value.x + ' ' + value.y + ' flow: ' + value.flowers);
    }
    return hashmap
  }

  /**
   * 
   * @param {*} x 
   * @param {*} y 
   * @param {*} i 
   * @param {*} j 
   */
  getDistance (x, y, i, j) {
    if (y == j) {
      return this.calculateIntoPositive(x, i)
    }
    if (x == i) {
      return this.calculateIntoPositive(y, j)
    }
    var distance = 0
    distance += this.calculateIntoPositive(x, i)
    distance += this.calculateIntoPositive(y, j)
    Math.round(distance / 2)

    return distance
  }

  /**
   * turns the difference in integers into positives
   * @param {*} a first int
   * @param {*} b second integer
   */
  calculateIntoPositive (a, b) {
    var number
    if (a > b) {
      number = a - b
    } else {
      number = b - a
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
