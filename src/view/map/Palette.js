import Rainbow from 'rainbowvis.js'

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
