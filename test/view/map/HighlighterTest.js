const assert = require('assert')
const sinon = require('sinon')
import Highlighter from '../../../src/view/map/Highlighter'

describe('Highlighter tests', () => {
  var makeGraphicsStub, makeSpriteStub
  var mockHighlight, game, highlighter
  var beginFillSpy = sinon.spy()
  var drawRoundedRectSpy = sinon.spy()
  var endFillSpy = sinon.spy()
  var tilesize = 55
  var structure, tile

  beforeEach(() => {
    makeGraphicsStub = sinon.stub()
    makeSpriteStub = sinon.stub()
    game = {
      make: {
        graphics: makeGraphicsStub,
        sprite: makeSpriteStub
      }
    }

    mockHighlight = {
      beginFill: beginFillSpy,
      drawRoundedRect: drawRoundedRectSpy,
      endFill: endFillSpy
    }
    makeGraphicsStub.returns(mockHighlight)
    makeSpriteStub.returns({width: 0, height: 0, alpha: 0})
    highlighter = new Highlighter({game: game, tileWidth: tilesize, tileHeight: tilesize})

    tile = {
      structure: null
    }

    var fooCapsule = {producer: {producer: {tile: 'bar'}}}
    var okCapsule = {producer: {producer: {tile: tile}}}

    structure = {
      structureType: {
        type: 'refinery'
      },
      producer: {
        producer: {
          producerHolders: [fooCapsule, okCapsule],
          zone: [{tile: 'foo'}, {tile: 'huu'}]
        }
      }
    }
  })

  it('Selection highlight is functioning correctly', () => {
    var highlight = highlighter.highlight(0.2, true, 'blue')
    assert(highlight.beginFill.calledWith(0x1631f8, 0.2))
    assert(highlight.drawRoundedRect.calledWith(0, 0, tilesize, tilesize, 15)) // 15 is the standard edge rounding
    assert.equal(highlight.endFill.callCount, 1)
  })
  
  it('Selection highlight is functioning correctly with sharp corners', () => {
    var highlight = highlighter.highlight(0.2, false, 'blue')
    assert(highlight.drawRoundedRect.calledWith(0, 0, tilesize, tilesize, 1))
  })

  it('Selection highlight is functioning correctly with undefined color', () => {
    var highlight = highlighter.highlight(0.2, false,)
    assert(highlight.beginFill.calledWith(0x000000, 0.2))
  })

  it('Highlight background is functioning correctly', () => {
    highlighter.tileHeight = 23
    highlighter.tileWidth = 77
    var bg = highlighter.highlightBackground()
    assert.equal(bg.width, 77)
    assert.equal(bg.height, 23)
    assert.equal(bg.alpha, 0.2)
  })

  var mockHighlightMethods = () => {
    var hlBgStub = sinon.stub()
    hlBgStub.returns(23)
    var hlMethodStub = sinon.stub()
    hlMethodStub.withArgs(0.2, false, 'blue').returns(31)
    hlMethodStub.withArgs(0.5, true, 'green').returns(37)
    hlMethodStub.withArgs(0.2, true).returns(19)
    highlighter.highlightBackground = hlBgStub
    highlighter.highlight = hlMethodStub
  }

  it('Adding a highlight is functioning correctly', () => {
    mockHighlightMethods()
    var selectedTile = tile
    var viewTile = {
      modelTile: null,
      addHighlight: (value) => {
        result += value
      }
    }
    highlighter.landHighlights = [tile]
    highlighter.buildingHighlights = []
    // case: viewTile and selectedTile are not equal,
    // and selectedTile's structure is null      
    var result = 0
    highlighter.addHighlights(viewTile, selectedTile)
    assert.equal(result, 0)
    // case: viewTile and selectedTile are equal,
    // but selectedTile's structure is null
    viewTile.modelTile = tile
    highlighter.addHighlights(viewTile, selectedTile)
    assert.equal(result, 19)
    // selectedTile's structure is not null
    // tile is included in land highlights
    tile.structure = structure
    result = 0
    highlighter.addHighlights(viewTile, selectedTile)
    assert.equal(result, 73)
    // tile is included in both land and building highlights
    result = 0
    highlighter.buildingHighlights = [tile]
    highlighter.addHighlights(viewTile, selectedTile)
    assert.equal(result, 133)
  })

  it('Highlight calculation is functioning correctly', () => {
    tile.structure = structure
    highlighter.calculateHighlights(tile)
    assert.equal(highlighter.buildingHighlights[0], 'bar')
    assert.equal(highlighter.buildingHighlights[1], tile)
    assert.equal(highlighter.buildingHighlights.length, 2)
    assert.equal(highlighter.landHighlights[0], 'foo')
    assert.equal(highlighter.landHighlights[1], 'huu')
    assert.equal(highlighter.landHighlights.length, 2)
  })

  it('checkIfTileIsLandHighlight method operates as expected', () => {
    highlighter.landHighlights = []
    highlighter.buildingHighlights = [tile]
    assert.equal(highlighter.checkIfTileIsLandHighlight(tile), null)
    assert.equal(highlighter.landHighlights.length, 0)
    highlighter.buildingHighlights = []
    highlighter.checkIfTileIsLandHighlight(tile)
    assert.equal(highlighter.landHighlights[0], tile)
  })
})
