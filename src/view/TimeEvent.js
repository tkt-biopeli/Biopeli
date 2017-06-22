import Timer from './Timer.js'

export default class {
  constructor (timer) {
    this.timer = timer
    this.serialNumber = timer.callTime
    this.week = this.serialNumber % 4 + 1
    this.month = this.serialNumber / 4 % 12 + 1
    this.year = this.getSerialNumber / 48
  }

  getWeek () {
    return this.week
  }

  getMonth () {
    return this.month
  }

  getYear () {
    return this.year
  }

  getSerialNumber () {
    return this.serialNumber
  }

  toString () {
    return 'Vuosi ' + this.getYear() + ', kuukausi ' + this.getMonth() + ', viikko ' + this.getWeek(this.date)
  }
}
