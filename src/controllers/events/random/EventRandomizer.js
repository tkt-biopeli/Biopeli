export default class EventRandomizer {
  /**
   * Handles random events.
   * 
   * @param {Object} eventlist - an array of random events
   * @param {Object} randomWithBounds - a utility function
   */
  constructor ({eventList, randomWithBounds}) {
    this.eventList = eventList
    this.randomWithBounds = randomWithBounds
  }

  /**
   * Finds a suitable event from the event list and returns it.
   * If there is none, it returns null.
   * 
   * @param {integer} givenAmount - the maximum number of events whose
   * suitability is checked until null is given can be given as a parameter.
   * If left blank, only one event is checked.
   * 
   * @return {RandomEvent} Returns a suitable event or null if none is found.
   */
  getRandomEvent (givenAmount) {
    var amount = givenAmount == null
      ? 1
      : givenAmount > this.eventList.length
        ? this.eventList.length
        : givenAmount
    var shuffledEvents = this.shuffleEvents(this.eventList)
    return this.findSuitableEvent(shuffledEvents, amount) 
  }

  findSuitableEvent (shuffledEvents, amount) {
    for (var i = 0; i < amount; i++) {
      if (shuffledEvents[i].canHappen()) return shuffledEvents[i]
    }
    return null
  }

  // Is there a need to maintain the order in the original event list?
  shuffleEvents (originalArray) {
    var shuffledArray = originalArray.slice()
    let length = shuffledArray.length

    for (var i = 0; i <= length - 2; i++) {
      var j = this.randomWithBounds(i, length - 1)
      var tempEvent = shuffledArray[i]
      shuffledArray[i] = shuffledArray[j]
      shuffledArray[j] = tempEvent
    }

    return shuffledArray
  }
}
