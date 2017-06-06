export default class ViewTile{
  constructor ({game, x, y, modelTile}) {
    this.game = game
    this.modelTile = modelTile

    this.tileSprite = game.make.sprite(x, y, modelTile.tileType.asset)

    if(modelTile.structure != null){
      makeStructureSprite()
    }
  }

  update(){
    if(this.modelTile.structure != null && this.structureSprite == null){
      makeStructureSprite()
    }else if(this.modelTile.structure == null && this.structureSprite != null){
      this.structureSprite.destroy()
      this.structureSprite = null
    }
  }

  makeStructureSprite(){
    this.structureSprte = this.tileSprite.addChild(game.make.sprite(0, 0, modelTile.structure.asset()))
  }
}
