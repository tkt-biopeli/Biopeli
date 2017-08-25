import TileFilter from '../baseclasses/TileFilter'

export default class TileTypeTileFilter extends TileFilter {
  constructor ({ gameState, json }) {
    super(gameState)
    this.tiletypeNames = json.tileTypes
  }

  isValid (tile) {
    for (let tiletypeName of this.tiletypeNames) {
      if (tiletypeName === tile.tileType.name) return true
    }
    return false
  }
}
