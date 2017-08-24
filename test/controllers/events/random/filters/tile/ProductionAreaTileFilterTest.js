const assert = require('assert')
const sinon = require('sinon')
import ProductionAreaTileFilter from '../../../../../../src/controllers/events/random/filters/tile/ProductionAreaTileFilter'

describe('Production area tile filter tests', ()=>{
  var prodFilter
  var tiles

  beforeEach(()=>{
    var firstS = {x: 0}
    var secondS = {x: 1}

    var firstFilter = {
      affected: ((firstS, secondS) => () => [firstS, secondS])(firstS, secondS)
    }

    var randomEventFactory = {
      filter: firstFilter,
      createFilter: function () {return this.filter}
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

    var gameState = {map: map, randomEventFactory: randomEventFactory}

    prodFilter = new ProductionAreaTileFilter({
      gameState: gameState,
      json: {
        includeNotOwned: true,
        structureFilter: {}
      }
    })
  })

  it('affected is functioning properly', ()=>{
    var affected = prodFilter.affected()
    assert.equal(2, affected.length)
    assert.equal(tiles[0], affected[0])
    assert.equal(tiles[1], affected[1])
  })

  it('isValid is functioning correctly', ()=>{
    var tile = {
      owner: 'foo'
    }
    // all if-returns ignored
    prodFilter.includeNotOwned = false
    prodFilter.structures = ['bar', 'huuhaa']
    assert(!prodFilter.isValid(tile))
    // last if returns true
    prodFilter.structures = ['bar', 'foo', 'huuhaa']
    assert(prodFilter.isValid(tile))
    // second if returns false
    prodFilter.structures = []
    assert(!prodFilter.isValid(tile))
    // first if returns true
    prodFilter.includeNotOwned = true
    assert(!prodFilter.isValid(tile))
    assert(prodFilter.isValid({}))
  })
})