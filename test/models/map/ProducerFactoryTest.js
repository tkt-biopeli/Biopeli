const assert = require("assert")
const sinon = require("sinon")
import StructureProduction from '../../../src/models/map/structure/producers/ProducerFactory'

describe('ProducerFactory tests', () => {
  var structureType, timeEvent, tile

  beforeEach(() => {
    timeEvent = {
      month: 6,
      week: 1
    }

    structureType = {
      harvestingWeeks: new Set(['7.1', '8.3']),
      continuousProduction: true,
      turnipYield: 17
    }  

    tile = {
      flowers: 1
    }
  })

  it('productionFn returns zero when structure type is undefined', () => {
    var foo
   
    var producer = StructureProduction.createProducer(null, foo, tile)

    assert.equal(0, producer.turnipYield)
  })
})
