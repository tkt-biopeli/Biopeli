export default class GameTimerListener {
  constructor ({player, menu}) {
    this.player = player
    this.menu = menu
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

    this.menu.redraw()
  }
}
