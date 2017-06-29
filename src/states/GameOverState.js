import Phaser from 'phaser'
import GameOverGameState from '../game/GameOverGameState'
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

    this.gameState = new GameOverGameState({
      state: this
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
    console.log('game oer')
  }
}
