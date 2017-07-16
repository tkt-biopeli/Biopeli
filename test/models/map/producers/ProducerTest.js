const assert = require("assert")
const sinon = require("sinon")
import Producer from '../../../../src/models/map/structure/producers/Producer'

describe('Producer tests', () => {

  var p, turnip, tile
  beforeEach(()=>{
    tile = {flowers: 5}
    turnip = 1
    p = new Producer({
      turnipYield: turnip,
      tile: tile
    })
  })

  it('Constructor test', ()=>{
    assert.equal(turnip, p.turnipYield)
    assert.equal(tile, p.tile)
  })

  it('Pollution is counted in', ()=>{
    p.productionThisWeek = () => 5
    assert.equal(5, p.produce())
    tile.flowers = 0
    assert.equal(0, p.produce())
    tile.flowers = 2
    assert.equal(2, p.produce())
  })
})