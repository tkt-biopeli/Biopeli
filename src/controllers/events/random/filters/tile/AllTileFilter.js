import * as FilterComponents from '../FilterComponents'

export default class AllTileFilter {
  constructor ({gameState}) {
    this.map = gameState.map
  }

  isValidTile (tile) { return true }

  affected () {
    const isValidFn = (tile) => { return this.isValidTile(tile) }
    return FilterComponents.tileTypesAffected(this.map, isValidFn)
  }
}
