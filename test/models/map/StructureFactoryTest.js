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
      currentTimeEvent: {
        year: 7
      }
    }
    
    sbuilder = new StructureFactory({
      gameTimer: gameTimer,
      player: player
    })

    sbuilder.namer = {
      createBuildingName: ()=>'joku nimi',
      createOwnerName: ()=>'nimi joku'
    }
  })

  it('Constructor works', () => {
    assert.equal(gameTimer, sbuilder.gameTimer)
    assert.equal(player, sbuilder.player)
  })

  it('Build building works', () => {
    var tile = { structure: {}, flowers: 0 }
    var structureType = {}
    var createProductionFnSpy = sinon.spy()
    sbuilder.createProductionFn = createProductionFnSpy
    sbuilder.buildBuilding(tile, structureType)

    assert.equal(tile, tile.structure.tile)
    assert.equal(10, tile.structure.size)
    assert.equal(structureType, tile.structure.structureType)
    assert.equal(7, tile.structure.foundingYear)
    assert(createProductionFnSpy.calledWith(structureType, tile))
    assert(addStructureSpy.calledWith(tile.structure))
  })

  it('Build building does not do anything if checkMoney returns false', () => {
    var tile = { structure: undefined, flowers: 0 }
    var structureType = {}
    var checkMoneyStub = sinon.stub()
    checkMoneyStub.withArgs(structureType).returns(false)

    sbuilder.checkMoney = checkMoneyStub
    sbuilder.buildBuilding(tile, structureType)
    assert.equal(tile.structure, undefined)
  })

  it('Money checking works', () =>{
    player.cash = 2
    var st = {cost: 1}

    assert(sbuilder.checkMoney(st))
    assert.equal(1, player.cash)

    assert(sbuilder.checkMoney(st))
    assert.equal(0, player.cash)

    assert(!sbuilder.checkMoney(st))
    assert.equal(0, player.cash)
  })
})
