import ListLogicFilter from './ListLogicFilter'

export default class Or extends ListLogicFilter {
  constructor ({gameState, json}) {
    super(gameState, json)
  }

  affected () {
    var affected = new Set()

    for (let subfilter of this.subfilters) {
      let subaffected = this.subfilters.affected()
      for(let subaf of subaffected) {
        if(!affected.has(subaf)) affected.add(subaf)
      }
    }

    return affected.values()
  }
}