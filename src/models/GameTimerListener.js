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
    this.doTransaction(producedTurnips, timerEvent.endOfYear)

    this.redrawControllers()
    // is game over?
    this.gameEvents.isGameOver(timerEvent)
  }

  countProductionFromStructures (structures, timerEvent) {
    var weekly = 0
    var yearly = 0
    for (let structure of structures) {
      // dirty differentation of production types
      if (structure.structureType.name !== 'farm') {
        weekly += structure.produce(timerEvent)
      } else {
        yearly += structure.produce(timerEvent)
      }
    }
    return { weekly, yearly }
  }

  doTransaction (producedTurnips, buyYearlyHarvest) {
    let transaction = this.city.buyTurnips(producedTurnips, buyYearlyHarvest)
    var fulfilledPct = transaction.percentage
    this.player.countPoints(fulfilledPct)
    this.player.cash += transaction.earnings
  }

  redrawControllers () {
    this.topBarController.redraw()
    this.menuController.redraw()
  }
}
