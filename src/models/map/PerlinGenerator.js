/**
 * Maps coordinates to tile types
 */
export default class PerlinGenerator {
  /**
   * @param {object} param
   * @param {} param.Noise
   * @param {number} param.noiseHeight
   * @param {number} param.noiseWidth
   */
  constructor ({ Noise, noiseHeight, noiseWidth, freqs }) {
    this.fertilitynoise = new Noise(Math.random())
    this.forestnoise = new Noise(Math.random())
    this.groundnoise = new Noise(Math.random())

    this.height = noiseHeight
    this.width = noiseWidth

    this.groundfreq = freqs.groundfreq
    this.forestfreq = freqs.forestfreq
    this.fertilityfreq = freqs.fertilityfreq
  }

  /**
   * Calculates the noises at the given coordinate
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @return {{ground: number, forest: number, fertility: number}}
   */
  noisesAt (x, y) {
    var c = this.coordinateChange(x, y)

    return {
      ground: this.groundnoise.perlin2(
        this.groundfreq * c.x, this.groundfreq * c.y
      ),
      forest: this.forestnoise.perlin2(
        this.forestfreq * c.x, this.forestfreq * c.y
      ),
      fertility: this.fertilitynoise.perlin2(
        this.fertilityfreq * c.x, this.fertilityfreq * c.y
      )
    }
  }

  /**
   * Calculates a specific noise at the given coordinate
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @param {string} noiseName - type of noise, for example ground
   * @return {number}
   */
  noiseValueAt (x, y, noiseName) {
    var c = this.coordinateChange(x, y)

    var noise = this[noiseName + 'noise']
    var freq = this[noiseName + 'freq']
    return noise.perlin2(freq * c.x, freq * c.y)
  }

  /**
   * @param {number} x - x coordinate
   * @param {number} y - y coordinate
   * @return {{x: number, y: number}}
   */
  coordinateChange (x, y) {
    return {x: x / this.width - 0.5, y: y / this.height - 0.5}
  }
}
