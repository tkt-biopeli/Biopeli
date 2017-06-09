const assert = require('assert')
const sinon = require('sinon')
import MenuOptionCreator from '../../src/models/menu/MenuOptionCreator'
import TileType from '../../src/models/map/TileType'
import StructureType from '../../src/models/map/StructureType'

describe('Menu option creator tests', ()=>{
  it('All tiletypes have action creator', ()=>{
    var creator = new MenuOptionCreator({structureTypes: 0})
    var tiletypes = TileType()

    assert.equal(Object.values(tiletypes).length, creator.tileOptions.size)
  })

  it('TileOptions gives right tile', ()=>{
    var creator = new MenuOptionCreator({structureTypes: StructureType()})
    var grass = TileType().grass
    var expectedValues = creator.tileOptions.get(grass.name)()
    var got = creator.tileTypeOptions({tileType: grass})

    for(var i = 0 ; i < expectedValues.length ; i++){
      assert.equal(expectedValues[i].name, got[i].name)
      assert.equal(expectedValues[i].functionToCall, got[i].functionToCall)
    }
  })

})
