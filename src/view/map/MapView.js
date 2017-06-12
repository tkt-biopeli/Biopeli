import Map from '../../models/map/Map'
import ModelTile from '../../models/map/ModelTile'
import ViewTile from './ViewTile'
import TileType from '../../models/map/TileType'
export default class MapView {
  constructor ({ game, map, viewWidthPx, viewHeightPx }) {
    this.game = game
    this.map = map
    this.viewWidthPx = viewWidthPx
    this.viewHeightPx = viewHeightPx
    this.tileWidth = map.tileWidth
    this.tileHeight = map.tileHeight
    this.renderTexture1 = this.game.add.renderTexture(viewWidthPx, viewHeightPx, 'texture1')
    this.renderS = this.game.add.sprite(0, 0, this.renderTexture1)
    this.renderS.fixedToCamera = true
  }

  drawWithOffset (cameraX, cameraY) {
    // clear the view
    this.renderTexture1.clear()

    // calculate grid coordinates for new view
    var startCol = Math.floor(cameraX / this.tileWidth)
    var endCol = startCol + (this.viewWidthPx / this.tileWidth)
    var startRow = Math.floor(cameraY / this.tileHeight)
    var endRow = startRow + (this.viewHeightPx / this.tileHeight)

    // calculate offset
    var offX = -cameraX + startCol * this.tileWidth
    var offY = -cameraY + startRow * this.tileHeight

    // get tiles from Map and fill view with Sprites
    for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
        var x = (c - startCol) * this.tileWidth + offX
        var y = (r - startRow) * this.tileHeight + offY
        var tile = this.map.getTileWithGridCoordinates(c, r)

        if (typeof tile !== 'undefined') {
          var viewTile = new ViewTile({game: this.game, x: 0, y: 0, modelTile: tile})
          this.renderTexture1.renderXY(viewTile.tileSprite, Math.round(x), Math.round(y))
        }
      }
    }
    this.renderS.reset(cameraX, cameraY)
  }
}
