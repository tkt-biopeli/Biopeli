const assert = require('assert')
const sinon = require('sinon')
import StructureYieldEffect from '../../../../../../src/controllers/events/random/effects/withmultipletargets/StructureYieldEffect'

describe('Structure Yield effect tests', ()=>{
  var effect

  var createEffect = (jsonValues) => {
    effect = new StructureYieldEffect({
      json: {
        yieldChange: jsonValues[0]
      }
    })
  }

  it('Constructor test', ()=>{
    createEffect([23])
    assert.equal(effect.yieldChange, 23)
    effect = new StructureYieldEffect({json: {}})
    assert.equal(effect.yieldChange, 0)
  })

  it('realizeEventForOneElement method functioning', ()=>{
    createEffect([23])
    var structureType = {turnipYield: 79}
    effect.realizeEventForOneElement(structureType)
    assert.equal(structureType.turnipYield, 102)
  })
})
