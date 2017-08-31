import Rainbow from 'rainbowvis.js'

/**
 * Generates palettes of 100 different hues to be used in different visuals in the game
 * setSpectrum is used to choose base colours the "rainbow of 100 hues" is based on
 * 
 * @export
 * @class Palette
 */
export default class Palette {
  constructor () {
    this.dampnessRainbow = new Rainbow()
    this.dampnessRainbow.setSpectrum('sienna', 'sandybrown', 'aqua') 
    this.fertilityRainbow = new Rainbow()
    this.fertilityRainbow.setSpectrum('crimson', 'gold', 'limegreen', 'darkgreen')
    this.randomRainbow = new Rainbow()
  }

  getDampnessColour (moisture) {
    return '0x' + this.dampnessRainbow.colourAt(moisture)
  }

  getFertilityColour (fertility) {
    return '0x' + this.fertilityRainbow.colourAt(fertility)
  }

  getBorderColour (borderColour) {
    return '0x' + this.randomRainbow.colourAt(borderColour)
  }
}
