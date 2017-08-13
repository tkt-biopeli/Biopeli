export default class LogicFilter {
  constructor (gameState) {
    this.eventFactory = gameState.randomEventFactory
  }

  getFilter (json) {
    return this.eventFactory.createFilter(json)
  }
}