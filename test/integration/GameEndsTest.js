import GameAdvancer from './helpers/GameAdvancer'

describe('Integration test: Game ends when it should', () => {

  var game
  var gameState
  var gameAdvancer
  var gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer(10)
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Game ends when time runs out', () =>{
    gameAdvancer.updateSeveralTimes(10, 1000)
    gameStateChecker.checkGameEnded(true)
  })

  it('Game doesn\'t end before right time', ()=>{
    gameAdvancer.updateSeveralTimes(9, 1000)
    gameStateChecker.checkGameEnded(false)
  })

  it('Clicking end button ends the game', () =>{
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkGameEnded(true)
  })

  it('Game doesn\'t end if nothing is done', ()=>{
    gameStateChecker.checkGameEnded(false)
  })

})