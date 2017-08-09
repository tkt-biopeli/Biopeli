import Map from './Map'
import PerlinGenerator from './PerlinGenerator'

export default class MapGenerator {
  constructor ({mapSize, tileSize, generatingSettings, 
      perlinNoise, noiseSettings, tileTypes}) {
    this.types = tileTypes

    this.width = mapSize.width
    this.height = mapSize.height

    this.tileSize = tileSize

    this.perlinGenerator = new PerlinGenerator({
      Noise: perlinNoise,
      noiseHeight: noiseSettings.noiseHeight,
      noiseWidth: noiseSettings.noiseWidth,
      freqs: noiseSettings.freqs
    })

    this.groundLimit = generatingSettings.groundLimit
    this.forestLimit = generatingSettings.forestLimit
  }

  /**
   * Generates the game map
   *
   * @param {number} seed - optional seed for map generation
   */
  generateMap (seed) {
    var map = new Map({
      width: this.width,
      height: this.height,
      tileSize: this.tileSize
    })

    var x, y
    for (x = 0; x < this.width; x++) {
      for (y = 0; y < this.height; y++) {
        var tileType = this.tileTypeAt(x, y)
        var moisture = this.moistureAt(x, y)
        var fertility = this.fertilityAt(x, y)

        map.addTileWithGridCoordinates(x, y, tileType, moisture, fertility)
      }
    }

    return map
  }

  /**
   * returns the tile type at the given coordinate
   * @param {number} x - tile x coordinate
   * @param {number} y - tile y coordinate
   * @return {TileType} - tile type
   */
  tileTypeAt (x, y) {
    var noises = this.perlinGenerator.noisesAt(x, y)

    if (noises.ground > this.groundLimit) {
      if (noises.forest > this.forestLimit) {
        return this.types.grass
      }

      return this.types.forest
    }

    return this.types.water
  }

  moistureAt (x, y) {
    var noise = this.perlinGenerator.noiseValueAt(x, y, 'ground')

    if (noise <= this.groundLimit) {
      return 100
    }

    var difference = 1 - this.groundLimit

    return 100 * (1 - (noise - this.groundLimit) / difference)
  }

  fertilityAt (x, y) {
    var noise = this.perlinGenerator.noiseValueAt(x, y, 'fertility')
    return 100 * (noise + 1) / 2
  }
}
