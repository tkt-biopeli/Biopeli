import * as AffectedFunctions from '../AffectedFunctions'

export default class AllTileFilter {
  constructor ({gameState}) {
    this.map = gameState.map
  }

  isValidTile (tile) { return true }

  affected () {
    const isValidFn = (tile) => { return this.isValidTile(tile) }
    return AffectedFunctions.tileTypesAffected(this.map, isValidFn)
  }
}
