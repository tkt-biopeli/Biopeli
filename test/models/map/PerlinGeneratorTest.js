import PerlinGenerator from '../../../src/models/map/PerlinGenerator'
const assert = require('assert')

describe('Perlin generation tests', () => {
  var Noise = class Noise{perlin2(){return 1}}
  var perlinGenerator

  beforeEach(()=>{
    perlinGenerator = new PerlinGenerator({
      Noise: Noise,
      noiseWidth: 1,
      noiseHeight: 2,
      freqs: {
        groundfreq: 3,
        forestfreq: 4,
        fertilityfreq: 5
      }
    })
  })

  it('Constructor works', ()=>{
    assert(perlinGenerator.forestnoise != null)
    assert(perlinGenerator.groundnoise != null)
    assert(perlinGenerator.fertilitynoise != null)

    assert.equal(1, perlinGenerator.width)
    assert.equal(2, perlinGenerator.height)

    assert.equal(3, perlinGenerator.groundfreq)
    assert.equal(4, perlinGenerator.forestfreq)
    assert.equal(5, perlinGenerator.fertilityfreq)
  })
})
