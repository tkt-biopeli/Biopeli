export default class TimeCondition {
  constructor ({ timer, notBefore, notAfter }) {
    this.gameTimer = timer
    this.notAfter = notAfter
    this.notBefore = notBefore
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
