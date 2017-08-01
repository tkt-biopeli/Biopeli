import GameAdvancer from './helpers/GameAdvancer'
const chai = require('chai')
const assert = require('assert')

describe('Integration test: The game is initialized properly when started', () => {

  var game
  var gameState
  var checker
  var gameAdvancer

  var mapWidth
  var mapHeight

  before(() => {
    gameAdvancer = new GameAdvancer({ mapWidth, mapHeight })
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    checker = gameAdvancer.gamestateChecker

    mapWidth = gameAdvancer.mapWidth
    mapHeight = gameAdvancer.mapHeight
  })

  it('All components of the game are created', () => {
    var components = [
      gameState.map,
      gameState.mapView,
      gameState.menuController,
      gameState.menuView,
      gameState.topBarView,
      gameState.topBarController,
      gameState.cameraMover,
      gameState.inputHandler,
      gameState.mapListener,
      gameState.gameTimer,
      gameState.player
    ]

    for (var i = 0; i < components.length; i++) {
      assert(components[i] != null)
    }
  })

  it('Map is initialized with right size', () => {
    for (var i = 0; i < mapWidth; i++) {
      for (var j = 0; j < mapHeight; j++) {
        var tile = gameState.map.getTileWithGridCoordinates(i, j)

        assert(tile)
        assert(tile.tileType)
      }
    }
  })

  it('Map is initialized with mapgen', ()=>{
    var a = gameAdvancer.mapWidth * gameAdvancer.mapHeight * 2
    checker.checkPerlinNoiseCallAmount(a / 2, a, a)
  })

  it('Menu doesn\'t have tile selected', () => {
    assert(gameState.menuController.selectedTile == null)
  })

  it('Updating the game uses same the tiles again, renders multiple times', () => {
    var mockerHandler = game.mockers
    var drawAmount = mockerHandler.callCount('make.sprite')
    var clearAmount = mockerHandler.callCount('render.clear')
    var renderAmount = mockerHandler.callCount('renderXY')


    assert.equal(0, clearAmount)
    assert.equal(0, drawAmount)
    assert.equal(0, renderAmount)

    gameState.update()

    clearAmount = mockerHandler.callCount('render.clear')
    drawAmount = mockerHandler.callCount('make.sprite')
    renderAmount = mockerHandler.callCount('renderXY')

    assert.equal(1, clearAmount)

    gameState.update()

    var newDrawAmount = mockerHandler.callCount('make.sprite')
    var newRenderAmount = mockerHandler.callCount('renderXY')

    assert.equal(drawAmount, newDrawAmount)
    assert.equal(2 * renderAmount, newRenderAmount)
  })

  it('Game starts in left upper corner', () => {
    checker.checkTilesModelCoordinates(1, 1, 0, 0)
  })
})

