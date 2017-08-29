import Palette from '../map/Palette'

export default class GraphicsLoader {
  constructor ({ game }) {
    this.game = game
    this.palette = new Palette()
  }

  /**
   * 
   * Generates and loads beach graphics to game cache
   * 
   * @memberof GraphicsLoader
   */
  loadBeaches () {
    let grass = this.game.make.sprite(0, 0, 'grass')
    for (var i = 0; i < 16; i++) {
      let bin = (i >>> 0).toString(2)
      let pad = '0000'
      bin = pad.substring(0, pad.length - bin.length) + bin
      let bmd = this.game.make.bitmapData(128, 128)      
      let mask = this.game.make.sprite(0, 0, bin)
      bmd.alphaMask(grass, mask)
      this.game.cache.addBitmapData('beach' + bin, bmd)            
    }    
  }

  /**
   * Generates and loads moisture and fertility graphics to game cache 
   * 
   * @memberof GraphicsLoader
   */
  loadMoistureAndFertility () {
    let moisture = this.game.make.graphics(0, 0)
    let fertility = this.game.make.graphics(0, 0)
    let x = 0
    let size = 48
    let padding = 4

    for (var i = 0; i <= 100; i++) {
      let moistCol = this.palette.getDampnessColour(i)
      moisture.beginFill(moistCol, 1)
      moisture.drawRoundedRect(x, 0, size, size, 10)
      moisture.endFill()

      let fertCol = this.palette.getFertilityColour(i)
      fertility.beginFill(fertCol, 1)
      fertility.drawRoundedRect(x, 0, size, size, 10)
      fertility.endFill()

      x += size + padding
    }

    let moistureTexture = moisture.generateTexture()
    let fertilityTexture = fertility.generateTexture()

    this.game.cache.addSpriteSheet('moisturesheet', null,
      moistureTexture.baseTexture.source, size, size, 101, 0, padding)
    this.game.cache.addSpriteSheet('fertilitysheet', null,
      fertilityTexture.baseTexture.source, size, size, 101, 0, padding)

    moisture.destroy()
    fertility.destroy()
    moistureTexture.destroy()
    fertilityTexture.destroy()
  }
}
