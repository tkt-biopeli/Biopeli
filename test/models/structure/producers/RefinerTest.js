const assert = require("assert")
const sinon = require("sinon")
import Refiner from '../../../../src/models/structure/producers/Refiner'
import { createLine } from '../../../../src/models/logic/Functions'

describe('Refiner tests', () => {
  var inputTypes, multiplier, radius, refiner, zone

  var create = () => refiner = new Refiner({
    inputTypes: inputTypes,
    multiplier: multiplier,
    radius: radius,
    zone: zone
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


    create()
  })

  it('Constructor works', () => {
    assert.equal(refiner.multiplier, multiplier)
    assert.equal(refiner.radius, radius)
    assert.equal(refiner.inputTypes, inputTypes)
    assert.equal(refiner.zone, zone)
    var func = createLine(1, 1, radius, 1 / multiplier)
    assert.equal(refiner.distancefunction(5), func(5))
  })

  it('verifyOwnership works', () => {
    var prodHolder = {producer: {refinery: null}}
    assert.equal(refiner.verifyOwnership(prodHolder), false)
    prodHolder.producer.refinery = refiner
    assert.equal(refiner.verifyOwnership(prodHolder), true)
  })

  it('canRefineOutputOf works', () => {
    var structure = {structureType: {name: 'foo'}}
    var spy = sinon.spy()
    refiner.inputTypes.includes = spy
    refiner.canRefineOutputOf(structure)
    assert(spy.calledWith('foo'))
  })

  it('getMatchedCapsule works', () => {
    var tile = {}
    var capsule = {tile: tile}
    refiner.zone.add(capsule)
    assert.equal(refiner.getMatchedCapsule(tile), capsule)
    refiner.zone.delete(capsule)
    assert.equal(refiner.getMatchedCapsule(tile), null)
  })

  it('isCloser works', () => {
    var producer = {
      refineryDistance: 3,
      refinery: null
    }
    assert.equal(refiner.isCloser(producer, 3), false)
    assert.equal(producer.refineryDistance, 3)
    assert.equal(producer.refinery, null)
    assert.equal(refiner.isCloser(producer, 4), false)
    assert.equal(producer.refineryDistance, 3)
    assert.equal(producer.refinery, null)
    assert.equal(refiner.isCloser(producer, 2), true)
    assert.equal(producer.refineryDistance, 2)
    assert.equal(producer.refinery, refiner)
    producer.refineryDistance = null
    assert.equal(refiner.isCloser(producer, 111), true)
    assert.equal(producer.refineryDistance, 111)
    assert.equal(producer.refinery, refiner)
  })

  var helpersForStructureCreated = (tile, match) => {
    refiner.producerHolders = []
    var canRefineOutputOfStub = sinon.stub()
    var matchedStub = sinon.stub()
    var isCloserStub = sinon.stub()

    canRefineOutputOfStub.withArgs(tile.structure).returns(true)
    matchedStub.withArgs(tile).returns(match)
    isCloserStub.withArgs(678, 75).returns(true)
    isCloserStub.withArgs(678, 44).returns(false)

    refiner.canRefineOutputOf = canRefineOutputOfStub
    refiner.getMatchedCapsule = matchedStub
    refiner.isCloser = isCloserStub   
  }

  it('structureCreated adds to producerHolders', () => {
    var tile = {structure: {producer: 678}}
    var match = {tile: tile, distance: 75}
    helpersForStructureCreated(tile, match)
    refiner.structureCreated(tile)
    assert.equal(refiner.producerHolders.length, 1)
    assert.equal(refiner.producerHolders[0].distance, 75)
    assert.equal(refiner.producerHolders[0].producer, 678)
  })
  
  it('structureCreated does not add to producerHolders if no match or not closer', () => {
    var tile = {structure: {producer: 678}}
    var match = null
    helpersForStructureCreated(tile, match)
    refiner.structureCreated(tile)
    assert.equal(refiner.producerHolders.length, 0)
    match = {tile: tile, distance: 44}
    helpersForStructureCreated(tile, match)
    refiner.structureCreated(tile)
    assert.equal(refiner.producerHolders.length, 0)
  })

  it('produce works', () => {
    var verifyOwnershipStub = sinon.stub()
    var prodStub = sinon.stub()
    var distanceStub = sinon.stub()
    var producerHolder = {
      distance: 7,
      producer: {
        produce: prodStub
      }
    }
    refiner.producerHolders = [producerHolder, 'huuhaa', producerHolder]
    prodStub.withArgs(11, true).returns(3)
    distanceStub.withArgs(7).returns(12)

    verifyOwnershipStub.withArgs(producerHolder).returns(true)
    refiner.verifyOwnership = verifyOwnershipStub
    refiner.distancefunction = distanceStub

    var result = refiner.produce(11)
    assert.equal(result, 144)
    assert.equal(refiner.producerHolders.length, 2)
  })
})