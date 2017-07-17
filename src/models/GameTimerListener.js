/**
 * This is a listener for the GameTimer object
 */
export default class GameTimerListener {

  /**
   * @param {City} city
   * @param {Player} player
   * @param {MenuController} menuController
   * @param {TopBarController} topBarController
   * @param {GameEvents} gameEvents
   */
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
  * @param {TimerEvent} timerEvent
  */
  onTimer (timerEvent) {
    var producedTurnips = this.countProductionFromStructures(this.player.structures, timerEvent)
    this.doTransaction(producedTurnips, timerEvent.endOfYear)

    this.redrawControllers()
    // is game over?
    this.gameEvents.isGameOver(timerEvent)
  }

  /**
   * Goes through given structures and sums yearly and weekly productions
   * 
   * @param {Structure[]} structures 
   * @param {TimerEvent} timerEvent 
   */
  countProductionFromStructures (structures, timerEvent) {
    var weekly = 0
    var yearly = 0
    for (let structure of structures) {
      // dirty differentation of production types
      if (structure.structureType.name !== 'wheat farm') {
        weekly += structure.produce(timerEvent)
      } else {
        yearly += structure.produce(timerEvent)
      }
    }
    return { weekly, yearly }
  }

  /**
   * Handles the transaction between city and the player
   * 
   * @param {number} producedTurnips 
   * @param {boolean} buyYearlyHarvest 
   */
  doTransaction (producedTurnips, buyYearlyHarvest) {
    let transaction = this.city.buyTurnips(producedTurnips, buyYearlyHarvest)
    var fulfilledPct = transaction.percentage
    this.player.countPoints(fulfilledPct)
    this.player.cash += transaction.earnings
  }

  /**
   * Redraws top bar and menu controllers
   */
  redrawControllers () {
    this.topBarController.redraw()
    this.menuController.redraw()
  }
}
