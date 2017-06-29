export default class TimeEvent {
  constructor ({ callTime }) {
    this.serialNumber = callTime
    this.week = this.serialNumber % 4 + 1
    this.month = Math.floor(this.serialNumber / 4) % 12 + 1
    this.year = Math.floor(this.serialNumber / 48) + 1980
  }

  toString () {
    if (this.month > 9) {
      return this.year + ' / ' + this.month + ' / ' + this.week
    } else {
      return this.year + ' /  ' + this.month + ' / ' + this.week
    }
  }
}
