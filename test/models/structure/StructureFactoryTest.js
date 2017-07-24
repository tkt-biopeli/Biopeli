const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/structure/StructureFactory'

describe('StructureFactory tests', () => {
  var sfactory, gameTimer, player, addStructureSpy, map, tileFinder, tile, structureType
  var addStructureSpy, buyLandSpy, createPollutionSpy, calcSizeSpy, createProducerSpy, setAssetForRefinerySpy
  var checkMoneyStub, tilesInRadiusStub

  beforeEach(() => {
    addStructureSpy = sinon.spy()
    setAssetForRefinerySpy = sinon.spy()
    tilesInRadiusStub = sinon.stub()

    tileFinder = {}

    map = {
      getTilesInRadius: () => new Map()
    }

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
    
    sfactory = new StructureFactory({
      gameTimer: gameTimer,
      player: player,
      map: map,
      tileFinder: tileFinder
    })

    sfactory.namer = {
      createBuildingName: (jotain) => 'joku rakennus',
      createOwnerName: () => 'joku omistaja'
    }

    tile = { structure: undefined, flowers: 0 }
    structureType = { cost: 888, pollution: 564 }
  })

  it('Constructor works', () => {
    assert.equal(gameTimer, sfactory.gameTimer)
    assert.equal(player, sfactory.player)
    assert.equal(map, sfactory.map)
  })

  var mockMethodsForBuildBuildingTests = () => {
    checkMoneyStub = sinon.stub()
    createProducerSpy = sinon.spy()
    buyLandSpy = sinon.spy()
    createPollutionSpy = sinon.spy()
    calcSizeSpy = sinon.spy()
    sfactory.checkMoney = checkMoneyStub
    sfactory.producerFactory.createProducer = createProducerSpy
    sfactory.buyLand = buyLandSpy
    sfactory.createInitialPollution = createPollutionSpy
    sfactory.calculateSize = calcSizeSpy
  }

  it('Build building works', () => {
    mockMethodsForBuildBuildingTests()
    checkMoneyStub.withArgs(structureType).returns(true)
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile.structure.tile, tile)
    assert.equal(tile.structure.ownerName, 'joku omistaja')
    assert.equal(tile.structure.structureName, 'joku rakennus')
    assert.equal(tile.structure.size, 0)
    assert.equal(tile.structure.structureType, structureType)
    assert.equal(tile.structure.foundingYear, 7)
    assert(createProducerSpy.calledWith(structureType, tile))
    assert.equal(tile.structure.cost, structureType.cost)

    assert(addStructureSpy.calledWith(tile.structure))
    assert(buyLandSpy.calledWith(tile))
    assert(createPollutionSpy.calledWith(structureType.pollution, tile))
    assert(calcSizeSpy.calledWith(tile.structure))
  })

  it('Build building does not do anything if checkMoney returns false', () => {
    mockMethodsForBuildBuildingTests()
    checkMoneyStub.withArgs(structureType).returns(false)
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile.structure, undefined)
    assert.equal(createProducerSpy.callCount, 0)
    assert.equal(addStructureSpy.callCount, 0)
    assert.equal(buyLandSpy.callCount, 0)
    assert.equal(createPollutionSpy.callCount, 0)
    assert.equal(calcSizeSpy.callCount, 0)
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

  it('buyLandForRefinery works only if distance is 0 or structure null', () =>{
    sfactory.setAssetForRefinery = setAssetForRefinerySpy
    var tmpTile = { structure: null }
    var distance = 0
    sfactory.buyLandForRefinery(tile, distance, tmpTile)
    
//    tile, distance, tmpTile
  })
})
