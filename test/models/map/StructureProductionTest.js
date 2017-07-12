const assert = require("assert")
const sinon = require("sinon")
import StructureProduction from '../../../src/models/map/structure/StructureProduction'

describe('StructureProduction tests', () => {
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
   
    var productionFn = StructureProduction.createProductionFn(foo, tile)

    assert.equal(0, productionFn(timeEvent))
  })

  it('productionFn works with constantly-yielding structure type', () => {
    var productionFn = StructureProduction.createProductionFn(structureType, tile)

    assert.equal(17, productionFn(timeEvent))
    timeEvent.month = 7
    assert.equal(17, productionFn(timeEvent))
    timeEvent.week = 3
    assert.equal(17, productionFn(timeEvent))
  })

  it('productionFn works with periodically-yielding structure type', () => {
    structureType.continuousProduction = false
    var productionFn = StructureProduction.createProductionFn(structureType, tile)

    assert.equal(0, productionFn(timeEvent))
    timeEvent.month = 7
    assert.equal(17, productionFn(timeEvent))
    timeEvent.week = 2
    assert.equal(0, productionFn(timeEvent))
    timeEvent.week = 1
    timeEvent.month = 8
    assert.equal(0, productionFn(timeEvent))
    timeEvent.week = 3
    assert.equal(17, productionFn(timeEvent))
  })
})
