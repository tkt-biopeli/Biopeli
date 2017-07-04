import config from '../config'

/**
 * Game events class, finishes the game etc
 */
export default class GameOver {
  /**
  * Constructor
  * @param gameTimer {Timer} param.gameTimer - game timer
  */
  constructor({ timer, game }) {
    this.gameTimer = timer
    this.game = game
  }

  /**
   * Check if game is over
   */
  isGameOver () {
    if (this.gameTimer.createTimeEvent().year >= config.gameLength) {
      this.game.state.start('GameOver', true, false, this.game.player.points, this.game.city.population)
    }
  }
}
