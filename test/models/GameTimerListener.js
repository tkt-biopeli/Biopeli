const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../src/models/GameTimerListener'

describe('Game timer listener tests', ()=>{
  it('Constructor works', ()=>{
    var l = new GameTimerListener({player: 0, menu: 2})

    assert.equal(0, l.player)
    assert.equal(2, l.menu)
  })

  it('onTimer calls all necessary functions', ()=>{
    var player = {
      structures: [{update: sinon.spy()}, {update: sinon.spy()}],
    }

    var menu = {redraw: sinon.spy()}

    var l = new GameTimerListener({player: player, menu: menu})

    l.onTimer(1)

    assert.equal(1, player.structures[0].update.callCount)
    assert.equal(1, player.structures[1].update.callCount)
    assert.equal(1, menu.redraw.callCount)
  })
})
