export default class GameTimerListener {
  constructor({ player, menuView }) {
    this.player = player
    this.menuView = menuView
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimerEvent} timerEvent
  */
  onTimer(timerEvent) {
    for (let structure of this.player.structures) {
      structure.update()
    }

    this.menuView.redraw()
  }
}
