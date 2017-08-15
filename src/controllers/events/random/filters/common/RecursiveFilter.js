export default class RecursiveFilter {
  constructor (gameState) {
    this.eventFactory = gameState.randomEventFactory
  }

  getFilter (json) {
    return this.eventFactory.createFilter(json)
  }
}
