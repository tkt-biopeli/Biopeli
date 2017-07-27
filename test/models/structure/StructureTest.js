const assert = require('assert')
const sinon = require('sinon')
import Structure from '../../../src/models/structure/Structure'

describe('Structure tests', () => {

  var structure, tile, stype, producer, timeEvent

  beforeEach(() => {
    producer = {
      produce: sinon.spy()
    }

    timeEvent = {
      week: 1,
      month: 1,
      year: 1984
    }
      
    stype = {
      continuousProduction: false,
      asset: 'sd',
      turnipYield: 100,
      cost: 100
    }

    tile = { potential: 10 }

    structure = new Structure({
      tile: tile,
      ownerName: 'Risto',
      structureName: 'Rustholli',
      size: 10,
      structureType: stype,
      foundingYear: 1999,
      producer: producer
    })
  })

  it('ownsTileAt works', () => {
    var tiles = [
      {x:0, y:1},
      {x:1, y:0},
      {x:1, y:1},
      {x:-1, y:-1},
      {x:7, y:7}
    ]
    structure.ownedTiles = tiles
    assert(structure.ownsTileAt(0,0) == false)
    assert(structure.ownsTileAt(7,7) == true)
    assert(structure.ownsTileAt(1,1) == true)
    assert(structure.ownsTileAt(10,10) == false)
  })

  it('Constructor works', () => {
    assert.equal(tile, structure.tile)
    assert.equal(stype, structure.structureType)
    assert.equal('Risto', structure.ownerName)
    assert.equal('Rustholli', structure.structureName)
    assert.equal(10, structure.size)
    assert.equal(1999, structure.foundingYear)
    assert.equal(producer, structure.producer)
  })

  it('hasContinuousProduction returns correct value', () => {
    assert.equal(false, structure.hasContinuousProduction())
    stype.continuousProduction = true
    assert.equal(true, structure.hasContinuousProduction())
  })

  it('asset function returns correct value', () => {
    assert.equal('sd', structure.asset())
  })
  
  it('produce returns zero if there is no produce function', () => {
    var structure2 = new Structure({
      tile: tile,
      ownerName: 'Riston rustholli',
      size: 10,
      structureType: stype,
      foundingYear: 1999
    })
    assert.equal(0, structure2.produce(timeEvent))
  })
  
  it('produce calls production function with correct parameter', () => {
    structure.produce(timeEvent)
    assert(producer.produce.calledWith(timeEvent))
  })
})
