import GameAdvancer from './helpers/GameAdvancer'

describe('Integration test: Building structures', () =>{

  var game
  var gameState
  var gameAdvancer
  var gameStateChecker

  before(() =>{
    gameAdvancer = new GameAdvancer()
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Can build a farm on grass', ()=>{
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.click(0, 0)
    gameAdvancer.clickNthButton(3)
    gameAdvancer.click(0, 0)
    gameStateChecker.checkSelectedTile(0, 0)
    gameStateChecker.checkButtonAmountInMenu(0)  
    gameStateChecker.checkIfTextsExist('Ground type: grass', 'X: 0, Y: 0', 'Structure: farm')
  })

})