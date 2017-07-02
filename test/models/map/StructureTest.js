const assert = require('assert')
import Structure from '../../../src/models/map/structure/Structure'

describe('Structure tests', () => {

  var structure, tile
  var stype = {
    asset: 'sd',
    createProductionFn: function () {}
  }

  before(function () {
    tile = { potential: 10 }

    structure = new Structure({
      tile: tile,
      name: 'Riston rustholli',
      size: 10,
      structureType: stype,
      foundingYear: 1999
    })
  })

  it('Constructor works', () => {
    assert.equal(tile, structure.tile)
    assert.equal(stype, structure.structureType)
    assert.equal('Riston rustholli', structure.name)
    assert.equal(10, structure.size)
    assert.equal(1, structure.productionInput)
    assert.equal(1999, structure.foundingYear)
  })

  it('asset-shortcut works', () => {
    assert.equal('sd', structure.asset())
  })

  it('calculateProductionEfficiency returns correct value', () => {
    assert.equal(100, structure.calculateProductionEfficiency())
  })
})
