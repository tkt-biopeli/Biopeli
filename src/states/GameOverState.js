import Phaser from 'phaser'
import GameOverGameState from '../game/GameOverGameState'
import config from '../config'
import { centerGameObjects } from '../utils'

/**
 * Description goes here
 */
export default class extends Phaser.State {
  /**
   * Description goes here
   */
  init () { 
  }

  /**
   * Description goes here
   */
  preload () { 

    this.gameOverImg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameover')
    centerGameObjects([this.gameOverImg])
  }

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
  }
}
