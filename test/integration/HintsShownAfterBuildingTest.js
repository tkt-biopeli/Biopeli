import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: A hint can be read after building a structure', () => {
  var gameAdvancer, gameState, gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    gameAdvancer.gameState.telegramStorage.hints = true
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Hint is shown in telegram only after building', () => {
    gameAdvancer.updateSeveralTimes(5, 1000)
    gameStateChecker.checkStructureHintShown(false)
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 1, 1)
    gameAdvancer.update(1000)
    gameStateChecker.checkStructureHintShown(true)
  })
})