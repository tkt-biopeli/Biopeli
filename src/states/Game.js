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
    const bannerText = 'Biopeli 2.0'
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
    var forestTile = new ModelTile({
      x: 100,
      y: 200,
      type: tileTypes.forest
    })

    var waterTile = new ModelTile({
      x: 300,
      y: 300,
      type: tileTypes.water
    })

    this.viewForestTile = new ViewTile({
      game: this,
      x: 100,
      y: 200,
      modelTile: forestTile
    })

    this.viewWaterTile = new ViewTile({
      game: this,
      x: 300,
      y: 300,
      modelTile: waterTile
    })

    this.game.add.existing(this.mushroom)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
