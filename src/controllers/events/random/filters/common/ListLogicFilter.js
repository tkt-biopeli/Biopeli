import RecursiveFilter from './RecursiveFilter'

export default class ListLogicFilter extends RecursiveFilter {
  constructor (gameState, json) {
    super(gameState)

    this.subfilters = []
    for (let subfilterjson of json.filters) {
      this.subfilters.push(this.getFilter(subfilterjson))
    }
  }
}
