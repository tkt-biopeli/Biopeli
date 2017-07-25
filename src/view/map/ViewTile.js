
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
    } else if (this.modelTile.structure == null && this.structureSprite != null) {
      this.structureSprite.destroy()
      this.structureSprite = null
    }
    if (showFlowers) this.addTextSprite(this.modelTile.flowers)
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

  /**
   * Adds a given text as a child for the tile
   * @param {string} toAdd
   */
  addTextSprite (toAdd) {
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
