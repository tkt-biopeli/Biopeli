const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/structure/StructureFactory'
import StaticTypes from '../../../src/models/StaticTypes'

describe('StructureFactory tests', () => {
  var sfactory, gameTimer, player, addStructureSpy, map, eventController, tile, structureType
  var addStructureSpy, buyLandSpy, createPollutionSpy, calcSizeSpy, createProducerSpy, setAssetSpy
  var checkMoneyStub, getMapStub
  var tileTypes

  beforeEach(() => {
    tileTypes = StaticTypes.tileTypes

    addStructureSpy = sinon.spy()
    setAssetSpy = sinon.spy()
    getMapStub = sinon.stub()

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
      createBuildingName: (jotain) => 'joku rakennus',
      createOwnerName: () => 'joku omistaja'
    }

    tile = {
      structure: {
        size: 67,
        ownedTiles: []
      },
      flowers: 0
    }
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
    assert.equal(eventController.event.callCount, 1)
  })

  it('Build building does not do anything if checkMoney returns false', () => {
    tile.structure = null
    mockMethodsForBuildBuildingTests()
    checkMoneyStub.withArgs(structureType).returns(false)
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile.structure, null)
    assert.equal(createProducerSpy.callCount, 0)
    assert.equal(addStructureSpy.callCount, 0)
    assert.equal(buyLandSpy.callCount, 0)
    assert.equal(createPollutionSpy.callCount, 0)
    assert.equal(calcSizeSpy.callCount, 0)
    assert.equal(eventController.event.callCount, 0)
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

  var createTmpTile = (structure, tileType, owner, flowers) => {
    var tmpTile = {
      structure: structure,
      tileType: tileType,
      owner: owner,
      flowers: flowers
    }
    return tmpTile
  }

  it('buyLandForRefinery works only if distance is 0 or structure null', () =>{
    sfactory.setAssetForRefinery = setAssetSpy
    var tmpTile = createTmpTile(null, {name: 'foo'}, null, 0)
    sfactory.buyLandForRefinery(tile, 0, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 1)
    assert.equal(tmpTile.owner, tile.structure)
    assert.equal(tile.structure.ownedTiles.length, 1)
    sfactory.buyLandForRefinery(tile, 1, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 2)
    tmpTile.structure = 1
    sfactory.buyLandForRefinery(tile, 0, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 3)
    sfactory.buyLandForRefinery(tile, 1, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 3)
  })

  it('decreaseOwnedTiles decreases the size of the owner structure', () =>{
    sfactory.setAssetForRefinery = setAssetSpy
    var tmpTile = createTmpTile(null, {name: 'field'}, tile.structure, 0)
    tile.structure.ownedTiles.push(tmpTile)
    assert.equal(tile.structure.ownedTiles.length, 1)
    sfactory.decreaseOwnedTiles(tmpTile)
    assert.equal(tile.structure.size, 66)
    assert.equal(tile.structure.ownedTiles.length, 0)
  })

  it('buyLandForProducer is functioning properly', () =>{
    sfactory.setAssetForProducer = setAssetSpy
    var tmpTile = createTmpTile(null, {name: 'grass'}, tile.structure, 0)
    sfactory.buyLandForProducer(tile, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 0)

    tmpTile.owner = null
    sfactory.buyLandForProducer(tile, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 1)
    assert.equal(tmpTile.owner, tile.structure)
    assert.equal(tile.structure.ownedTiles.length, 1)
  })

  it('setAssetForRefinery is functioning properly', () =>{
    var tileType = {name: 'water'}
    var tmpTile = createTmpTile(null, tileType, null, 0)

    sfactory.setAssetForRefinery(tmpTile)
    assert.equal(tmpTile.tileType, tileType)
    tileType.name = 'foo'
    sfactory.setAssetForRefinery(tmpTile)
    assert.equal(tmpTile.tileType, tileTypes.industrial)
  })

  it('setAssetForProducer is functioning properly', () =>{
    var tileType = {name: 'foo'}
    var tmpTile = createTmpTile(null, tileType, null, 0)

    sfactory.setAssetForProducer(tmpTile)
    assert.equal(tmpTile.tileType, tileType)
    tileType.name = 'grass'
    sfactory.setAssetForProducer(tmpTile)
    assert.equal(tmpTile.tileType, tileTypes.field)
  })

  it('calculateSizeForProducer is functioning properly', () =>{
    var fieldT = createTmpTile(null, {name: 'field'}, null, 0)
    var fooT = createTmpTile(null, {name: 'foo'}, null, 0)
    var owned = [fieldT, fooT, fieldT, fieldT, fooT]
    tile.structure.ownedTiles = owned
    sfactory.calculateSizeForProducer(tile.structure)
    assert.equal(tile.structure.size, 70)
  })

  var helperFunctionForInitPollutionTests = (pollution, distance, tmpTile) => {
    var newMap = new Map()
    newMap.set(distance, [tmpTile])
    sfactory.map.getTilesInRadius = getMapStub
    getMapStub.withArgs(3, tile).returns(newMap)

    sfactory.createInitialPollution(pollution, tile)
  }

  it('createInitialPollution is functioning properly', () =>{
    var tmpTile = createTmpTile(null, {name: 'foo'}, null, 10)
    helperFunctionForInitPollutionTests(3, 2, tmpTile)
    assert.equal(tmpTile.flowers, 9)
    helperFunctionForInitPollutionTests(5, 5, tmpTile)
    assert.equal(tmpTile.flowers, 9)
    helperFunctionForInitPollutionTests(1, 2, tmpTile)
    assert.equal(tmpTile.flowers, 9)
    helperFunctionForInitPollutionTests(9, 0, tmpTile)
    assert.equal(tmpTile.flowers, 1)
  })
})
