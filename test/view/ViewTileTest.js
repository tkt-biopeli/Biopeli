const assert = require('assert')
const sinon = require('sinon')
import ViewTile from '../../src/view/map/ViewTile'

describe('View tile tests', () =>{
  it('ViewTile costructor works without structure', () =>{
    var game = {make: {sprite: function(){}}}
    var mtile = {tileType: {asset: "test"}, structure: null}
    var x = 4
    var y = 6

    var mock = sinon.mock(game.make)
    mock.expects("sprite").once().withArgs(4, 6, "test")

    var tile = new ViewTile({game: game, x: x, y: y, modelTile: mtile})

    assert.equal(game, tile.game)
    assert.equal(mtile, tile.modelTile)
    assert(tile.structureSprite == null)

    mock.verify()
  })
})
