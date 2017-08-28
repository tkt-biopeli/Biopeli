const assert = require('assert')
const sinon = require('sinon')
import TimeCondition from '../../../../../src/controllers/events/random/conditions/TimeCondition'

describe('Time condition tests', ()=>{
  it('Time condition test', ()=>{
    var c = {serialNumber: 0}
    var timer = {
      currentTimeEvent: c
    }

    var condition = new TimeCondition({
      gameState: {gameTimer: timer},
      json: {
        notBefore: 0, 
        notAfter: 3
      }
    })

    assert(condition.canHappen())

    c.serialNumber = 3 * 48
    assert(condition.canHappen())

    c.serialNumber = 6 * 48
    assert(!condition.canHappen())

    c.serialNumber = -1 * 48
    assert(!condition.canHappen())

    condition.notBefore = null
    assert(condition.canHappen())

    condition.notAfter = null
    c.serialNumber = 6 * 48
    assert(condition.canHappen())

    c.serialNumber = -34.7 * 48
    assert(condition.canHappen())
  })
})