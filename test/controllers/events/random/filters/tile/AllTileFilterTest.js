const assert = require('assert')
const sinon = require('sinon')
import AllTileFilter from '../../../../../../src/controllers/events/random/filters/tile/AllTileFilter'

describe('All tile filter tests', ()=>{
  var allTileFilter
  var tiles

  beforeEach(()=>{
    var firstS = {x: 0}
    var secondS = {x: 1}

    var firstFilter = {
      affected: ((firstS, secondS) => () => [firstS, secondS])(firstS, secondS)
    }

    tiles = [
      {owner: firstS},
      {owner: null},
      {owner: {a: 1}}
    ]
    var map = {
      gridSizeX: 3,
      gridSizeY: 1,
      help: 0,
      tiles: tiles,
      getTileWithGridCoordinates: function(x) {return tiles[x]}
    }

    var gameState = {map: map}

    allTileFilter = new AllTileFilter({
      gameState: gameState,
      json: {
        includeNotOwned: true,
        structureFilter: {}
      }
    })
  })

  it('affected is functioning properly', ()=>{
    var affected = allTileFilter.affected()
    assert.equal(affected.length, 3)
  })

  it('isValid is functioning correctly', ()=>{
    var tile = {
      owner: 'foo'
    }
    // validTile returns true
    allTileFilter.includeNotOwned = false
    allTileFilter.structures = ['bar', 'huuhaa']
    assert(allTileFilter.isValid(tile))

    allTileFilter.structures = ['bar', 'foo', 'huuhaa']
    assert(allTileFilter.isValid(tile))

    allTileFilter.structures = []
    assert(allTileFilter.isValid(tile))

    allTileFilter.includeNotOwned = true
    assert(allTileFilter.isValid(tile))
    assert(allTileFilter.isValid({}))
  })
})