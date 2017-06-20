import Phaser from 'phaser'
import GameState from '../game/GameState'
import config from '../config'

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
  preload () { }

  /**
   * Description goes here
   */
  create () {
    // create before game state
    this.cursors = this.game.input.keyboard.createCursorKeys()

    this.gameState = new GameState({
      state: this,
      mapWidth: Math.ceil(this.game.width * config.madWidthMultiplier / config.tileWidth),
      mapHeight: Math.ceil(this.game.height * config.mapHeightMultiplier / config.tileHeight),
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
      menuWidth: config.menuWidth
    })
  }

  /**
   * Description goes here
   */
  render () {
    if (__DEV__) {
      // this.game.debug.cameraInfo(this.game.camera, 500, 32)
    }
  }

  /**
   * Updates the  gameState associated with this object
   */
  update () {
    this.gameState.update()
  }
}
