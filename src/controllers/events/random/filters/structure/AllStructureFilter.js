import StructureFilter from '../baseclasses/StructureFilter'

export default class AllStructureFilter extends StructureFilter {
  constructor ({gameState, json}) {
    super(gameState) /* istanbul ignore next */
  }

  isValid (structure) { return true }
}
