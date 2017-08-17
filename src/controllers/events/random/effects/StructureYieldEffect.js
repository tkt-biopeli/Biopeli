import Effect from './Effect'

export default class StructureYieldEffect extends Effect {
  constructor ({json}) {
    super()
    this.yieldChange = json.yieldChange != null ? json.yieldChange : 0
  }

  happenForOne(structureType) {
     structureType.turnipYield += this.yieldChange
  }
}
