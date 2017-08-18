const assert = require("assert")
const sinon = require("sinon")
import SpecialStructure from '../../../../src/models/structure/producers/SpecialStructure'

describe('Special producer tests', () => {
  it('production works', () => {

    var tile = {moisture: 100, flowers: 10, fertility: 100}

    var producer = new SpecialStructure({
      zone: [tile],
      tile: tile,
      changeValues: {moisture: -25, fertility: -25, flowers: -1}
    })
    
    producer.influence()
    assert.equal(75, tile.moisture)
  })
})