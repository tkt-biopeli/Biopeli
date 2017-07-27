const assert = require("assert")
import ModelTile from '../../../src/models/map/ModelTile'

describe('Model tile tests', () => {

  it('Constructor works', () => {
    var tileType = {
      type: 0,
      flowers: 5
    }
    var tile = new ModelTile({
      x: 1,
      y: 2,
      type: tileType,
      structure: -1,
      moisture: 3,
      fertility: 3
    })

    assert.equal(1, tile.x)
    assert.equal(2, tile.y)
    assert.equal(tileType, tile.tileType)
    assert.equal(-1, tile.structure)
    assert.equal(5, tile.flowers)
    assert.equal(3, tile.moisture)
    assert.equal(3, tile.fertility)
  })
})
