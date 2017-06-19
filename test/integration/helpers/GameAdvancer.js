import GameStub from './GameStub'
import GamestateChecker from './GamestateChecker'
import GameState from '../../../src/game/GameState'
import config from '../../../src/config'

/**
 * Description goes here
 */
export default class GameAdvancer{

  /**
   * Description goes here
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
  }

  /**
   * Description goes here
   */
  update(){
    this.gameState.update()
  }

  /**
   * Description goes here
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
   * Description goes here
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
   * Description goes here
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
   * Description goes here
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
   * Description goes here
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
   * Description goes here
   */
  resetCamera(){
    this.setCamera(0,0)
  }
}