const assert = require('assert')
const sinon = require('sinon')
import StructureCostEffect from '../../../../../../src/controllers/events/random/effects/withmultipletargets/StructureCostEffect'
import structureTypes from '../../../../../integration/helpers/PseudoStructuretypes'

describe('Structure cost effect tests', ()=>{
  var effect

  var createEffect = (jsonValues) => {
    effect = new StructureCostEffect({
      json: {
        costChange: jsonValues[0]
      }
    })
  }

  it('Constructor test', ()=>{
    createEffect([23])
    assert.equal(effect.costChange, 23)
    effect = new StructureCostEffect({json: {}})
    assert.equal(effect.costChange, 0)
  })

  it('realizeEventForOneElement method functioning', ()=>{
    createEffect([23])
    var structureType = {cost: 79}
    effect.realizeEventForOneElement(structureType)
    assert.equal(structureType.cost, 1817)
  })
})
