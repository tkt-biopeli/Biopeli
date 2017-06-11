import Phaser from 'phaser'
import GameState from '../game/GameState'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.gameState = new GameState({
      state: this,
      mapWidth: Math.ceil(this.game.width * 4 / 128),
      mapHeight: Math.ceil(this.game.height * 4 / 128),
      tileWidth: 128,
      tileHeight: 128
    })

    this.cursors = this.game.input.keyboard.createCursorKeys()
  }

  render () {
//    if (__DEV__) {
//      this.game.debug.cameraInfo(this.game.camera, 500, 32)
//    }
  }

  update () {
    this.gameState.update()
  }
}
