const assert = require('assert')
const sinon = require('sinon')
import ViewTile from '../../src/sprites/ViewTile'

describe('View tile tests', () =>{
  it('ViewTile costructor works', () =>{
    var game = {add: {sprite: function(){}}}
    var mtile = {tileType: {asset: "test"}}
    var x = 4
    var y = 6

    var mock = sinon.mock(game.add)
    mock.expects("sprite").once().withArgs(4, 6, "test")

    var tile = new ViewTile(game, x, y, mtile)

    assert.equal(x, tile.x)
    assert.equal(y, tile.y)
    assert.equal(game, tile.game)
    assert.equal(mtile, tile.modelTile)

    mock.verify()
  })
})
