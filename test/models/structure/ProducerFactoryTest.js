const assert = require("assert")
const sinon = require("sinon")
import ProduceFactory from '../../../src/models/structure/ProducerFactory'

describe('ProducerFactory tests', () => {
  var factory

  beforeEach(() => {
    factory = new ProduceFactory({tileFinder: 1, eventController: 2})
  })

  it('Constructor test', ()=>{
    assert.equal(factory.tileFinder, 1)
    assert.equal(factory.eventController, 2)
  })

  it('checkStructureType works properly', ()=>{
    assert.equal(factory.checkStructureType('foo'), 'foo')
    var result = factory.checkStructureType(null)
    assert.notEqual(result.type, 'refinery')
    assert.equal(result.continuousProduction, false)
    assert.equal(result.turnipYield, 0)
  })

  it('createProducer works properly', ()=>{
    var tile = {moisture: 65}
    var structType = {type: 'bla'}
    factory.createRefiner = sinon.stub().returns(13)
    factory.createPrimaryProducer = sinon.stub().returns(23)
    factory.createSpecialStructure = sinon.stub().returns(79)
    // special structure
    var result = factory.createProducer(structType, tile)
    assert.equal(tile.moisture, 40)
    assert.equal(result.producer, 79)
    // primary producer
    structType.type = 'producer_structure'
    var result = factory.createProducer(structType, tile)
    assert.equal(result.producer, 23)
    // refinery
    structType.type = 'refinery'
    var result = factory.createProducer(structType, tile)
    assert.equal(result.producer, 13)
  })

  it('createSpecialStructure works properly', ()=>{
    var tile = {moisture: 65}
    var sType = {reach: 13, moveCosts: 17, changeValues: 79}
    factory.tileFinder = {
      findTilesInDistanceOf: sinon.stub().withArgs((tile, sType.reach, sType.moveCosts)).returns([])
    }
    var result = factory.createSpecialStructure(sType, tile)
    assert.equal(result.zone.length, 0)
    assert.equal(result.changeValues, 79)
    assert.equal(result.tile, tile)
  })
})
