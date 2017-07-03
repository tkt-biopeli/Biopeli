import config from '../config'

/**
 * Game events class, finishes the game etc
 */
export default class GameOver {
  /**
  * Constructor
  * @param gameTimer {Timer} param.gameTimer - game timer
  */
  constructor ({ timer }) {
    this.gameTimer = timer
  }

  /**
   * Check if game is over
   */
  isGameOver () {
    return (this.gameTimer.createTimeEvent().year >= config.gameLength)
  }
}
