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
      this.doEvent()
    }
  }

  doEvent () {
    var event = this.eventRandomizer.getRandomEvent(this.maxSearched)
    if (event != null) {
      event.happen()
      /* Venaa contentia
      this.menuController.addState('event', event)
      this.menuController.changeContent(this.eventContentIndex)*/
    }
  }
}