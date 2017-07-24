const assert = require("assert")
const sinon = require("sinon")
import PrimaryProducerDecorator from '../../../../src/models/structure/producers/decorators/PrimaryProducerDecorator'

describe('Primary producer decorator tests', () => {

  var p, ip, turnip, tile
  beforeEach(()=>{
    tile = {flowers: 10}
    ip = {}
    p = new PrimaryProducerDecorator({
      producer: ip,
      tile: tile
    })
  })

  it('Constructor test', ()=>{
    assert.equal(tile, p.tile)
    assert.equal(ip, p.producer)
  })

  it('Pollution is counted in', ()=>{
    ip.produce = () => 5
    assert.equal(5, p.produce())
    tile.flowers = 0
    assert.equal(0, p.produce())
    tile.flowers = 5
    assert.equal(2.5, p.produce())
  })
})