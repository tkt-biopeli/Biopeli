import {Noise} from 'noisejs'
import StaticTypes from '../StaticTypes'

/**
 * Maps coordinates to tile types 
 */
export default class MapGen {

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
