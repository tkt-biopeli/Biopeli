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
  constructor ({ game, x, y, modelTile }) {
    this.game = game
    this.modelTile = modelTile
    this.tileSprite = this.makeTileSprite(x, y)
    this.structureSprite = null
    // this.update()
  }

  /**
   * Updates the view for the tile
   */
  update (showFlowers) {
    if (this.modelTile.structure != null && this.structureSprite == null) {
      this.structureSprite = this.makeStructureSprite()
      this.hammerSprite = this.makeHammerSprite()
    } else if (this.modelTile.structure == null && this.structureSprite != null) {
      this.structureSprite.destroy()
      this.structureSprite = null
    }
    if (showFlowers) this.makeFlowerSprite()
  }

  /**
   * Creates the view for the using the asset related to modeltile's type
   * @param {number} x
   * @param {number} y
   */
  makeTileSprite (x, y) {
    return this.game.make.sprite(x, y, this.modelTile.tileType.asset)
  }

  /**
   * Creates a structure to be added as a child for the tile
   */
  makeStructureSprite () {
    let sprite = this.game.make.sprite(0, 0, this.modelTile.structure.asset())
    return this.tileSprite.addChild(sprite)
  }

  makeHammerSprite () {
    let hammers = this.game.make.sprite(config.tileWidth, config.tileHeight, 'hammers')
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
