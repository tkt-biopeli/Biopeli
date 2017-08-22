const assert = require('assert')
const sinon = require('sinon')
import TypeStructureFilter from '../../../../../../src/controllers/events/random/filters/structure/TypeStructureFilter'

describe('Type structure filter tests', ()=>{
  it('Filter works', ()=>{
    var structure = {structureType: {type: 'asd'}}
    var filter = new TypeStructureFilter({
      gameState: {
        player: {
          structures: {
            values: [structure]
          }
        }
      },
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
    assert.equal(filter.affected()[0], structure)
  })
})