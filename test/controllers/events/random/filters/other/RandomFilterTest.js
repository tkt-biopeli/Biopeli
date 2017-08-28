const assert = require('assert')
const sinon = require('sinon')
import RandomFilter from '../../../../../../src/controllers/events/random/filters/other/RandomFilter'

describe('Random filter tests', ()=>{
  it('filter works', ()=>{
    var firstFilter = {
      affected: ()=> {
        return [1, 2, 3, 4, 5, 6]
      }
    }

    var gs = {randomEventFactory: {
      filter: firstFilter,
      createFilter: function () {return this.filter}
    }}
  
    var filter = new RandomFilter({
      gameState: gs,
      json: {filter: {}, amount: 3}
    })

    filter.getRandom = () => {return 0}

    var a = filter.affected()
    assert.equal(3, a.length)
    assert.equal(1, a[0])
    assert.equal(2, a[1])
    assert.equal(3, a[2])
  })
})