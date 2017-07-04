const assert = require('assert')
const sinon = require('sinon')
import Structure from '../../../src/models/map/structure/Structure'

describe('Structure tests', () => {

  var structure, tile, stype, produceFnSpy, timeEvent

  beforeEach(() => {
    produceFnSpy = sinon.spy()

    timeEvent = {
      week: 1,
      month: 1,
      year: 1984
    }
      
    stype = {
      asset: 'sd'
    }

    tile = { potential: 10 }

    structure = new Structure({
      tile: tile,
      name: 'Riston rustholli',
      size: 10,
      structureType: stype,
      foundingYear: 1999,
      produceFn: produceFnSpy
    })
  })

  it('Constructor works', () => {
    assert.equal(tile, structure.tile)
    assert.equal(stype, structure.structureType)
    assert.equal('Riston rustholli', structure.name)
    assert.equal(10, structure.size)
    assert.equal(1, structure.productionInput)
    assert.equal(1999, structure.foundingYear)
    assert.equal(produceFnSpy, structure.produceFn)
  })

  it('asset function returns correct value', () => {
    assert.equal('sd', structure.asset())
  })

  it('calculateProductionEfficiency returns correct value', () => {
    assert.equal(100, structure.calculateProductionEfficiency())
  })
  
  it('produce returns zero if there is no produce function', () => {
    var structure2 = new Structure({
      tile: tile,
      name: 'Riston rustholli',
      size: 10,
      structureType: stype,
      foundingYear: 1999
    })
    assert.equal(0, structure2.produce(timeEvent))
  })
  
  it('produce calls production function with correct parameter', () => {
    structure.produce(timeEvent)
    assert(produceFnSpy.calledWith(timeEvent))
  })
})
