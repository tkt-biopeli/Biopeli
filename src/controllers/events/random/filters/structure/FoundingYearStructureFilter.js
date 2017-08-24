import {between} from '../../../../../models/logic/Between'
import * as AffectedFunctions from '../AffectedFunctions'

export default class FoundingYearStructureFilter {
  constructor ({ gameState, json }) {
    this.player = gameState.player

    this.min = json.min
    this.max = json.max
  }

  isValid (structure) {
    return between(this.min, this.max, structure.foundingYear)
  }

  affected () {
    const isValidFn = (structure) => { return this.isValid(structure) }
    return AffectedFunctions.structuresAffected(this.player.structures.values, isValidFn)
  }
}
