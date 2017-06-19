export default class Timer {
  constructor ({name, interval, currentTime}) {
    if(name == null){
      this.name = ''
    }else{
      this.name = name
    }

    this.interval = interval
    this.lastTime = currentTime
    this.callTime = 0

    this.listeners = new Set()
  }

  addListener (listener) {
    this.listeners.add(listener)
  }

  removeListener (listener) {
    this.listeners.delete(listener)
  }

  update (currentTime) {
    if(currentTime - this.lastTime >= this.interval) {
      this.callListeners()
      this.lastTime = currentTime
      this.callTime ++
      return
    }
  }

  callListeners () {
    var timeEvent = this.createTimeEvent()

    for (let listener of this.listeners) {
      var method = listener['on'+this.name+'Timer']
      method.call(listener, timeEvent)
    }
  }

  createTimeEvent () {
    return {time: this.callTime}
  }
}
