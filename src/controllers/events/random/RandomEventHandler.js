import TimeWindowRandomizer from '../../../models/logic/TimeWindowRandomizer'

export default class RandomEventHandler {
  constructor ({eventRandomizer, menuController, randomEventSettings}) {
    this.eventRandomizer = eventRandomizer
    this.menuController = menuController

    this.timeWindowRandomizer = new TimeWindowRandomizer({
      min: randomEventSettings.minTime,
      max: randomEventSettings.maxTime
    })
    this.timeWindowRandomizer.calculateNext({serialNumber: 0})
    this.maxSearched = randomEventSettings.maxSearched
    this.eventContentIndex = randomEventSettings.eventContentIndex
  }

  randomEventCheck (timeEvent) {
    if (this.timeWindowRandomizer.tryNext(timeEvent)) {
      let happened = this.doEvent()
      if (happened) return happened
    }
  }

  doEvent () {
    var event = this.eventRandomizer.getRandomEvent(this.maxSearched)
    if (event != null) {
      event.realizeEvent()
      return event
    }
  }
}
