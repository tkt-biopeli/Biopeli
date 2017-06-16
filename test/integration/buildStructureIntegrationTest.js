
/*
import '../../src/main.js'

class GameStub {
  constructor(){
    
  }
}

describe('Building strutctures integration tests', function(){
  var assert = require('assert')

  var game
  var events

  var structTypes
  var tileTypes


  before(function() {
    resetEvents()

    game = new Game()
    game.state.GameState.inputHandler = {
      getEvents: function() {return events}
    }

    structTypes = game.GameState.structureTypes
    tileTypes = game.state.tileTypes
  })

  function resetEvents(){
    events = {
      cursor: {
        up   : false,
        down : false,
        left : false,
        right: false
      },
      pointer: undefined
    }
  }

  function click({x,y}){
    resetEvents()
    events.pointer = {x,y}
    game.GameState.update()
    resetEvents()
  }

  function buildOnTile({x,y}, type){
    var tilePos = {x: x, y: y}
    var menuPos = {x: 'BUTTON X POSITION', y: 'BUTTON Y POSITION'}

    click(tilePos)
    click(menuPos)
  }

  function assertStructType({x,y}, desired){
    var tile = game.GameState.map.getTileWithPixelCoordinates(x, y)
    assert(tile.structure.structureType == desired)
  }

  function findSuitableTile(desiredType){
    var map = game.GameState.map
    var x, y, tile

    for(y = 0; y < map.gridSizeY; y++){
      for(x= 0; x < map.gridSizeX; x++){
        tile = map.getTileWithGridCoordinates(x, y)
        if(tile.tileType == desiredType)
          break;
      }
    }

    if(tile == undefined)
      throw 'no suitable tile found'

    return {x: x, y: y}
  }


  
  it('Can build farm on empty tile with grass', function(){
    var tilePos = findSuitableTile(tileTypes.grass)

    buildOnTile(tilePos, structType.farm)
    assertStructType(tilePos, structTypes.farm)
  })

	it('Cannot build on tile that already has a structure', function(){
    var tilePos = findSuitableTile(tileTypes.grass)

    buildOnTile(tilePos, structTypes.farm)
    buildOnTile(tilePos, structTypes.granary)
    assertStructType(tilePos, structType.farm)
  })

  it('Cannot build farm on water', function(){
    var tilePos = findSuitableTile(tileTypes.water)

    buildOnTile(tilePos, structTypes.farm)
    assertStructType(tilePos, undefined) // ?
  })
})*/
