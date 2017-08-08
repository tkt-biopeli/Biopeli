import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Layers for moisture and fertility', () => {

var gameAdvancer, gameState, gameStateChecker, grass, forest

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Bottom menu has right amount of buttons', () => {
    gameStateChecker.checkButtonAmountInBottomMenu(4)
  })

  it('Flowers are shown when the first button is clicked', () => {
    gameAdvancer.clickNthBottomMenuButton(1)
    gameStateChecker.checkIfFlowersShown()
  })

  it('Fertility is shown when the second button is clicked', () => {
    gameAdvancer.clickNthBottomMenuButton(2)
    gameStateChecker.checkIfFertilityShown()
  })

  it('Moisture is shown when the third button is clicked', () => {
    gameAdvancer.clickNthBottomMenuButton(3)
    gameStateChecker.checkIfMoistureShown()
  })
  
})
