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
    gameAdvancer.update(1000)
    gameStateChecker.checkDemandFulfilled(0)
    // build a dairy farm
    gameAdvancer.buildBuilding(1, 1, 'grass', 1, 2)

    gameAdvancer.update(1000)
    var productionPerUpdate = gameAdvancer.getStructureProductionInTile(1, 1)
    gameStateChecker.checkDemandFulfilled(productionPerUpdate)
    //
    gameAdvancer.update(1000)
    productionPerUpdate += gameAdvancer.getStructureProductionInTile(1, 1)
    gameStateChecker.checkDemandFulfilled(productionPerUpdate)
  })
})