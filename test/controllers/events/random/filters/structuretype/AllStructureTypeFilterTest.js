const assert = require('assert')
const sinon = require('sinon')
import AllStructureTypeFilter from '../../../../../../src/controllers/events/random/filters/structuretype/AllStructureTypeFilter'

describe('AllStructureTypeFilter tests', ()=>{
  it('Filter works', ()=>{
    var types = {
      wheat_farm: {name: 'wheat_farm'},
      berry_farm: {name: 'berry_farm'},
      foo_farm: {name: 'foo_farm'}
    }

    var filter = new AllStructureTypeFilter({
      gameState: {
        structureTypes: types
      },
      json: {
        structureTypes: ['huuhaa', 'wheat_farm']
      }
    })

    var invalidType = {name: 'huu'}
    assert(filter.isValid(invalidType))
    assert(filter.isValid(types.wheat_farm))
    var result = filter.affected()
    assert.equal(result[2], types.foo_farm)
    assert.equal(result.length, 3)
  })
})
