import ModelTile from '../models/ModelTile'
import TileType from '../models/TileType'
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

  getTileX(x) {
    return Math.floor(x / this.tileWidth)
  }


  getTileY(y) {
    return Math.floor(x / this.tileHeight)
  }

  getScreenTileX(x) {
    return x * this.tileWidth
  }

  getScreenTileY(y) {
    return y * this.tileHeight
  }

  addTile(x, y, tileType) {
    var newTile = new ModelTile(this.getTileX(x), this.getTileY(y), tileType)
    this.mapGroup.add(newTile)
    this.game.add.sprite()
  }

  // add with pixel coordinates
  addTileToGrid(x, y, tileType) {
    var modelTile = new ModelTile(getTileX(x), getTileY(y), tileType)
    var viewTile = new ViewTile(this.game, x, y, modelTile )
  }


  createMapHalfForestHalfWater() {
    var tileTypes = TileType.call()

    for (var i = 0; i < this.gridSizeY; i++) {

      if (i % 2 == 0) {
        for (var j = 0; j < this.gridSizeX; j++) {
          addTileToGrid(j, i, tileTypes.forest)
        }
      } else {
        for (var j = 0; j < this.gridSizeX; j++) {
          addTileToGrid(j, i, tileTypes.water)
        }
      }

    }

  }
}
