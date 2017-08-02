import Highlighter from './Highlighter'
import ViewTileFactory from './ViewTileFactory'

/**
 * Handles viewing of the game map
 */
export default class MapView {
  /**
   * @param {object} param
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
    this.showFlowers = false
    this.showMoisture = false
    this.showFertility = false
    this.tilesToRedraw = []
    this.highlighter = new Highlighter({ 
      game: game, 
      tileWidth: this.tileWidth, 
      tileHeight: this.tileHeight 
    })
    this.viewTileFactory = new ViewTileFactory({ game: game })
    this.initialize()
  }

  initialize () {
    this.viewTexture = this.game.add.renderTexture(
      this.viewWidthPx, this.viewHeightPx, 'maptexture'
    )
    this.renderS = this.game.add.sprite(0, 0, this.viewTexture)
    this.renderS.fixedToCamera = true
  }

  /**
   * @param {number} cameraX
   * @param {number} cameraY
   */
  draw (cameraX, cameraY) {
    this.selectedTile = this.menuController.stateValue('selectedTile')
    this.highlighter.selectedTile = this.selectedTile
    if (this.selectedTile !== undefined && this.selectedTile !== null) {
      this.highlighter.calculateHighlights(this.selectedTile)
    }

    this.viewTexture.clear()
    var viewArea = this.viewAreaLimits(cameraX, cameraY)
    var offset = this.offset(cameraX, cameraY, viewArea.startCol, viewArea.startRow)
    this.fillView(viewArea, offset)
    this.renderS.reset(cameraX, cameraY)
  }

  /**
   * @param {Phaser.Sprite} sprite
   * @param {number} x
   * @param {number} y
   */
  addToViewTexture (sprite, x, y) {
    this.viewTexture.renderXY(sprite, Math.round(x), Math.round(y))
  }

  /**
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
   * Calculates the amount of tiles shown at borders of the viewed area
   * @param {number} cameraX
   * @param {number} cameraY
   * @param {number} startCol
   * @param {number} startRowtile
   */
  offset (cameraX, cameraY, startCol, startRow) {
    return {
      x: -cameraX + startCol * this.tileWidth,
      y: -cameraY + startRow * this.tileHeight
    }
  }

  /**
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
   * Fills the shown area
   * @param { ??? } viewArea
   * @param { ??? } offset
   */
  fillView (viewArea, offset) {
    this.viewTileFactory.start(this.showMoisture,
      this.showFertility, this.showFlowers, this.tilesToRedraw)

    for (var c = viewArea.startCol; c <= viewArea.endCol; c++) {
      for (var r = viewArea.startRow; r <= viewArea.endRow; r++) {
        var tile = this.map.getTileWithGridCoordinates(c, r)
        var pxCoords = this.ColAndRowToPx(
          c, r, viewArea.startCol, viewArea.startRow, offset
        )
        if (typeof tile !== 'undefined') {
          this.createViewTileForFill(tile, pxCoords, viewArea, offset)
        }
      }
    }

    this.viewTileFactory.stop()
    this.tilesToRedraw = undefined
  }

  /**
   * Creates a view for a given tile on the map
   * @param {ModelTile} tile
   * @param {{x: number, y: number}} pxCoords
   * @param { ??? } viewArea
   * @param { ??? } offset - not actually used
   */
  createViewTileForFill (tile, pxCoords, viewArea, offset) {
    let viewTile = this.viewTileFactory.getViewTile(tile)
    viewTile.tileSprite.width = this.tileWidth
    viewTile.tileSprite.height = this.tileHeight
    this.addHighlights(viewTile)
    this.addToViewTexture(viewTile.tileSprite, pxCoords.x, pxCoords.y)
  }

  /**
   * Adds Highlights to the given viewtile with help from highlight function
   * @param {ViewTile} viewTile
   */
  addHighlights (viewTile) {
    if (this.selectedTile === undefined) return
    this.highlighter.addHighlights(viewTile, this.selectedTile)
  }

  structureCreated (tile) {
    this.tilesToRedraw = tile.structure.ownedTiles
  }
}
