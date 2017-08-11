export default class TileTiletypeFilter {
  constructor ({ map }) {
    this.map = map
  }

  affected () {
    let affected = []

    for (let i = 0; i < this.map.gridSizeX; i++) {
      for (let j = 0; j < this.map.gridSizeY; j++) {
        let tile = this.map.getTileWithGridCoordinates(i, j)
        if (this.isValidTile(tile)) affected.push(tile)
      }
    }

    return affected
  }
}
