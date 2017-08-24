import * as AffectedFunctions from '../AffectedFunctions'

export default class TileFilter {
  constructor (gameState) {
    this.map = gameState.map
    this.structures = []
  }

  affected () {
    const isValidFn = (tile) => { return this.isValid(tile) }
    return AffectedFunctions.tilesAffected(this.map, isValidFn)
  }
}
