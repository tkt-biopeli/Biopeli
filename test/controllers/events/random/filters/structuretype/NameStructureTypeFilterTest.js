const assert = require('assert')
const sinon = require('sinon')
import NameStructureTypeFilter from '../../../../../../src/controllers/events/random/filters/structuretype/NameStructureTypeFilter'
import PseudoStructuretypes from '../../../../../integration/helpers/PseudoStructuretypes'

describe('NameStructureTypeFilter tests', ()=>{
  it('Filter works', ()=>{
    var filter = new NameStructureTypeFilter({
      gameState: {
        structureTypes: PseudoStructuretypes
      },
      json: {
        structureTypes: ['foo', 'bar', 'huuhaa', 'wheat_farm']
      }
    })

    var invalidType = {name: 'huu'}
    assert(!filter.isValid(invalidType))
    assert(filter.isValid(PseudoStructuretypes.wheat_farm))
    var result = filter.affected()
    assert.equal(result[0], PseudoStructuretypes.wheat_farm)
    assert.equal(result.length, 1)
  })
})
