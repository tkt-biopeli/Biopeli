import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Structures ruin by time', () => {
  var gameAdvancer
  var gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    gameStateChecker = gameAdvancer.gamestateChecker
    gameAdvancer.setRuiningTime(2)
  })

  it('Buildings ruin when they should ruin', ()=>{
    gameAdvancer.setMoney(9999999)
    gameAdvancer.update(1000)
    gameAdvancer.buildBuilding(0, 0, 'grass', 3)
    gameStateChecker.checkStructureRuinAmount(0, 0, 8)

    gameAdvancer.update(1000)
    gameStateChecker.checkStructureRuinAmount(0, 0, 8)

    gameAdvancer.update(1000)
    gameStateChecker.checkStructureRuinAmount(0, 0, 7)

    gameAdvancer.updateSeveralTimes(4, 1000)
    gameStateChecker.checkStructureRuinAmount(0, 0, 5)

    gameAdvancer.updateSeveralTimes(20, 1000)
    gameStateChecker.checkStructureRuinAmount(0, 0, 0)
  })

  it('Several buildings ruin independently', ()=>{
    gameAdvancer.setMoney(9999999)
    gameAdvancer.update(1000)
    gameAdvancer.buildBuilding(0, 0, 'grass', 3)
    gameAdvancer.update(1000)
    gameAdvancer.buildBuilding(0, 5, 'grass', 3)
    gameAdvancer.update(1000)

    gameStateChecker.checkStructureRuinAmount(0, 0, 7)
    gameStateChecker.checkStructureRuinAmount(0, 5, 8)

    gameAdvancer.update(1000)

    gameStateChecker.checkStructureRuinAmount(0, 0, 7)
    gameStateChecker.checkStructureRuinAmount(0, 5, 7)
  })
})