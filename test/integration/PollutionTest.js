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

  it('Check that building a farm creates pollution on farm', () => {
    gameAdvancer.setTile(1, 1, 'grass')
    gameAdvancer.clickTile(1, 1)
    gameAdvancer.clickNthButton(1)
    gameAdvancer.clickNthButton(1)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkPollution(1, 1, 8)
  })

  it('Pollution created correctly around farm', () => {
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.setTile(0, 1, 'grass')
    gameAdvancer.setTile(0, 2, 'grass')
    gameAdvancer.setTile(0, 3, 'grass')
    gameAdvancer.clickTile(0, 0)
    gameAdvancer.clickNthButton(1)
    gameAdvancer.clickNthButton(1)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkPollution(0, 0, 8)
    gameStateChecker.checkPollution(0, 1, 8)
    gameStateChecker.checkPollution(0, 2, 8)
    gameStateChecker.checkPollution(0, 3, 8)
  })

  it('Multiple structures create cumulative pollution', () => {
    gameAdvancer.setMoney(10000000)
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.setTile(0, 3, 'grass')
    gameAdvancer.buildBuilding(0, 0, 'grass', 1, 1)
    gameAdvancer.buildBuilding(0, 3, 'grass', 1, 1)
    gameStateChecker.checkPollution(0, 1, 6)
  })
})