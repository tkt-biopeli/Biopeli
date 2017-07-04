import config from '../config'

/**
 * Game events class, finishes the game etc
 */
export default class GameEvents {
  /**
  * Constructor
  * @param gameState gameState
  */
  constructor ({ gameState }) {
    this.gameState = gameState
  }

  /**
   * Check if game is over
   */
  isGameOver (year) {
    if (year >= config.gameLength) {
      this.finishGame()
    }
  }

  finishGame () {
    this.gameState.state.state.start('GameOver', true, false, this.gameState.player.points, this.gameState.city.population)
  }
}
