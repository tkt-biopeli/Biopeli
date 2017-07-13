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
    this.doTransaction(producedTurnips, timerEvent)

    this.redrawControllers()
    // is game over?
    this.gameEvents.isGameOver(timerEvent)
  }

  countProductionFromStructures (structures, timerEvent) {
    var sum = 0
    for (let structure of structures) {
      sum += structure.produce(timerEvent)
    }
    return sum
  }

  doTransaction (producedTurnips, timerEvent) {
    let transaction = this.city.buyTurnips(producedTurnips, timerEvent.endOfYear)
    this.player.countPoints(transaction)
    this.player.cash += transaction
  }

  redrawControllers () {
    this.topBarController.redraw()
    this.menuController.redraw()
  }
}
