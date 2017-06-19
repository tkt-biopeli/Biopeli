const assert = require("assert")
import Structure from '../../../src/models/map/Structure'

describe('Structure tests', () =>{

  it('Constructor works', () =>{
    var stype = {createUpdateFn: function(){}}
    var structure = new Structure({
      tile: 0, 
      name: "Riston rustholli", 
      size: 64, 
      structureType: stype,
    })

    assert.equal(0, structure.tile)
    assert.equal(stype, structure.structureType)
    assert.equal("Riston rustholli", structure.name)
    assert.equal(64, structure.size)
  })

  it('asset-shortcut works', () =>{
    var stype = {
      asset: 'sd',
      createUpdateFn: function(){}
    }
    var structure = new Structure({tile: 0, name: "A", size: 1, structureType: stype})

    assert.equal("sd", structure.asset())
  })
})
