const assert = require('assert')
const sinon = require('sinon')
import CameraMover from '../../src/view/CameraMover'

describe('Camera mover tests', () =>{
  var game
  var events

  function setCursors(up, down, left, right){
    events.cursor.up = up
    events.cursor.down = down
    events.cursor.left = left
    events.cursor.right = right
  }

  function checkCameraCoordinates(x, y){
    assert.equal(x, game.camera.x)
    assert.equal(y, game.camera.y)
  }

  beforeEach(() =>{
    game = {
      camera: {
        x: 0,
        y: 0
      }
    }

    events = {
      cursor: {
        up: false,
        down: false,
        left: false,
        right: false
      }
    }
  })

  it('Camera mover\'s costructor works', () =>{
    var mover = new CameraMover(4, 5, 6)

    assert(4, mover.game)
    assert(5, mover.x)
    assert(6, mover.y)
  })

/*
 it('If there is no input, camera doesn\'t move', () =>{
    var mover = new CameraMover({game: game, xSpeed: 0, ySpeed: 0})

    mover.update(events)

    checkCameraCoordinates(0, 0)
  })

  it('If there is one input, camera moves', () => {
    setCursors(true, false, false, false)
    var mover = new CameraMover({game: game, xSpeed: 1, ySpeed: 1})
    mover.update(events)
    checkCameraCoordinates(0, -1)

    setCursors(false, true, false, false)
    mover.update(events)
    checkCameraCoordinates(0, 0)

    setCursors(false, false, true, false)
    mover.update(events)
    checkCameraCoordinates(-1, 0)

    setCursors(false, false, false, true)
    mover.update(events)
    checkCameraCoordinates(0, 0)
  })

  it('Camera checks both axis every loop', () => {
    setCursors(true, false, true, false)
    var mover = new CameraMover({game: game, xSpeed: 1, ySpeed: 1})
    mover.update(events)
    checkCameraCoordinates(-1, -1)

    setCursors(false, true, false, true)
    mover.update(events)
    checkCameraCoordinates(0, 0)
  })*/
})
