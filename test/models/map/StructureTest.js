const assert = require("assert")
import Structure from '../../../src/models/map/Structure'

describe('Structure tests', () =>{
  
  var structure
  
  before(function () {
    structure = new Structure({tile: 0, name: "Riston rustholli", size: 64, structureType: 1})
  })
  
  it('Constructor works', () =>{
    assert.equal(0, structure.tile)
    assert.equal(1, structure.structureType)
    assert.equal("Riston rustholli", structure.name)
    assert.equal(64, structure.size)
    assert.equal(0, structure.productionInput)
  })

  it('asset-shortcut works', () =>{
    structure = new Structure({tile: 0, name: "Riston rustholli", size: 64, structureType: {asset: "sd"}})
    assert.equal("sd", structure.asset())
  })
  
  it('calculateProductionEfficiency returns correct value', () =>{
    // calculate manually (use mock random if random factors are used)
    var expected = 785
    
    assert.equal(expected, structure.calculateProductionEfficiency())
  })
})
