const assert = require('assert')
const sinon = require('sinon')
import ViewTile from '../../src/view/map/ViewTile'

describe('View tile tests', () =>{

  var game
  var mtile
  var x
  var y
  var mock
  var tile

  beforeEach(() => {
    game = {make: {sprite: function(){}}}
    mtile = {tileType: {asset: "test"}, structure: null}
    x = 4
    y = 6
    mock = sinon.mock(game.make)
    mock.expects("sprite").once().withArgs(4, 6, "test")
    tile = new ViewTile({game: game, x: x, y: y, modelTile: mtile})
  })

  it('ViewTile costructor works without structure', () =>{
    assert.equal(game, tile.game)
    assert.equal(mtile, tile.modelTile)
    assert(tile.structureSprite == null)
    mock.verify()
  })

  it('Update works without structure', () =>{
    tile.update()
    assert.equal(null, tile.modelTile.structure)
    mock.verify()
  })

})
