const assert = require('assert')
import EmptyFilter from '../../../../../../src/controllers/events/random/filters/other/EmptyFilter'

describe('Empty filter tests', ()=>{
  it('filter works', ()=>{
    var filter = new EmptyFilter()
    var result = filter.affected()
    assert(result.constructor === Array)
    assert.equal(result.length, 0)
  })
})