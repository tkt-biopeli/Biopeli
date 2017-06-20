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

  it('Can build a farm on grass', () =>{
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.click(0, 0)
    //clickaus ei ttee kuten halutaan
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkTilesInformation(0, 0, 'grass', null)
    gameStateChecker.checkSelectedTile(0, 0)
  })

})