import Phaser from 'phaser'
import utils from '../../utils'
import JSONLoader from '../../view/json/JSONLoader'

/**
 * Description goes here
 */
export default class extends Phaser.State {
  /**
   * Description goes here
   */
  init () { }

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

    this.jsonloader = new JSONLoader({game: this})
    this.jsonloader.loadJSONObjects()
  }

  /**
   * Description goes here
   */
  create () {
    this.jsonloader.initJSONObjects()
    this.state.start('AssetsLoader', true, false, this.jsonloader)
  }
}
