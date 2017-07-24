const assert = require("assert")
const sinon = require("sinon")
import ProduceFactory from '../../../src/models/structure/ProducerFactory'

describe('ProducerFactory tests', () => {
  var factory

  beforeEach(() => {
    factory = new ProduceFactory({tileFinder: 1})
  })

  it('Constructor test', ()=>{
    assert.equal(1, factory.tileFinder)
  })
})
