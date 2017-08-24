const assert = require('assert')
const sinon = require('sinon')
import StructureAmountCondition from '../../../../../src/controllers/events/random/conditions/StructureAmountCondition'

describe('Structure amount condition tests', ()=>{
  it('Condition works', ()=>{
    var pseudoArray = {length: 4}
    var firstFilter = {
      affected: (pseudoArray => () => pseudoArray)(pseudoArray)
    }
    var randomEventFactory = {
      filter: firstFilter,
      createFilter: function () {return this.filter}
    }

    var condition = new StructureAmountCondition({
      gameState: {randomEventFactory: randomEventFactory},
      json: {min: 0, max: 4}
    })

    assert(condition.canHappen())

    pseudoArray.length = 0
    assert(condition.canHappen())

    pseudoArray.length = 2
    assert(condition.canHappen())

    pseudoArray.length = -1
    assert(!condition.canHappen())

    pseudoArray.length = 5
    assert(!condition.canHappen())
  })
})