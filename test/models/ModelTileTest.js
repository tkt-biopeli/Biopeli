const assert = require("assert")
import ModelTile from '../../src/models/ModelTile'
import tileTypeCreator from '../../src/models/TileType'

describe('Model tile tests', () =>{
  it('Constructor test', () =>{
    var tileType = tileTypeCreator().forest
    var tile = new ModelTile(1, 2, tileType)

    assert.equal(1, tile.x)
    assert.equal(2, tile.y)
    assert.equal('forest', tile.tileType.name)
  })
})