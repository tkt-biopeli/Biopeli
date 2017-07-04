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

  it('Total score is zero at start', () => {
    gameStateChecker.checkScore('0')
  })

  // production tests
})
