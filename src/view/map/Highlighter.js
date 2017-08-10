export default class Highlighter {
  constructor ({ game, tileWidth, tileHeight }) {
    this.game = game
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.landHighlights = []
    this.buildingHighlights = []
  }

  calculateHighlights (selectedTile) {
    this.landHighlights = []
    this.buildingHighlights = []
    let st = selectedTile
    if (st.structure !== null && st.structure.structureType.type === 'refinery') {
      let producers = st.structure.producer.producer.producerHolders
      producers.forEach(
        (capsule) => {
          this.buildingHighlights.push(capsule.producer.producer.tile) 
        }
      )
      let tiles = st.structure.producer.producer.zone
      tiles.forEach((tile) => {
        this.checkIfTileIsLandHighlight(tile.tile)
      })
    }
  }

  checkIfTileIsLandHighlight (tile) {
    if (this.buildingHighlights.includes(tile)) return null
    this.landHighlights.push(tile)
  }

  addHighlights (viewTile, selectedTile) {
    let tile = viewTile.modelTile
    let sprites = []
    if (tile === selectedTile) {
      sprites.push(this.highlight(0.2, true))
    }
    if (selectedTile.structure !== null &&
      selectedTile.structure.structureType.type === 'refinery') {
      this.pushToSpritesIfHighlightsIncludeTile(
        sprites, tile, this.landHighlights, {alpha: 0.2, round: false, color: 'blue'}
        )
      this.pushToSpritesIfHighlightsIncludeTile(
        sprites, tile, this.buildingHighlights, {alpha: 0.5, round: true, color: 'green'}
      )
    }

    sprites.forEach((sprite) => viewTile.addHighlight(sprite))
  }

  pushToSpritesIfHighlightsIncludeTile (sprites, tile, hlArray, hlValues) {
    if (hlArray.includes(tile)) {
      sprites.push(this.highlightBackground())
      sprites.push(this.highlight(hlValues.alpha, hlValues.round, hlValues.color))
    }
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
