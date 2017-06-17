const assert = require('assert')
import config from '../../../src/config'

/**
 * Description goes here
 */
export default class GamestateChecker{

  /**
   * Description goes here
   * 
   * @param {object} param
   * 
   * @param {GameStub} param.gameStub
   * @param {GameState} param.gameState
   */
  constructor({gameStub, gameState}){
    this.gameStub = gameStub
    this.gameState = gameState
    this.map = gameState.map
    this.menu = gameState.menu
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   * 
   * @return {ModelTile} - Tile at (x,y)
   */
  getTile(x, y){
    return this.map.getTileWithPixelCoordinates(x, y)
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} gridX 
   * @param {number} gridY 
   */
  checkTilesModelCoordinates(x, y, gridX, gridY){
    var tile = this.getTile(x, y)
    assert.equal(gridX, tile.x)
    assert.equal(gridY, tile.y)
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {TileType} tileType 
   * @param {StructureType} structureType 
   */
  checkTilesInformation(x, y, tileType, structureType){
    var tile = this.getTile(x, y)
    assert.equal(tileType, tile.tileType.name)
    if(structureType != null){
      assert.equal(structureType, tile.structure.structureType.name)
    }else{
      assert(tile.structure == null)
    }
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} gridX 
   * @param {number} gridY 
   * @param {TileType} tileType 
   * @param {StructureType} structureType 
   */
  checkTile(x, y, gridX, gridY, tileType, structureType){
    this.checkTilesModelCoordinates(x, y, gridX, gridY)
    this.checkTilesInformation(x, y, tileType, structureType)
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   */
  checkSelectedTile(x, y){
    var selected = this.menu.selectedTile

    if(x == null){
      assert(selected == null)
    }else{
      assert.equal(x, selected.x)
      assert.equal(y, selected.y)
    }
  }

  /**
   * Description goes here
   * 
   * @param {{x: number, y: number}} estimated 
   */
  checkCameraLocation(estimated){
    var real = this.gameStub.getCamera()

    assert.equal(estimated.x, real.x)
    assert.equal(estimated.y, real.y)
  }

  /**{
   * Description goes here
   * 
   * @param {{x: number, y: number}} estimated 
   */
  checkTileUnderCamera(estimated){
    var ex = Math.floor(estimated.x / config.tileWidth)
    var ey = Math.floor(estimated.y / config.tileHeight)

    var camera = this.gameStub.getCamera()

    this.checkTilesModelCoordinates(camera.x, camera.y, ex, ey)
  }
}
