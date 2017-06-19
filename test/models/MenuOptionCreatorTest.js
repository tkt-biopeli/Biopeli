const assert = require('assert')
const sinon = require('sinon')
import MenuOptionCreator from '../../src/models/menu/MenuOptionCreator'
import TileType from '../../src/models/map/TileType'
import StructureType from '../../src/models/map/StructureType'

describe('Menu option creator tests', ()=>{
  it('All tiletypes have action creator', ()=>{
    var creator = new MenuOptionCreator({structureTypes: 0})
    var tiletypes = TileType()

    var len = Object.keys(tiletypes).length

    assert.equal(len, creator.tileOptions.size)
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

  it('Option creator gives tile options when structure not presented', () =>{
    var creator = new MenuOptionCreator({structureTypes: null})
    var spy = sinon.spy()
    creator.tileTypeOptions = spy
    var tile = {structure: null}

    creator.getActions(tile)

    assert.equal(1, spy.callCount)
    assert(spy.calledWith(tile))
  })

  it('Option creator doesn\t give tile options when tile has structure', () =>{
    var creator = new MenuOptionCreator({structureTypes: null})
    var spy = sinon.spy()
    creator.tileTypeOptions = spy
    var tile = {structure: 2}

    creator.getActions(tile)

    assert(spy.notCalled)
  })

})
