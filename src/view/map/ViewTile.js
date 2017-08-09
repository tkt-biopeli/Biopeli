export default class ViewTile {
  constructor ({ game, modelTile, dampnessCol, fertilityCol, tileSize }) {
    this.game = game
    this.modelTile = modelTile
    this.dampnessCol = dampnessCol
    this.tileSize = tileSize
    this.fertilityCol = fertilityCol
    this.intialize()
    // this.lived = 0
  }

  intialize () {
    this.tileSprite = this.makeTileSprite()
    this.borderSprite = this.makeBorderSprite()
    this.dampnessSprite = this.makeDampnessSprite(this.dampnessCol)
    this.fertilitySprite = this.makeFertilitySprite(this.fertilityCol)
    this.structureSprite = this.makeStructureSprite()
    this.hammerSprite = this.makeHammerSprite()
    this.flowerSprite = this.makeFlowerSprite()
    this.highlights = this.tileSprite.addChild(this.game.make.sprite(0, 0))
  }

  update (flowers, dampness, fertility, redrawBorders, redraw) {
    if (this.modelTile.structure != null && this.structureSprite == null) {
      this.structureSprite = this.makeStructureSprite()
      this.hammerSprite = this.makeHammerSprite()
    } else if (this.modelTile.structure == null && this.structureSprite != null) {
      this.structureSprite.destroy()
      this.structureSprite = null
    }

    if (redraw) {
      this.destroy()
      this.intialize()
    } else if (redrawBorders) {
      this.redrawBorders()
    }

    this.highlights.removeChildren()
    this.hammerFrameUpdate()
    this.flowerFrameUpdate()

    this.visibility(dampness, fertility, flowers)
    // this.lived++
  }

  visibility (dampness, fertility, flowers) {
    if (this.dampnessSprite !== null) this.dampnessSprite.visible = dampness
    if (this.fertilitySprite !== null) this.fertilitySprite.visible = fertility
    if (this.flowerSprite !== null) this.flowerSprite.visible = flowers
  }

  redrawBorders () {
    if (this.borderSprite !== null) { this.borderSprite.destroy() }
    this.makeBorderSprite()
  }

  makeTileSprite () {
    var sprite = this.game.make.sprite(0, 0, this.modelTile.tileType.asset)
    return sprite
  }

  /**
   * creates border graphics based on the surrounding tiles
   * @return {Phaser.Graphics}
   */
  makeBorderSprite () {
    if (this.modelTile.owner === null) return null

    var border = this.game.make.graphics()
    border.beginFill(0x000000, 1)

    var tile = this.modelTile
    var structure = this.modelTile.owner
    var width = this.tileSize.width * 2
    var height = this.tileSize.height * 2
    var thickness = 3

    if (!structure.ownsTileAt(tile.x + 1, tile.y)) {
      border.drawRect(width - thickness, 0, thickness, height)
    }
    if (!structure.ownsTileAt(tile.x - 1, tile.y)) {
      border.drawRect(0, 0, thickness, height)
    }
    if (!structure.ownsTileAt(tile.x, tile.y + 1)) {
      border.drawRect(0, height - thickness, width, thickness)
    }
    if (!structure.ownsTileAt(tile.x, tile.y - 1)) {
      border.drawRect(0, 0, width, thickness)
    }

    border.endFill()

    return this.tileSprite.addChildAt(border, 0)
  }

  makeFertilitySprite (colour) {
    return this.makeColourSprite(colour)
  }

  makeDampnessSprite (colour) {
    return this.makeColourSprite(colour)
  }

  makeColourSprite (colour) {
    let clr = colour
    var sprite = this.game.make.graphics()
    sprite.beginFill(clr, 1)
    sprite.drawRoundedRect(32, 32, 64, 64, 20)
    // sprite.anchor.set(0.5, 0.5)
    sprite.endFill()
    let name = this.modelTile.tileType.name
    if (name !== 'water' && name !== 'forest' && name !== 'industrial') {
      this.tileSprite.addChild(sprite)
      return sprite
    } else {
      return null
    }
  }

  /**
   * Creates a structure to be added as a child for the tile
   */
  makeStructureSprite () {
    if (this.modelTile.structure === null) { return null }
    let sprite = this.game.make.sprite(0, 0, this.modelTile.structure.asset())
    return this.tileSprite.addChild(sprite)
  }

  makeHammerSprite () {
    if (this.modelTile.structure === null) { return null }
    let hammers = this.game.make.sprite(0, 0, 'hammers')
    hammers.anchor.set(0.5, 0.5)
    hammers.scale.setTo(0.7, 0.7)
    hammers.frame = Math.max(
      Math.min(
        3, 
        4 - Math.ceil(this.modelTile.structure.health.percent() * 4 + 0.01)
      ), 0
    )
    return this.tileSprite.addChild(hammers)
  }

  hammerFrameUpdate () {
    if (this.hammerSprite === null) return
    this.hammerSprite.frame = Math.max(
      Math.min(
        3, 4 - Math.ceil(this.modelTile.structure.health.percent() * 4 + 0.01)
      ), 0
    )
  }

  /**
   * Adds flowers according to amount in modeltile
   * @param {string} toAdd
   */
  makeFlowerSprite () {
    let daisies = this.game.make.sprite(0, 0, 'daisy')
    daisies.frame = 10 - this.modelTile.flowers
    return this.tileSprite.addChild(daisies)
  }

  flowerFrameUpdate () {
    if (this.flowerSprite === null) return
    this.flowerSprite.frame = 10 - this.modelTile.flowers
  }

  addHighlight (toAdd) {
    this.highlights.width = this.tileSprite.width
    this.highlights.height = this.tileSprite.height
    this.highlights.addChild(toAdd)
  }

  destroy () {
    if (this.tileSprite !== undefined) {
      this.tileSprite.removeChildren()
      this.tileSprite.destroy()
    }
    // console.log("i lived for " + this.lived + " frames")
  }
}
