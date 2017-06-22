const assert = require("assert")
import Structure from '../../../src/models/map/Structure'

describe('Structure tests', () =>{
  
  var structure
  var stype = {
    asset: 'sd',
    createUpdateFn: function(){}
  }
  
  before(function () {
    structure = new Structure({
      tile: 0, 
      name: "Riston rustholli", 
      size: 10, 
      structureType: stype,
      foundingYear: 1999
    })
  })
  
  it('Constructor works', () =>{
    assert.equal(0, structure.tile)
    assert.equal(stype, structure.structureType)
    assert.equal("Riston rustholli", structure.name)
    assert.equal(10, structure.size)
    assert.equal(1, structure.productionInput)
    assert.equal(1999, structure.foundingYear)
  })

  it('asset-shortcut works', () =>{
    assert.equal("sd", structure.asset())
  })

  it('calculateProductionEfficiency returns correct value', () =>{
    assert.equal(100, structure.calculateProductionEfficiency())
  })
})
