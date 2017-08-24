import {between} from '../../../../models/logic/Between'
import RecursiveHelper from '../filters/common/RecursiveFilter'

export default class StructureAmountCondition {
  constructor ({gameState, json}) {
    var rec = new RecursiveHelper(gameState)
    this.filter = rec.getFilter(json.filter)
    this.min = json.min
    this.max = json.max
  }

  canHappen () {
    return between(this.min, this.max, this.filter.affected().length)
  }
}
