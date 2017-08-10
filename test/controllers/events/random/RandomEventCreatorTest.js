const assert = require('assert')
const sinon = require('sinon')
import RandomEventCreator from '../../../../src/controllers/events/random/RandomEventCreator'

describe('Random event creator tests', ()=>{
  var eventCreator, creatorStub
  
  beforeEach(()=>{
    creatorStub = {
      i: 0,
      create: function() { return this.i++ }
    }
    eventCreator = new RandomEventCreator({
      conditionCreator: creatorStub,
      filterCreator: creatorStub,
      effectCreator: creatorStub
    })

    eventCreator.conditionCreators.set('test', creatorStub.create)
    eventCreator.filterCreators.set('test', creatorStub.create)
    eventCreator.effectCreators.set('test', creatorStub.create)
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
      let answer = answers[i]
      assert.equal(5*i, answer.condition)
      
      let efs = answer.effects
      assert.equal(2, efs.length)
      for(let j = 0 ; j < 2 ; j++){
        let ef = efs[j]
        assert.equal(5*i + j*2 + 1, ef.effect)
        assert.equal(5*i + j*2 + 2, ef.filter)
      }

      assert.equal('n'+i, answer.name)
      assert.equal('d'+i, answer.description)
    }
  })
})