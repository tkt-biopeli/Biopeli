const assert = require('assert')
const sinon = require('sinon')
import RandomEventHandler from '../../../../src/controllers/events/random/RandomEventHandler'

describe('Random event handler tests', ()=>{
  var handler, eventList, randomStub

  beforeEach(()=>{
    randomStub = sinon.stub()

    eventList = [
      {name: 'foo1',  canHappen: () => {return false}},
      {name: 'tru1',  canHappen: () => {return true}},
      {name: 'foo2',  canHappen: () => {return false}},
      {name: 'foo3',  canHappen: () => {return false}},
      {name: 'tru2',  canHappen: () => {return true}},
      {name: 'foo4',  canHappen: () => {return false}}
    ]

    handler = new RandomEventHandler({
      eventList: eventList,
      randomWithBounds: randomStub
    })
  })

  it('pickRandomNumbers is functioning as expected', ()=>{
    var randomNumbers = [13, 17, 23, 23, 17, 73, 79, 59, 79]
    var expectedNumbers = [13, 17, 23, 73]

    for (var i = 0; i < randomNumbers.length; i++) {
      randomStub.withArgs(0, handler.eventList.length).onCall(i).returns(randomNumbers[i])
    }
    var result = handler.pickRandomNumbers(4)

    assert.equal(result.length, 4)
    expectedNumbers.forEach(number => {
      assert(result.has(number))
    })
  })

  it('findSuitableEvent returns null if no suitable event exists', ()=>{
    handler.eventList = [
      {name: 'foo1', canHappen: () => {return false}},
      {name: 'foo2', canHappen: () => {return false}},
      {name: 'foo3', canHappen: () => {return false}}
    ]
    var result = handler.findSuitableEvent(new Set([1, 2, 0]))
    assert.equal(result, null)
  })

  it('findSuitableEvent is functioning as expected', ()=>{
    var result = handler.findSuitableEvent(new Set([5, 3, 2, 4, 1, 0]))
    assert.equal(result.name, 'tru2')
  })

  it('getRandomEvent is functioning as expected', ()=>{
    randomStub.withArgs(1).returns("no params")
    randomStub.withArgs(3).returns("normal")
    handler.pickRandomNumbers = randomStub
    var spy = sinon.spy()
    handler.findSuitableEvent = spy
    // no parameters given
    handler.getRandomEvent()
    assert(spy.calledWith("no params"))
    // a parameter given
    handler.getRandomEvent(3)
    assert(spy.calledWith("normal"))
  })
})