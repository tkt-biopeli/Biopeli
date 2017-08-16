const assert = require('assert')
const sinon = require('sinon')
import EventRandomizer from '../../../../src/controllers/events/random/EventRandomizer'

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

    handler = new EventRandomizer({
      eventList: eventList,
      randomWithBounds: randomStub
    })
  })

  var addRandomStubReturnValues = () => {
    var randomNumbers = [5, 4, 3, 3, 4]
    for (var i = 0; i < randomNumbers.length; i++) {
      randomStub.onCall(i).returns(randomNumbers[i])
    }
  }

  it('shuffleEvents is functioning as expected', ()=>{
    var originalArray = ['a', 'b', 'c', 'd', 'e', 'f']
    addRandomStubReturnValues()

    var result = handler.shuffleEvents(originalArray)
    assert.equal(result.toString(), 'f,e,d,c,b,a')
    
  })

  it('findSuitableEvent is functioning as expected', ()=>{
    var result = handler.findSuitableEvent(eventList, 1)
    assert.equal(result, null)
    result = handler.findSuitableEvent(eventList, 2)
    assert.equal(result.name, "tru1")
  })

  it('getRandomEvent is functioning as expected', ()=>{
    var shuffleArray = ["huu", "haa"]

    var shuffleEventsStub = sinon.stub()
    shuffleEventsStub.withArgs(eventList).returns(shuffleArray)
    handler.shuffleEvents = shuffleEventsStub

    var findSuitableEventSpy = sinon.spy()
    handler.findSuitableEvent = findSuitableEventSpy

    // no parameters given
    handler.getRandomEvent()
    assert(findSuitableEventSpy.calledWith(shuffleArray, 1))
    // a parameter given
    handler.getRandomEvent(6)
    assert(findSuitableEventSpy.calledWith(shuffleArray, 6))
    // the given number is too high
    handler.getRandomEvent(7)
    assert(findSuitableEventSpy.calledWith(shuffleArray, 6))
  })
})