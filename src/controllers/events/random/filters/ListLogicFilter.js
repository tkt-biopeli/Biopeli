import LogicFilter from './LogicFilter'

export default class ListLogicFilter extends LogicFilter {
  constructor (gameState, json) {
    super(gameState)
    
    this.subfilters = []
    for(let subfilterjson of json.filters) {
      this.subfilters.push(this.getFilter(subfilterjson))
    }
  }
}