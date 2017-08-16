const assert = require('assert')
const sinon = require('sinon')
import StructureTypeEffect from '../../../../src/controllers/events/random/effects/StructureTypeEffect'
import structureTypes from '../../../integration/helpers/PseudoStructuretypes'

describe('Structure type effect tests', ()=>{
  it('Effect works', ()=>{
    var structureType = structureTypes[0]
    var effect = new StructureTypeEffect({
      json: {costChange: 2}
    })

    effect.happenForOne(structureType)
    assert.equal(20000, structureType.cost)
  })
})
