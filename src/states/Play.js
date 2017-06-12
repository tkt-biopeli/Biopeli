import Phaser from 'phaser'
import GameState from '../game/GameState'
import config from '../config'

export default class extends Phaser.State {
  init () { }
  preload () { }

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

  render () {
  }

  update () {
    this.gameState.update()
  }
}
