const assert = require("assert")
const sinon = require("sinon")
import PrimaryProducerDecorator from '../../../../src/models/structure/producers/decorators/PrimaryProducerDecorator'

describe('Primary producer decorator tests', () => {

  var p, ip, turnip, tile
  beforeEach(()=>{
    tile = {flowers: 10}
    ip = {
      initialize: ()=>{}
    }
    p = new PrimaryProducerDecorator({
      producer: ip,
      tile: tile
    })
    p.initialize({
      structureType:{
        moisture_max: 7,
        moisture_min: 5,
        fertility_max: 10, 
        fertility_min: 8
      }
    })
  })

  it('Constructor test', ()=>{
    assert.equal(tile, p.tile)
    assert.equal(ip, p.producer)
  })

  it('Produce test', () => {
    p.getMoistureMultiplier = () => {return 0.5}
    p.getFertilityMultiplier = () => {return 0.5}
    p.producer.produce = (te) => {return 20}
    p.ownedFarmLand = [{flowers: 10}]
    assert(p.produce() == 5)
  })

  it('moisture multiplier test', () => {
    var min = p.structure.structureType.moisture_min 
    var max = p.structure.structureType.moisture_max
    var mid = (min + max) / 2
    var moisture

    //below min
    tile.moisture = min - 1
    moisture = p.getMoistureMultiplier(tile)
    assert(moisture < 1 && moisture > 0, 'below min')

    //above max
    tile.moisture = max + 1
    moisture = p.getMoistureMultiplier(tile)
    assert(moisture < 1 && moisture > 0, 'above max')

    //optimal
    tile.moisture = mid
    moisture = p.getMoistureMultiplier(tile)
    assert(moisture == 1, 'optimal ' + moisture)

    //extremely small/large values return zero
    tile.moisture = -9999999
    moisture = p.getMoistureMultiplier(tile)
    assert(moisture == 0, 'extremely small')

    tile.moisture = 9999999
    moisture = p.getMoistureMultiplier(tile)
    assert(moisture == 0, 'extremely large')
  })

  it('fertility multiplier test', () => {
    var min = p.structure.structureType.fertility_min, 
        max = p.structure.structureType.fertility_max,
        mid = (min + max) / 2,
        fertility

    //below min
    tile.fertility = min - 1
    fertility = p.getFertilityMultiplier(tile)
    assert(fertility < 1 && fertility > 0, 'below min ' + fertility)

    //above max
    tile.fertility = max + 1
    fertility = p.getFertilityMultiplier(tile)
    assert(fertility < 1 && fertility > 0, 'above max')

    //optimal
    tile.fertility = mid
    fertility = p.getFertilityMultiplier(tile)
    assert(fertility == 1, 'optimal')

    //extremely small/large values return zero
    tile.fertility = -9999999
    fertility = p.getFertilityMultiplier(tile)
    assert(fertility == 0, 'extremely small')

    tile.fertility = 9999999
    fertility = p.getFertilityMultiplier(tile)
    assert(fertility == 0, 'extremely large')
  })
})