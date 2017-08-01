const assert = require("assert")
const sinon = require("sinon")
import AllDecorator from '../../../../src/models/structure/producers/decorators/AllDecorator'

describe('AllDecorator tests', () => {
  var producer, p, health, structure

  beforeEach(()=>{
    p = {produce: () => 7, initialize: sinon.spy()}
    health = {percent: () => 1}
    structure = {health: health}

    producer = new AllDecorator({producer: p})
    producer.initialize(structure)
  })

  it('Constructor and initialization test', ()=>{
    assert.equal(p, producer.producer)
    assert.equal(structure, producer.structure)
    assert(p.initialize.calledWith(structure))
  })

  it('Producer calls only when meant to', ()=>{
    p.produce = sinon.spy()

    producer.produce()

    assert.equal(1, p.produce.callCount)

    producer.refinery = 4
    producer.produce()

    assert.equal(1, p.produce.callCount)

    producer.produce(0, true)
    producer.produce()

    assert.equal(2, p.produce.callCount)
  })

  it('Production is based on the health percentage', ()=>{
    assert.equal(7, producer.produce())
    
    health.percent = () => 0.5

    assert.equal(3.5, producer.produce())
  })
})