const assert = require('assert')
const sinon = require('sinon')
import ProductionAreaTileFilter from '../../../../src/controllers/events/random/filters/tile/ProductionAreaTileFilter'

describe('Production area tile filter tests', ()=>{
  it('Filter works', ()=>{
    var firstS = {x: 0}
    var secondS = {x: 1}

    var firstFilter = {
      affected: ((firstS, secondS) => () => [firstS, secondS])(firstS, secondS)
    }

    var randomEventFactory = {
      filter: firstFilter,
      createFilter: function () {return this.filter}
    }
    var tiles = [
      {
        owner: firstS
      },
      {
        owner: null
      },
      {
        owner: {a: 1}
      }
    ]
    var map = {
      gridSizeX: 3,
      gridSizeY: 1,
      help: 0,
      tiles: tiles,
      getTileWithGridCoordinates: function(x) {return tiles[x]}
    }
    var gameState = {map: map, randomEventFactory: randomEventFactory}
    var filter = new ProductionAreaTileFilter({
      gameState: gameState,
      json: {
        includeNotOwned: true,
        structureFilter: {}
      }
    })

    var affected = filter.affected()
    assert.equal(2, affected.length)
    assert.equal(tiles[0], affected[0])
    assert.equal(tiles[1], affected[1])
  })
})