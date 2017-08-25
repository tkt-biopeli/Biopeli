import FilterGetterComponent from './FilterGetterComponent'

export default class SubFilterComponent {
  constructor ({ gameState, json }) {
    this.subfilters = []
    this.filterGetterComponent = new FilterGetterComponent({
      gameState: gameState
    })
    this.constructSubfilters(json)
  }

  constructSubfilters (json) {
    for (let subFilter of json.filters) {
      this.subfilters.push(this.filterGetterComponent.getFilter(subFilter))
    }
  }
}
