const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../src/models/GameTimerListener'

describe('Game timer listener tests', ()=>{
  it('Constructor works', ()=>{
    var l = new GameTimerListener({player: 0})

    assert.equal(0, l.player)
  })

  it('onTimer calls all necessary functions', ()=>{
    var player = {structures: [{update: sinon.spy()}, {update: sinon.spy()}]}

    var l = new GameTimerListener({player: player})

    l.onTimer(1)

    assert.equal(1, player.structures[0].update.callCount)
    assert.equal(1, player.structures[1].update.callCount)
  })
})
