const assert = require('assert')
const sinon = require('sinon')
import RandomEventFactory from '../../../../src/controllers/events/random/RandomEventFactory'

describe('Random event factory tests', ()=>{
  var eventCreator, creatorStub, conditionSpy, filterSpy, eventSpy, gameState
  
  beforeEach(()=>{
    conditionSpy = sinon.spy()
    filterSpy = sinon.spy()
    eventSpy = sinon.spy()
    gameState = {foo: 'foo'}

    eventCreator = new RandomEventFactory({gameState: gameState})

    eventCreator.conditionFactory = creatorStub
    eventCreator.filterFactory = creatorStub
    eventCreator.effectFactory = creatorStub

    eventCreator.conditionCreators.set('test', conditionSpy)
    eventCreator.filterCreators.set('test', filterSpy)
    eventCreator.effectCreators.set('test', eventSpy)
  })

  it('The objects are created correctly', ()=>{
    var mockjson = 
    {events: 
      [
        {
          name: 'n0',
          description: 'd0',
          effects: [
            {
              name: 'test',
              filter: {name: 'test'},
            },
            {
              name: 'test',
              filter: {name: 'test'},
            }
          ],
          condition: {name: 'test'}
        },
        {
          name: 'n1',
          description: 'd1',
          effects: [
            {
              name: 'test',
              filter: {name: 'test'},
            },
            {
              name: 'test',
              filter: {name: 'test'},
            }
          ],
          condition: {name: 'test'}
        },
        {
          name: 'n2',
          description: 'd2',
          effects: [
            {
              name: 'test',
              filter: {name: 'test'},
            },
            {
              name: 'test',
              filter: {name: 'test'},
            }
          ],
          condition: {name: 'test'}
        }
      ]
    }

    var answers = eventCreator.createEvents(mockjson)
    assert.equal(3, answers.length)

    for(let i = 0 ; i < 3 ; i++) {
      var answer = answers[i]
      assert.equal('n'+i, answer.name)
      assert.equal('d'+i, answer.description)
    }

    assert.equal(6, eventSpy.callCount)
    assert.equal(6, filterSpy.callCount)
    assert.equal(3, conditionSpy.callCount)
  })

  it('createPart is functioning as expected', ()=>{
    var result = eventCreator.createPart('condition')
    assert.equal(result.constructor.name, 'EmptyCondition')
    result = eventCreator.createPart('filter', {})
    assert.equal(result.constructor.name, 'EmptyFilter')
    result = eventCreator.createPart('effect', {name: 'plapla'})
    assert.equal(result.constructor.name, 'EmptyEffect')
    result = eventCreator.createPart('filter', {name: 'AllStructures'})
    assert.equal(result.constructor.name, 'AllStructureFilter')
  })
})