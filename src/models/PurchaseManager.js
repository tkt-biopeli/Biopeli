export default class PurchaseManager {
  constructor ({ player }) {
    this.player = player
  }

  purchase (price) {
    if (this.hasCash(price)) {
      this.player.cash -= price
      return true
    }

    return false
  }

  hasCash (price) {
    return this.player.cash >= price
  }
}
