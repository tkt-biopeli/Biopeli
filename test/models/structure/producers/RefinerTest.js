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
})