import SubFilterComponent from '../components/SubFilterComponent'

export default class And {
  constructor ({ gameState, json }) {
    this.subFilterComponent = new SubFilterComponent({
      gameState: gameState,
      json: json
    })
  }

  affected () {
    var subfilters = this.subFilterComponent.subfilters
    if (subfilters.length < 1) return []

    var affected = subfilters[0].affected()
    subfilters.forEach(subfilter => {
      var subAffected = new Set(subfilter.affected())
      affected = affected.filter(x => subAffected.has(x))
    })
    return affected
  }
}
