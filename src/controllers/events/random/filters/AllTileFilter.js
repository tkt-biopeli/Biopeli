import TileFilter from './TileFilter'

export default class AllTileFilter extends TileFilter {
  constructor ({gameState}) {
    super(gameState)
  }

  isValidTile (tile) { return true }
}
