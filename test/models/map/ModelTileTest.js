const assert = require("assert")
import ModelTile from '../../../src/models/map/ModelTile'

describe('Model tile tests', () => {
  var modelTile, tileType

  beforeEach(()=>{
    tileType = {
      type: 0,
      flowers: 5
    }

    modelTile = new ModelTile({
      x: 13,
      y: 23,
      type: tileType,
      structure: -1,
      moisture: 3,
      fertility: 3
    })
  })

  it('setInLimits method works', () => {
    // value, min, max
    assert.equal(modelTile.setInLimits(7, 13, 79), 13)
    assert.equal(modelTile.setInLimits(91, 13, 79), 79)
    assert.equal(modelTile.setInLimits(61, 13, 79), 61)
  })

  it('equals method works', () => {
    var otherTile = {
      x: 0,
      y: 0
    }
    assert(!modelTile.equals(otherTile))
    otherTile.x = 13
    assert(!modelTile.equals(otherTile))
    otherTile.x = 0
    otherTile.y = 23
    assert(!modelTile.equals(otherTile))
    otherTile.x = 13
    otherTile.y = 23
    assert(modelTile.equals(otherTile))
  })
})
