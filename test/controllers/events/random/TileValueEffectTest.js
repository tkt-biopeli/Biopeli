const assert = require('assert')
const sinon = require('sinon')
import TileValueEffect from '../../../../src/controllers/events/random/effects/TileValueEffect'

describe('Tile value effect tests', ()=>{
  it('Works', ()=>{
    var effect = new TileValueEffect({
      json: {
        fertilityChange: 1,
        moistureChange: 2,
        flowerChange: 3
      }
    })
    var tiles = [
      {fertility: 0, moisture: 0, flowers: 0},
      {fertility: 1, moisture: 1, flowers: 1}
    ]

    effect.happen(tiles)
    for(let i = 0 ; i < 2 ; i++){
      assert.equal(i+1, tiles[i].fertility)
      assert.equal(i+2, tiles[i].moisture)
      assert.equal(i+3, tiles[i].flowers)
    }
  })
})