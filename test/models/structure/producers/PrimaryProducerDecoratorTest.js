const assert = require("assert")
const sinon = require("sinon")
import PrimaryProducerDecorator from '../../../../src/models/structure/producers/decorators/PrimaryProducerDecorator'

describe('Primary producer decorator tests', () => {

  var p, ip, turnip, tile
  beforeEach(()=>{
    tile = {
      flowers: 10,
      getFlowers: function () { return this.flowers },
      getMoisture: function () {return this.moisture },
      getFertility: function () {return this.fertility}
    }
    ip = {
      initialize: ()=>{}
    }
    p = new PrimaryProducerDecorator({
      producer: ip,
      tile: tile,
      maxFlowers: 10
    })
    p.initialize({
      structureType:{
        moistureMax: 7,
        moistureMin
  : 5,
        fertilityMax: 10, 
        fertilityMin: 8
      }
    })
  })

  it('Constructor test', ()=>{
    assert.equal(tile, p.tile)
    assert.equal(ip, p.producer)
  })

  it('Produce test', () => {
    p.moistureMultiplier = () => 0.5
    p.fertilityMultiplier = () => 0.5
    p.flowersMultiplier = () => 1
    p.producer.producedAmount = (te) => 20
    p.structure.ownedTiles = [{}]
    assert.equal(5, p.producedAmount())
  })

  it('moisture multiplier test', () => {
    var min = p.structure.structureType.moistureMin 
    var max = p.structure.structureType.moistureMax
    var mid = (min + max) / 2
    var moisture

    //below min
    tile.moisture = min - 1
    moisture = p.moistureMultiplier(tile)
    assert(moisture < 1 && moisture > 0, 'below min')

    //above max
    tile.moisture = max + 1
    moisture = p.moistureMultiplier(tile)
    assert(moisture < 1 && moisture > 0, 'above max')

    //optimal
    tile.moisture = mid
    moisture = p.moistureMultiplier(tile)
    assert(moisture == 1, 'optimal ' + moisture)

    //extremely small/large values return zero
    tile.moisture = -9999999
    moisture = p.moistureMultiplier(tile)
    assert(moisture == 0, 'extremely small')

    tile.moisture = 9999999
    moisture = p.moistureMultiplier(tile)
    assert(moisture == 0, 'extremely large')
  })

  it('fertility multiplier test', () => {
    var min = p.structure.structureType.fertilityMin, 
        max = p.structure.structureType.fertilityMax,
        mid = (min + max) / 2,
        fertility

    //below min
    tile.fertility = min - 1
    fertility = p.fertilityMultiplier(tile)
    assert(fertility < 1 && fertility > 0, 'below min ' + fertility)

    //above max
    tile.fertility = max + 1
    fertility = p.fertilityMultiplier(tile)
    assert(fertility < 1 && fertility > 0, 'above max')

    //optimal
    tile.fertility = mid
    fertility = p.fertilityMultiplier(tile)
    assert(fertility == 1, 'optimal')

    //extremely small/large values return zero
    tile.fertility = -9999999
    fertility = p.fertilityMultiplier(tile)
    assert(fertility == 0, 'extremely small')

    tile.fertility = 9999999
    fertility = p.fertilityMultiplier(tile)
    assert(fertility == 0, 'extremely large')
  })
})