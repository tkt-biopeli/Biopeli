import Map from '../../models/map/Map'
import ModelTile from '../../models/map/ModelTile'
import ViewTile from './ViewTile'
import TileType from '../../models/map/TileType'

/**
 * Description goes here
 */
export default class MapView {

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor({ game, map, menu, viewWidthPx, viewHeightPx }) {
    this.game = game
    this.map = map
    this.menu = menu
    this.viewWidthPx = viewWidthPx
    this.viewHeightPx = viewHeightPx
    this.tileWidth = map.tileWidth
    this.tileHeight = map.tileHeight
    this.renderTexture1 = this.game.add.renderTexture(viewWidthPx, viewHeightPx, 'texture1')
    this.renderS = this.game.add.sprite(0, 0, this.renderTexture1)
    this.renderS.fixedToCamera = true
  }

  /**
   * Description goes here
   * @param {Number} cameraX 
   * @param {Number} cameraY 
   */
  drawWithOffset (cameraX, cameraY) {
    // clear the view
    this.renderTexture1.clear()

    // calculate grid coordinates for new view
    var startCol = Math.floor(cameraX / this.tileWidth)
    var endCol = startCol + (this.viewWidthPx / this.tileWidth) + 1
    var startRow = Math.floor(cameraY / this.tileHeight)
    var endRow = startRow + (this.viewHeightPx / this.tileHeight) + 1

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
          var viewTile = new ViewTile({ game: this.game, x: 0, y: 0, modelTile: tile })
          this.renderTexture1.renderXY(viewTile.tileSprite, Math.round(x), Math.round(y))

          // Selection highlight
          if (tile === this.menu.selectedTile) {
            var highlight = this.game.make.graphics()
            highlight.beginFill(0x000000, 0.2)
            highlight.drawRoundedRect(0, 0, this.tileWidth, this.tileHeight, 9)
            highlight.endFill()
            this.renderTexture1.renderXY(highlight, Math.round(x), Math.round(y))
          }
        }
      }
    }
    this.renderS.reset(cameraX, cameraY)
  }
}
