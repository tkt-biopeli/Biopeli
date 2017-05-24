import ModelTile from './ModelTile'
import TileType from './TileType'
import ViewTile from '../sprites/ViewTile'
import ViewTileSprite from '../sprites/ViewTileSprite'

export default class Map {
  constructor({ game, gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.game = game
    this.mapGroup = game.add.group()
    this.grid = []

    // World map size: top left corner x & y, width, height
    game.world.setBounds(0, 0, gridSizeX * tileWidth, gridSizeY * tileHeight)
  }

  addTileWithGridCoordinates (x, y, tileType) {
    var tile = new ModelTile(x, y, tileType)
    var viewTile = new ViewTileSprite(this.game, this.gridToPixelsX(x), this.gridToPixelsY(y), tile)
    this.grid[y * this.gridSizeX + x] = viewTile
    // this.game.add.sprite(viewTile.x, viewTile.y, viewTile.modelTile.tileType.asset)
  }

  addTileWithPixelCoordinates (x, y, tileType) {
    var gridX = this.pixelsToGridX(x)
    var gridY = this.pixelsToGridY(y)
    var tile = new ModelTile(gridX, gridY, tileType)
    var viewTile = new ViewTile(this.game, x, y, tile)
    this.grid[y * this.gridSizeX + x] = viewTile
  }

  getTileWithGridCoordinates (x, y) {
    return this.grid[y * this.gridSizeX + x]
  }

  draw () {
    for (var y = 0; y < this.gridSizeY; y++) {
      for (var x = 0; x < this.gridSizeX; x++) {
        var tile = this.getTileWithGridCoordinates(x, y)
        if (typeof tile !== 'undefined') {
          this.game.add.existing(tile)
        }
      }
    }
  }

  // TEST DATA
  createMapHalfForestHalfWater () {
    var tileTypes = TileType.call()

    for (var i = 0; i < this.gridSizeY; i++) {

      if (i % 2 === 0) {
        for (var j = 0; j < this.gridSizeX; j++) {
          this.addTileWithGridCoordinates(j, i, tileTypes.forest)
        }
      } else {

        for (var k = 0; k < this.gridSizeX; k++) {
          this.addTileWithGridCoordinates(k, i, tileTypes.water)

          // last tile check
          if (i === (this.gridSizeY - 1) && k === (this.gridSizeX - 1)) {
            var test = this.getTileWithGridCoordinates(k, i)
            test.exists = false
          }
        }
      }
    }

  }

  // Pixel-Grid-Pixel conversion helpers

  pixelsToGridX (x) {
    return Math.floor(x / this.tileWidth)
  }

  pixelsToGridY (y) {
    return Math.floor(y / this.tileHeight)
  }

  gridToPixelsX (x) {
    return x * this.tileWidth
  }

  gridToPixelsY (y) {
    return y * this.tileHeight
  }
}
