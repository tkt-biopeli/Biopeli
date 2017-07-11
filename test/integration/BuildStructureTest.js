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

  it('Can build a berry farm on grass', () => {
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.click(0, 0)
    gameAdvancer.clickNthButton(4)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'grass', 'berry farm')
  })
})
