export default class GameTimerListener {
  constructor ({ city, player, menuView, topBarController, gameEvents }) {
    this.city = city
    this.player = player
    this.menuView = menuView
    this.topBarController = topBarController
    this.gameEvents = gameEvents
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
    let transaction = this.city.buyTurnips(produced)
    this.player.cash += transaction.earnings
    this.topBarController.update({
      time: timerEvent.toString(),
      score: this.player.points,
      cash: this.player.cash,
      fulfilledPct: transaction.percentage
    })

    this.menuView.redraw()

    // is game over?
    this.gameEvents.isGameOver()
  }
}
