import * as FilterComponents from '../FilterComponents'

export default class TiletypeTileFilter {
  constructor ({ gameState, json }) {
    this.map = gameState.map
    this.tiletypeNames = json.tileTypes
  }

  isValidTile (tile) {
    for (let tiletypeName of this.tiletypeNames) {
      if (tiletypeName === tile.tileType.name) return true
    }
    return false
  }

  affected () {
    const isValidFn = (tile) => { return this.isValidTile(tile) }
    return FilterComponents.tileTypesAffected(this.map, isValidFn)
  }
}
