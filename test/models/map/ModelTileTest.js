const assert = require("assert")
import ModelTile from '../../../src/models/map/ModelTile'

describe('Model tile tests', () =>{

  it('Constructor works', () =>{
    var tile = new ModelTile({x: 1, y: 2, type: 0, structure: -1})

    assert.equal(1, tile.x)
    assert.equal(2, tile.y)
    assert.equal(0, tile.tileType)
    assert.equal(-1, tile.structure)
    assert.equal(10, tile.potential)
  })
})
