const assert = require('assert')
const sinon = require('sinon')
import TimeWindowRandomizer from '../../../src/models/logic/TimeWindowRandomizer'

describe('Time window randomizer tests', () => {
  var randomizer

  beforeEach(()=>{
    randomizer = new TimeWindowRandomizer({
      min: 1,
      max: 5
    })
  })

  it('Next is calculated correctly', ()=>{
    randomizer.rand = () => 0.5 
    randomizer.calculateNext({serialNumber: 0})

    assert.equal(3, randomizer.next)
    randomizer.calculateNext({serialNumber: 2})
    assert.equal(5, randomizer.next)

    randomizer.rand = () => 0.99
    randomizer.calculateNext({serialNumber: 0})
    assert.equal(5, randomizer.next)
  })

  it('Try next works', ()=>{
    randomizer.calculateNext = sinon.spy()
    randomizer.next = 3
    assert(randomizer.tryNext({serialNumber: 4}))
    assert(randomizer.tryNext({serialNumber: 3}))
    assert(!randomizer.tryNext({serialNumber: 2}))
  })
})