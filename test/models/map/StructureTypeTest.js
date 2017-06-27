const assert = require("assert")

import StructureType from '../../../src/models/map/StructureType'

describe('StructureType tests', () => {
  it('All structures are created', () => {
    var structures = StructureType()

    assert.equal(3, Object.keys(structures).length)
  })

  it('Create constant production function is never undefined', () => {
    var types = StructureType()
    for(var type in types){
      assert.equal('function', typeof types[type].createConstantProductionFn)
    }
  })  
  
  it('Create seasonal production function is never undefined', () => {
    var types = StructureType()
    for(var type in types){
      assert.equal('function', typeof types[type].createSeasonalProductionFn)
    }
  })
})
