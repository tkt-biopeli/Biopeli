const assert = require('assert')
const sinon = require('sinon')
import ValuesTileFilter from '../../../../src/controllers/events/random/filters/ValuesTileFilter'

describe('Value tile filter and tile tile filter tests', ()=>{
  var cmt = (fertility, moisture, flowers) => ({
    fertility: fertility,
    moisture: moisture,
    flowers: flowers
  })

  it('Filter works', ()=>{
    var filter = new ValuesTileFilter({
      gameState: {config: {gameplaySettings: {tiles: {maxFlowers: 10}}}},
      json:{
        moistureLimits: {
          max: 4
        },
        flowerLimits: {
          max: 9,
          min: 0
        }
      }
    })

    assert(filter.isValidTile(cmt(0, 0, 0)))
    assert(filter.isValidTile(cmt(100, 0, 0)))
    assert(filter.isValidTile(cmt(0, 4, 0)))
    assert(filter.isValidTile(cmt(0, 0, 9)))
    assert(filter.isValidTile(cmt(21, 2, 5)))

    assert(!filter.isValidTile(cmt(-1, 0, 0)))
    assert(!filter.isValidTile(cmt(101, 0, 0)))
    assert(!filter.isValidTile(cmt(0, 5, 0)))
    assert(!filter.isValidTile(cmt(0, 0, 10)))
    assert(!filter.isValidTile(cmt(0, -1, 0)))
  })
})