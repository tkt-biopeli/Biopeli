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
  constructor ({ city, player, menuController, topBarController,
    bottomMenuController, gameEvents, randomEventHandler, telegramStorage, bioFactsGenerator }) {
    this.city = city
    this.player = player
    this.menuController = menuController
    this.topBarController = topBarController
    this.bottomMenuController = bottomMenuController
    this.gameEvents = gameEvents
    this.randomEventHandler = randomEventHandler
    this.telegramStorage = telegramStorage
    this.bioFactsGenerator = bioFactsGenerator
  }

  /**
  * Calls all things that need to be updated after game timer call
  * @param {TimerEvent} timerEvent
  */
  onTimer (timerEvent) {
    var producedTurnips = this.countProductionFromStructures(timerEvent)
    this.doTransaction(producedTurnips, timerEvent)

    this.checkBuildingRuining(timerEvent)

    this.checkRandomEvent(timerEvent)

    this.checkBioFactEvent(timerEvent)

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
    for (let structure of this.player.structures) {
      structure.producer.produce(timerEvent)
    }

    var sum = 0
    for (let structure of this.player.structures) {
      let amount = structure.producer.producedAmount()
      sum += amount
    }
    return sum
  }

  checkBuildingRuining (timerEvent) {
    for (let structure of this.player.structures) {
      let warning = structure.healthManager.checkRuin(timerEvent)
      if (warning) { this.telegramStorage.addRuinWarning(timerEvent, structure) }
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

  checkRandomEvent (timerEvent) {
    let eventHappened = this.randomEventHandler.randomEventCheck(timerEvent)
    if (eventHappened) {
      this.telegramStorage.addRandomEvent(timerEvent, eventHappened)
    }
  }

  checkBioFactEvent (timerEvent) {
    if (this.bioFactsGenerator.timer.tryNext(timerEvent)) {
      this.bioFactsGenerator.sendTelegram()
    }
  }

  /**
   * Redraws top bar and menu controllers
   */
  redrawControllers () {
    this.topBarController.redraw()
    this.menuController.redraw()
    this.bottomMenuController.redraw()
  }
}
