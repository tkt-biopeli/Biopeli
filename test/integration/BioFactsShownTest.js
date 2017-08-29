import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Bio fact occurrence tests', () => {
  var gameAdvancer, gameState, gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    gameAdvancer.deactivateBioFacts()

    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Bio fact is shown', () => {
    gameAdvancer.updateSeveralTimes(5, 1000)
    gameStateChecker.checkBioFactShown(false)
    gameAdvancer.activateBioFacts()
    gameAdvancer.update(1000)
    gameStateChecker.checkBioFactShown(true)
  })
})