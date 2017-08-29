const assert = require('assert')
const sinon = require('sinon')

import Pause from '../../src/view/Pause'

describe('Pause tests', () => {
  var game, pauseObject, mockBg, mockPausePopup
  var beginFillSpy, drawRectSpy, endFillSpy, setAnchorSpy

  beforeEach(() => {
    beginFillSpy = sinon.spy()
    drawRectSpy = sinon.spy()
    endFillSpy = sinon.spy()
    setAnchorSpy = sinon.spy()

    mockBg = {
      beginFill: beginFillSpy,
      drawRect: drawRectSpy,
      endFill: endFillSpy,
      destroy: sinon.spy()
    }
    mockPausePopup = {
      anchor: {
        set: setAnchorSpy
      },
      destroy: sinon.spy()
    }
    game = {
      add: {
        graphics: sinon.stub().returns(mockBg),
        sprite: sinon.stub().withArgs(123, 67, 'pause_info').returns(mockPausePopup)
      },
      camera: {
        x: 13,
        y: 7,
        height: 120,
        width: 220
      },
      game: {
        paused: null
      }
    }

    pauseObject = new Pause({ game: game })
  })

  it('drawScreen method is functioning as expected', () => {
    pauseObject.drawScreen()
    assert(beginFillSpy.calledOnce)
    assert(drawRectSpy.calledOnce)
    assert(endFillSpy.calledOnce)
    assert.equal(pauseObject.pausebg, mockBg)
    assert.equal(pauseObject.pausePopup, mockPausePopup)
    assert(setAnchorSpy.calledWith(0.5, 0.5))
  })

  it('unpause method is functioning as expected', () => {
    pauseObject.pausebg = mockBg
    pauseObject.pausePopup = mockPausePopup
    pauseObject.paused = true
    pauseObject.unpause()
    assert(mockBg.destroy.calledOnce)
    assert(mockPausePopup.destroy.calledOnce)
    assert(!game.game.paused)
    assert(!pauseObject.paused)
  })

  it('pause method is functioning as expected', () => {
    pauseObject.paused = false
    var drawScreenSpy = sinon.spy()
    pauseObject.drawScreen = drawScreenSpy
    pauseObject.pause()
    assert(drawScreenSpy.calledOnce)
    assert(game.game.paused)
    assert(pauseObject.paused)
  })
})

