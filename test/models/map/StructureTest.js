const assert = require("assert")
import Structure from '../../../src/models/map/Structure'

describe('Structure tests', () =>{
  it('Constructor works', () =>{
    var structure = new Structure({tile: 0, name: "Riston rustholli", size: 64, structureType: 1})

    assert.equal(0, structure.tile)
    assert.equal(1, structure.structureType)
    assert.equal("Riston rustholli", structure.name)
    assert.equal(64, structure.size)
  })

  it('asset-shortcut works', () =>{
    var structure = new Structure({tile: 0, name: "A", size: 1, structureType: {asset: "sd"}})

    assert.equal("sd", structure.asset())
  })
})
