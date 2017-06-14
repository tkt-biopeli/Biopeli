import GameStub from './helpers/GameStub'
import GameState from '../../src/game/GameState'
import config from '../../src/config'
const assert = require('assert')

describe('The game is initialized properly when started', ()=>{

  var game
  var gameState

  before(() =>{
    game = new GameStub({width: config.gameWidth, height: config.gameHeight})

    gameState = new GameState({
      state: game,
      mapWidth: config.mapWidth,
      mapHeight: config.mapHeight,
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
      menuWidth: config.menuWidth
    })
  })

  it('All components of the game are created', ()=>{
    var components = [
      gameState.map,
      gameState.mapView,
      gameState.menu,
      gameState.menuView,
      gameState.cameraMover,
      gameState.inputHandler,
      gameState.mapListener,
      gameState.menuOptionCreator,
      gameState.player
    ]

    for(var i = 0 ; i < components.length ; i++){
      assert(components[i] != null)
    }
  })

  it('Map is initialized with right size', ()=>{
    for(var i = 0 ; i < config.mapWidth ; i++){
      for(var j = 0 ; j < config.mapHeight ; j++){
        var tile = gameState.map.getTileWithGridCoordinates(i,j)
        assert(tile != null)
        assert(tile.tileType != null)
      }
    }
  })

  it('Menu doesn\'t have tile selected', () =>{
    assert(gameState.menu.selectedTile == null)
  })

  it('Updating the game draws the tiles again', () =>{
    var mockerHandler = game.mockers
    var drawAmount = mockerHandler.callCount('make.sprite')
    var clearAmount = mockerHandler.callCount('render.clear')

    assert.equal(0, clearAmount)

    gameState.update()

    var newDrawAmount = mockerHandler.callCount('make.sprite')
    clearAmount = mockerHandler.callCount('render.clear')

    assert.equal(1, clearAmount)
    assert.equal(2*drawAmount, newDrawAmount)
  })
})
