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
    var turnipYield = 1

    var producer = new SeasonalProducer({
      turnipYield: turnipYield,
      tile: tile,
      harvestWeeks: harvestingWeeks
    })

    assert.equal(0, producer.produce(timeEvent))
    assert.equal(0, producer.produce(timeEvent))
    assert.equal(0, producer.produce(timeEvent))
    timeEvent.month = 7
    assert.equal(4, producer.produce(timeEvent))
    timeEvent.week = 3
    timeEvent.month = 8
    assert.equal(1, producer.produce(timeEvent))
  })
})