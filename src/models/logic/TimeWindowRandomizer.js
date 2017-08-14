export default class TimeWindowRandomizer {
  constructor ({min, max}) {
    this.min = min
    this.difference = max - min
  }

  isNext (timeEvent) {
    return timeEvent.serialNumber >= this.next
  }

  tryNext (timeEvent) {
    if (this.isNext(timeEvent)) {
      this.calculateNext(timeEvent)
      return true
    }

    return false
  }

  calculateNext (timeEvent) {
    this.next = timeEvent.serialNumber + this.min + 
      Math.floor(this.rand() * (this.difference + 1))
  }

  rand () { return Math.random() }
}
