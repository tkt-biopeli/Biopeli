const assert = require('assert')
const sinon = require('sinon')
import TileValueEffect from '../../../../../../src/controllers/events/random/effects/withmultipletargets/TileValueEffect'

describe('Effect tests', ()=>{
  it('A subclass TileValueEffect calls Effect\'s happen method correctly', ()=>{
    var json = {fertilityChange: 8, moistureChange: 11, flowerChange: 4}
    var effect = new TileValueEffect({json: json})

    var tile1 = {fertility: 79, moisture: 47, flowers: 23}
    var tile2 = {fertility: 11, moisture: 34, flowers: 87}
    var tiles = [tile1, tile2]
    effect.realizeEvent(tiles)

    assert.equal(tile1.fertility, 87)
    assert.equal(tile1.moisture, 58)
    assert.equal(tile1.flowers, 27)
    assert.equal(tile2.fertility, 19)
    assert.equal(tile2.moisture, 45)
    assert.equal(tile2.flowers, 91)
  })
})
