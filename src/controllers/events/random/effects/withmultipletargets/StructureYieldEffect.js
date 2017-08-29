import Effect from './Effect'

export default class StructureYieldEffect extends Effect {
  constructor ({json}) {
    super() /* istanbul ignore next */
    this.yieldChange = json.yieldChange != null ? json.yieldChange : 0
  }

  realizeEventForOneElement (structureType) {
    structureType.turnipYield += this.yieldChange
  }
}
