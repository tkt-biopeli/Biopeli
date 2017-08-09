const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/structure/StructureFactory'

describe('StructureFactory tests', () => {
  var sfactory, gameTimer, player, addStructureSpy, map, eventController, tile, structureType
  var addStructureSpy, buyLandSpy, createPollutionSpy, calcSizeSpy, createProducerSpy, setAssetSpy
  var purchaseStub, getMapStub, initializeSpy
  var tileTypes

  beforeEach(() => {
    tileTypes = {
      industrial: {
        name: 'industrial'
      },
      field: {
        name: 'field'
      }
    }
    purchaseStub = sinon.stub()
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

    var settings = {}
    
    sfactory = new StructureFactory({
      gameTimer: gameTimer,
      player: player,
      map: map,
      eventController: eventController,
      purchaseManager: {purchase: purchaseStub},
      ruinSettings: settings,
      tileTypes: tileTypes,
      structureNames: {
        ownerAdjectives: ['testing'],
        ownerNames: ['tester'],
        structureAdjectives: ['testive'],
        exaggerations: 'testiest'
      }
    })

    sfactory.namer = {
      createBuildingName: (jotain) => 'joku rakennus',
      createOwnerName: () => 'joku omistaja'
    }

    tile = {
      structure: {
        size: 67,
        ownedTiles: [],
        producer: {
          producer: {
            ownedFarmLand: []
          }
        }
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
    initializeSpy = sinon.spy()
    createProducerSpy = () => ({initialize: initializeSpy})
    buyLandSpy = sinon.spy()
    createPollutionSpy = sinon.spy()
    calcSizeSpy = sinon.spy()
    sfactory.producerFactory.createProducer = createProducerSpy
    sfactory.buyLand = buyLandSpy
    sfactory.createInitialPollution = createPollutionSpy
    sfactory.calculateSize = calcSizeSpy
  }

  it('Build building works', () => {
    mockMethodsForBuildBuildingTests()
    purchaseStub.withArgs(888).returns(true)
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile.structure.tile, tile)
    assert.equal(tile.structure.ownerName, 'joku omistaja')
    assert.equal(tile.structure.structureName, 'joku rakennus')
    assert.equal(tile.structure.size, 0)
    assert.equal(tile.structure.structureType, structureType)
    assert.equal(tile.structure.foundingYear, 7)
    assert.equal(1, initializeSpy.callCount)

    assert(addStructureSpy.calledWith(tile.structure))
    assert(buyLandSpy.calledWith(tile.structure))
    assert(createPollutionSpy.calledWith(structureType.pollution, tile))
    assert(calcSizeSpy.calledWith(tile.structure))
    assert.equal(eventController.event.callCount, 1)
  })

  it('Build building does not do anything if insufficient funds', () => {
    tile.structure = null
    mockMethodsForBuildBuildingTests()
    purchaseStub.withArgs(888).returns(false)
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile.structure, null)
    assert.equal(initializeSpy.callCount, 0)
    assert.equal(addStructureSpy.callCount, 0)
    assert.equal(buyLandSpy.callCount, 0)
    assert.equal(createPollutionSpy.callCount, 0)
    assert.equal(calcSizeSpy.callCount, 0)
    assert.equal(eventController.event.callCount, 0)
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
    sfactory.buyLandForRefinery(tile.structure, 0, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 1)
    assert.equal(tmpTile.owner, tile.structure)
    assert.equal(tile.structure.ownedTiles.length, 1)
    sfactory.buyLandForRefinery(tile.structure, 1, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 2)
    tmpTile.structure = 1
    sfactory.buyLandForRefinery(tile.structure, 0, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 3)
    sfactory.buyLandForRefinery(tile.structure, 1, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 3)
  })

  it('buyLandForProducer is functioning properly', () =>{
    sfactory.setAssetForProducer = setAssetSpy
    var tmpTile = createTmpTile(null, {name: 'grass'}, tile.structure, 0)
    sfactory.buyLandForProducer(tile, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 0)

    tmpTile.owner = null
    sfactory.buyLandForProducer(tile.structure, tmpTile)
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

  it('decreaseOwnedTiles is functioning properly', () =>{
    var spy = sinon.spy()
    sfactory.decreaseOwnedFarmland = spy
    // the first 'if' is true; returns null
    var tmpTile = createTmpTile(null, {name: 'foo'}, null, 0)
    assert.equal(sfactory.decreaseOwnedTiles(tmpTile), null)
    // the second and third 'ifs' are true
    tmpTile = createTmpTile(null, {name: 'field'}, tile.structure, 0)
    tile.structure.ownedTiles = ['foo', 'foo', tmpTile, 'foo']
    sfactory.decreaseOwnedTiles(tmpTile)
    assert.equal(tile.structure.ownedTiles.length, 3)
    assert.equal(tile.structure.ownedTiles[2], 'foo')
    assert(spy.calledWith(tmpTile))
    // only the second 'if' is true
    sfactory.decreaseOwnedTiles(tmpTile)
    assert.equal(tile.structure.ownedTiles.length, 3)
    assert(spy.calledWith(tmpTile))
    // the second 'if' is false; the tile type is not 'field'
    tmpTile = createTmpTile(null, {name: 'foo'}, tile.structure, 0)
    assert.equal(spy.callCount, 2)
  })

  it('decreaseOwnedTiles is functioning properly', () =>{
    var tmpTile = createTmpTile(null, {name: 'field'}, tile.structure, 0)
    tile.structure.producer.producer.ownedFarmLand = ['foo', 'foo', tmpTile, 'foo']
    sfactory.decreaseOwnedFarmland(tmpTile)
    assert.equal(tile.structure.size, 66)
    assert.equal(tile.structure.producer.producer.ownedFarmLand.length, 3)
    // tmpTile is no longer in ownedFarmLand
    sfactory.decreaseOwnedFarmland(tmpTile)
    assert.equal(tile.structure.size, 66)
    assert.equal(tile.structure.producer.producer.ownedFarmLand.length, 3)
  })
})
