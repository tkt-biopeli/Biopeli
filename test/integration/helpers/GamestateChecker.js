const assert = require('assert')
import config from '../../../src/config'

/**
 * Provides functions to check if the state of the game is wanted
 */
export default class GamestateChecker {

  /**
   * Constructor
   * 
   * @param {GameStub} param.gameStub
   * @param {GameState} param.gameState
   */
  constructor({ gameStub, gameState, gameAdvancer }) {
    this.gameStub = gameStub
    this.gameState = gameState
    this.map = gameState.map
    this.menuController = gameState.menuController
    this.gameAdvancer = gameAdvancer
  }

  /**
   * Helper method for getting tile from map
   * 
   * @param {number} x 
   * @param {number} y 
   * 
   * @return {ModelTile} - Tile at (x,y)
   */
  getTilePixel(x, y) {
    return this.map.getTileWithPixelCoordinates(x, y)
  }

  getTileModel(x, y) {
    return this.map.getTileWithGridCoordinates(x, y)
  }

  /**
   * Checks if tile in the part of the screen has wanted grid coordinates
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} gridX 
   * @param {number} gridY 
   */
  checkTilesModelCoordinates(x, y, gridX, gridY) {
    var tile = this.getTilePixel(x, y)
    assert.equal(gridX, tile.x)
    assert.equal(gridY, tile.y)
  }

  /**
   * Checks if the tile in screen coordinates has wanted tileType and structureType
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {TileType} tileType 
   * @param {string} structureType 
   */
  checkTilesInformation(x, y, tileType, structureType, modelCoords) {
    var tile
    if(modelCoords){
      tile = this.getTileModel(x, y)
    }else{
      tile = this.getTilePixel(x, y)
    }

    assert.equal(tileType, tile.tileType.name)
    if (structureType != null) {
      assert.equal(structureType, tile.structure.structureType.name)
    } else {
      assert(tile.structure == null)
    }
  }

  /**
   * Checks all information of tile in given screen coordinates
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} gridX 
   * @param {number} gridY 
   * @param {TileType} tileType 
   * @param {StructureType} structureType 
   */
  checkTile(x, y, gridX, gridY, tileType, structureType) {
    this.checkTilesModelCoordinates(x, y, gridX, gridY)
    this.checkTilesInformation(x, y, tileType, structureType)
  }

  /**
   * Checks if the chosen tiel of menu is wanted one
   * 
   * @param {number} x 
   * @param {number} y 
   */
  checkSelectedTile(x, y) {
    var selected = this.menuController.state.get('selectedTile')

    if (x == null) {
      assert(selected == null)
    } else {
      assert.equal(x, selected.x)
      assert.equal(y, selected.y)
    }
  }

  /**
   * Checks if camera is where it is estimated to be
   * 
   * @param {{x: number, y: number}} estimated 
   */
  checkCameraLocation(estimated) {
    var real = this.gameStub.getCamera()
    assert.equal(estimated.x, real.x)
    assert.equal(estimated.y, real.y)
  }

  /**{
   * Checks if tile under camera is the one we think it is
   * 
   * @param {{x: number, y: number}} estimated 
   */
  checkTileUnderCamera(estimated) {
    var ex = Math.floor(estimated.x / config.tileWidth)
    var ey = Math.floor(estimated.y / config.tileHeight)
    var camera = this.gameStub.getCamera()
    this.checkTilesModelCoordinates(camera.x, camera.y, ex, ey)
  }

  /**
   * Checks if there is n buttons in menu
   * 
   * @param {int} expectedAmount 
   */
  checkButtonAmountInMenu(expectedAmount) {
    var buttons = this.gameState.menuView.activeButtons
    assert.equal(expectedAmount, buttons.length)
  }

  checkIfTextsExist(...texts) {
    var textImages = this.gameState.menuView.activeTexts

    for (let text of texts) {
      var found = false

      for (let image of textImages) {
        var itext = image.text.text
        if (itext.indexOf(text) !== -1) {
          found = true
          break
        }
      }

      assert(found, "Text \'" + text + "\' not found")
    }
  }

  /**
   * Checks if the game time is correct
   * 
   * @param {int} time
   */
  checkTime(time) {
    var text = this.gameState.topBarView.activeTexts[0].text.text
    assert.equal(time, text)
  }
  
  /**
   * Checks if the total score is correct
   * 
   * @param {int} score
   */
  checkScore(score) {
    var text = this.gameState.topBarView.activeTexts[1].text.text
    assert.equal(score, text)
  }

  /**
   * Checks if the total amount of money is correct
   * 
   * @param {int} money
   */
  checkMoney(money) {
    var text = this.gameState.topBarView.activeTexts[2].text.text
    assert.equal(money, text)
  }

  checkGameEnded(has) {
    var mockerCalls = this.gameStub.mockers.callCount('end')

    assert(has == (mockerCalls > 0))
  }
}
