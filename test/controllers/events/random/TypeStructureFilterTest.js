const assert = require('assert')
const sinon = require('sinon')
import TypeStructureFilter from '../../../../src/controllers/events/random/filters/structure/TypeStructureFilter'

describe('Type structure filter tests', ()=>{
  it('Filter works', ()=>{
    var filter = new TypeStructureFilter({
      gameState: {},
      json: {
        types: [
          'asd',
          'wasd'
        ]
      }
    })

    assert(filter.isValid({structureType: {type: 'asd'}}))
    assert(filter.isValid({structureType: {type: 'wasd'}}))
    assert(!filter.isValid({structureType: {type: 'aafahfakfhsd'}}))
  })
})