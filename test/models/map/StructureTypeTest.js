const assert = require("assert")

import StructureType from '../../../src/models/map/structure/StructureType'

describe('StructureType tests', () => {

  it('Constructor tests', () => {
    var stype = new StructureType({
      name: 9,
      asset: 7,
      allowedTiles: 5,
      createSeasonFn: 1,
      createConstFn: 1
    })
    assert.equal(9, stype.name)
    assert.equal(7, stype.asset)
    assert.equal(5, stype.allowedTiles)
  })  
})
