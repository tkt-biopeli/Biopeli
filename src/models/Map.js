import ModelTile from './ModelTile'
import TileType from './TileType'
import ViewTile from '../sprites/ViewTile'

export default class Map {
  constructor({ game, gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.game = game
    this.mapGroup = game.add.group()
    
    // World map size: top left corner x & y, width, height
    game.world.setBounds(0, 0, gridSizeX * tileWidth, gridSizeY * tileHeight)
  }

  addTileWithGridCoordinates(x, y, tileType) {
    var modelTile = new ModelTile(x, y, tileType)
    var viewTile = new ViewTile(this.game, this.gridToPixelsX(x), this.gridToPixelsY(y), modelTile)
  }

  addTileWithPixelCoordinates(x, y, tileType) {
    var modelTile = new ModelTile(this.pixelsToGridX(x), this.pixelsToGridY(y), tileType)
    var viewTile = new ViewTile(this.game, x, y, modelTile)
  }

  // TEST DATA
  createMapHalfForestHalfWater() {
    var tileTypes = TileType.call()

    for (var i = 0; i < this.gridSizeY; i++) {

      if (i % 2 == 0) {
        for (var j = 0; j < this.gridSizeX; j++) {
          this.addTileWithGridCoordinates(j, i, tileTypes.forest)
        }
      } else {
        for (var j = 0; j < this.gridSizeX; j++) {
          this.addTileWithGridCoordinates(j, i, tileTypes.water)

          // end check
          if (i == (this.gridSizeY - 1) && j == (this.gridSizeX - 1)) {
            this.addTileWithGridCoordinates(j, i, tileTypes.forest)
          }
        }
      }
    }

  }

  // Pixel-Grid-Pixel conversion helpers

  pixelsToGridX(x) {
    return Math.floor(x / this.tileWidth)
  }

  pixelsToGridY(y) {
    return Math.floor(y / this.tileHeight)
  }

  gridToPixelsX(x) {
    return x * this.tileWidth
  }

  gridToPixelsY(y) {
    return y * this.tileHeight
  }
}
