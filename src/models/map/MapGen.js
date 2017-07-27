import StaticTypes from '../StaticTypes'
import config from '../../config'

/**
 * Maps coordinates to tile types
 */
export default class MapGen {
  /**
   * @param {object} param
   * @param {number} param.height - map height
   * @param {number} param.width - map width
   * @param {number} param.seed - seed for forest generation, optional
   */
  constructor ({ seed, Noise }) {
    var fseed, gseed, ferseed
    if (seed) {
      var str = seed + ''
      var mid = str.length / 2

      fseed = str.substring(0, mid)
      gseed = str.substr(mid, str.length)
    } else {
      fseed = Math.random()
      gseed = Math.random()
    }
    ferseed = Math.random()

    this.types = StaticTypes.tileTypes

    this.fertilitynoise = new Noise(ferseed)
    this.forestnoise = new Noise(fseed)
    this.groundnoise = new Noise(gseed)

    this.height = config.noiseHeight
    this.width = config.noiseWidth
    this.qfreq = config.gfreq
    this.ffreq = config.ffreq
    this.fefreq = config.ferrreq

    this.groundLimit = -0.2
    this.forestLimit = -0.1
  }

  /**
   * returns the tile type at the given coordinate
   * @param {number} x - tile x coordinate
   * @param {number} y - tile y coordinate
   * @return {TileType} - tile type
   */
  tileTypeAt (x, y) {
    var noises = this.noisesAt(x, y)
    if (noises.ground > this.groundLimit) {
      if (noises.forest > this.forestLimit) {
        return this.types.grass
      }

      return this.types.forest
    }

    return this.types.water
  }

  moistureAt (x, y) {
    var noise = this.noiseValueAt(x, y, this.groundnoise, this.gfreq)

    if(noise <= this.groundLimit) {
      return 1
    }

    var difference = 1 - this.groundLimit

    console.log((noise - this.groundLimit) / difference)
    return (noise - this.groundLimit) / difference
  }

  fertilityAt (x, y) {
    var noise = this.noiseValueAt(x, y, this.fertilitynoise, this.ferfreq)

    return (noise + 1) / 2
  }

  noisesAt (x, y) {
    var nx = x / this.width - 0.5
    var ny = y / this.height - 0.5

    return {
      ground: this.groundnoise.perlin2(this.gfreq * nx, this.gfreq * ny),
      forest: this.forestnoise.perlin2(this.ffreq * nx, this.ffreq * ny)
    }
  }

  noiseValueAt (x, y, noise, freq) {
    var nx = x / this.width - 0.5
    var ny = y / this.height - 0.5

    return noise.perlin2(freq * nx, freq * ny)
  }
}
