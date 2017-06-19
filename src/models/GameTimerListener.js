export default class GameTimerListener {
  constructor ({player}) {
    this.player = player
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimerEvent} timerEvent
  */
  onTimer (timerEvent) {
    for (let structure of this.player.structures) {
      structure.update()
    }
  }
}
