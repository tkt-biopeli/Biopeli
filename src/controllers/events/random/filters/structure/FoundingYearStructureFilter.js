import {between} from '../../../../../models/logic/Between'
import StructureFilter from './StructureFilter'

export default class FoundingYearStructureFilter extends StructureFilter {
  constructor ({ gameState, json }) {
    super(gameState)

    this.min = json.min
    this.max = json.max
  }

  isValid (structure) {
    return between(this.min, this.max, structure.foundingYear)
  }
}
