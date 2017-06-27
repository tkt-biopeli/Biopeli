export default class {
  constructor({ callTime }) {
    this.serialNumber = callTime
    this.week = this.serialNumber % 4 + 1
    this.month = Math.floor(this.serialNumber / 4) % 12 + 1
    this.year = Math.floor(this.serialNumber / 48) + 1980
  }

  getWeek() {
    return this.week
  }

  getMonth() {
    return this.month
  }

  getYear() {
    return this.year
  }

  getSerialNumber() {
    return this.serialNumber
  }

  toString() {
    return this.year + '/' + this.month + '/' + this.week
  }
}
