export default class GameTimerListener {
  constructor ({ player, menuView }) {
    this.player = player
    this.menuView = menuView
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimeEvent} timerEvent
  */
  onTimer (timerEvent) {
    var produced = 0
    for (let structure of this.player.structures) {
      produced += structure.produce(timerEvent)
    }
    this.player.addPoints(produced) // Replace with desired functionality

    this.menuView.redraw()

  }
}
