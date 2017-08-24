const assert = require("assert")
const sinon = require("sinon")
import SeasonalProducer from '../../../../src/models/structure/producers/SeasonalProducer'

describe('Seasonal producer tests', () => {
  it('production works', () => {
    var structureType, timeEvent, tile

    timeEvent = {
      month: 6,
      week: 1
    }

    var harvestingWeeks = new Set(['7.1', '8.3'])
    var sT = {turnipYield: 1}

    var producer = new SeasonalProducer({
      structureType: sT,
      tile: tile,
      harvestWeeks: harvestingWeeks
    })

    producer.produce(timeEvent)
    assert.equal(0, producer.producedAmount())
    producer.produce(timeEvent)
    assert.equal(0, producer.producedAmount())
    producer.produce(timeEvent)
    assert.equal(0, producer.producedAmount())
    timeEvent.month = 7
    producer.produce(timeEvent)
    assert.equal(4, producer.producedAmount())
    timeEvent.week = 3
    timeEvent.month = 8
    producer.produce(timeEvent)
    assert.equal(1, producer.producedAmount())
  })
})