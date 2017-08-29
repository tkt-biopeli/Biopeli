import TileFilter from '../baseclasses/TileFilter'
import FilterGetterComponent from '../components/FilterGetterComponent'

export default class ProductionAreaTileFilter extends TileFilter {
  constructor ({ gameState, json }) {
    super(gameState) /* istanbul ignore next */

    var filterGetter = new FilterGetterComponent({gameState: gameState})
    this.subFilter = filterGetter.getFilter(json.structureFilter)

    this.includeNotOwned = json.includeNotOwned
  }

  isValid (tile) {
    if (this.includeNotOwned && tile.owner == null) return true
    if (this.structures.length === 0) return false

    for (let structure of this.structures) {
      if (tile.owner === structure) return true
    }
    return false
  }

  affected () {
    this.structures = this.subFilter.affected()
    return super.affected() /* istanbul ignore next */
  }
}
