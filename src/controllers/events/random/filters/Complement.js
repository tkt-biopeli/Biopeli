import LogicFilter from './LogicFilter'

export default class Complement extends LogicFilter{
  constructor ({gameState, json}) {
    super(gameState)

    this.from = this.getFilter(json.from)
    this.toRemove = this.getFilter(json.remove)
  }

  affected () {
    let from = new Set(this.from.affected())
    let removes = this.toRemove.affected()

    for (let remove of removes) {
      if(from.has(remove)) from.delete(remove)
    }

    return from.values
  }
}