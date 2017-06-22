
/**
 * Description goes here
 */
export default class ViewTile {
  /**
   * Description goes here
   *
   * @param {object} param
   *
   * @param {Phaser.Game} param.game
   * @param {number} param.x
   * @param {number} param.y
   * @param {ModelTile} param.modelTile
   */
  constructor ({game, x, y, modelTile}) {
    this.game = game
    this.modelTile = modelTile
    this.tileSprite = this.makeTileSprite(x, y)
    this.structureSprite = null

    this.update()
  }

  /**
   * Description goes here
   */
  update () {
    if (this.modelTile.structure != null && this.structureSprite == null) {
      this.structureSprite = this.makeStructureSprite()
    } else if (this.modelTile.structure == null && this.structureSprite != null) {
      this.structureSprite.destroy()
      this.structureSprite = null
    }
  }

  /**
   * Description goes here
   *
   * @param {number} x
   * @param {number} y
   */
  makeTileSprite (x, y) {
    return this.game.make.sprite(x, y, this.modelTile.tileType.asset)
  }

  /**
   * Description goes here
   */
  makeStructureSprite () {
    let sprite = this.game.make.sprite(0, 0, this.modelTile.structure.asset())
    return this.tileSprite.addChild(sprite)
  }
}
