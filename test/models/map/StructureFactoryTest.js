const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/map/structure/StructureFactory'

describe('StructureFactory tests', () => {
  var sbuilder, gameTimer, player, addStructureSpy

  beforeEach(() => {
    addStructureSpy = sinon.spy()
    
    player = {
      addStructure: addStructureSpy
    }
    
    gameTimer = {
      currentTime: {
        year: 7
      }
    }
    
    sbuilder = new StructureFactory({
      gameTimer: gameTimer,
      player: player
    })
  })

  it('Constructor works', () => {
    assert.equal(gameTimer, sbuilder.gameTimer)
    assert.equal(player, sbuilder.player)
  })

  it('Build building works', () => {
    var tile = { structure: {} }
    var structureType = {}
    var createProductionFnSpy = sinon.spy()
    sbuilder.createProductionFn = createProductionFnSpy
    sbuilder.buildBuilding(tile, structureType)

    assert.equal(tile, tile.structure.tile)
    assert.equal('joku nimi', tile.structure.name)
    assert.equal(10, tile.structure.size)
    assert.equal(structureType, tile.structure.structureType)
    assert.equal(7, tile.structure.foundingYear)
    assert(createProductionFnSpy.calledWith(structureType))
    assert(addStructureSpy.calledWith(tile.structure))
  })
  
  it('createProductionFn works', () => {
    var productionFn = sbuilder.createProductionFn({})
    assert.equal('function', typeof productionFn)
  })
})
