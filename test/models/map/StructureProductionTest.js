const assert = require("assert")
const sinon = require("sinon")
import StructureProduction from '../../../src/models/map/structure/StructureProduction'

describe('StructureProduction tests', () => {
  var structureType
  var timeEvent = {
    month: 6
  }

  it('productionFn returns zero when structure type is undefined', () => {
    var productionFn = StructureProduction.createProductionFn(structureType)
    
    assert.equal(0, productionFn(timeEvent))
  })

  it('productionFn works with valid structure type', () => {
    structureType = {
      monthsToHarvest: new Set([7, 8]),
      harvestPoints: 56,
      basePoints: 1
    }
    var productionFn = StructureProduction.createProductionFn(structureType)
    
    assert.equal(1, productionFn(timeEvent))
    timeEvent.month = 7
    assert.equal(57, productionFn(timeEvent))
    timeEvent.month = 8
    assert.equal(57, productionFn(timeEvent))
    timeEvent.month = 9
    assert.equal(1, productionFn(timeEvent))
  })
})
