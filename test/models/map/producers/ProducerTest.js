const assert = require("assert")
const sinon = require("sinon")
import CallcheckDecorator from '../../../../src/models/map/structure/producers/Producer'

describe('Producer tests', () => {
  var producer

  beforeEach(()=>{
    producer = new CallcheckDecorator()
    producer.produce = sinon.spy()
  })

  it('Producer calls only when meant to', ()=>{
    producer.production()

    assert.equal(1, producer.produce.callCount)

    producer.owner = 4
    producer.production()

    assert.equal(1, producer.produce.callCount)

    producer.production(0, true)
    producer.production()

    assert.equal(2, producer.produce.callCount)
  })
})