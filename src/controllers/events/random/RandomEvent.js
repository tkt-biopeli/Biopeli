export default class RandomEvent {
  constructor ({name, description, condition, effects}) {
    this.name = name
    this.description = description
    this.condition = condition
    this.effects = effects
  }

  canHappen () {
    return this.condition.canHappen()
  }

  realizeEvent () {
    for (let effect of this.effects) {
      let affected = effect.filter.affected()
      effect.effect.realizeEvent(affected)
    }
  }
}
