import Config from '../../config'

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
   * Creates a graphics object that contains the borders of this tile
   * 
   * @return {Phaser.Graphics}
   */
  makeBorders () {
    var sprite = this.game.make.graphics(this.x, this.y)
    sprite.beginFill(0x8B4513, 1)

    var tile = this.modelTile,
        structure = this.modelTile.owner
    var width = Config.tileWidth * 2,
        height = Config.tileHeight * 2,
        thickness = 3

    if(!structure.ownsTileAt(tile.x+1, tile.y)){ 
      sprite.drawRect(width - thickness, 0, thickness, height)
    }
    if(!structure.ownsTileAt(tile.x-1, tile.y)){ 
      sprite.drawRect(0, 0, thickness, height)
    }
    if(!structure.ownsTileAt(tile.x, tile.y+1)){ 
      sprite.drawRect(0, height - thickness, width, thickness)
    }
    if(!structure.ownsTileAt(tile.x, tile.y-1)){ 
      sprite.drawRect(0, 0, width, thickness)
    }

    sprite.endFill()
    return sprite
  }

  /**
   * Creates the view for the using the asset related to modeltile's type
   * @param {number} x
   * @param {number} y
   * @return {Phaser.Graphics}
   */
  makeTileSprite (x, y) {
    var sprite = this.game.make.sprite(x, y, this.modelTile.tileType.asset)
    
    if(this.modelTile.owner != undefined){
      sprite.addChild(this.makeBorders())
    }

    return sprite
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
}
