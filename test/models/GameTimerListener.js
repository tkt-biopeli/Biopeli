const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../src/models/GameTimerListener'
import TimeEvent from '../../src/view/TimeEvent'

describe('Game timer listener tests', () => {
  it('Constructor works', () => {
    var l = new GameTimerListener({ player: 0, menuView: 2 })

    assert.equal(0, l.player)
    assert.equal(2, l.menuView)
  })

  it('onTimer calls all necessary functions', () => {
    var player = {
      addPoints: function (p) {},
      structures: [
        {produce: sinon.spy(), produceSeason: sinon.spy()}, 
        {produce: sinon.spy(), produceSeason: sinon.spy()}
      ],
    }

    var menuView = { redraw: sinon.spy() }

    var l = new GameTimerListener({ player: player, menuView: menuView })

    l.onTimer(new TimeEvent(1))

    assert.equal(1, player.structures[0].produce.callCount)
    assert.equal(1, player.structures[1].produce.callCount)
    assert.equal(1, menuView.redraw.callCount)
  })
})
