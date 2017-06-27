export default class {
  constructor({ callTime }) {
    this.serialNumber = callTime
    this.week = this.serialNumber % 4 + 1
    this.month = Math.floor(this.serialNumber / 4) % 12 + 1
    this.year = Math.floor(this.serialNumber / 48) + 1980
  }

  toString() {
    return this.year + '/' + this.month + '/' + this.week
  }
}
