import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Building structures', () => {

  var game, gameState, gameAdvancer, gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Can build a wheat farm on grass', () => {
    gameAdvancer.setTile(1, 1, 'grass')
    gameAdvancer.clickTile(1, 1)
    gameStateChecker.checkButtonAmountInMenu(5)
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkButtonAmountInMenu(1)
    
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'wheat farm', true)
  })

  it('Can build a dairy farm on grass', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 3)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'dairy farm', true)
  })

  it('Can build a berry farm on grass', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 4)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'berry farm', true)
  })

  it('Building a farm reduces the total amount of money', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 2)
    gameStateChecker.checkMoney(5000)
  })

  it('Cannot build with insufficient funds', () => {
    gameAdvancer.setMoney(765)
    gameAdvancer.buildBuilding(1, 1, 'grass', 2)
    gameStateChecker.checkMoney(765)
    gameStateChecker.checkSelectedTile(1, 1)
    gameStateChecker.checkTilesInformation(1, 1, 'grass', null, true)
  })

  it('Back button returns to structure type selection', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 4, 2)
    gameStateChecker.checkButtonAmountInMenu(5)
  })

  it('Back button works when insufficient funds', () => {
    gameAdvancer.setMoney(0)
    gameAdvancer.buildBuilding(1, 1, 'grass', 4, 2)
    gameStateChecker.checkButtonAmountInMenu(5)
  })
})
