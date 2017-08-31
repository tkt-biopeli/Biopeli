import TileFilter from '../baseclasses/TileFilter'

export default class AllTileFilter extends TileFilter {
  constructor ({gameState}) {
    super(gameState) /* istanbul ignore next */
  }

  isValid (tile) { return true }
}
