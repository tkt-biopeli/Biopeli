export default class RandomEventHandler {
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
   * @param {integer} numberOfIndexes - the maximum number of events whose
   * suitability is checked until null is given can be given as a parameter.
   * If left blank, only one event is checked.
   * 
   * @return {RandomEvent} Returns a suitable event or null if none is found.
   */
  getRandomEvent (numberOfIndexes) {
    var amount = numberOfIndexes == null ? 1 : numberOfIndexes 
    // a set of numbers
    var indexes = this.pickRandomNumbers(amount)
    return this.findSuitableEvent(indexes) 
  }

  findSuitableEvent (indexes) {
    for (let i of indexes) {
      if (this.eventList[i].canHappen()) return this.eventList[i]
    }
    return null
  }

  // This can be elsewhere
  pickRandomNumbers (amount) {
    var numbers = new Set()
    var i = 0
    while (i < amount) {
      var number = this.randomWithBounds(0, this.eventList.length)
      if (!numbers.has(number)) {
        numbers.add(number)
        i++
      }
    }
    return numbers
  }
}
