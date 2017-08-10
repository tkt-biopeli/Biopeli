import utils from '../../utils'
/**
 * Game events class, finishes the game etc
 */
export default class GameEvents {
  /**
  * Constructor
  * @param gameState gameState
  */
  constructor ({ gameState, gameLength, config }) {
    this.gameState = gameState
    this.gameLength = gameLength
    this.config = config
  }

  /**
   * Check if game is over
   */
  isGameOver (timeEvent) {
    if (timeEvent.serialNumber >= this.gameLength) {
      this.finishGame()
    }
  }
  /**
   * Finish the game
   */
  finishGame () {
    this.gameState.music.stop()
    this.gameState.state.state.start(
      'GameOver', true, false,
      this.gameState.player.points,
      this.gameState.city.population,
      this.gameState.gameData
    )
    var name = prompt('Kirjoita nimesi')
    utils.submitScore({
      player: name,
      points: this.gameState.player.points
    },
    this.config.gameSettings.scoreServer
  )
  }
}
