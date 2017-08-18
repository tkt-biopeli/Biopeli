const assert = require('assert')
const sinon = require('sinon')
import StructureTypeFilter from '../../../../src/controllers/events/random/filters/structuretype/StructureTypeFilter'

describe('Structure type  filter tests', ()=>{
  it('Filter works', ()=>{
    var filter = new StructureTypeFilter({
      gameState: {structureTypes: [
        {name: 'a'},
        {name: 'bee'},
        {name: 'luukkainen'}
      ]}
    })

    var sTypes = filter.affected()
    assert(filter.isValid())
    assert.equal(3, sTypes.length)
  })
})
