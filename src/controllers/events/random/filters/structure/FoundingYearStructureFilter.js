import {between} from '../../../../../models/logic/Between'
import StructureFilter from '../baseclasses/StructureFilter'

export default class FoundingYearStructureFilter extends StructureFilter {
  constructor ({ gameState, json }) {
    super(gameState) /* istanbul ignore next */

    this.min = json.min
    this.max = json.max
  }

  isValid (structure) {
    return between(this.min, this.max, structure.foundingYear)
  }
}
