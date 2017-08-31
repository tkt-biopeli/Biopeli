export default class TimeCondition {
  constructor ({ gameState, json }) {
    this.gameTimer = gameState.gameTimer
    this.notAfter = json.notAfter * 48
    this.notBefore = json.notBefore * 48
  }

  canHappen () {
    let time = this.gameTimer.currentTimeEvent.serialNumber

    if (this.notAfter != null) {
      if (time > this.notAfter) return false
    }

    if (this.notBefore != null) {
      if (time < this.notBefore) return false
    }

    return true
  }
}
