export default class GameAdvancer{
  constructor({gameStub, gameState}){
    this.gameStub = gameStub
    this.gameState = gameState
  }

  update(){
    gameState.update()
  }

  click(x, y){
    gameStub.setPointer(x, y)
    gameState.inputHandler.onPointerDown()
  }

  pressCursors(up, down, left, right){
    gameStub.setCursors(up, down, left, right)
    gameState.inputHandler.onCursorDown()
  }

  setCamera(x, y){
    gameStub.setCamera(x, y)
  }
}
