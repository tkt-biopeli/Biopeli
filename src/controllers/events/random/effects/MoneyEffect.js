export default class MoneyEffect {
  constructor ({gameState, json}) {
    this.player = gameState.player
    this.changeAmount = json.change
  }

  happen () {
    this.player.cash += this.changeAmount
  }
}
