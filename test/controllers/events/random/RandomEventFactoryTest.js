const assert = require('assert')
const sinon = require('sinon')
import RandomEventFactory from '../../../../src/controllers/events/random/RandomEventFactory'

describe('Random event factory tests', ()=>{
  var eventCreator, creatorStub, cspy, fspy, espy
  
  beforeEach(()=>{
    cspy = sinon.spy()
    fspy = sinon.spy()
    espy = sinon.spy()

    eventCreator = new RandomEventFactory({})

    eventCreator.conditionFactory = creatorStub
    eventCreator.filterFactory = creatorStub
    eventCreator.effectFactory = creatorStub

    eventCreator.conditionCreators.set('test', cspy)
    eventCreator.filterCreators.set('test', fspy)
    eventCreator.effectCreators.set('test', espy)
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
      assert.equal('n'+i, answer.name)
      assert.equal('d'+i, answer.description)
    }

    assert.equal(3, espy.callCount)
    assert.equal(3, fspy.callCount)
    assert.equal(3, cspy.callCount)
  })
})