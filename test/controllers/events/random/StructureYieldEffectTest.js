const assert = require('assert')
const sinon = require('sinon')
import StructureYieldEffect from '../../../../src/controllers/events/random/effects/StructureYieldEffect'

describe('Structure Yield effect tests', ()=>{
  it('Effect works', ()=>{
    var structureType = {turnipYield: 1}
    var structure = {structureType: structureType}
    var effect = new StructureYieldEffect({
      json: {yieldChange: 2}
    })

    effect.happenForOne(structureType)
    assert.equal(3, structure.structureType.turnipYield)

    effect.happenForOne(structureType)
    assert.equal(5, structure.structureType.turnipYield)
  })
})