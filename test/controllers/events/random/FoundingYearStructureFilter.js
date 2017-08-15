const assert = require('assert')
const sinon = require('sinon')
import FoundingYearStructureFilter from '../../../../src/controllers/events/random/filters/structure/FoundingYearStructureFilter'

describe('All structure filter tests', ()=>{
  it('Filter works', ()=>{
    var filter = new FoundingYearStructureFilter({
      gameState: {},
      json: {
        min: 0,
        max: 3
      }
    })

    assert(filter.isValid({foundingYear: 0}))
    assert(filter.isValid({foundingYear: 2}))
    assert(filter.isValid({foundingYear: 3}))
    assert(!filter.isValid({foundingYear: -3}))
    assert(!filter.isValid({foundingYear: 666}))
  })
})