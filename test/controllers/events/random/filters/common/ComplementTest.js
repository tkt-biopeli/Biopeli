// this is fixed in another branch (integration-and-unit-tests)
const assert = require('assert')
const sinon = require('sinon')
import And from '../../../../../../src/controllers/events/random/filters/common/And'

describe('And filter and tile tile filter tests', ()=>{
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

  var gs = {randomEventFactory: {
    i: 0,
    filters: [firstFilter, secondFilter],
    createFilter: function () {return this.filters[this.i]}
  }}

  var filter = new And({
    gameState: gs,
    json: {filters: [{}, {}, {}]}
  })

  var affected = filter.affected()
  var array = []
  for(let a of affected) array.push(a)
  array.sort()
  assert(2, array.length)
  assert(array.sort())

  assert(2, array[0])
  assert(3, array[1])
})