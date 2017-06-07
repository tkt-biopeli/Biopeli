const assert = require('assert')
import InputHandler from '../../src/view/InputHandler'

describe('Inputhandler tests', () =>{
  var game
  var handler

  beforeEach(() =>{
    game = {
      cursors: {
        up: {isDown: false},
        down: {isDown: false},
        left: {isDown: false},
        right: {isDown: false}
      },
      input: {
        activePointer: {
          isDown: false,
          position: {
            x: 0,
            y: 0
          }
        }
      }
    }

    handler = new InputHandler({game: game})
  })

  function setInput(up, down, left, right, isDown, x, y){
    setCursors(up, down, left, right)
    setPointer(isDown, x, y)
  }

  function setCursors(up, down, left, right){
    game.cursors.up.isDown = up
    game.cursors.down.isDown = down
    game.cursors.left.isDown = left
    game.cursors.right.isDown = right
  }

  function setPointer(isDown, x, y){
    game.input.activePointer.isDown = isDown
    game.input.activePointer.position.x = x
    game.input.activePointer.position.y = y
  }

  function checkOutput(events, up, down, left, right, exist, x, y){
    assert.equal(up, events.cursor.up)
    assert.equal(down, events.cursor.down)
    assert.equal(left, events.cursor.left)
    assert.equal(right, events.cursor.right)

    checkPointer(events, exist, x, y)
  }

  function checkPointer(events, exist, x, y){
    assert(exist == (events.pointer != null))
    if(exist){
      assert.equal(x, events.pointer.x)
      assert.equal(y, events.pointer.y)
    }
  }

  it('Constructor works', () =>{
    var h = new InputHandler({game: 1})

    assert.equal(1, h.game)
  })

  it('Cursor event is always created', () =>{
    var events = handler.getEvents()
    checkOutput(events, false, false, false, false, false)

    setCursors(true, true, true, true)
    events = handler.getEvents()
    checkOutput(events, true, true, true, true, false)
  })

  it('Mouse event is only created when mouse is down', () =>{
    var events = handler.getEvents()
    checkPointer(events, false)

    setPointer(true, 0, 0)
    events = handler.getEvents()
    checkPointer(events, true, 0, 0)
  })

  it('Mouse coordinates are right', () =>{
    setPointer(true, 4, -3)
    var events = handler.getEvents()
    checkPointer(events, true, 4, -3)
  })

})
