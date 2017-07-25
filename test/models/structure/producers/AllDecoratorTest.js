const assert = require("assert")
const sinon = require("sinon")
import AllDecorator from '../../../../src/models/structure/producers/decorators/AllDecorator'

describe('AllDecorator tests', () => {
  var producer, p, health, tile

  beforeEach(()=>{
    p = {produce: () => 7}
    health = {percent: () => 1}
    tile = {structure: {health: health}}

    producer = new AllDecorator({producer: p, tile: tile})
  })

  it('Constructor test', ()=>{
    assert.equal(p, producer.producer)
    assert.equal(tile, producer.tile)
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

  it('Health is set at first produce', ()=>{
    assert(producer.health == null)

    producer.produce()

    assert.equal(health, producer.health)

    producer.tile = null

    producer.produce()

    assert.equal(health, producer.health)
  })

  it('Production is based on the health percentage', ()=>{
    assert.equal(7, producer.produce())
    
    health.percent = () => 0.5

    assert.equal(3.5, producer.produce())
  })
})