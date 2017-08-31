const assert = require("assert")
const sinon = require("sinon")
import Refiner from '../../../../src/models/structure/producers/Refiner'
import { createLine } from '../../../../src/models/logic/Functions'

describe('Refiner tests', () => {
  var inputTypes, multiplier, radius, refiner, zone, takesOwnership

  var create = () => refiner = new Refiner({
    inputTypes: inputTypes,
    multiplier: multiplier,
    radius: radius,
    zone: zone,
    takesOwnership: takesOwnership
  })

  beforeEach(() => {
    multiplier = 2
    radius = 3
    inputTypes = []
    zone = new Set()
    zone.add({
      tile: {
        structure: {
          producer: { produce: '' },
          structureType: {name: 'wheat_farm'}
        }
      },
      distance: ''
    })
    takesOwnership = true

    create()
  })

  it('Constructor works', () => {
    assert.equal(refiner.multiplier, multiplier)
    assert.equal(refiner.inputTypes, inputTypes)
    assert.equal(refiner.zone, zone)
  })

  it('canRefineOutputOf works', () => { 
    var structure = {structureType: {name: 'foo'}}
    var spy = sinon.spy()
    refiner.inputTypes.includes = spy
    refiner.canRefineOutputOf(structure)
    assert(spy.calledWith('foo'))
  })

  it('isCloser works', () => {
    var producer = {
      refineryDistance: 3,
      refinery: null
    }
    assert.equal(refiner.isCloser(producer, 3), false)
    assert.equal(refiner.isCloser(producer, 4), false)
    assert.equal(refiner.isCloser(producer, 2), true)
    producer.refineryDistance = null
    assert.equal(refiner.isCloser(producer, 111), true)
  })

  var helpersForStructureCreated = (tile, match, isCloser) => {
    refiner.producerHolders = []
    var canRefineOutputOfStub = sinon.stub()
    var matchedStub = sinon.stub()
    var isCloserStub = sinon.stub()

    canRefineOutputOfStub.withArgs(tile.structure).returns(true)
    matchedStub.withArgs(tile).returns(match)
    isCloserStub.returns(isCloser)

    refiner.canRefineOutputOf = canRefineOutputOfStub
    refiner.findTileInZone = matchedStub
    refiner.isCloser = isCloserStub   
  }

  it('structureCreated adds to producerHolders', () => {
    var tile = {structure: {producer: {refiner: null}}}
    var match = {tile: tile, distance: 75}
    helpersForStructureCreated(tile, match, true)
    refiner.structureCreated(tile)
    assert.equal(refiner.producerHolders.length, 1)
    assert.equal(refiner.producerHolders[0].distance, 75)
    assert.equal(refiner.producerHolders[0].producer, tile.structure.producer)
  })
  
  it('structureCreated does not add to producerHolders if no match or not closer', () => {
    var tile = {structure: {producer: 678}}
    var match = null
    helpersForStructureCreated(tile, match, false)
    refiner.structureCreated(tile)
    assert.equal(refiner.producerHolders.length, 0)
    match = {tile: tile, distance: 44}
    helpersForStructureCreated(tile, match, false)
    refiner.structureCreated(tile)
    assert.equal(refiner.producerHolders.length, 0)
  })

  it('produce works', () => {
    var prodStub = sinon.stub()
    var distanceStub = sinon.stub()
    var producerHolder = {
      distance: 7,
      producer: {
        producedAmount: prodStub
      }
    }
    refiner.producerHolders = [producerHolder, producerHolder]
    prodStub.withArgs(true).returns(3)

    var result = refiner.producedAmount()
    assert.equal(result, 12)
  })

  it('findProducers works', () => {
    var takeControlSpy = sinon.spy()
    var structure = {}
    var capsule = {tile: {structure: structure}, distance: 13}
    refiner.zone = [capsule]
    refiner.takeControlOf = takeControlSpy
    // both sides of conjunction are false
    refiner.canRefineOutputOf = sinon.stub().returns(false)
    refiner.isCloser = sinon.stub().returns(false)
    refiner.findProducers()
    assert.equal(takeControlSpy.callCount, 0)
    // left side true, right side false
    refiner.canRefineOutputOf = sinon.stub().returns(true)
    refiner.isCloser = sinon.stub().returns(false)
    refiner.findProducers()
    assert.equal(takeControlSpy.callCount, 0)
    // left side false, right side true
    refiner.canRefineOutputOf = sinon.stub().returns(false)
    refiner.isCloser = sinon.stub().returns(true)
    refiner.findProducers()
    assert.equal(takeControlSpy.callCount, 0)
    // both sides true
    refiner.canRefineOutputOf = sinon.stub().returns(true)
    refiner.isCloser = sinon.stub().returns(true)
    refiner.findProducers()
    assert.equal(takeControlSpy.callCount, 1)
  })

  it('canRefineOutputOf works', () => {
    var structure = {
      structureType: {
        buysFrom: 'huuhaa',
        type: 'huuhaa',
        name: 'nimi'
      }
    }
    refiner.inputTypes = 'foo'
    // first if is false
    assert(!refiner.canRefineOutputOf(structure))
    refiner.inputTypes = 'pöönimi'
    assert(refiner.canRefineOutputOf(structure))
    // first if is true; second is false
    // both sides of the conjunction are false
    refiner.inputTypes = 'all'
    refiner.structure = {structureType: {name: 'pöö'}}
    assert(refiner.canRefineOutputOf(structure))
    // left side is true, right side false
    structure.structureType.type = 'refinery'
    structure.structureType.buysFrom = 'foobar'
    assert(refiner.canRefineOutputOf(structure))
    // left side is false, right side true
    structure.structureType.type = 'bla'
    structure.structureType.buysFrom = 'huu'
    assert(refiner.canRefineOutputOf(structure))
    structure.structureType.buysFrom = 'allfoo'
    assert(refiner.canRefineOutputOf(structure))
    structure.structureType.buysFrom = 'foopöö'
    assert(refiner.canRefineOutputOf(structure))
    // both sides are true
    structure.structureType.type = 'refinery'
    assert(!refiner.canRefineOutputOf(structure))
  })

  it('findTileInZone works', () => {
    var tile = {equals: (value) => {return 13 === value}}
    var capsule = {tile: 7}
    refiner.zone = [capsule]
    assert.equal(refiner.findTileInZone(tile), null)
    capsule.tile = 13
    assert.equal(refiner.findTileInZone(tile), capsule)
  })

  it('takeControlOf works', () => {
    var producer = {refinery: null, refineryDistance: null}
    var distance = 17
    refiner.producerHolders = []
    // first if returns null
    refiner.takesOwnership = false
    assert.equal(refiner.takeControlOf(producer, distance), null)
    assert.equal(refiner.producerHolders[0].distance, 17)
    assert.equal(producer.refinery, null)
    assert.equal(producer.refineryDistance, null)
    // second if ok
    refiner.takesOwnership = true
    var loseControlSpy = sinon.spy()
    var refiner2 = new Refiner({
      inputTypes: inputTypes,
      multiplier: multiplier,
      radius: radius,
      zone: zone,
      takesOwnership: takesOwnership
    })
    refiner2.loseControlOf = loseControlSpy
    producer = {refinery: refiner2, refineryDistance: null}
    refiner.takeControlOf(producer, distance)
    assert(loseControlSpy.calledWith(producer))
    assert.equal(producer.refinery, refiner)
  })

  it('loseControlOf works', () => {
    var fooProducer = {producer: 'foo'}
    var removableProducer = {producer: 'removable'}
    refiner.producerHolders = [fooProducer, fooProducer, removableProducer, fooProducer, removableProducer]
    refiner.loseControlOf('removable')
    assert.equal(refiner.producerHolders.length, 4)
    assert.equal(refiner.producerHolders[2], fooProducer)
    assert.equal(refiner.producerHolders[3], removableProducer)
  })
})