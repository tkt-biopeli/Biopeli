import GameAdvancer from './helpers/GameAdvancer'

describe('Integration test: Time advances, shows in top bar', () => {

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

  it('Time displays correclty at init', () => {
    gameStateChecker.checkTime('1980 / 01 / 1')
  })

  it('Time advances correctly for a week', () => {
    gameAdvancer.update(1000)
    gameStateChecker.checkTime('1980 / 01 / 2')
  })

  it('Time advances correctly for a month', () => {
    gameAdvancer.updateSeveralTimes(4, 1000)
    gameStateChecker.checkTime('1980 / 02 / 1')
  })
  
  it('Time advances correctly for a year', () => {
    gameAdvancer.updateSeveralTimes(48, 1000)
    gameStateChecker.checkTime('1981 / 01 / 1')
  })

  it('Time does not jump or round', () => {
    gameAdvancer.update(999)
    gameStateChecker.checkTime('1980 / 01 / 1')
  })

  it('Front zero works properly', () => {
    gameAdvancer.updateSeveralTimes(40, 1000)
    gameStateChecker.checkTime('1980 / 11 / 1')
  })
})
