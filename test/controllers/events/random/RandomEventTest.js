const assert = require('assert')
const sinon = require('sinon')
import RandomEvent from '../../../../src/controllers/events/random/RandomEvent'

describe('Random event tests', ()=>{
  var event, effectsStub, conditionStub

  beforeEach(()=>{
    effectsStub = [
      {
        filter: {affected: () => 0},
        effect: {realizeEvent: sinon.spy()}
      },
      {
        filter: {affected: () => 1},
        effect: {realizeEvent: sinon.spy()}
      }
    ]

    conditionStub = {
      canHappen: () => true
    }

    event = new RandomEvent({
      condition: conditionStub,
      effects: effectsStub
    })
  })

  it('CanHappen works', ()=>{
    assert(event.canHappen())
    conditionStub.canHappen = () => false
    assert(!event.canHappen())
  })

  it('All effects are called correctly when event happens', ()=>{
    event.realizeEvent()
    for(let i = 0 ; i < 2 ; i++) {
      assert(effectsStub[i].effect.realizeEvent.calledWith(i))
      assert.equal(1, effectsStub[i].effect.realizeEvent.callCount)
    }
  })
})