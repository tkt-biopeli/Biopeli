import ViewTile from './ViewTile'

/**
 * Description goes here
 */
export default class MapView {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {Phaser.Game} param.game
   * @param {Map} param.map
   * @param {Menu} param.menu
   * @param {number} param.viewWidthPx
   * @param {number} param.viewHeightPx
   */
  constructor ({ game, map, menuController, viewWidthPx, viewHeightPx }) {
    this.game = game
    this.map = map
    this.menuController = menuController
    this.viewWidthPx = viewWidthPx
    this.viewHeightPx = viewHeightPx
    this.tileWidth = map.tileWidth
    this.tileHeight = map.tileHeight
    this.initialize()
  }

  /**
   * Description goes here
   */
  initialize () {
    this.viewTexture = this.game.add.renderTexture(this.viewWidthPx, this.viewHeightPx, 'maptexture')
    this.renderS = this.game.add.sprite(0, 0, this.viewTexture)
    this.renderS.fixedToCamera = true
  }

  /**
   * Description goes here
   *
   * @param {number} cameraX
   * @param {number} cameraY
   */
  draw (cameraX, cameraY) {
    this.viewTexture.clear()

    var viewArea = this.viewAreaLimits(cameraX, cameraY)
    var offset = this.offset(cameraX, cameraY, viewArea.startCol, viewArea.startRow)
    this.fillView(viewArea, offset)
    this.renderS.reset(cameraX, cameraY)
  }

  /**
   * Description goes here
   *
   * @param {Phaser.Sprite} sprite
   * @param {number} x
   * @param {number} y
   */
  addToViewTexture (sprite, x, y) {
    this.viewTexture.renderXY(sprite, Math.round(x), Math.round(y))
  }

  /**
   * Description goes here
   *
   * @param {number} cameraX
   * @param {number} cameraY
   */
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

  /**
   * Description goes here
   *
   * @param {number} cameraX
   * @param {number} cameraY
   * @param {number} startCol
   * @param {number} startRow
   */
  offset (cameraX, cameraY, startCol, startRow) {
    return {
      x: -cameraX + startCol * this.tileWidth,
      y: -cameraY + startRow * this.tileHeight
    }
  }

  /**
   * Description goes here
   *
   * @param {number} col
   * @param {number} row
   * @param {number} startCol
   * @param {number} startRow
   * @param {{x: number, y: number}} offset
   */
  ColAndRowToPx (col, row, startCol, startRow, offset) {
    return {
      x: (col - startCol) * this.tileWidth + offset.x,
      y: (row - startRow) * this.tileHeight + offset.y
    }
  }

  /**
   * Description goes here
   *
   * @param { ??? } viewArea
   * @param { ??? } offset
   */
  fillView (viewArea, offset) {
    for (var c = viewArea.startCol; c <= viewArea.endCol; c++) {
      for (var r = viewArea.startRow; r <= viewArea.endRow; r++) {
        var tile = this.map.getTileWithGridCoordinates(c, r)
        var pxCoords = this.ColAndRowToPx(c, r, viewArea.startCol, viewArea.startRow, offset)
        if (typeof tile !== 'undefined') this.createViewTileForFill(tile, pxCoords, viewArea, offset)
      }
    }
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   * @param {{x: number, y: number}} pxCoords
   * @param { ??? } viewArea
   * @param { ??? } offset - not actually used
   */
  createViewTileForFill (tile, pxCoords, viewArea, offset) {
    var viewTile = new ViewTile({ game: this.game, x: 0, y: 0, modelTile: tile })
    viewTile.update()
    viewTile.tileSprite.scale.setTo(0.5)
    this.addToViewTexture(viewTile.tileSprite, pxCoords.x, pxCoords.y)
    this.highlightSelectedTile(tile, pxCoords)
  }

  /**
   * Description goes here
   * @param {ModelTile} tile
   * @param {{x: number, y: number}} pxCoords
   */
  highlightSelectedTile (tile, pxCoords) {
    if (tile === this.menuController.stateValue('selectedTile')) {
      this.addToViewTexture(this.highlight(), pxCoords.x, pxCoords.y)
    }
  }

  /**
   * Description goes here
   * @return { ??? }
   */
  highlight () {
    var highlight = this.game.make.graphics()
    highlight.beginFill(0x000000, 0.2)
    highlight.drawRoundedRect(0, 0, this.tileWidth, this.tileHeight, 9)
    highlight.endFill()
    return highlight
  }
}
