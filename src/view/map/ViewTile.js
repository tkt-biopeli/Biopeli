/**
 * Container for all the sprites that are neede to draw
 * one ModelTile from game's map to display.
 * 
 * @export
 * @class ViewTile
 */
export default class ViewTile {
  constructor ({ game, modelTile, tileSize, borderColour, beachId }) {
    this.game = game
    this.modelTile = modelTile    
    this.tileSize = tileSize    
    this.borderColour = borderColour
    this.beachId = beachId    
    this.intialize()
    // this.lived = 0
  }

  /**
   * Called upon creation or reset of a ViewTile
   * Creates all the possible sprites tha ModelTile needs
   * 
   * @memberof ViewTile
   */
  intialize () {
    this.tileSprite = this.makeTileSprite()        
    this.beachSprite = this.makeBeachSprite()
    this.borderSprite = this.makeBorderSprite()
    this.moistureSprite = this.makeMoistureSprite()
    this.fertilitySprite = this.makeFertilitySprite()
    this.structureSprite = this.makeStructureSprite()
    this.hammerSprite = this.makeHammerSprite()
    this.flowerSprite = this.makeFlowerSprite()
    this.highlights = this.tileSprite.addChild(this.game.make.sprite(0, 0))
  }

  /**
   * Called when game updates a frame and this ViewTile was still alive in the screen
   * (= not off-screen)
   * Ensures the ViewTile represents the ModelTile's current state correctly.
   * 
   * @param {any} {showFlowers, showMoisture, showFertility, redraw, borderColour, beachId} 
   * @memberof ViewTile
   */
  update ({showFlowers, showMoisture, showFertility, redraw, borderColour, beachId}) {
    this.borderColour = borderColour
    
    if (redraw) {      
      this.destroy()
      this.beachId = beachId
      this.intialize()
    }
    
    this.hammerFrameUpdate()
    if (showMoisture) this.moistureFrameUpdate()
    if (showFertility) this.fertilityFrameUpdate()
    if (showFlowers) this.flowerFrameUpdate()
        
    this.highlights.removeChildren()
    // this.lived++
  }

  makeTileSprite () {
    if (this.modelTile.tileType.asset === 'forest') return this.makeForestTile()
    let sprite = this.game.make.sprite(0, 0, this.modelTile.tileType.asset)
    sprite.width = this.tileSize.width
    sprite.height = this.tileSize.height
    return sprite
  }

  makeForestTile () {
    let sprite = this.game.make.sprite(0, 0, 'forest')
    sprite.width = this.tileSize.width
    sprite.height = this.tileSize.height
    if (this.modelTile.structure === null) {
      this.treeSprite = this.game.make.sprite(0, 0, 'trees')
      this.treeSprite.width = this.tileSize.width
      this.treeSprite.height = this.tileSize.height
    }
    return sprite
  }

  makeBeachSprite () {
    if (this.modelTile.tileType.name !== 'grass' && this.beachId !== '1111') {
      let asset = 'beach' + this.beachId
      let sprite = this.game.make.sprite(0, 0, this.game.cache.getBitmapData(asset))                
      return this.tileSprite.addChild(sprite)
    }      
  }

  /**
   * creates border graphics based on the surrounding tiles
   * @return {Phaser.Graphics}
   */
  makeBorderSprite () {
    if (this.modelTile.owner === null) return null

    var border = this.game.make.graphics()
    border.beginFill(this.borderColour, 1)

    var tile = this.modelTile
    var structure = this.modelTile.owner
    var width = this.tileSize.width * 2
    var height = this.tileSize.height * 2
    var thickness = 6

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
    
    return this.tileSprite.addChild(border)
  }

  makeFertilitySprite () {
    let value = Math.round(this.modelTile.getFertility())    
    let sprite = this.game.make.sprite(0, 0, 'fertilitysheet', 0)
    sprite.anchor.set(-0.1667, -0.1667)
    return sprite    
  }

  fertilityFrameUpdate () {    
    let value = Math.round(this.modelTile.getFertility())
    if (value === this.fertilitySprite.frame) return
    this.fertilitySprite.frame = value
  }

  makeMoistureSprite () {
    let value = Math.round(this.modelTile.getMoisture())        
    let sprite = this.game.make.sprite(0, 0, 'moisturesheet', value)
    sprite.anchor.set(-0.1667, -0.1667)
    return sprite    
  }

  moistureFrameUpdate () {
    let value = Math.round(this.modelTile.getMoisture()) 
    if (value === this.moistureSprite.frame) return
    this.moistureSprite.frame = value
  }

  /**
   * Creates a structure to be added as a child for the tile
   */
  makeStructureSprite () {
    if (this.modelTile.structure === null) return null
    let sprite = this.game.make.sprite(0, 0, this.modelTile.structure.asset())
    sprite.width = this.tileSize.width
    sprite.height = this.tileSize.height
    return sprite    
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
    return this.structureSprite.addChild(hammers)
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
    daisies.anchor.set(-0.5, -0.5)
    let frame = 10 - this.modelTile.getFlowers()
    if (frame === 10) frame = 9      
    daisies.frame = frame
    return daisies    
  }

  flowerFrameUpdate () {
    if (this.flowerSprite === null) return
    let frame = 10 - this.modelTile.getFlowers()
    if (frame === 10) frame = 9
    this.flowerSprite.frame = frame
  }

  addHighlight (toAdd) {
    this.highlights.width = this.tileSprite.width
    this.highlights.height = this.tileSprite.height
    this.highlights.addChild(toAdd)
  }

  /**
   * Called when this ViewTile goes off-screen or otherwise needs a total overhaul
   * 
   * @memberof ViewTile
   */
  destroy () {
    let array = [
      this.tileSprite, this.structureSprite, this.flowerSprite,
      this.fertilitySprite, this.moistureSprite, this.treeSprite
    ]
    for (var i = 0; i < array.length; i++) {
      let sprite = array[i]
      if (sprite != null) sprite.destroy()
    }
    // console.log("i lived for " + this.lived + " frames")
  }
}
