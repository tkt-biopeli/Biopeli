export default class GameTimerListener {
  constructor ({player, menuController, topBarController}) {
    this.player = player
    this.menuController = menuController
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

    this.topBarController.redraw(timerEvent)
    this.menuController.redraw(timerEvent)
  }
}
