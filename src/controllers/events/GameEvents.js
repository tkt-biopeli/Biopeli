/**
 * Game events class, finishes the game etc
 */
export default class GameEvents {
  /**
  * Constructor
  * @param gameState gameState
  */
  constructor ({ gameState, gameLength, game, config, utils, texts }) {
    this.gameState = gameState
    this.gameLength = gameLength
    this.game = game
    this.config = config
    this.utils = utils
    this.texts = texts
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
      this.gameState.gameData,
      this.game,
      this.utils,
      this.texts
    )
  }
}
