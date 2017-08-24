import * as AffectedFunctions from '../AffectedFunctions'

export default class StructureFilter {
  constructor (gameState) {
    this.player = gameState.player
  }

  affected () {
    const isValidFn = (structure) => { return this.isValid(structure) }
    return AffectedFunctions.structuresAffected(
      this.player.structures.values, isValidFn)
  }
}
