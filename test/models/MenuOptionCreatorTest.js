const assert = require('assert')
const sinon = require('sinon')
import MenuOptionCreator from '../../src/models/menu/MenuOptionCreator'
import TileType from '../../src/models/map/TileType'

describe('Menu option creator tests', ()=>{
  it('All tiletypes have action creator', ()=>{
    var creator = new MenuOptionCreator()
    var tiletypes = TileType()

    assert.equal(Object.values(tiletypes).length, creator.tileOptions.size)
  })

  it('TileOptions gives right tile', ()=>{
    var creator = new MenuOptionCreator()
    var grass = TileType().grass
    var excpectedValues = creator.tileOptions.get(grass.name)
    var got = creator.tileOptions(grass)

    assert.equal(excpectedValues, got)
  })

})
