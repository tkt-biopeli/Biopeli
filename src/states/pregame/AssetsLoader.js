import Phaser from 'phaser'
import utils from '../../utils'

/**
 * Description goes here
 */
export default class extends Phaser.State {
  /**
   * Description goes here
   */
  init (JSONLoader) { 
    this.JSONLoader = JSONLoader
    JSONLoader.game = this
  }

  /**
   * Description goes here
   */
  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'loaderBg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'loaderBar'
    )
    utils.centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    this.JSONLoader.loadAssets()
  }

  /**
   * Description goes here
   */
  create () {
    this.state.start('Start', true, false, this.JSONLoader.gameData())
  }
}
