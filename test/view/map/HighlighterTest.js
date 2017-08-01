const assert = require('assert')
const sinon = require('sinon')
import Highlighter from '../../../src/view/map/Highlighter'

describe('Highlighter tests', () => {
  var makeGraphicsStub = sinon.stub()
  var mockHighlight, game, highlighter
  var beginFillSpy = sinon.spy()
  var drawRoundedRectSpy = sinon.spy()
  var endFillSpy = sinon.spy()
  var tilesize = 55

  beforeEach(() => {
    game = {
      make: {
        graphics: makeGraphicsStub
      }
    }

    mockHighlight = {
      beginFill: beginFillSpy,
      drawRoundedRect: drawRoundedRectSpy,
      endFill: endFillSpy
    }
    makeGraphicsStub.returns(mockHighlight)
    highlighter = new Highlighter({game: game, tileWidth: tilesize, tileHeight: tilesize})

  })


  it('Selection highlight is functioning correctly', () => {
    var highlight = highlighter.highlight(0.2, true, 'black')
    assert(highlight.beginFill.calledWith(0x000000, 0.2))
    assert(highlight.drawRoundedRect.calledWith(0, 0, tilesize, tilesize, 15)) // 15 is the standard edge rounding
    assert.equal(highlight.endFill.callCount, 1)
  })
})

