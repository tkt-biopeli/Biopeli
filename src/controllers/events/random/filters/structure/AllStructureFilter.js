import StructureFilter from './StructureFilter'

export default class AllStructureFilter extends StructureFilter {
  constructor ({gameState, json}) {
    super(gameState)
  }

  isValid (structure) { return true }
}
