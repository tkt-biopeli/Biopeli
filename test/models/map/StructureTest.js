const assert = require("assert")
import Structure from '../../../src/models/map/Structure'

describe('Structure tests', () =>{
  it('Constructor works', () =>{
    var structure = new Structure({tile: 0, structureType: 1})

    assert.equal(0, structure.tile)
    assert.equal(1, structure.structureType)
  })

  it('asset-shortcut works', () =>{
    var structure = new Structure({tile: 0, structureType: {asset: "sd"}})

    assert.equal("sd", structure.asset())
  })
})
