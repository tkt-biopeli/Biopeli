const assert = require("assert")
const sinon = require("sinon")
import StructureFactory from '../../../src/models/structure/StructureFactory'

describe('StructureFactory tests', () => {
  var sfactory, gameTimer, player, addStructureSpy, map, eventController, tile, structureType
  var addStructureSpy, buyLandSpy, createPollutionSpy, calcSizeSpy, createProducerSpy, setAssetSpy
  var purchaseStub, getMapStub, initializeSpy, pollutionStub
  var tileTypes

  beforeEach(() => {
    tileTypes = {
      "industrial": {
        name: 'industrial'
      },
      "field": {
        name: 'field'
      },
      "grass": {
        name: 'grass'
      }
    }
    purchaseStub = sinon.stub()
    addStructureSpy = sinon.spy()
    setAssetSpy = sinon.spy()
    getMapStub = sinon.stub()
    pollutionStub = {
      constant: true,
      distance: 5,
      amount: 4
    }

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
    structureType = { cost: 888, pollution: pollutionStub }
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
  }

  it('Build building works', () => {
    mockMethodsForBuildBuildingTests()
    purchaseStub.withArgs(888).returns(true)
    sfactory.buildBuilding(tile, structureType)

    assert.equal(tile.structure.tile, tile)
    assert.equal(tile.structure.ownerName, 'joku omistaja')
    assert.equal(tile.structure.structureName, 'joku rakennus')
    assert.equal(tile.structure.structureType, structureType)
    assert.equal(tile.structure.foundingYear, 7)
    assert.equal(1, initializeSpy.callCount)

    assert(addStructureSpy.calledWith(tile.structure))
    assert(buyLandSpy.calledWith(tile.structure))
    assert(createPollutionSpy.calledWith(structureType.pollution, tile))
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

  it('LandCanChangeOwnership returns correct booleans with refineries', () => {
    let newOwnerRefinery = {
      structureType: { type: 'refinery', takesOwnershipOf: ['grass']},
    }
    let wrongTiletype = createTmpTile(null, { name: 'foo' }, null, 0)
    let alreadyHasStructure = createTmpTile('another_structure', { name: 'grass' }, null, 0)
    let correctTiletype = createTmpTile(null, { name: 'grass' }, null, 0)
    let thisIsBuiltOnTile = createTmpTile(newOwnerRefinery, { name: 'anything' }, null, 0)

    assert.equal(sfactory.landCanChangeOwnership(wrongTiletype, newOwnerRefinery), false)
    assert.equal(sfactory.landCanChangeOwnership(alreadyHasStructure, newOwnerRefinery), false)
    assert.equal(sfactory.landCanChangeOwnership(correctTiletype, newOwnerRefinery), true)
    assert.equal(sfactory.landCanChangeOwnership(thisIsBuiltOnTile, newOwnerRefinery), true)
  })

    it('LandCanChangeOwnership returns correct booleans with producers', () => {
    let newOwnerProducer = {
      structureType: { type: 'producer_structure', takesOwnershipOf: ['grass'] }
    }
    let wrongTiletype = createTmpTile(null, { name: 'foo' }, null, 0)
    let alreadyHasStructure = createTmpTile('another_structure', { name: 'grass' }, null, 0)
    let alreadyHasOwner = createTmpTile(null, { name: 'grass' }, 'owner', 0)
    let correctTiletype = createTmpTile(null, { name: 'grass' }, null, 0)
    let thisIsBuiltOnTile = createTmpTile(newOwnerProducer, { name: 'anything' }, null, 0)

    assert.equal(sfactory.landCanChangeOwnership(wrongTiletype, newOwnerProducer), false)
    assert.equal(sfactory.landCanChangeOwnership(alreadyHasStructure, newOwnerProducer), false)
    assert.equal(sfactory.landCanChangeOwnership(correctTiletype, newOwnerProducer), true)
    assert.equal(sfactory.landCanChangeOwnership(alreadyHasOwner, newOwnerProducer), false)
    assert.equal(sfactory.landCanChangeOwnership(thisIsBuiltOnTile, newOwnerProducer), true)
  })

  it('buyLandForProducer is functioning properly', () =>{
/*     sfactory.setAssetForProducer = setAssetSpy
    var tmpTile = createTmpTile(null, {name: 'grass'}, tile.structure, 0)
    sfactory.buyLandForProducer(tile, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 0)

    tmpTile.owner = null
    sfactory.buyLandForProducer(tile.structure, tmpTile)
    assert.equal(setAssetSpy.withArgs(tmpTile).callCount, 1)
    assert.equal(tmpTile.owner, tile.structure)
    assert.equal(tile.structure.ownedTiles.length, 1) */
  })


  it('setNewTileType is functioning properly', () =>{
    var tileType = { name: 'foo' }
    var structure = {structureType: {farmland: 'field'}}
    var tmpTile = createTmpTile(null, tileType, null, 0)

    assert.equal(tmpTile.tileType.name, 'foo')
    sfactory.setNewTileType (tmpTile, structure)
    assert.equal(tmpTile.tileType.name, 'field')
    structure.structureType.farmland = 'grass'
    sfactory.setNewTileType (tmpTile, structure)
    assert.equal(tmpTile.tileType.name, 'grass')
  })

  var helperFunctionForInitPollutionTests = (pollutionvalues, tmpTile) => {
    let pollution = {
      constant: pollutionvalues[0],
      distance: pollutionvalues[1],
      amount: pollutionvalues[2]
    }
    var newMap = new Map()
    newMap.set(pollution.distance, [tmpTile])
    sfactory.map.getTilesInRadius = getMapStub
    getMapStub.withArgs(pollution.distance, tile).returns(newMap)

    sfactory.createInitialPollution(pollution, tile)
  }

  it('createInitialPollution is functioning properly', () =>{
    let stubs = new Map()
    // constant, distance, amount
    stubs.set([true, 5, 4], 6)
    stubs.set([true, 5, 10], 0)
    stubs.set([true, 5, 0], 10)
    stubs.set([false, 5, 4], 10)
    stubs.set([false, 4, 4], 10)
    stubs.set([false, 3, 4], 9)
    stubs.set([false, 7, 50], -33)

    for (var [pollutionvalues, flowers] of stubs) {
      var tmpTile = createTmpTile(null, { name: 'foo' }, null, 10)
      helperFunctionForInitPollutionTests(pollutionvalues, tmpTile)
      assert.equal(tmpTile.flowers, flowers)
    }
  })

  it('decreaseOwnedTiles is functioning properly', () =>{
    var spy = sinon.spy()
    sfactory.decreaseOwnedFarmland = spy
    // the first 'if' is true; returns null
    var tmpTile = createTmpTile(null, {name: 'foo'}, null, 0)
    assert.equal(sfactory.removeTileFromPreviousOwner(tmpTile), null)
    // the second and third 'ifs' are true
    let owner = tile.structure
    owner.farmland = 'field'
    tmpTile = createTmpTile(null, {name: 'field'}, owner, 0)
    tile.structure.ownedTiles = ['foo', 'foo', tmpTile, 'foo']
    sfactory.removeTileFromPreviousOwner(tmpTile)
    assert.equal(tile.structure.ownedTiles.length, 3)
    assert.equal(tile.structure.ownedTiles[2], 'foo')
    assert(spy.calledWith(tmpTile))
    // only the second 'if' is true
    sfactory.removeTileFromPreviousOwner(tmpTile)
    assert.equal(tile.structure.ownedTiles.length, 3)
    assert(spy.calledWith(tmpTile))
    // the second 'if' is false; the tile type is not 'field'
    tmpTile = createTmpTile(null, {name: 'foo'}, owner, 0)
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

  it('buildBuildingNamed is functioning properly', () =>{
    sfactory.buildBuilding = sinon.stub().returns('bla')
    sfactory.structureTypes = {foo: {}, bar: {}}
    assert.equal(sfactory.buildBuildingNamed({}, 'huu'), undefined)
    assert.equal(sfactory.buildBuildingNamed({}, 'foo'), 'bla')
  })

  it('changeOwnership is functioning properly', () =>{
    sfactory.removeTileFromPreviousOwner = sinon.spy()
    sfactory.setNewTileType = sinon.spy()
    // if is false
    var structure = {ownedTiles: [], structureType: {takesOwnershipOf: 'foo'}}
    var tmpTile = {tileType: {name: 'bar'}}
    sfactory.changeOwnership(structure, tmpTile)
    assert.equal(sfactory.removeTileFromPreviousOwner.callCount, 1)
    assert.equal(sfactory.setNewTileType.callCount, 1)
    assert.equal(structure.ownedTiles.length, 0)
    // if is true
    structure.structureType.takesOwnershipOf = 'foobar'
    sfactory.changeOwnership(structure, tmpTile)
    assert.equal(sfactory.removeTileFromPreviousOwner.callCount, 2)
    assert.equal(sfactory.setNewTileType.callCount, 2)
    assert.equal(structure.ownedTiles.length, 1)
  })
})
