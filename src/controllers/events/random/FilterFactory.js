import TiletypeTileFilter from './filters/TiletypeTileFilter'

export default class FilterFactory {
  constructor ({gameState}) {
    this.gameState = gameState
  }

  createTiletypeTileFilter (json) {
    return new TiletypeTileFilter({
      map: this.gameState.map,
      tiletypeNames: json.tileTypes
    })
  }
}
