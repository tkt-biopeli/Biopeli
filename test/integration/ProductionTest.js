import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Production tests', () => {
  var gameAdvancer, gameState, gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Demand fulfilled increases after building a continuously-producing structure', () => {
    var production = 0
    gameAdvancer.update(1000)
    gameStateChecker.checkDemandFulfilled(production)
    // build a dairy farm
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 2)
    // check that demandFulfilled has increased
    for (var i = 0; i < 2; i++) {
      gameAdvancer.update(1000)
      production += gameAdvancer.getStructureProductionInTile(1, 1)
      gameStateChecker.checkDemandFulfilled(production)
    }
  })
})