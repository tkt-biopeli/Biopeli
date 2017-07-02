const assert = require("assert")
const sinon = require("sinon")
import StructureProduction from '../../../src/models/map/structure/StructureProduction'

describe('StructureProduction tests', () => {

  it('productionFn works', () => {
    var productionFn = StructureProduction.createProductionFn()
    var constValue = 2
    var timeEvent = {
      month: 6
    }
    
    assert.equal(2, productionFn(timeEvent))
    timeEvent.month = 8
    assert.equal(102, productionFn(timeEvent))
  })
})
