import GameAdvancer from './helpers/GameAdvancer'

describe('Integration test: Score increases in top bar', () => {
  var game
  var gameState
  var gameAdvancer
  var gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Total score is 10 at start', () => {
    gameStateChecker.checkScore('10')
  })
  
  it('Total score increases by 10 in a week', () => {
    gameAdvancer.update(1000)
    gameStateChecker.checkScore('20')
  })
})

