import { Noise } from 'noisejs'
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
  init (cityName) {
    this.cityName = cityName
  }

  /**
   * Description goes here
   */
  create () {
    // create before game state
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.flowersKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    var cityName = this.cityName
    this.cityName = undefined

    this.gameState = new GameState({
      cityName: cityName,
      perlinNoise: Noise,
      startMoney: config.playerInitialCash,
      state: this,
      mapSize: config.mapSize,
      tileSize: config.tileSize,
      menuWidth: config.menuWidth,
      gameLength: config.gameLength
    })
  }

  /**
   * Updates the  gameState associated with this object
   */
  update () {
    this.gameState.update()
  }
}
