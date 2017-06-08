const assert = require("assert")
import Structure from '../../src/models/map/StructureBuilder'

describe('StructureBuilder tests', () =>{
  it('Constructor works', () =>{
    var sbuilder = new StructureBuilder ({
      tile : 0
      structureTypes : 1
    })
    assert.equal(0, sbuilder.tile)
    assert.equal(1, sbuilder.structureType)
  })

  it('Build Farm works', () =>{
    var mock = 'farm'
    var sbuilder = new StructureBuilder ({
      tile : {}
      structureType : mock
    })
    sbuilder.buildFarm()
    assert.equal(mock, sbuilder.tile.structureType.name)
  })
  it('Build Granary works', () =>{
    var mock = 'granary'
    var sbuilder = new StructureBuilder ({
        tile : {}
        structureType : mock
    })
    sbuilder.buildGranary()
    assert.equal(mock, sbuilder.tile.structureType.name)
  })
})