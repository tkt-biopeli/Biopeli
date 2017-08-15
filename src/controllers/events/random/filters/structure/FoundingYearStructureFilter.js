import StructureFilter from './StructureFilter'

export default class FoundingYearStructureFilter extends StructureFilter {
  constructor ({ gameState, json }) {
    super(gameState)

    this.min = json.min
    this.max = json.max
  }

  isValid (structure) {
    let year = structure.foundingYear

    if (this.min != null) {
      if (year < this.min) return false
    }

    if (this.max != null) {
      if (year > this.max) return false
    }

    return true
  }
}
