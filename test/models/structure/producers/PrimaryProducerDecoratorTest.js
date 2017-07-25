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
})