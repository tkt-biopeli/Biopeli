import TileFilter from './TileFilter'
import RecursiveFilter from '../common/RecursiveFilter'

export default class ProductionAreaTileFilter extends TileFilter {
  constructor ({ gameState, json }) {
    super(gameState)
    var recHelp = new RecursiveFilter(gameState)

    this.subFilter = recHelp.getFilter(json.structureFilter)
    this.includeNotOwned = json.includeNotOwned
  }

  affected () {
    this.structures = this.subFilter.affected()
    return super.affected()
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
