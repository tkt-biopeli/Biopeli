const assert = require('assert')
import PopulationCondition from '../../../../../src/controllers/events/random/conditions/PopulationCondition'

describe('EmptyCondition tests', ()=>{
  var popCondition, city

  beforeEach(() => {
    city = {
      population: 7589
    }
    popCondition = new PopulationCondition({
      gameState: {
        city: city
      },
      json: {
        notBefore: null,
        notAfter: null
      }
    })
  })

  it('canHappen method functioning correctly', ()=>{
    // both first-level ifs are ignored
    assert(popCondition.canHappen())
    // the first first-level if is ignored
    popCondition.lowerLimit = 7589
    assert(popCondition.canHappen())
    popCondition.lowerLimit = 7590
    assert(!popCondition.canHappen())
    // the second first-level if is ignored
    popCondition.lowerLimit = null
    popCondition.upperLimit = 7589
    assert(popCondition.canHappen())
    popCondition.upperLimit = 7588
    assert(!popCondition.canHappen())
  })
})
