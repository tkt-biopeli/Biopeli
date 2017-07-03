import config from '../config'

/**
 * Game over class, finishes the game
 */
export default class GameOver {
  /**
  * Constructor
  * @param gameTimer {Timer} param.gameTimer - game timer
  */
  constructor({ timer }) {
    this.gameTimer = timer
  }
  /**
   * Check if game is over
   */
  isItOver () {
    return this.gameTimer.createTimeEvent().year >= config.gameLength
  }
}