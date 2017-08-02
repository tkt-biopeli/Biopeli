import ViewTile from './ViewTile'

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
    this.viewTexture.clear()

    var viewArea = this.viewAreaLimits(cameraX, cameraY)
    var offset = this.offset(
      cameraX, cameraY, viewArea.startCol, viewArea.startRow
    )

    this.selectedTile = this.menuController.stateValue('selectedTile')
    this.landHighlights = []
    this.buildingHighlights = []
    if (this.selectedTile !== undefined && this.selectedTile !== null) {
      this.setRefineryHighlights()
    }
    this.fillView(viewArea, offset)
    this.renderS.reset(cameraX, cameraY)
  }

  setRefineryHighlights () {
    let st = this.selectedTile
    if (st.structure !== null && st.structure.structureType.refinery) {
      let producers = st.structure.producer.producer.producerHolders
      producers.forEach(
        (capsule) => {
          this.buildingHighlights.push(capsule.producer.producer.tile)
        }
      )
      let tiles = st.structure.producer.producer.zone
      tiles.forEach((tile) => {
        if (!this.buildingHighlights.includes(tile.tile)) {
          this.landHighlights.push(tile.tile)
        }
      })
    }
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
   * @param {number} startRow
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
  }

  /**
   * Creates a view for a given tile on the map
   * @param {ModelTile} tile
   * @param {{x: number, y: number}} pxCoords
   * @param { ??? } viewArea
   * @param { ??? } offset - not actually used
   */
  createViewTileForFill (tile, pxCoords, viewArea, offset) {
    var viewTile = new ViewTile({
      game: this.game,
      x: 0, 
      y: 0,
      modelTile: tile
    })
    viewTile.update(this.showFlowers)
    this.addHighlights(viewTile, pxCoords)
    viewTile.tileSprite.width = this.tileWidth
    viewTile.tileSprite.height = this.tileHeight
    this.addToViewTexture(viewTile.tileSprite, pxCoords.x, pxCoords.y)
  }

  /**
   * Adds Highlights to the given viewtile with help from highlight function
   * @param {ViewTile} viewTile
   * @param {{x: number, y: number}} pxCoords
   */
  addHighlights (viewTile, pxCoords) {
    let tile = viewTile.modelTile
    let sprites = []
    if (tile === this.selectedTile) {
      sprites.push(this.highlight(0.2, true))
    }
    if (this.landHighlights.includes(tile)) {
      sprites.push(this.highlightBackground())
      sprites.push(this.highlight(0.2, false, 'blue'))
    }
    if (this.buildingHighlights.includes(tile)) {
      sprites.push(this.highlightBackground())
      sprites.push(this.highlight(0.5, true, 'green'))
    }
    sprites.forEach((sprite) => viewTile.addHighlight(sprite))
  }

  /**
   * Helper for highlighting a tile
   */
  highlight (alpha, round, col) {
    let corners = round ? 15 : 1
    let palette = new Map()
    palette.set('black', 0x000000)
    palette.set('blue', 0x1631f8)
    palette.set('yellow', 0xfff600)
    palette.set('red', 0xff0018)
    palette.set('green', 0x00ff06)
    let color = palette.get(col)
    if (color === undefined) { color = palette.get('black') }

    var highlight = this.game.make.graphics()
    highlight.beginFill(color, alpha)
    highlight.drawRoundedRect(0, 0, this.tileWidth, this.tileHeight, corners)
    highlight.endFill()

    return highlight
  }

  /**
   *  Helper for optional highlight background
   */
  highlightBackground () {
    let bg = this.game.make.sprite(0, 0, 'area')
    bg.width = this.tileWidth
    bg.height = this.tileHeight
    bg.alpha = 0.2
    return bg
  }
}
