import ModelTile from './ModelTile'
import MapGen from './MapGen'

/**
 * Generates the map with given measurements for grid and tiles
 */
export default class MapGrid {
  /**
   * @param {number} param.gridSizeX
   * @param {number} param.gridSizeY
   * @param {number} param.tileWidth
   * @param {number} param.tileHeight
   */
  constructor ({ gridSizeX, gridSizeY, tileWidth, tileHeight, perlinNoise }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.grid = []
    this.perlinNoise = perlinNoise
  }

  /**
   * returns a hashmap containing lists of tiles with the distance n
   * @param {*} n the distance n
   * @param {*} tile the tile from wich radius is calculated
   */
  getTilesInRadius (n, tile) {
    let bounds = this.boundsForRadius(tile.x, tile.y, n)
    let tiles = new Map()
    for (var i = 0; i <= n; i++) {
      tiles.set(i, [])
    }

    for (var x = bounds.sx; x <= bounds.ex; x++) {
      for (var y = bounds.sy; y <= bounds.ey; y++) {
        let dx = Math.abs(x - tile.x)
        let dy = Math.abs(y - tile.y)
        let distance = this.radiusFunction(dx, dy)
        if (distance <= n) {
          let distArray = tiles.get(distance)
          distArray.push(this.getTileWithGridCoordinates(x, y))
        }
      }
    }
    return tiles
  }

  boundsForRadius (tx, ty, n) {
    let start = this.ensureCoordsInGrid(tx - n, ty - n)
    let end = this.ensureCoordsInGrid(tx + n, ty + n)
    return {
      sx: start.x,
      sy: start.y,
      ex: end.x,
      ey: end.y
    }
  }

  ensureCoordsInGrid (x, y) {
    x = x >= 0 ? x : 0
    x = x <= this.gridSizeX - 1 ? x : this.gridSizeX - 1
    y = y >= 0 ? y : 0
    y = y <= this.gridSizeY - 1 ? y : this.gridSizeY - 1
    return { x, y }
  }

  radiusFunction (hori, veri) {
    // hypotenuse
    return Math.floor(Math.sqrt(Math.pow(hori, 2) + Math.pow(veri, 2)))
  }

  /**
   * @param {Number} gx
   * @param {Number} gy
   * @param {TileType} tileType
   */
  addTileWithGridCoordinates (gx, gy, tileType, moisture, fertility) {
    var tile = new ModelTile({
      x: gx,
      y: gy,
      type: tileType,
      structure: null,
      moisture: moisture,
      fertility: fertility
    })
    this.grid[gy * this.gridSizeX + gx] = tile
    return tile
  }

  /**
   * @param {Number} px
   * @param {Number} py
   * @param {TileType} tileType
   */
  addTileWithPixelCoordinates (px, py, tileType, moisture, fertility) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    return this.addTileWithGridCoordinates(gx, gy, tileType, moisture, fertility)
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
    this.mapgen = new MapGen({
      seed: seed,
      Noise: this.perlinNoise
    })
    
    // generoitava luonnin yhteydessä moisture ja fertility
    var x, y
    for (x = 0; x < this.gridSizeX; x++) {
      for (y = 0; y < this.gridSizeY; y++) {
        var tileType = this.mapgen.tileTypeAt(x, y)
        var moisture = this.mapgen.moistureAt(x, y)
        var fertility = this.mapgen.fertilityAt(x, y)
        console.log(fertility)
        this.addTileWithGridCoordinates(x, y, tileType, moisture, fertility)
      }
    }
  }

  /**
   * Pixel-Grid-Pixel conversion helpers
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
