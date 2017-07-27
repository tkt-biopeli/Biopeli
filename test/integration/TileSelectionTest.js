import GameAdvancer from './helpers/GameAdvancer'

describe('Integration test: Tile selection shows correctly in Menu', () => {
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

  it('Selecting tile with no structure shows correctly in Menu', () => {
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.click(0, 0)
    gameStateChecker.checkSelectedTile(0, 0)
    gameStateChecker.checkButtonAmountInMenu(4)
    gameStateChecker.checkIfTextsExist('Ground type: grass', 'X: 0, Y: 0')
  })

  it('Selecting tile with built structure shows correct options in Menu', () => {
    gameAdvancer.buildBuilding(0, 0, 'grass', 1)
    gameAdvancer.click(0, 0)
    gameStateChecker.checkSelectedTile(0, 0)
    gameStateChecker.checkButtonAmountInMenu(1)
    gameStateChecker.checkIfTextsExist('Ground type: field', 'X: 0, Y: 0', 'Structure: wheat farm')
  })

  it('Selecting chosen tile again empties the selection', () => {
    gameAdvancer.setTile(0, 0, 'grass')
    gameAdvancer.click(0, 0)
    gameStateChecker.checkSelectedTile(0, 0)
    gameStateChecker.checkButtonAmountInMenu(4)

    gameAdvancer.click(0, 0)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkButtonAmountInMenu(1)
  })
})

