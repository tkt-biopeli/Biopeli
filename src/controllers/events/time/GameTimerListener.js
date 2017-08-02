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
  constructor ({ city, player, controllers, gameEvents }) {
    this.city = city
    this.player = player
    this.controllers = controllers
    this.gameEvents = gameEvents
  }

  /**
  * Calls all things that need to be updated after game timer call
  * @param {TimerEvent} timerEvent
  */
  onTimer (timerEvent) {
    var producedTurnips = this.countProductionFromStructures(timerEvent)
    this.doTransaction(producedTurnips, timerEvent)

    this.checkBuildingRuining(timerEvent)

    this.redrawControllers()
    // is game over?
    this.gameEvents.isGameOver(timerEvent)
  }

  /**
   * Goes through given structures and sums yearly and weekly productions
   * @param {Structure[]} structures
   * @param {TimerEvent} timerEvent
   */
  countProductionFromStructures (timerEvent) {
    var sum = 0
    for (let structure of this.player.structures) {
      let amount = structure.produce(timerEvent)
      // console.log(structure.structureName + ' ' + amount)
      sum += amount
    }
    return sum
  }

  checkBuildingRuining (timerEvent) {
    for (let structure of this.player.structures) {
      structure.healthManager.checkRuin(timerEvent)
    }
  }

  /**
   * Handles the transaction between city and the player
   * @param {number} producedTurnips
   * @param {boolean} buyYearlyHarvest
   */
  doTransaction (producedTurnips, timerEvent) {
    let money = this.city.buyTurnips(producedTurnips, timerEvent.endOfYear)
    this.player.addPoints(money)
    this.player.cash += money
  }

  /**
   * Redraws top bar and menu controllers
   */
  redrawControllers () {
    for (let controller of this.controllers) {
      controller.redraw()
    }
  }
}
