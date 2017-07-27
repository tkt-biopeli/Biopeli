/**
 * Maps coordinates to tile types
 */
export default class PerlinGenerator {
  /**
   * @param {object} param
   * @param {number} param.height - map height
   * @param {number} param.width - map width
   * @param {number} param.seed - seed for forest generation, optional
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

  noisesAt (x, y) {
    var nx = x / this.width - 0.5
    var ny = y / this.height - 0.5

    return {
      ground: this.groundnoise.perlin2(this.groundfreq * nx, this.groundfreq * ny),
      forest: this.forestnoise.perlin2(this.forestfreq * nx, this.forestfreq * ny),
      fertility: this.fertilitynoise.perlin2(this.fertilityfreq * nx, this.fertilityfreq * ny)
    }
  }

  noiseValueAt (x, y, noiseName) {
    var nx = x / this.width - 0.5
    var ny = y / this.height - 0.5

    var noise = this[noiseName + 'noise']
    var freq = this[noiseName + 'freq']
    return noise.perlin2(freq * nx, freq * ny)
  }
}
