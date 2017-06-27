export default class GameTimerListener {
  constructor ({player, menuView}) {
    this.player = player
    this.menuView = menuView
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimeEvent} timerEvent
  */
  onTimer (timerEvent) {
    var month = timerEvent.getMonth(), 
        week = timerEvent.getWeek()
    var updateSeasonal = (month % 3 == 0) && (week == 1)

    var produced = 0
    for (let structure of this.player.structures) {
      produced += structure.produce()

      if(updateSeasonal){
        produced += structure.produceSeason()
      }
    }
    this.player.addPoints(produced) // Replace with desired functionality

    this.menuView.redraw()

  }
}
