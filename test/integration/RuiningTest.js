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
    gameAdvancer.buildBuilding(0, 0, 'grass', 4)
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
    gameAdvancer.buildBuilding(0, 0, 'grass', 4)
    gameAdvancer.update(1000)
    gameAdvancer.buildBuilding(0, 5, 'grass', 4)
    gameAdvancer.update(1000)

    gameStateChecker.checkStructureRuinAmount(0, 0, 7)
    gameStateChecker.checkStructureRuinAmount(0, 5, 8)

    gameAdvancer.update(1000)

    gameStateChecker.checkStructureRuinAmount(0, 0, 7)
    gameStateChecker.checkStructureRuinAmount(0, 5, 7)
  })

  it('Fixing buildings is possible and costs money', ()=>{
    gameAdvancer.buildBuilding(0, 0, 'grass', 4)

    gameAdvancer.updateSeveralTimes(2, 1000)

    gameAdvancer.setMoney(10000)
    gameAdvancer.click(1, 1)
    gameAdvancer.clickNthButton(2)

    gameStateChecker.checkMoneyUnder(10000)
    gameStateChecker.checkSelectedTile(0, 0)
    gameStateChecker.checkStructureRuinAmount(0, 0, 8)
  })

  it('Trying to fix non-ruidner building doesn\'t cost money', ()=>{
    gameAdvancer.buildBuilding(0, 0, 'grass', 4)
    gameAdvancer.setMoney(10000)
    gameAdvancer.click(1, 1)
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkMoney(10000)
  })
})