export default class TimeWindowRandomizer {
  constructor ({min, max, currentTime}) {
    this.min = min
    this.difference = max - min

    this.calculateNext(currentTime)
  }

  isNext (timeEvent) {
    return timeEvent.serialNumber >= this.nextRuin
  }

  tryNext (timeEvent) {
    if (this.isNext(timeEvent)) this.calculateNext(timeEvent)
  }

  calculateNext (timeEvent) {
    this.next = timeEvent.serialNumber + this.min + 
      Math.floor(this.rand() * (this.difference + 1))
  }

  rand () { return Math.random() }
}