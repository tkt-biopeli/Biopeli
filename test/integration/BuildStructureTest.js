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
    gameAdvancer.clickTile(1, 1)
    gameStateChecker.checkButtonAmountInMenu(5)
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkButtonAmountInMenu(1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'field', 'wheat farm', true)
  })

  it('Wheat farm buys land and has size and owned farmland', () => {
    gameAdvancer.buildBuilding(0, 0, 'grass', 2)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat farm', true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 9)
  })

  it('Farmland is based on grasstiles, not forest or water', () => {
    gameAdvancer.setTile(1, 1, 'forest')
    gameAdvancer.setTile(0, 1, 'water')
    gameAdvancer.buildBuilding(0, 0, 'grass', 2)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat farm', true)
    gameStateChecker.checkTilesInformation(1, 1, 'forest', null, true)
    gameStateChecker.checkTilesInformation(0, 1, 'water', null, true)
    gameStateChecker.checkTilesInformation(1, 0, 'field', null, true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 9)
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

  it('Can build a mill on grass', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.buildBuilding(1, 1, 'grass', 5)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(1, 1, 'industrial', 'mill', true)
  })

  it('Can not build on tile with structure', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 2)
    gameAdvancer.clickTile(1, 1)
    gameStateChecker.checkButtonAmountInMenu(1)
  })

  it('Can not build producer on tile that is owned', () => {
    gameAdvancer.buildBuilding(1, 1, 'grass', 2)
    gameAdvancer.clickTile(1, 2)
    gameStateChecker.checkButtonAmountInMenu(2)
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

  it('Mill steals land from producer, can be built on owned land', () => {
    gameAdvancer.setMoney(999999)
    gameAdvancer.clickTile(0, 0)
    gameStateChecker.checkButtonAmountInMenu(5)
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkButtonAmountInMenu(1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat farm', true)
    gameStateChecker.checkTilesInformation(0, 1, 'field', null, true)
    gameStateChecker.checkTilesInformation(1, 0, 'field', null, true)
    gameStateChecker.checkTilesInformation(1, 1, 'field', null, true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 9)
    gameAdvancer.clickTile(1, 1)
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(2)
    gameStateChecker.checkButtonAmountInMenu(2)
    gameAdvancer.clickNthButton(1)
    gameStateChecker.checkButtonAmountInMenu(1)
    gameStateChecker.checkSelectedTile()
    gameStateChecker.checkTilesInformation(0, 0, 'field', 'wheat farm', true)
    gameStateChecker.checkTilesInformation(0, 1, 'industrial', null, true)
    gameStateChecker.checkTilesInformation(1, 0, 'industrial', null, true)
    gameStateChecker.checkTilesInformation(1, 1, 'industrial', 'mill', true)
    gameStateChecker.checkStructureOwnedTiles(0, 0, 1)
    gameStateChecker.checkStructureOwnedTiles(1, 1, 8)

  })

})
