const assert = require('assert')
import EmptyCondition from '../../../../../src/controllers/events/random/conditions/EmptyCondition'

describe('EmptyCondition tests', ()=>{
  it('canHappen method returns true', ()=>{
    assert(new EmptyCondition().canHappen())
  })
})
