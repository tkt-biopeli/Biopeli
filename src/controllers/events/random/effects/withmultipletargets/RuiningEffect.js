import Effect from './Effect'

export default class RuiningEffect extends Effect {
  constructor ({json}) {
    super()
    this.percentage = json.percentage
  }

  realizeEventForOneElement (structure) {
    var actualAmount = structure.health.maxHealth * this.percentage
    structure.healthManager.changeHealth(actualAmount)
  }
}
