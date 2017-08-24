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
    assert.equal(1999, structure.foundingYear)
    assert.equal(producer, structure.producer)
  })

  it('asset function returns correct value', () => {
    assert.equal('sd', structure.asset())
  })
})
