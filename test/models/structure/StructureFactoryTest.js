const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/structure/StructureFactory'

describe('StructureFactory tests', () => {
  var sfactory, gameTimer, player, addStructureSpy, map, eventController

  beforeEach(() => {
    map = {
      getTilesInRadius: () => new Map()
    }
    addStructureSpy = sinon.spy()
    player = {
      addStructure: addStructureSpy,
      enoughCashFor: () => true,
      cash: 0
    }
    
    gameTimer = {
      currentTimeEvent: {
        year: 7
      }
    }

    eventController = {
      event: sinon.spy()
    }
    
    sfactory = new StructureFactory({
      gameTimer: gameTimer,
      player: player,
      map: map,
      eventController: eventController
    })

    sfactory.namer = {
      createBuildingName: ()=>'joku nimi',
      createOwnerName: ()=>'nimi joku'
    }
  })

  it('Constructor works', () => {
    assert.equal(gameTimer, sfactory.gameTimer)
    assert.equal(player, sfactory.player)
  })

  it('Build building works', () => {
    var tile = { structure: {}, flowers: 0 }
    var structureType = {}
    var createProducerSpy = sinon.spy()
    createProducerFactory.producer = {}
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile, tile.structure.tile)
    assert.equal(0, tile.structure.size)
    assert.equal(structureType, tile.structure.structureType)
    assert.equal(7, tile.structure.foundingYear)
    assert(createProducerSpy.calledWith(structureType, tile))
    assert(addStructureSpy.calledWith(tile.structure))
    assert.equal(1, eventController.event.callCount)
  })

  it('Build building does not do anything if checkMoney returns false', () => {
    var tile = { structure: undefined, flowers: 0 }
    var structureType = {}
    var checkMoneyStub = sinon.stub()
    checkMoneyStub.withArgs(structureType).returns(false)

    sfactory.checkMoney = checkMoneyStub
    sfactory.buildBuilding(tile, structureType)
    assert.equal(tile.structure, undefined)
  })

  it('Money checking works', () =>{
    var enoughCashForStub = sinon.stub()
    player.enoughCashFor = enoughCashForStub
    player.cash = 211
    enoughCashForStub.withArgs(78).returns(false)
    enoughCashForStub.withArgs(97).returns(true)

    var st = {cost: 78}
    assert.equal(sfactory.checkMoney(st), false)
    assert.equal(player.cash, 211)
    st = {cost: 97}
    assert(sfactory.checkMoney(st), true)
    assert.equal(player.cash, 114)
  })
})
