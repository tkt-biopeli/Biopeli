import ModelTile from './ModelTile'
import TileType from './TileType'

export default class Map {
  constructor({ game, gridSizeX, gridSizeY, tileWidth, tileHeight }) {
    this.gridSizeX = gridSizeX
    this.gridSizeY = gridSizeY
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.game = game
    this.grid = []

    // World map size: top left corner x & y, width, height
    game.world.setBounds(0, 0, gridSizeX * tileWidth, gridSizeY * tileHeight)
  }

  addTileWithGridCoordinates (gx, gy, tileType) {
    var tile = new ModelTile(gx, gy, tileType)
    this.grid[gy * this.gridSizeX + gx] = tile
  }


  addTileWithPixelCoordinates (px, py, tileType) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    this.addTileWithGridCoordinates(gx, gy, tileType)
  }

  getTileWithGridCoordinates (gx, gy) {
    return this.grid[gy * this.gridSizeX + gx]
  }

  getTileWithPixelCoordinates (px, py) {
    var gx = this.pixelsToGridX(px)
    var gy = this.pixelsToGridY(py)
    return this.getTileWithGridCoordinates(gx, gy)
  }

  removeTileWithGridCoordinates (gx, gy) {
    this.grid[gy * this.gridSizeX + gx] = undefined
  }

  removeTileWithPixelCoordinates (px, py) {
    this.grid[this.pixelsToGridX(py) * this.gridSizeX + this.pixelsToGridX(px)] = undefined
  }

  update () {
    // map mouse demo, deletes tile from grid
    if (this.game.input.activePointer.isDown) {
      var x = this.game.input.activePointer.position.x + this.game.game.camera.x
      var y = this.game.input.activePointer.position.y + this.game.game.camera.y

      var test = this.getTileWithPixelCoordinates(x, y)

      if (typeof test !== 'undefined') {
        this.removeTileWithPixelCoordinates(x, y)
      }
    }
  }

  // TEST DATA
  createMapHalfForestHalfWater () {
    var limit = 0.2
    var tileTypes = TileType.call()

    for (var i = 0; i < this.gridSizeY; i++) {

      if (i % 2 === 0) {
        for (var j = 0; j < this.gridSizeX; j++) {
          var r = Math.random()
          if (r > limit) {

            this.addTileWithGridCoordinates(j, i, tileTypes.grass)
          } else {
            this.addTileWithGridCoordinates(j, i, tileTypes.farm)

          }
        }
      } else {

        for (var k = 0; k < this.gridSizeX; k++) {
          var r = Math.random()

          if (r > limit) {

            this.addTileWithGridCoordinates(k, i, tileTypes.grass)
          } else {
            if (r > 0.08) {
              this.addTileWithGridCoordinates(k, i, tileTypes.forest2)
            } else {
              this.addTileWithGridCoordinates(k, i, tileTypes.water2)
            }
          }

          // last tile check
          if (i === (this.gridSizeY - 1) && k === (this.gridSizeX - 1)) {
            this.removeTileWithGridCoordinates(k, i)
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
