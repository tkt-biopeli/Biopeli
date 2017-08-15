const assert = require('assert')
const sinon = require('sinon')
import RuiningEffect from '../../../../src/controllers/events/random/effects/RuiningEffect'

describe('Ruining effect tests', ()=>{
  it('Effect works', ()=>{
    var effect = new RuiningEffect({
      json: {
        percentage: 0.25
      }
    })

    var struct = {
      health: { maxHealth: 8 },
      healthManager: { changeHealth: sinon.spy() }
    }

    effect.happenForOne(struct)

    assert(struct.healthManager.changeHealth.calledWith(2))
  })
})