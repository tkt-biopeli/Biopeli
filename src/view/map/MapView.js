import Highlighter from './Highlighter'
import ViewTileFactory from './ViewTileFactory'

/**
 * Handles viewing of the game map
 * Uses ViewTiles to compose the whole view inside RenderTexture
 * objects before sending to GPU
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
  constructor ({ game, map, menuController, viewWidthPx, viewHeightPx, config }) {
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
    
    this.highlighter = new Highlighter({ 
      game: game, 
      tileWidth: this.tileWidth, 
      tileHeight: this.tileHeight 
    })
    this.viewTileFactory = new ViewTileFactory({ game: game, map: map, config: config })
    this.initialize()
  }
  
  /**
   * Called upon starting a new game, initializes the RenderTextures
   * used to display the ViewTiles
   * 
   * @memberof MapView
   */
  initialize () {
    this.redraw = true
    this.layers = new Map()
    let layerNames = ['ground', 'visuals', 'structure']    
    for (var i = 0; i < layerNames.length; i++) {
      let name = layerNames[i]
      let texture = this.game.add.renderTexture(this.viewWidthPx, this.viewHeightPx, name)
      let renderS = this.game.add.sprite(0, 0, texture)
      renderS.fixedToCamera = true
      this.layers.set(name, {texture: texture, renderS: renderS})
    }
  }

  /**
   * Draws the map display area of the game screen
   * Called on every frame update, clears the current RenderTextures
   * and fills them up again with ViewTiles
   * 
   * @param {number} cameraX
   * @param {number} cameraY
   */
  draw (cameraX, cameraY) {
    this.selectedTile = this.menuController.stateValue('selectedTile')
    this.highlighter.selectedTile = this.selectedTile
    if (this.selectedTile !== undefined && this.selectedTile !== null) {
      this.highlighter.calculateHighlights(this.selectedTile)
    }

    for (var layer of this.layers.values()) {
      layer.texture.clear()
      layer.renderS.reset(cameraX, cameraY)
    }      

    var viewArea = this.viewAreaLimits(cameraX, cameraY)
    var offset = this.offset(cameraX, cameraY, viewArea.startCol, viewArea.startRow)
    this.fillView(viewArea, offset)
  }

  /**
   * Helper to add a sprite to a certain RenderTexture
   * Coordinates must be previously calculated to match camera location
   * in the game world
   * 
   * @param {any} textureName 
   * @param {any} sprite 
   * @param {any} x 
   * @param {any} y 
   * @memberof MapView
   */
  addToTexture (textureName, sprite, x, y) {
    let layer = this.layers.get(textureName)
    layer.texture.renderXY(sprite, Math.round(x), Math.round(y))
  }

  /**
   * Converts camera location to area of MapGrid coordinates
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
   * Converts MapGrid coordinates in viewArea into pixel coordinates on screen
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
   * Fills the viewArea with ViewTiles
   * @param { ??? } viewArea
   * @param { ??? } offset
   */
  fillView (viewArea, offset) {
    this.viewTileFactory.start(this.showMoisture,
      this.showFertility, this.showFlowers, this.redraw)

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
    this.redraw = false
  }

  /**
   * Creates a ViewTile for a given tile on the map
   * Renders the ViewTile components to different RenderTextures
   * to allow for controlled layering of visual elements.
   * 
   * @param {ModelTile} tile
   * @param {{x: number, y: number}} pxCoords
   * @param { ??? } viewArea
   * @param { ??? } offset - not actually used
   */
  createViewTileForFill (tile, pxCoords, viewArea, offset) {
    let viewTile = this.viewTileFactory.getViewTile(tile)
    // viewTile.tileSprite.width = this.tileWidth
    // viewTile.tileSprite.height = this.tileHeight
    this.addHighlights(viewTile)    
    this.addToTexture('ground', viewTile.tileSprite, pxCoords.x, pxCoords.y)
    if (this.showFertility) {
      this.addToTexture('visuals', viewTile.fertilitySprite, pxCoords.x, pxCoords.y)
    }
    if (this.showMoisture) {
      this.addToTexture('visuals', viewTile.moistureSprite, pxCoords.x, pxCoords.y)
    }
    if (viewTile.treeSprite) {
      this.addToTexture('visuals', viewTile.treeSprite, pxCoords.x, pxCoords.y)
    }
    if (this.showFlowers) {
      this.addToTexture('visuals', viewTile.flowerSprite, pxCoords.x, pxCoords.y)
    }
    if (viewTile.structureSprite) {
      this.addToTexture('structure', viewTile.structureSprite, pxCoords.x, pxCoords.y)
    }
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
    this.redraw = true    
  }

  /**
   * Sets the Fertility, Moisture and Flower layers
   * on / off. Called by game menu controls upon players
   * will.
   * 
   * @memberof MapView
   */
  showFertilityLayer () {
    this.showFertility = !this.showFertility
    this.showMoisture = false
  }

  showMoistureLayer () {
    this.showMoisture = !this.showMoisture
    this.showFertility = false
  }

  showFlowersLayer () {
    this.showFlowers = !this.showFlowers
  }
}
