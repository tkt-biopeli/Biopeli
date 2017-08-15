import TileFilter from './TileFilter'

export default class TiletypeTileFilter extends TileFilter {
  constructor ({ gameState, json }) {
    super(gameState)

    this.tiletypeNames = json.tileTypes
  }

  isValidTile (tile) {
    for (let tiletypeName of this.tiletypeNames) {
      if (tiletypeName === tile.tileType.name) return true
    }

    return false
  }
}
