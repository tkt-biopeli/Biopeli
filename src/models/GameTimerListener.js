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
    var produced = 0
    for (let structure of this.player.structures) {
      produced += structure.produce(timerEvent)
    }
<<<<<<< HEAD
    //this.player.countPoints(produced) // Replace with desired functionality  

=======
    this.player.addPoints(produced) // Replace with desired functionality
>>>>>>> 865e87fb6db3746188d62a8a7afc65aae0c0b702
    let transaction = this.city.buyTurnips(produced)
    var fulfilledPct = transaction.percentage
    this.player.countPoints(fulfilledPct)
    this.player.cash += transaction.earnings
<<<<<<< HEAD
    this.topBarController.update({
      time: timerEvent.toString(),
      score: this.player.points,
      cash: this.player.cash,
      fulfilledPct: fulfilledPct
    })
    
    this.menuView.redraw()
=======

    this.topBarController.redraw(timerEvent)
    this.menuController.redraw(timerEvent)

    // is game over?
    this.gameEvents.isGameOver(timerEvent.year)
>>>>>>> 865e87fb6db3746188d62a8a7afc65aae0c0b702
  }
}
