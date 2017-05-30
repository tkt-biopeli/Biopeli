import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('forest', 'assets/images/forest.png')
    this.load.image('water', 'assets/images/water.png')
    this.load.image('forest2', 'assets/images/forest2.png')
    this.load.image('water2', 'assets/images/water2.png')
    this.load.image('grass', 'assets/images/grass.png')
    this.load.image('farm', 'assets/images/farm.png')
  }

  create () {
    this.state.start('Game')
  }
}
