const assert = require('assert')
const sinon = require('sinon')
import ViewTile from '../../../src/view/map/ViewTile'

describe('View tile tests', () => {

  var game, modelTile, viewTile, textSprite, structureStub, mockChild
  var makeSpriteSpy = sinon.spy()
  var addTextStub = sinon.stub()
  var addChildSpy = sinon.spy()
  var makeTileSpriteStub = sinon.stub()
  var makeGraphicsStub = sinon.stub()
  var mockGraphics
  var beginFillSpy = sinon.spy()
  var drawRectSpy = sinon.spy()
  var endFillSpy = sinon.spy()
  var childStub = sinon.stub()

  beforeEach(() => {
    makeTileSpriteStub.returns({
      addChild: childStub,
      addChildAt: addChildSpy,
      anchor: { set: function () { } },
      scale: { setTo: function () { } },
      removeChildren: function () { }
    })
    mockGraphics = {
      beginFill: beginFillSpy,
      drawRect: drawRectSpy,
      drawRoundedRect: drawRectSpy,
      endFill: endFillSpy,
      removeChildren: function () { }
    }

    mockChild = {
      removeChildren: function () { }


    }

    makeGraphicsStub.returns(mockGraphics)
    childStub.returns(mockChild)

    game = {
      make: {
        sprite: makeTileSpriteStub,
        graphics: makeGraphicsStub
      },
      add: {
        text: addTextStub
      }
    }

    structureStub = {
      ownsTileAt: function () { return false },
      asset: function () { return 'asset' },
      health: { percent: function () { } }
    }

    modelTile = {
      tileType: {
        asset: "test",
        flowers: 4
      },
      structure: structureStub,
      owner: structureStub
    }
    viewTile = new ViewTile({ game: game, x: 6, y: 6, modelTile: modelTile })
    viewTile.update()
  })

  it('ViewTile constructor works', () => {
    assert.equal(game, viewTile.game)
    assert.equal(modelTile, viewTile.modelTile)
    assert(viewTile.structureSprite !== null)
  })

  it('makeTileSprite calls game.make.sprite with correct parameters', () => {
    game.make.sprite = makeSpriteSpy
    viewTile.makeTileSprite()
    assert(makeSpriteSpy.calledOnce)
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

/*  it('update functions properly', () => {
    // modelTile.structure = null, structureSprite = null
    var makeStructureSpriteSpy = sinon.spy()
    viewTile.makeStructureSprite = makeStructureSpriteSpy
    viewTile.makeHammerSprite = sinon.spy()

    viewTile.update()
    assert.equal(makeStructureSpriteSpy.callCount, 0)
    assert.equal(0, viewTile.makeHammerSprite.callCount)
    // modelTile.structure = not null, structureSprite = null
    viewTile.modelTile.structure = {}
    viewTile.update()
    assert.equal(makeStructureSpriteSpy.callCount, 1)
    assert.equal(1, viewTile.makeHammerSprite.callCount)

    // modelTile.structure = null, structureSprite = not null
    viewTile.modelTile.structure = null
    var destroySpy = sinon.spy()
    viewTile.structureSprite = { destroy: destroySpy }
    viewTile.update()
    assert.equal(makeStructureSpriteSpy.callCount, 1)
    assert.equal(viewTile.structureSprite, null)
    assert.equal(destroySpy.callCount, 1)
  })*/

  it('Hammer is created correctly', () => {
    var anchorspy = sinon.spy()
    var scalespy = sinon.spy()
    var obj = {
      anchor: { set: anchorspy },
      scale: { setTo: scalespy }
    }
    game.make.sprite = (obj => () => obj)(obj)

    modelTile.structure = { health: { percent: () => 1 } }

    viewTile.makeHammerSprite()

    assert.equal(1, anchorspy.callCount)
    assert.equal(1, scalespy.callCount)
  })

  it('Hammer has right frame', () => {
    var anchorspy = sinon.spy()
    var scalespy = sinon.spy()
    var obj = {
      anchor: { set: anchorspy },
      scale: { setTo: scalespy }
    }
    makeTileSpriteStub.returns(obj)

    var health = { percent: () => 1 }
    modelTile.structure = { health: health }

    viewTile.makeHammerSprite()
    assert.equal(0, obj.frame)

    health.percent = () => 0.75
    viewTile.makeHammerSprite()
    assert.equal(0, obj.frame)

    health.percent = () => 0.70
    viewTile.makeHammerSprite()
    assert.equal(1, obj.frame)

    health.percent = () => 0.5
    viewTile.makeHammerSprite()
    assert.equal(1, obj.frame)

    health.percent = () => 0.25
    viewTile.makeHammerSprite()
    assert.equal(2, obj.frame)

    health.percent = () => 0
    viewTile.makeHammerSprite()
    assert.equal(3, obj.frame)
  })
})
