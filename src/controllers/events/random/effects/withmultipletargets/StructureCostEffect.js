import Effect from './Effect'

export default class StructureCostEffect extends Effect {
  constructor ({json}) {
    super()
    this.costChange = json.costChange != null ? json.costChange : 0
  }

  realizeEventForOneElement(structureType) {
     structureType.cost = structureType.cost * this.costChange
  }
}
