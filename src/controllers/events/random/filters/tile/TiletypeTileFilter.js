import * as AffectedFunctions from '../AffectedFunctions'

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
    return AffectedFunctions.tileTypesAffected(this.map, isValidFn)
  }
}
