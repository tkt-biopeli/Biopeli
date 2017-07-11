import ModelTile from './ModelTile'
import StaticTypes from '../StaticTypes'
import {Noise} from 'noisejs'

/**
 * Description goes here
 */
export default class Map {
  /**
   * Description goes here
   *
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
   * Description goes here
   *
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
   * Description goes here
   *
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
   * Description goes here
   *
   * @param {Number} gx
   * @param {Number} gy
   *
   * @return {ModelTile}
   */
  getTileWithGridCoordinates (gx, gy) {
    return this.grid[gy * this.gridSizeX + gx]
  }

  /**
   * Description goes here
   *
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
   * Description goes here
   *
   * @param {Number} gx
   * @param {Number} gy
   */
  removeTileWithGridCoordinates (gx, gy) {
    this.grid[gy * this.gridSizeX + gx] = undefined
  }

  /**
   * Description goes here
   *
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
        this.addTileWithGridCoordinates(x, y, mapgen.typeAt(x,y))
      }
    }
  }

  // Pixel-Grid-Pixel conversion helpers

  /**
   * Description goes here
   *
   * @param {Number} x
   * @return {Number}
   */
  pixelsToGridX (x) {
    return Math.floor(x / this.tileWidth)
  }

  /**
   * Description goes here
   *
   * @param {Number} y
   * @return {Number}
   */
  pixelsToGridY (y) {
    return Math.floor(y / this.tileHeight)
  }

  /**
   * Description goes here
   *
   * @param {Number} x
   * @return {Number}
   */
  gridToPixelsX (x) {
    return x * this.tileWidth
  }

  /**
   * Description goes here
   *
   * @param {Number} y
   * @return {Number}
   */
  gridToPixelsY (y) {
    return y * this.tileHeight
  }
}



/**
 * Maps coordinates to tile types 
 */
class MapGen {

  /**
   * 
   * @param {object} param
   * @param {number} param.height - map height
   * @param {number} param.width - map width 
   * @param {number} param.seed - seed for forest generation, optional
   */
  constructor ({height, width, seed}) {
    var fseed, gseed
    if(seed){
      var str = seed + ''
      var mid = str.length / 2

      fseed = str.substring(0, mid)
      gseed = str.substr(mid, str.length)
    }else{
      fseed = Math.random()
      gseed = Math.random()
    }
    this.types = StaticTypes.tileTypes
    this.forestnoise = new Noise(fseed)
    this.groundnoise = new Noise(gseed)
    this.height = height
    this.width = width
  }

  /**
   * returns the tile type at the given coordinate
   * 
   * @param {number} x - tile x coordinate
   * @param {number} y - tile y coordinate 
   * 
   * @return {TileType} - tile type
   */
  typeAt (x, y) { 
    var nx = x / this.width - 0.5, 
        ny = y / this.height - 0.5

    var gfreq = 5, ffreq = 7

    if(this.groundnoise.perlin2(gfreq * nx, gfreq * ny) > -0.2){
      if(this.forestnoise.perlin2(ffreq * nx, ffreq * ny) > -0.1)
        return this.types.grass
      else 
        return this.types.forest
    }else{
      return this.types.water
    }
  }
}
