/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import ModelTile from '../models/ModelTile'
import TileType from '../models/TileType'
import ViewTile from '../sprites/ViewTile'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

      var tileTypes = TileType.call()
      var mT = new ModelTile({
        x: 100,
        y: 200,
        type: tileTypes.forest
      })
      
      this.viewTile = new ViewTile( {
        game: this,
        x: 100,
        y: 100,
        modelTile: mT
      })

    this.game.add.existing(this.mushroom)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
