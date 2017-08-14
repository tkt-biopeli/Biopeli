const assert = require('assert')
const sinon = require('sinon')
import TiletypeTileFilter from '../../../../src/controllers/events/random/filters/TiletypeTileFilter'

describe('Tiletype tile filter and tile tile filter tests', ()=>{
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
    var filter = new TiletypeTileFilter({gameState: {map: map}, json: {tileTypes: ['test1', 'asd']}})

    var found = filter.affected()
    assert.equal(2, found.length)
  })
})