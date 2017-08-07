const assert = require("assert")
const sinon = require("sinon")
import ProduceFactory from '../../../src/models/structure/ProducerFactory'

describe('ProducerFactory tests', () => {
  var factory

  beforeEach(() => {
    factory = new ProduceFactory({tileFinder: 1, eventController: 2})
  })

  it('Constructor test', ()=>{
    assert.equal(factory.tileFinder, 1)
    assert.equal(factory.eventController, 2)
  })

  it('checkStructureType works properly', ()=>{
    assert.equal(factory.checkStructureType('foo'), 'foo')
    var result = factory.checkStructureType(null)
    assert.notEqual(result.type, 'refinery')
    assert.equal(result.continuousProduction, false)
    assert.equal(result.turnipYield, 0)
  })
})
