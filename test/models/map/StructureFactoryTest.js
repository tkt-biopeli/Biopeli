const assert = require("assert")
import StructureFactory from '../../../src/models/map/StructureFactory'

describe('StructureBuilder tests', () =>{

  /**
   * @see StructureType.createUpdateFn
   */
  function createUpdateFn(){}

  it('Constructor works', () =>{
    var sbuilder = new StructureFactory ({
      tile : 0,
      structureTypes : 1
    })
    assert.equal(0, sbuilder.tile)
    assert.equal(1, sbuilder.structureTypes)
    assert.notEqual(null, sbuilder.structureName)
    assert.notEqual(null, sbuilder.structureSize)
  })

  it('Build building works', () =>{
    var sbuilder = new StructureFactory ({
      tile: {},
      structureTypes: {}
    })

    sbuilder.buildBuilding({name: 'test', createUpdateFn:createUpdateFn})
    assert.equal('test', sbuilder.tile.structure.structureType.name)
  })

  it('Build Farm works', () =>{
    var sbuilder = new StructureFactory ({
      tile : {},
      structureTypes : {farm: {name: 'farm', createUpdateFn:createUpdateFn}}
    })
    sbuilder.buildFarm()
    assert.equal('farm', sbuilder.tile.structure.structureType.name)
  })

  it('Build Granary works', () =>{
    var sbuilder = new StructureFactory ({
        tile : {},
        structureTypes : {granary: {name: 'granary', createUpdateFn:createUpdateFn}}
    })
    sbuilder.buildGranary()
    assert.equal('granary', sbuilder.tile.structure.structureType.name)
  })
})
