const assert = require('assert')
const sinon = require('sinon')
import Or from '../../../../../../src/controllers/events/random/filters/operators/Or'

describe('Or filter and tile filter tests', ()=>{
  var firstFilter = {affected: ()=> {return [1, 2]}}
  var secondFilter = {affected: ()=> {return [1, 2, 5]}}
  var thirdFilter = {affected: ()=> {return [4, -1]}}

  var createFilterStub = sinon.stub()
  createFilterStub.onCall(0).returns(firstFilter)
  createFilterStub.onCall(1).returns(secondFilter)
  createFilterStub.onCall(2).returns(thirdFilter)

  var gameState = {randomEventFactory: {
    createFilter: createFilterStub
  }}

  var filter = new Or({
    gameState: gameState,
    json: {filters: [{}, {}, {}]}
  })

  it('Filter works', ()=>{
    var array = filter.affected()
    assert.equal(array.length, 5)
    array.sort()
    assert.equal(array[0], -1)
    assert.equal(array[1], 1)
    assert.equal(array[2], 2)
    assert.equal(array[3], 4)
    assert.equal(array[4], 5)
  })
})