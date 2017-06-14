import GameStub from './GameStub'
import GamestateChecker from './GamestateChecker'
import GameState from '../../../src/game/GameState'
import config from '../../../src/config'

export default class GameAdvancer{

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
  }

  update(){
    this.gameState.update()
  }

  click(x, y){
    this.gameStub.setPointer(x, y)
    this.gameState.inputHandler.onPointerDown()
  }

  pressCursors(up, down, left, right){
    this.gameStub.setCursors(up, down, left, right)
    this.gameState.inputHandler.onCursorDown()
  }

  setCamera(x, y){
    this.gameStub.setCamera(x, y)
  }
}
