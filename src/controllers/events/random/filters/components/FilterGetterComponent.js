export default class FilterGetterComponent {
  constructor ({ gameState }) {
    this.eventFactory = gameState.randomEventFactory
  }

  getFilter (json) {
    return this.eventFactory.createFilter(json)
  }
}
