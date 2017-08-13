import ListLogicFilter from './ListLogicFilter'

export default class And extends ListLogicFilter {
  constructor ({ gameState, json }) {
    super(gameState, json)
  }

  affected () {
    if (this.subfilters.length < 1) {
      return []
    }

    var affected = new Set(this.subfilters[0].affected())
    for (let i = 1; i < this.subfilters.length; i++) {
      let notFound = []
      let subaffected = new Set(this.subfilters[i].affected())

      for (let af of affected) {
        if (!subaffected.has(af)) notFound.push(af)
      }

      for (let toRemove of notFound) {
        affected.delete(toRemove)
      }
    }

    return affected.values()
  }
}
