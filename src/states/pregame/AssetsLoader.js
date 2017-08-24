import Phaser from 'phaser'
import utils from '../../utils'
import GraphicsLoader from '../../view/json/GraphicsLoader'

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
    this.graphicsLoader = new GraphicsLoader({game: this})
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
    // this.JSONLoader.loadBeaches()
    this.graphicsLoader.loadBeaches()
    this.graphicsLoader.loadMoistureAndFertility()
    this.state.start('Start', true, false, this.JSONLoader.gameData())
  }
}
