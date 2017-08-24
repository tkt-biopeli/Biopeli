const assert = require('assert')
const sinon = require('sinon')
import ValuesTileFilter from '../../../../../../src/controllers/events/random/filters/tile/ValuesTileFilter'

describe('Value tile filter and tile filter tests', ()=>{
  var filter, json

  beforeEach(() => {
    json = {
      moistureLimits: {
        max: 4
      },
      flowerLimits: {
        max: 9,
        min: 0
      }
    }

    var gameState = {
      config: {gameplaySettings: {tiles: {maxFlowers: 10}}}
    }

    filter = new ValuesTileFilter({
      gameState: gameState,
      json: json
    })
  })

  var cmt = (fertility, moisture, flowers) => ({
    fertility: fertility,
    moisture: moisture,
    flowers: flowers
  })

  it('checkLimits tests', ()=>{
    var theoreticalMax = 79
    var limits = {}
    // limits is null
    var result = filter.checkLimits(null, theoreticalMax)
    assert.equal(result.min, 0)
    assert.equal(result.max, 79)
    // limits min and max are undefined
    var result = filter.checkLimits(limits, theoreticalMax)
    assert.equal(result.min, 0)
    assert.equal(result.max, 79)
    // min is smaller than 0 or max larger than theoretical max
    limits.min = -1
    var result = filter.checkLimits(limits, theoreticalMax)
    assert.equal(result.min, 0)
    assert.equal(result.max, 79)
    limits.min = 14
    limits.max = 113
    var result = filter.checkLimits(limits, theoreticalMax)
    assert.equal(result.min, 14)
    assert.equal(result.max, 79)
    
  })

  it('isValid tests', ()=>{
    assert(filter.isValid(cmt(0, 0, 0)))
    assert(filter.isValid(cmt(100, 0, 0)))
    assert(filter.isValid(cmt(0, 4, 0)))
    assert(filter.isValid(cmt(0, 0, 9)))
    assert(filter.isValid(cmt(21, 2, 5)))

    assert(!filter.isValid(cmt(-1, 0, 0)))
    assert(!filter.isValid(cmt(101, 0, 0)))
    assert(!filter.isValid(cmt(0, 5, 0)))
    assert(!filter.isValid(cmt(0, 0, 10)))
    assert(!filter.isValid(cmt(0, -1, 0)))
  })
})