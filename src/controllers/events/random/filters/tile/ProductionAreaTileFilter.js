import * as FilterComponents from '../FilterComponents'
import RecursiveFilter from '../common/RecursiveFilter'

export default class ProductionAreaTileFilter {
  constructor ({ gameState, json }) {
    this.map = gameState.map
    this.structures = []

    var recHelp = new RecursiveFilter(gameState)
    this.subFilter = recHelp.getFilter(json.structureFilter)

    this.includeNotOwned = json.includeNotOwned
  }

  affected () {
    this.structures = this.subFilter.affected()
    const isValidFn = (tile) => { return this.isValidTile(tile) }
    return FilterComponents.tileTypesAffected(this.map, isValidFn)
  }

  isValidTile (tile) {
    if (this.includeNotOwned && tile.owner == null) return true
    if (this.structures.length === 0) return false

    for (let structure of this.structures) {
      if (tile.owner === structure) return true
    }
    return false
  }
}
