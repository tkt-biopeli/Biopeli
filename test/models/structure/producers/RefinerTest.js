const assert = require("assert")
const sinon = require("sinon")
import Refiner from '../../../../src/models/structure/producers/Refiner'

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
    assert.equal(multiplier, refiner.multiplier)
    assert.equal(radius, refiner.radius)
    assert.equal(inputTypes, refiner.inputTypes)
  })

/*  describe('Produce tests', () => {
    var producer1 = { production: () => 3 }
    var producer2 = { production: () => 7 }
    var radius1, radius2

    var holders = () => {
      refiner.producerHolders = [
        { distance: radius1, producer: producer1 }
      ]
    }

    var add = (radius, producer) => {
      refiner.producerHolders.push({ distance: radius, producer: producer })
    }

    beforeEach(() => {
      radius1 = 1
      radius2 = 1

      holders()
    })

    it('Sum is calculated correctly', () => {
      assert.equal(6, refiner.produce())

      add(radius2, producer2)

      assert.equal(20, refiner.produce())
    })

    it('Distance affects to producedAmount', () => {
      radius1 = 3
      holders()

      assert.equal(3, refiner.produce())

      radius1 = 2
      holders()
      assert.equal(5, refiner.produce())
    })

    it('Multiplier affects to production', () => {
      multiplier = 10
      create()
      holders()

      assert.equal(30, refiner.produce())
    })
  })*/
})