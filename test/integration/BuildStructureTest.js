import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Building structures', () => {

  var game, gameState, gameAdvancer, gameStateChecker

  var buildFarm = ({x, y, tileType, firstButton, secondButton}) => {
    gameAdvancer.setTile(x, y, tileType)
    gameAdvancer.clickTile(x, y)
    gameAdvancer.clickNthButton(firstButton)
    gameAdvancer.clickNthButton(secondButton)
  }

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
    gameStateChecker.checkTilesInformation(1, 1, 'grass', 'wheat farm', true)
  })

  it('Can build a dairy farm on grass', () => {
    buildFarm({x: 1, y: 1, tileType: 'grass', firstButton: 3, secondButton: 1})
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'grass', 'dairy farm', true)
  })

  it('Can build a berry farm on grass', () => {
    buildFarm({x: 1, y: 1, tileType: 'grass', firstButton: 4, secondButton: 1})
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'grass', 'berry farm', true)
  })

  it('Building a farm reduces the total amount of money', () => {
    buildFarm({x: 1, y: 1, tileType: 'grass', firstButton: 2, secondButton: 1})
    gameAdvancer.update(1000)
    gameStateChecker.checkMoney(5000)
  })

  it('Cannot build with insufficient funds', () => {
    gameAdvancer.setMoney(765)
    buildFarm({x: 1, y: 1, tileType: 'grass', firstButton: 2, secondButton: 1})
    gameAdvancer.update(1000)
    gameStateChecker.checkMoney(765)
    gameStateChecker.checkSelectedTile(1, 1)
    gameStateChecker.checkTilesInformation(1, 1, 'grass', null, true)
  })

  it('Back button returns to structure type selection', () => {
    buildFarm({x: 1, y: 1, tileType: 'grass', firstButton: 4, secondButton: 2})
    gameStateChecker.checkButtonAmountInMenu(5)
  })

  it('Back button works when insufficient funds', () => {
    gameAdvancer.setMoney(0)
    buildFarm({x: 1, y: 1, tileType: 'grass', firstButton: 4, secondButton: 1})
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkButtonAmountInMenu(5)
  })
})
