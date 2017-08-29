const assert = require("assert")
const sinon = require("sinon")
import SpecialStructure from '../../../../src/models/structure/producers/SpecialStructure'

describe('Special structure tests', () => {
  var special

  beforeEach(() => {
    special = new SpecialStructure({
      zone: [],
      tile: {},
      changeValues: {
        fertility: 181,
        moisture: 191,
        flowers: 193
      }
    })
  })

  it('influence method is functioning as expected', () => {
    var capsule = {
      tile: {
        fertility: 3,
        moisture: 7,
        flowers: 11
      }
    }
    special.zone = [capsule]
    special.influence()
    assert.equal(capsule.tile.fertility, 184)
    assert.equal(capsule.tile.moisture, 198)
    assert.equal(capsule.tile.flowers, 204)
  })

  it('producedAmount method is functioning as expected', () => {
    assert.equal(special.producedAmount(), 0)
  })
})