const assert = require('assert')
const sinon = require('sinon')
import InputHandler from '../../src/view/InputHandler'

describe('Inputhandler tests', () => {
  var game, mapListener, cameraMover
  var handler
  var mapListenerSpy = sinon.spy()
  var cameraMoverSpy = sinon.spy()

  beforeEach(() => {
    game = {
      cursors: {
        up: { isDown: false, onDown: { add: function () { } } },
        down: { isDown: false, onDown: { add: function () { } } },
        left: { isDown: false, onDown: { add: function () { } } },
        right: { isDown: false, onDown: { add: function () { } } }
      },
      input: {
        onDown: {
          add: function () { }
        },
        activePointer: {
          isDown: false,
          position: {
            x: 0,
            y: 0
          }
        }
      },
      flowersKey: {
        onDown: { add: function () { } }
      },
      game: {kineticScrolling: {configure: () => {}, start: () =>{}}}
    }

    mapListener = {
      update: mapListenerSpy
    }

    cameraMover = {
      update: cameraMoverSpy
    }

    handler = new InputHandler({
      game: game,
      mapListener: mapListener,
      cameraMover: cameraMover,
      mapView: {showFlowers: true},
      pause: {
        pause: () => {},
        unpause: () => {},
        paused: false
      }
    })
  })

  function setInput(up, down, left, right, isDown, x, y) {
    setCursors(up, down, left, right)
    setPointer(isDown, x, y)
  }

  function setCursors(up, down, left, right) {
    game.cursors.up.isDown = up
    game.cursors.down.isDown = down
    game.cursors.left.isDown = left
    game.cursors.right.isDown = right
  }

  function setPointer(isDown, x, y) {
    game.input.activePointer.isDown = isDown
    game.input.activePointer.position.x = x
    game.input.activePointer.position.y = y
  }

  it('Constructor works', () => {
    var h = new InputHandler({ game: game, mapListener: mapListener, cameraMover: cameraMover })

    assert.equal(game, h.game)
    assert.equal(mapListener, h.mapListener)
    assert.equal(cameraMover, h.cameraMover)
  })

  it('On mouse pointer down, mapListener is called with correct parameters', () => {
    setPointer(true, 4, -3)
    handler.onPointerDown()
    assert.equal(mapListenerSpy.callCount, 1)
    assert(mapListenerSpy.calledWith({ x: 4, y: -3 }))
  })

  it('On key cursor down, cameraMover is called with correct parameters', () => {
    setCursors(true, false, true, false)
    handler.onCursorDown()
    assert.equal(cameraMoverSpy.callCount, 1)
    assert(cameraMoverSpy.calledWith({ cursor: { up: true, down: false, left: true, right: false } }))
  })

  it('Switching flowers on and off works properly', () => {
    handler.flowersOnOff()
    assert.equal(handler.mapView.showFlowers, false)
    handler.flowersOnOff()
    assert.equal(handler.mapView.showFlowers, true)
  })

  it('Set pause works properly', () => {
    handler.pause.pause = sinon.spy()
    handler.setPause()
    assert.equal(handler.pause.pause.callCount, 1)
  })

  it('Unpause works properly', () => {
    handler.pause.unpause = sinon.spy()
    // paused is false
    handler.unpause()
    assert.equal(handler.pause.unpause.callCount, 0)
    // paused is true
    handler.pause.paused = true
    handler.unpause()
    assert.equal(handler.pause.unpause.callCount, 1)
  })

  it('Kinetic scrolling works properly', () => {
    var confSpy = sinon.spy()
    var startSpy = sinon.spy()
    game.game.kineticScrolling.beginMove = {}
    game.game.kineticScrolling.configure = confSpy
    game.game.kineticScrolling.start = startSpy
    handler.kineticScrolling()
    assert.equal(confSpy.callCount, 1)
    assert.equal(startSpy.callCount, 1)
    assert(typeof game.game.kineticScrolling.beginMove == 'function') 
  })
})
