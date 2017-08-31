export default class MoneyEffect {
  constructor ({gameState, json}) {
    this.player = gameState.player
    this.changeAmount = json.change
  }

  realizeEvent () {
    this.player.cash += this.changeAmount
  }
}
