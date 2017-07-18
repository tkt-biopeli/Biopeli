import MapGen from '../../../src/models/map/MapGen'
import StaticTypes from '../../../src/models/StaticTypes'
const assert = require('assert')

describe('Map generation tests', () => {
  var Noise = class Noise{perlin2(){return 1}}

  it('Constructor works', () => {
    var mg = new MapGen({
      height:1, 
      width:1, 
      seed:1,
      Noise: Noise
    })
    assert(mg.forestnoise != undefined)
    assert(mg.groundnoise != undefined)
  })

  it('typeAt returns valid type', () => {
    var mg = new MapGen({
      height:1, 
      width:1, 
      seed:1,
      Noise: Noise
    })
    var types = StaticTypes.tileTypes
    var type = mg.typeAt(0,0)
    for(var key in types){
      if(types[key] == type)
        return
    }
    assert(false)
  })
})
