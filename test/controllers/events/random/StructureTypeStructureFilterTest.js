const assert = require('assert')
const sinon = require('sinon')
import StructureTypeStructureFilter from '../../../../src/controllers/events/random/filters/structure/StructureTypeStructureFilter'

describe('Structure type structure filter tests', ()=>{
  it('Filter works', ()=>{
    var filter = new StructureTypeStructureFilter({
      gameState: {},
      json: {
        structureTypes: [
          'asd',
          'wasd'
        ]
      }
    })

    assert(filter.isValid({structureType: {name: 'asd'}}))
    assert(filter.isValid({structureType: {name: 'wasd'}}))
    assert(!filter.isValid({structureType: {name: 'aafahfakfhsd'}}))
  })
})