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

    var cityName = this.cityName
    this.cityName = undefined

    this.gameState = new GameState({
      cityName: cityName,
      perlinNoise: Noise,
      startMoney: config.playerInitialCash,
      state: this,
      mapWidth: Math.ceil(this.game.width * config.madWidthMultiplier / config.tileWidth),
      mapHeight: Math.ceil(this.game.height * config.mapHeightMultiplier / config.tileHeight),
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
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
