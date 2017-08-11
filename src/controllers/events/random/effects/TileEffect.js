export default class TileEffect {
  happen (tiles) {
    for(let tile of tiles) {
      this.happenForOne(tile)
    }
  }

  happenForOne (tile) {throw new Exception('Abstract class not implemented')}
}