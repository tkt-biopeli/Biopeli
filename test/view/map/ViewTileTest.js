const assert = require('assert')
const sinon = require('sinon')
import ViewTile from '../../../src/view/map/ViewTile'

describe('View tile tests', () => {

  var game, modelTile, viewTile, textSprite
  var makeSpriteStub = sinon.stub()
  var addTextStub = sinon.stub()
  var addChildSpy = sinon.spy()
  var makeTileSpriteStub = sinon.stub()

  beforeEach(() => {
    game = {
      make: {
        sprite: makeSpriteStub
      },
      add: {
        text: addTextStub
      }
    }
    modelTile = {
      tileType: {
        asset: "test",
        flowers: 4
      },
      structure: null
    }
    makeTileSpriteStub.withArgs(0, 0).returns("huuhaa")
    makeTileSpriteStub = { addChild: addChildSpy }
    viewTile = new ViewTile({ game: game, x: 6, y: 6, modelTile: modelTile })
  })

  it('ViewTile costructor works', () => {
    assert.equal(game, viewTile.game)
    assert.equal(modelTile, viewTile.modelTile)
    assert(viewTile.structureSprite == null)
  })

  it('makeTileSprite calls game.make.sprite with correct parameters', () => {
    viewTile.makeTileSprite(11, 5)
    assert(makeSpriteStub.calledWith(11, 5, "test"))
  })

  it('makeStructureSprite adds child to tileSprite correctly', () => {
    // var addChildSpy = sinon.spy()
    viewTile.tileSprite = { addChild: addChildSpy }

    // var makeTileSpriteStub = sinon.stub()
    // makeTileSpriteStub.withArgs(0, 0).returns("huuhaa")
    viewTile.makeTileSprite = makeTileSpriteStub

    var structure = {
      asset: function () { return "building" }
    }
    modelTile.structure = structure

    let makeSpriteStub = sinon.stub()
    makeSpriteStub.withArgs(0, 0, "building").returns("buildingSprite")
    game.make.sprite = makeSpriteStub

    viewTile.makeStructureSprite()
    assert(addChildSpy.calledWith("buildingSprite"))
  })

  it('update functions properly', () => {
    // modelTile.structure = null, structureSprite = null
    var makeStructureSpriteSpy = sinon.spy()
    viewTile.makeStructureSprite = makeStructureSpriteSpy

    viewTile.update()
    assert.equal(makeStructureSpriteSpy.callCount, 0)
    // modelTile.structure = not null, structureSprite = null
    viewTile.modelTile.structure = {}
    viewTile.update()
    assert.equal(makeStructureSpriteSpy.callCount, 1)

    // modelTile.structure = null, structureSprite = not null
    viewTile.modelTile.structure = null
    var destroySpy = sinon.spy()
    viewTile.structureSprite = { destroy: destroySpy }
    viewTile.update()
    assert.equal(makeStructureSpriteSpy.callCount, 1)
    assert.equal(viewTile.structureSprite, null)
    assert.equal(destroySpy.callCount, 1)
  })


})
