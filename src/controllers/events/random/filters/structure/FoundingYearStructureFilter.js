import {between} from '../../../../../models/logic/Between'
import * as FilterComponents from '../FilterComponents'

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
    return FilterComponents.structuresAffected(this.player.structures.values, isValidFn)
  }
}
