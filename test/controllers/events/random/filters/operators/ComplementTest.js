const assert = require('assert')
const sinon = require('sinon')
import Complement from '../../../../../../src/controllers/events/random/filters/operators/Complement'

describe('Complement filter and tile tile filter tests', ()=>{
  var firstFilter = {
    affected: ()=> {
      return [1, 2, 3]
    }
  }
  var secondFilter = {
    affected: ()=> {
      return [1, 4]
    }
  }

  var createFilterStub = sinon.stub()
  createFilterStub.onCall(0).returns(firstFilter)
  createFilterStub.onCall(1).returns(secondFilter)

  var gameState = {randomEventFactory: {
    createFilter: createFilterStub
  }}

  var filter = new Complement({
    gameState: gameState,
    json: {filters: [{}, {}, {}]}
  })
  
  it('Filter works', ()=>{
    var affected = filter.affected()
    var resultArray = []
    for(let a of affected) resultArray.push(a)
    assert.equal(resultArray.length, 2)
    assert.equal(resultArray[0], 2)
    assert.equal(resultArray[1], 3)
  })
})