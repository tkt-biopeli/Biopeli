const assert = require('assert')
const sinon = require('sinon')
import TileValueEffect from '../../../../../../src/controllers/events/random/effects/withmultipletargets/TileValueEffect'

describe('Tile value effect tests', ()=>{
  var effect

  var createEffect = (jsonValues) => {
    effect = new TileValueEffect({
      json: {
        fertilityChange: jsonValues[0],
        moistureChange: jsonValues[1],
        flowerChange: jsonValues[2]
      }
    })
  }
  it('Constructor test', ()=>{
    createEffect([17, 5, 3])
    assert.equal(effect.fertility, 17)
    assert.equal(effect.moisture, 5)
    assert.equal(effect.flowers, 3)
    effect = new TileValueEffect({json: {}})
    assert.equal(effect.fertility, 0)
    assert.equal(effect.moisture, 0)
    assert.equal(effect.flowers, 0)
  })

  
  it('realizeEventForOneElement method functioning', ()=>{
    createEffect([8, 11, 4])
    var tile = {fertility: 79, moisture: 47, flowers: 23}
    effect.realizeEventForOneElement(tile)
    assert.equal(tile.fertility, 87)
    assert.equal(tile.moisture, 58)
    assert.equal(tile.flowers, 27)
  })
})
