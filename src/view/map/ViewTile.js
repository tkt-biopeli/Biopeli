export default class ViewTile{
  constructor ({game, x, y, modelTile}) {
    this.game = game
    this.modelTile = modelTile
    this.tileSprite = this.makeTileSprite(x, y)
    this.structureSprite = null
    
    this.update()
  }

  update () {
    if(this.modelTile.structure != null && this.structureSprite == null){
      this.structureSprite = this.makeStructureSprite()
    } else if(this.modelTile.structure == null && this.structureSprite != null){
      this.structureSprite.destroy()
      this.structureSprite = null
    }
  }

  makeTileSprite (x, y) {
    return this.game.make.sprite(x, y, this.modelTile.tileType.asset)
  }
  
  makeStructureSprite () {
    return this.tileSprite.addChild(this.makeTileSprite(0, 0))
  }
}
