const assert = require('assert')
const sinon = require('sinon')
import StructureCostEffect from '../../../../src/controllers/events/random/effects/StructureCostEffect'
import structureTypes from '../../../integration/helpers/PseudoStructuretypes'

describe('Structure cost effect tests', ()=>{
  it('Effect works', ()=>{
    var effect = new StructureCostEffect({
      json: {costChange: 2}
    })
    var structureTypes = [{cost: 10000}, {cost: 10000}]
    effect.happen(structureTypes)
    for(let i = 0 ; i < 1 ; i++){
      assert.equal(20000, structureTypes[i].cost)
    }
  })
})
