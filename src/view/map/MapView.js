import Map from '../../models/map/Map'
import ModelTile from '../../models/map/ModelTile'
import ViewTile from './ViewTile'
import TileType from '../../models/map/TileType'
export default class MapView {
  constructor({ game, map, menu, viewWidthPx, viewHeightPx }) {
    this.game = game
    this.map = map
    this.menu = menu
    this.viewWidthPx = viewWidthPx
    this.viewHeightPx = viewHeightPx
    this.tileWidth = map.tileWidth
    this.tileHeight = map.tileHeight
    this.initialize()
  }

  initialize () {
    this.viewTexture = this.game.add.renderTexture(this.viewWidthPx, this.viewHeightPx, 'maptexture')
    this.renderS = this.game.add.sprite(0, 0, this.viewTexture)
    this.renderS.fixedToCamera = true
  }

  draw (cameraX, cameraY) {
    this.viewTexture.clear()

    var viewArea = this.viewAreaLimits(cameraX, cameraY)
    var offset = this.offset(cameraX, cameraY, viewArea.startCol, viewArea.startRow)
    this.fillView(viewArea, offset)

    this.renderS.reset(cameraX, cameraY)
  }

  addToViewTexture (sprite, x, y) {
    this.viewTexture.renderXY(sprite, Math.round(x), Math.round(y))
  }

  viewAreaLimits (cameraX, cameraY) {
    var startCol = Math.floor(cameraX / this.tileWidth)
    var startRow = Math.floor(cameraY / this.tileHeight)

    return {
      startCol: startCol,
      endCol: startCol + Math.floor(this.viewWidthPx / this.tileWidth) + 1,
      startRow: startRow,
      endRow: startRow + Math.floor(this.viewHeightPx / this.tileHeight) + 1
    }
  }

  offset (cameraX, cameraY, startCol, startRow) {
    return {
      x: -cameraX + startCol * this.tileWidth,
      y: -cameraY + startRow * this.tileHeight
    }
  }

  ColAndRowToPx (col, row, startCol, startRow, offset) {
    return {
      x: (col - startCol) * this.tileWidth + offset.x,
      y: (row - startRow) * this.tileHeight + offset.y
    }

  }

  fillView (viewArea, offset) {
    for (var c = viewArea.startCol; c <= viewArea.endCol; c++) {
      for (var r = viewArea.startRow; r <= viewArea.endRow; r++) {
        var tile = this.map.getTileWithGridCoordinates(c, r)
        var pxCoords = this.ColAndRowToPx(c, r, viewArea.startCol, viewArea.startRow, offset)

        if (typeof tile !== 'undefined') {
          var viewTile = new ViewTile({ game: this.game, x: 0, y: 0, modelTile: tile })
          this.addToViewTexture(viewTile.tileSprite, pxCoords.x, pxCoords.y)

          if (tile === this.menu.selectedTile) {
            this.addToViewTexture(this.highlight(), pxCoords.x, pxCoords.y)
          }
        }
      }
    }
  }

  highlight () {
    var highlight = this.game.make.graphics()
    highlight.beginFill(0x000000, 0.2)
    highlight.drawRoundedRect(0, 0, this.tileWidth, this.tileHeight, 9)
    highlight.endFill()
    return highlight
  }
}
