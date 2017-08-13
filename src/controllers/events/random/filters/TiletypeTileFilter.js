import TileFilter from './TileFilter'

export default class TiletypeTileFilter extends TileFilter {
  constructor ({ map, tiletypeNames }) {
    super({ map: map })

    this.tiletypeNames = tiletypeNames
  }

  isValidTile (tile) {
    for (let tiletypeName of this.tiletypeNames) {
      if (tiletypeName === tile.tileType.name) return true
    }

    return false
  }
}
