import TileEffect from './Effect'

export default class TileValueEffect extends Effect {
  constructor ({json}) {
    this.percentage = json.percentage
  }

  happenForOne (structure) {
    var actualAmount = structure.health.maxHealth * this.percentage

    structure.healthManager.changeHealth(actualAmount)
  }
}