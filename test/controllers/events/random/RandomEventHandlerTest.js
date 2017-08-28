const assert = require('assert')
const sinon = require('sinon')
import RandomEventHandler from '../../../../src/controllers/events/random/RandomEventHandler'

describe('Random event handler tests', ()=>{
  var handler, getRandomEventStub, realizeSpy, event

  beforeEach(()=>{
    getRandomEventStub = sinon.stub()
    realizeSpy = sinon.spy()
    event = {realizeEvent: realizeSpy}
  
    var randomEventSettings = {
      minTime: 17,
      maxTime: 23,
      maxSearched: 19,
      eventContentIndex: 13
    }
    var eventRandomizer = {
      getRandomEvent: getRandomEventStub
    }

    handler = new RandomEventHandler({
      eventRandomizer: eventRandomizer,
      menuController: {},
      randomEventSettings: randomEventSettings
    })
  })

  it('doEvent test', ()=>{
    getRandomEventStub.withArgs(19).returns(event)
    assert.equal(handler.doEvent(), event)
    assert.equal(realizeSpy.callCount, 1)
    getRandomEventStub.withArgs(19).returns(null)
    assert.equal(handler.doEvent(), undefined)
    assert.equal(realizeSpy.callCount, 1)
  })

  it('randomEventCheck test', ()=>{
    var tryNextStub = sinon.stub()
    handler.timeWindowRandomizer.tryNext = tryNextStub
    tryNextStub.withArgs(79).returns(true)
    tryNextStub.withArgs(23).returns(false)

    handler.doEvent = getRandomEventStub
    getRandomEventStub.returns(undefined)
    // first if returns false
    assert.equal(handler.randomEventCheck(23), undefined)
    // first if returns true; second if returns false
    assert.equal(handler.randomEventCheck(79), undefined)
    // both ifs return true
    getRandomEventStub.returns(event)
    assert.equal(handler.randomEventCheck(79), event)
  })
})