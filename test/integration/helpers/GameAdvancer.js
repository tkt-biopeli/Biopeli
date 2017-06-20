import GameStub from './GameStub'
import GamestateChecker from './GamestateChecker'
import GameState from '../../../src/game/GameState'
import config from '../../../src/config'
import ModelTile from '../../../src/models/map/ModelTile'
import TileType from '../../../src/models/map/TileType'
import StructureType from '../../../src/models/map/StructureType'
import Structure from '../../../src/models/map/Structure'

/**
 * Provides functions for simulating inputs of user and passing of time
 */
export default class GameAdvancer{

  /**
   * Initializes integration testing game
   */
  constructor(){
    this.mapWidth = 20
    this.mapHeight = 10

    this.game = new GameStub({width: config.gameWidth, height: config.gameHeight})

    this.gameState = new GameState({
      state: this.game,
      mapWidth: this.mapWidth,
      mapHeight: this.mapHeight,
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
      menuWidth: config.menuWidth
    })

    this.gamestateChecker = new GamestateChecker({gameStub: this.game, gameState: this.gameState})

    var cm = this.gameState.cameraMover
    this.cameraXSpeed = cm.x
    this.cameraYSpeed = cm.y

    this.estimatedX = this.game.camera.x
    this.estimatedY = this.game.camera.y

    this.mapRealWidth = this.mapWidth * config.tileWidth
    this.mapRealHeight = this.mapHeight * config.tileHeight

    this.timeObject = {time: 0}
    this.gameState.currentTime = function(timeObject){
      var returnFunction = function() {
        return timeObject.time
      }

      return returnFunction
    }(this.timeObject)
    this.gameState.gameTimer.lastTime = 0

    this.tileTypes = TileType()
    this.structureTypes = StructureType()
  }

  /**
   * Sets the time to wanted number and updates the game
   */
  update(time){
    if(time != null){
      this.timeObject.time = time
    }

    this.gameState.update()
  }

  /**
   * Click nth button that currently exist in menu
   * @param {*} n 
   */
  clickNthButton(n){
    var button = game.getNthActiveButton(n)

    clickButton(button.x+1, button.y+1)
  }

  /**
   * Simulates click of a pointer to certain point in camera
   * 
   * @param {number} x 
   * @param {number} y 
   */
  click(x, y){
    this.game.setPointer(x, y)
    this.gameState.inputHandler.onPointerDown()

    this.clickButton(x, y)
  }

  /**
   * Simulates click of a pointer to certain point in camera but only checks buttons
   * 
   * @param {number} x 
   * @param {number} y 
   */
  clickButton(x, y){
    var xloc = 3
    var yloc = 4
    var widthloc = 7
    var heightloc = 8
    var funcloc = 5
    var contextloc = 6

    var buttons = this.game.mockers.getUnmarkedCalls('make.button')

    for(var i = 0 ; i < buttons.length ; i++){
      var button = buttons[i]

      if (x >= button[xloc] && x <= button[xloc] + button[widthloc]
        && y >= button[yloc] && y <= button[yloc] + button[heightloc]){
        button[funcloc].call(button[contextloc])

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
  pressCursors(up, down, left, right){
    this.game.setCursors(up, down, left, right)
    this.gameState.inputHandler.onCursorDown()

    if(up) (this.estimatedY - this.cameraYSpeed < 0) ? this.estimatedY = 0 : this.estimatedY -= this.cameraYSpeed
    if(left) (this.estimatedX - this.cameraXSpeed < 0) ? this.estimatedX = 0 : this.estimatedX -= this.cameraXSpeed
    if(down) (this.estimatedY + this.cameraYSpeed > this.mapRealHeight) ? this.estimatedY = this.mapRealHeight : this.estimatedY += this.cameraYSpeed
    if(right) (this.estimatedX + this.cameraXSpeed > this.mapRealWidth) ? this.estimatedX = this.mapRealWidth : this.estimatedX += this.cameraXSpeed
  }

  /**
   * Set the camera to wanted location (helper function)
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setCamera(x, y){
    this.game.setCamera(x, y)
    this.estimatedX = x
    this.estimatedY = y
  }

  /**
   * Presumed location of camera
   * 
   * @return {{x: Number, y: Number}}
   */
  estimatedCameraLocation(){
    return {
      x: this.estimatedX,
      y: this.estimatedY
    }
  }

  /**
   * Set camera to starting position
   */
  resetCamera(){
    this.setCamera(0,0)
  }

  /**
   * Helper method hat gives tile from map
   * 
   * @param {*} gridX 
   * @param {*} gridY 
   */
  getTile(gridX, gridY){
    return this.gameState.map.getTileWithGridCoordinates(gridX, gridY)
  }

  /**
   * Sets the tile in map as preferred
   * 
   * @param {*} gridX 
   * @param {*} gridY 
   * @param {*} tileTypeName 
   */
  setTile(gridX, gridY, tileTypeName){
    var tile = new ModelTile(gridX, gridY, this.tileTypes[tileTypeName], null)
    this.gameState.map.addTileWithGridCoordinates(gridX, gridY, tile)
    return tile
  }

  setStructure(gridX, gridY, name, structureTypeName, size, foundingYear){
    var tile = this.getTile(gridX, gridY)
    var structure = new Structure(tile, name, size, this.structureTypes[structureTypeName], foundingYear)

    tile.structure = structure
  }

  setTileWithStructure(gridX, gridY, tileTypeName, structureType, sname, ssize, sfoundingYear){
    this.setTile(gridX, gridY, tileTypeName)
    this.setStructure(gridX, gridY, sname, structureType, ssize, sfoundingYear)
  }
}
