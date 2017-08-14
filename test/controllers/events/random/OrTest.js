const assert = require('assert')
const sinon = require('sinon')
import And from '../../../../src/controllers/events/random/filters/And'

describe('And filter and tile tile filter tests', ()=>{
  var firstFilter = {
    affected: ()=> {
      return [1, 2]
    }
  }
  var secondFilter = {
    affected: ()=> {
      return [1, 2, 5]
    }
  }
  var thirdFilter = {
    affected: ()=> {
      return [4, -1]
    }
  }

  var gs = {randomEventFactory: {
    i: 0,
    filters: [firstFilter, secondFilter, thirdFilter],
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
  assert(5, array.length)
  assert(array.sort())

  assert(-1, array[0])
  assert(1, array[1])
  assert(2, array[2])
  assert(4, array[3])
  assert(5, array[4])
})