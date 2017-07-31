import TimeEvent from './TimeEvent'
export default class Timer {
  /**
   * @param {string} name
   * @param {number} interval in millis
   * @param {number} currentTime in millis
   */
  constructor ({ name, interval, currentTime }) {
    if (name == null) {
      this.name = ''
    } else {
      this.name = name
    }

    this.interval = interval
    this.lastTime = currentTime
    this.callTime = 0
    this.currentTimeEvent = null
    this.listeners = new Set()
  }

  /**
   * Adds new listener to be called when timer updates
   *
   * @param {*} listener
   */
  addListener (listener) {
    this.listeners.add(listener)
  }

  /**
   * Removes listener from listeners
   *
   * @param {*} listener
  */
  removeListener (listener) {
    this.listeners.delete(listener)
  }

  /**
   * Checks if enough time has passed for timer update, and if it has, updates
   *
   * @param {number} currentTime
   */
  update (currentTime) {
    if (currentTime - this.lastTime >= this.interval) {
      this.callTime++
      this.callListeners()
      this.lastTime = currentTime
    }
  }

  /**
   * Helper method for calling all of the listeners
   */
  callListeners () {
    this.currentTimeEvent = this.createTimeEvent()

    for (let listener of this.listeners) {
      var method = listener['on' + this.name + 'Timer']
      method.call(listener, this.currentTimeEvent)
    }
  }

  /**
   * Function that creates the time event to be given to listeners
   *
   * @return {{time: number, year: number}}
   */
  createTimeEvent () {
    return new TimeEvent({ callTime: this.callTime })
  }
}
