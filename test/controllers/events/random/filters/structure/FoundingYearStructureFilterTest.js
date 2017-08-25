const assert = require('assert')
const sinon = require('sinon')
import FoundingYearStructureFilter from '../../../../../../src/controllers/events/random/filters/structure/FoundingYearStructureFilter'

describe('FoundingYearStructureFilter filter tests', ()=>{
  it('Filter works', ()=>{
    var structure = {structureType: {foundingYear: 77}}
    var filter = new FoundingYearStructureFilter({
      gameState: {
        player: {
          structures: {
            values: [structure]
          }
        }
      },
      json: {
        min: 76,
        max: 78
      }
    })

    assert(filter.isValid({foundingYear: 76}))
    assert(filter.isValid({foundingYear: 77}))
    assert(filter.isValid({foundingYear: 78}))
    assert(!filter.isValid({foundingYear: -3}))
    assert(!filter.isValid({foundingYear: 666}))
    assert.equal(filter.affected()[0], structure)
  })
})