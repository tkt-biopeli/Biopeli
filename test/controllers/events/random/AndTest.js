const assert = require('assert')
const sinon = require('sinon')
import And from '../../../../src/controllers/events/random/filters/common/And'

describe('And filter and tile tile filter tests', ()=>{
  it('Filter works', ()=>{
    var firstFilter = {
      affected: ()=> {
        return [1, 2, 3]
      }
    }
    var secondFilter = {
      affected: ()=> {
        return [1, 2, 5]
      }
    }
    var thirdFilter = {
      affected: ()=> {
        return [1, 2, 3, 5]
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
    assert(2, array.length)

    assert(1, array[0])
    assert(2, array[1])
  })
})