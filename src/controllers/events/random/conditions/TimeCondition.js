export default class TimeCondition {
  constructor ({ gameState, json }) {
    this.gameTimer = gameState.gameTimer
    this.notAfter = json.notAfter
    this.notBefore = json.notBefore
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
