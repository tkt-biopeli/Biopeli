import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Building structures', () => {

  var game
  var gameState
  var gameAdvancer
  var gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Can build a farm on grass', () => {
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.click(0, 0)

    gameAdvancer.clickNthButton(3)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'grass', 'farm')
  })
})