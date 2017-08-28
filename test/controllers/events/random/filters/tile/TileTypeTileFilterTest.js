const assert = require('assert')
const sinon = require('sinon')
import TileTypeTileFilter from '../../../../../../src/controllers/events/random/filters/tile/TileTypeTileFilter'

describe('Tile type tile filter tests', ()=>{
  it('Filter works', ()=>{
    var tiles = [
      {tileType: {
        name: 'test1'
      }},
      {tileType: {
        name: 'test1'
      }},
      {tileType: {
        name: 'test2'
      }}
    ]
    var map = {
      gridSizeX: 3,
      gridSizeY: 1,
      help: 0,
      tiles: tiles,
      getTileWithGridCoordinates: function(x) {return tiles[x]}
    }
    var filter = new TileTypeTileFilter({gameState: {map: map}, json: {tileTypes: ['test1', 'asd']}})

    var found = filter.affected()
    assert.equal(2, found.length)
  })
})