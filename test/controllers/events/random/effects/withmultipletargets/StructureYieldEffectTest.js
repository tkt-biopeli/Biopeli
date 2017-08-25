const assert = require('assert')
const sinon = require('sinon')
import StructureYieldEffect from '../../../../../../src/controllers/events/random/effects/withmultipletargets/StructureYieldEffect'

describe('Structure Yield effect tests', ()=>{
  it('Effect works', ()=>{
    var structureType = {turnipYield: 1}
    var structure = {structureType: structureType}
    var effect = new StructureYieldEffect({
      json: {yieldChange: 2}
    })

    effect.realizeEventForOneElement(structureType)
    assert.equal(3, structure.structureType.turnipYield)

    effect.realizeEventForOneElement(structureType)
    assert.equal(5, structure.structureType.turnipYield)
  })
})