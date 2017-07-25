const assert = require("assert")
const sinon = require("sinon")
import CallcheckDecorator from '../../../../src/models/structure/producers/decorators/CallcheckDecorator'

describe('Callcheck decorator tests', () => {
  var producer, inproducer

  beforeEach(()=>{
    inproducer = {produce: sinon.spy()}

    producer = new CallcheckDecorator({producer: inproducer})
  })

  it('Constructor test', ()=>{
    assert.equal(inproducer, producer.producer)
  })

  it('Producer calls only when meant to', ()=>{
    producer.produce()

    assert.equal(1, inproducer.produce.callCount)

    producer.refinery = 4
    producer.produce()

    assert.equal(1, inproducer.produce.callCount)

    producer.produce(0, true)
    producer.produce()

    assert.equal(2, inproducer.produce.callCount)
  })
})