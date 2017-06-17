
/**
 * Description goes here
 */
export default class ViewTile{

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor ({game, x, y, modelTile}) {
    this.game = game
    this.modelTile = modelTile

    this.tileSprite = game.make.sprite(x, y, modelTile.tileType.asset)

    if(modelTile.structure != null){
      this.makeStructureSprite()
    }
  }

  /**
   * Description goes here
   */
  update(){
    if(this.modelTile.structure != null && this.structureSprite == null){
      this.makeStructureSprite()
    }else if(this.modelTile.structure == null && this.structureSprite != null){
      this.structureSprite.destroy()
      this.structureSprite = null
    }
  }

  /**
   * Description goes here
   */
  makeStructureSprite(){
    this.structureSprite = this.tileSprite.addChild(this.game.make.sprite(0, 0, this.modelTile.structure.asset()))
  }
}
