import RecursiveFilter from './RecursiveFilter'

export default class RandomFilter extends RecursiveFilter{
  constructor ({gameState, json}) {
    super(gameState)

    this.filter = this.getFilter(json.filter)
    this.amount = json.amount
  }

  affected () {
    var innerAffected = this.filter.affected()

    var affected = []
    while ( innerAffected.length > 0 && affected.length < this.amount) {
      var random = Math.floor(this.rand() * innerAffected.length)
      
      affected.push(innerAffected[random])
      innerAffected.splice(random, 1)
    }

    return affected
  }

  rand () {
    return Math.random()
  }
}