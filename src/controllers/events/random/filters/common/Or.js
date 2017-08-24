import SubFilterComponent from '../components/SubFilterComponent'

export default class Or {
  constructor ({ gameState, json }) {
    this.subFilterComponent = new SubFilterComponent({
      gameState: gameState,
      json: json
    })
  }

  affected () {
    var affected = []
    this.subFilterComponent.subfilters.forEach(
      subfilter => {
        affected = affected.concat(subfilter.affected())
      })
    affected = affected.filter(
      (element, index, self) => self.indexOf(element) === index)

    return affected
  }
}
