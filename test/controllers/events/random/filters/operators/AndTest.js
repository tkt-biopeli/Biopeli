const assert = require('assert')
const sinon = require('sinon')
import And from '../../../../../../src/controllers/events/random/filters/operators/And'

describe('And filter and tile tile filter tests', ()=>{
  var filter

  beforeEach(()=>{
    var firstFilter = {affected: ()=> {return [1, 2, 3]}}
    var secondFilter = {affected: ()=> {return [1, 2, 5]}}
    var thirdFilter = {affected: ()=> {return [1, 2, 3, 5]}}

    var createFilterStub = sinon.stub()
    createFilterStub.onCall(0).returns(firstFilter)
    createFilterStub.onCall(1).returns(secondFilter)
    createFilterStub.onCall(2).returns(thirdFilter)

    var gameState = {randomEventFactory: {
      createFilter: createFilterStub
    }}

    filter = new And({
      gameState: gameState,
      json: {filters: [{}, {}, {}]}
    })
  })

  it('affected functioning as expected', ()=>{
    var array = filter.affected()
    array.sort()
    assert.equal(array.length, 2)

    assert.equal(array[0], 1)
    assert.equal(array[1], 2)
  })

  it('affected returns an empty array if there are no subfilters', ()=>{
    filter.subFilterComponent.subfilters = []
    var array = filter.affected()
    assert(array.constructor === Array)
    assert.equal(array.length, 0)
  })
})
