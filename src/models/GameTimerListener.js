export default class GameTimerListener {
  constructor ({ city, player, menuController, topBarController, gameEvents }) {
    this.city = city
    this.player = player
    this.menuController = menuController
    this.topBarController = topBarController
    this.gameEvents = gameEvents
  }

  /**
  * Calls all things that need to be updated after game timer call
  *
  * @param {TimeEvent} timerEvent
  */
  onTimer (timerEvent) {
    var producedTurnips = this.countProductionFromStructures(this.player.structures, timerEvent)
    this.doTransaction(producedTurnips)

    this.redrawControllers(timerEvent)
    // is game over?
    this.gameEvents.isGameOver(timerEvent)
  }

  countProductionFromStructures (structures, timerEvent) {
    var produced = 0
    for (let structure of structures) {
      produced += structure.produce(timerEvent)
    }
    return produced
  }

  doTransaction (producedTurnips) {
    let transaction = this.city.buyTurnips(producedTurnips)
    var fulfilledPct = transaction.percentage
    this.player.countPoints(fulfilledPct)
    this.player.cash += transaction.earnings
  }

  redrawControllers (timerEvent) {
    this.topBarController.redraw(timerEvent)
    this.menuController.redraw(timerEvent)
  }
}
