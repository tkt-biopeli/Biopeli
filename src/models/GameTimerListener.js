export default class GameTimerListener {
  constructor ({player, menu, topBarController}) {
    this.player = player
    this.menu = menu
    this.topBarController = topBarController
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimerEvent} timerEvent
  */
  onTimer (timerEvent) {
    for (let structure of this.player.structures) {
      structure.update(timerEvent)
    }

    this.menu.redraw(timerEvent)
    this.topBarController.redraw(timerEvent)
  }
}
