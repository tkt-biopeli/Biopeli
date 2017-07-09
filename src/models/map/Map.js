import ModelTile from './ModelTile'
import StaticTypes from '../StaticTypes'
import {Noise} from 'noisejs'
//var Noise = require('noisejs')

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
   * TEST DATA
   */
  createMapHalfForestHalfWater () {
    var limit = 0.2
    var tileTypes = StaticTypes.tileTypes
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
        }
      }
    }
  }

  isGround (noise) {
    if (noise >  0.85) return false
    if (noise < -0.85) return false
    if (noise <  0.05 && 
        noise > -0.05) return false
    return true
  }

  isForest (noise) {
    return noise > 0.3 
  }

  createMapPerlin () {
    var tileTypes = StaticTypes.tileTypes,
        noiseForest = new Noise(Math.random()), 
        noiseGround = new Noise(Math.random())

    var x, y, type
    for (x = 0; x < this.gridSizeX; x++) {
      for (y = 0; y < this.gridSizeY; y++) {
        var nx = x / this.gridSizeX - 0.5
        var ny = y / this.gridSizeY - 0.5

        if(this.isGround(noiseGround.perlin2(nx,ny))){
          type = this.isForest(noiseForest.perlin2(nx,ny)) > 0 ? tileTypes.forest:tileTypes.grass
        }else
          type = tileTypes.water

        this.addTileWithGridCoordinates(x,y,type)
      }
    }
  }

  // Pixel-Grid-Pixel conversion helpers

  /**
   * Description goes here
   *
   * @param {Number} x
   *
   * @return {Number}
   */
  pixelsToGridX (x) {
    return Math.floor(x / this.tileWidth)
  }

  /**
   * Description goes here
   *
   * @param {Number} y
   *
   * @return {Number}
   */
  pixelsToGridY (y) {
    return Math.floor(y / this.tileHeight)
  }

  /**
   * Description goes here
   *
   * @param {Number} x
   *
   * @return {Number}
   */
  gridToPixelsX (x) {
    return x * this.tileWidth
  }

  /**
   * Description goes here
   *
   * @param {Number} y
   *
   * @return {Number}
   */
  gridToPixelsY (y) {
    return y * this.tileHeight
  }
}
