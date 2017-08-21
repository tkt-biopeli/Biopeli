const assert = require("assert")
const sinon = require("sinon")
import ContinuousProducer from '../../../../src/models/structure/producers/ContinuousProducer'

describe('Continuous producer tests', () => {
  it('production works', () => {
    var turnipYield = 17

    var tile = 4
    var sT = {turnipYield: 3}

    var producer = new ContinuousProducer({
      structureType: sT,
      tile: tile
    })

    var timeEvent = {
      month: 1,
      week: 1
    }

    assert.equal(3, producer.produce(timeEvent))
    timeEvent.month = 7
    assert.equal(3, producer.produce(timeEvent))
    timeEvent.week = 3
    assert.equal(3, producer.produce(timeEvent))
  })
})