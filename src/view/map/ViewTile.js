export default class ViewTile{
  constructor ({game, x, y, modelTile}) {
    this.game = game
    this.modelTile = modelTile

    this.tileSprite = game.make.sprite(x, y, modelTile.tileType.asset)

    if(modelTile.structure != null){
      this.makeStructureSprite()
    }
  }

  update(){
    if(this.modelTile.structure != null && this.structureSprite == null){
      this.makeStructureSprite()
    }else if(this.modelTile.structure == null && this.structureSprite != null){
      this.structureSprite.destroy()
      this.structureSprite = null
    }
  }

  makeStructureSprite(){
    this.structureSprite = this.tileSprite.addChild(this.game.make.sprite(0, 0, this.modelTile.structure.asset()))
  }
}
