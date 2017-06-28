import GameStub from './GameStub'
import GamestateChecker from './GamestateChecker'
import GameState from '../../../src/game/GameState'
import config from '../../../src/config'
import ModelTile from '../../../src/models/map/ModelTile'
import StaticTypes from '../../../src/models/StaticTypes'
import StructureType from '../../../src/models/map/StructureType'
import Structure from '../../../src/models/map/Structure'
const assert = require("assert")

/**
 * Provides functions for simulating inputs of user and passing of time
 */
export default class GameAdvancer {

  /**
   * Initializes integration testing game
   */
  constructor() {
    this.mapWidth = 20
    this.mapHeight = 10

    this.game = new GameStub({ width: config.gameWidth, height: config.gameHeight })

    this.gameState = new GameState({
      state: this.game,
      mapWidth: this.mapWidth,
      mapHeight: this.mapHeight,
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
      menuWidth: config.menuWidth
    })

    this.gamestateChecker = new GamestateChecker({ gameStub: this.game, gameState: this.gameState })

    var cm = this.gameState.cameraMover
    this.cameraXSpeed = cm.x
    this.cameraYSpeed = cm.y

    this.estimatedX = this.game.camera.x
    this.estimatedY = this.game.camera.y


    this.mapRealWidth = this.mapWidth * config.tileWidth
    this.mapRealHeight = this.mapHeight * config.tileHeight

    this.timeObject = { time: 0 }
    this.gameState.currentTime = function (timeObject) {
      var returnFunction = function () {
        return timeObject.time
      }

      return returnFunction
    }(this.timeObject)
    this.gameState.gameTimer.lastTime = 0

    this.tileTypes = StaticTypes.tileTypes
    this.structureTypes = StructureType()

  }

  /**
   * Sets the time to wanted number and updates the game
   */
  update(time) {
    if (time != null) {
      this.timeObject.time = time
    }

    this.gameState.update()
  }

  /**
  * Makes several update calls with wanted time interval
  * @param {*} times 
  * @param {*} interval 
  */
  updateSeveralTimes(times, interval) {
    for (let i = 0; i < times; i++) {
      this.update(interval * (i + 1))
    }
  }

  /**
   * Click nth button that currently exist in menu
   * @param {*} n 
   */
  clickNthButton(n) {
    var button = this.gameState.menuView.activeButtons[n - 1]

    this.clickButton(button.x, button.y)
  }

  /**
   * Simulates click of a pointer to certain point in camera
   * 
   * @param {number} x 
   * @param {number} y 
   */
  click(x, y) {
    this.game.setPointer(x, y)
    this.clickButton(x, y)
    this.gameState.inputHandler.onPointerDown()

  }

  /**
   * Simulates click of a pointer to certain point in camera but only checks buttons
   * 
   * @param {number} x 
   * @param {number} y 
   */
  clickButton(x, y) {
    var buttons = this.gameState.menuView.activeButtons

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i]

      if (x == button.x && y == button.y) {
        button.callback.call(button.context)

        return
      }
    }

  }

  /**
   * Simulates cursor input
   * 
   * @param {boolean} up 
   * @param {boolean} down 
   * @param {boolean} left 
   * @param {boolean} right 
   */
  pressCursors(up, down, left, right) {
    this.game.setCursors(up, down, left, right)
    this.gameState.inputHandler.onCursorDown()

    if (up) (this.estimatedY - this.cameraYSpeed < 0) ? this.estimatedY = 0 : this.estimatedY -= this.cameraYSpeed
    if (left) (this.estimatedX - this.cameraXSpeed < 0) ? this.estimatedX = 0 : this.estimatedX -= this.cameraXSpeed
    if (down) (this.estimatedY + this.cameraYSpeed > this.mapRealHeight) ? this.estimatedY = this.mapRealHeight : this.estimatedY += this.cameraYSpeed
    if (right) (this.estimatedX + this.cameraXSpeed > this.mapRealWidth) ? this.estimatedX = this.mapRealWidth : this.estimatedX += this.cameraXSpeed
  }

  /**
   * Set the camera to wanted location (helper function)
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setCamera(x, y) {
    this.game.setCamera(x, y)
    this.estimatedX = x
    this.estimatedY = y
  }

  /**
   * Presumed location of camera
   * 
   * @return {{x: Number, y: Number}}
   */
  estimatedCameraLocation() {
    return {
      x: this.estimatedX,
      y: this.estimatedY
    }
  }

  /**
   * Set camera to starting position
   */
  resetCamera() {
    this.setCamera(0, 0)
  }

  /**
   * Helper method hat gives tile from map
   * 
   * @param {*} gridX 
   * @param {*} gridY 
   */
  getTile(gridX, gridY) {
    return this.gameState.map.getTileWithGridCoordinates(gridX, gridY)
  }

  /**
   * Sets the tile in map as preferred
   * 
   * @param {*} gridX 
   * @param {*} gridY 
   * @param {*} tileTypeName 
   */
  setTile(gridX, gridY, tileTypeName) {
    return this.gameState.map.addTileWithGridCoordinates(gridX, gridY, this.tileTypes[tileTypeName])
  }

  setStructure(gridX, gridY, name, structureTypeName, size, foundingYear) {
    var tile = this.getTile(gridX, gridY)
    var structure = new Structure({
      tile: tile,
      name: name,
      size: size,
      structureType: this.structureTypes[structureTypeName],
      foundingYear: foundingYear
    })

    tile.structure = structure
  }

  setTileWithStructure(gridX, gridY, tileTypeName, structureType, sname, ssize, sfoundingYear) {
    this.setTile(gridX, gridY, tileTypeName)
    this.setStructure(gridX, gridY, sname, structureType, ssize, sfoundingYear)
  }
}
