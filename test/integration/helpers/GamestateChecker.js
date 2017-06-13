const assert = require('assert')

export default class GamestateChecker{
  constructor({gameStub, gameState}){
    this.gameStub = gameStub
    this.gameState = gameState
    this.map = gameState.map
    this.menu = gameState.menu
  }

  getTile(x, y){
    return this.map.getTileWithGridCoordinates(x, y)
  }

  checkTilesModelCoordinates(x, y, gridX, gridY){
    var tile = getTile(x, y)
    assert.equal(gridX, tile.x)
    assert.equal(gridY, tile.y)
  }

  checkTilesInformation(x, y, tileType, structureType){
    var tile = getTile(x, y)
    assert.equal(tileType, tile.tileType.name)
    if(structureType != null){
      assert.equal(structureType, tile.structure.structureType.name)
    }else{
      assert(tile.structure == null)
    }
  }

  checkTile(x, y, gridX, gridY, tileType, structureType){
    checkTilesModelCoordinates(x, y, gridX, gridY)
    checkTilesInformation(x, y, tileType, structureType)
  }

  checkSelectedTile(x, y){
    var selected = this.menu.selectedTile

    if(x == null){
      assert(selected == null)
    }else{
      assert.equal(x, selected.x)
      assert.equal(y, selected.y)
    }
  }
}
