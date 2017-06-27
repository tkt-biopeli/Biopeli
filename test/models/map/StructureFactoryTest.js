const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/map/StructureFactory'
import StructureTypes from '../../../src/models/map/StructureType'

describe('StructureFactory tests', () => {

  /**
   * @see StructureType.createUpdateFn
   */
<<<<<<< HEAD
  function createConstantProductionFn(){}
  function createSeasonalProductionFn(){}
=======
  function createUpdateFn() { }
>>>>>>> 38742310955351e6620db8ea1f3e604afe94535b

  it('Constructor works', () => {
    var sbuilder = new StructureFactory({
      tile: 0,
      structureTypes: 1,
      gameTimer: 2
    })
    assert.equal(0, sbuilder.tile)
    assert.equal(1, sbuilder.structureTypes)
    assert.equal(2, sbuilder.gameTimer)
    assert.notEqual(null, sbuilder.structureName)
    assert.notEqual(null, sbuilder.structureSize)
    assert.notEqual(null, sbuilder.gameTimer)
  })

  it('Build building works', () => {
    var spy = sinon.spy()
    var sbuilder = new StructureFactory({
      tile: {},
      structureTypes: {},
      gameTimer: { currentTime: { getYear: () => { } } },
      player: { addStructure: spy }
    })

<<<<<<< HEAD
    sbuilder.buildBuilding({
      name: 'test', 
      createConstantProductionFn:createConstantProductionFn,
      createSeasonalProductionFn:createSeasonalProductionFn
    })
=======
    sbuilder.buildBuilding({ name: 'test', createUpdateFn: createUpdateFn })
>>>>>>> 38742310955351e6620db8ea1f3e604afe94535b
    assert.equal('test', sbuilder.tile.structure.structureType.name)
    assert.equal(1, spy.callCount)
  })

  var spy
  var builder
  var types
  var setSpy = function () {
    types = StructureTypes()
    spy = sinon.spy()
    builder = new StructureFactory({ structureTypes: types, player: { addStructure: () => { } } })
    builder.buildBuilding = spy
  }

  it('Build Farm works', () => {
    setSpy()

    builder.buildFarm()

    assert(spy.calledWith(types.farm))
  })

  it('Build dairy farm works', () => {
    setSpy()

    builder.buildDairyFarm()

    assert(spy.calledWith(types.dairyFarm))
  })

  it('Build berry farm works', () => {
    setSpy()

    builder.buildBerryFarm()

    assert(spy.calledWith(types.berryFarm))
  })
})
