import config from '../../config'
/**
 * Description goes here
 */
export default class ViewTile {
  /**
   * @param {Phaser.Game} param.game
   * @param {number} param.x
   * @param {number} param.y
   * @param {ModelTile} param.modelTile
   */
  constructor({ game, x, y, modelTile, dampness }) {
    this.game = game
    this.modelTile = modelTile
    /*    if (dampness) {
          this.tileSprite = this.makeDampnessSprite(x, y, dampness)
        } else {*/
    this.tileSprite = this.makeTileSprite(x, y)
    
    // }
    this.structureSprite = null
    // this.update()
  }

  /**
   * Updates the view for the tile
   */
  update (showFlowers, showDampness, showFertility) {
    if (this.modelTile.structure != null && this.structureSprite == null) {
      this.structureSprite = this.makeStructureSprite()
      this.hammerSprite = this.makeHammerSprite()
    } else if (this.modelTile.structure == null && this.structureSprite != null) {
      this.structureSprite.destroy()
      this.structureSprite = null
    }
    if (showFlowers) this.makeFlowerSprite()
    if (showDampness) this.makeDampnessSprite()
  }

  /**
   * creates border graphics based on the surrounding tiles
   * 
   * @return {Phaser.Graphics}
   */
  makeBorderSprite () {
    var border = this.game.make.graphics()
    border.beginFill(0x000000, 1)

    var tile = this.modelTile,
      structure = this.modelTile.owner
    var width = config.tileSize.width * 2,
      height = config.tileSize.height * 2,
      thickness = 3

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
    return border
  }

  /**
   * Creates the view for the using the asset related to modeltile's type
   * @param {number} x
   * @param {number} y
   * @return {Phaser.Sprite}
   */
  makeTileSprite (x, y) {
    var sprite = this.game.make.sprite(x, y, this.modelTile.tileType.asset)
    if (this.modelTile.owner != null) {
      sprite.addChild(this.makeBorderSprite())
    }
    return sprite
  }

  makeDampnessSprite (colour) {
    // var assetsprite = this.game.make.sprite(x, y, this.modelTile.tileType.asset)
    let clr = '0x' + colour
    var sprite = this.game.make.graphics()
    sprite.beginFill(clr, 0.6)
    sprite.drawRoundedRect(0, 0, config.tileSize.width, config.tileSize.height, 20)
    sprite.anchor.set(0.5, 0.5)
    sprite.endFill()
    let name = this.modelTile.tileType.name
    if (name !== 'water' && name !== 'forest' && name !== 'industrial') {
      this.tileSprite.addChild(sprite)
      this.structureSprite !== null ? this.structureSprite.alpha = 0.5 : ''

    }
  
    // return assetsprite
  }

  /**
   * Creates a structure to be added as a child for the tile
   */
  makeStructureSprite () {
    let sprite = this.game.make.sprite(0, 0, this.modelTile.structure.asset())
    return this.tileSprite.addChild(sprite)
  }

  makeHammerSprite () {
    let hammers = this.game.make.sprite(0, 0, 'hammers')
    hammers.anchor.set(0.5, 0.5)
    hammers.scale.setTo(0.7, 0.7)
    hammers.frame = Math.max(Math.min(3, 4 - Math.ceil(this.modelTile.structure.health.percent() * 4 + 0.01)), 0)
    return this.tileSprite.addChild(hammers)
  }

  /**
   * Adds a given text as a child for the tile
   * @param {string} toAdd
   */
  makeFlowerSprite () {
    let daisies = this.game.make.sprite(0, 0, 'daisy')
    daisies.frame = 10 - this.modelTile.flowers
    return this.tileSprite.addChild(daisies)
  }

  addHighlight (toAdd) {
    toAdd.width = this.tileSprite.width
    toAdd.height = this.tileSprite.height
    this.tileSprite.addChild(toAdd)
  }
}