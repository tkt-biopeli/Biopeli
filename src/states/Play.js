import { Noise } from 'noisejs'
import Phaser from 'phaser'
import GameState from '../game/GameState'

/**
 * Description goes here
 */
export default class extends Phaser.State {
  /**
   * Description goes here
   */
  init (cityName, gameData) {
    this.cityName = cityName
    this.gameData = gameData
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

    var config = this.gameData.config

    this.gameState = new GameState({
      cityName: cityName,
      perlinNoise: Noise,
      startMoney: config.gameplaySettings.player.initialCash,
      state: this,
      mapSize: config.mapSettings.mapSize,
      tileSize: config.mapSettings.tileSize,
      menuWidth: config.sideMenuSettings.menuWidth,
      gameLength: config.gameplaySettings.time.gameLength,
      config: this.gameData.config,
      tileTypes: this.gameData.tileTypes,
      structureTypes: this.gameData.structureTypes,
      texts: this.gameData.texts,
      gameData: this.gameData
    })
  }

  /**
   * Updates the  gameState associated with this object
   */
  update () {
    this.gameState.update()
  }
}
