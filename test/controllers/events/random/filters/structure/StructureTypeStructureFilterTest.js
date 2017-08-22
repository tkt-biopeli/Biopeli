const assert = require('assert')
const sinon = require('sinon')
import StructureTypeStructureFilter from '../../../../../../src/controllers/events/random/filters/structure/StructureTypeStructureFilter'

describe('Structure type structure filter tests', ()=>{
  it('Filter works', ()=>{
    var structure = {structureType: {name: 'wasd'}}
    var huuhaaStructure = {structureType: {name: 'f00'}}
    var filter = new StructureTypeStructureFilter({
      gameState: {
        player: {
          structures: {
            values: [huuhaaStructure, structure, huuhaaStructure]
          }
        }
      },
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
    var result = filter.affected()
    assert.equal(result[0], structure)
    assert.equal(result.length, 1)
  })
})