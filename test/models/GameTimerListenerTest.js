const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../src/models/GameTimerListener'
import TimeEvent from '../../src/view/TimeEvent'

describe('Game timer listener tests', () => {
  it('Constructor works', () => {
    var l = new GameTimerListener({ player: 0, menuController: 2, city: 3, topBarController: 4 })

    assert.equal(0, l.player)
    assert.equal(2, l.menuController)
    assert.equal(3, l.city)
    assert.equal(4, l.topBarController)
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

    var city = {
     buyTurnips: sinon.stub()
    }
    city.buyTurnips.withArgs().returns({
      earnings: 50,
      percentage: 50
    })

    var topBarController = {
      update: sinon.spy() 
    } 

    var l = new GameTimerListener({ player: player, menuView: menuView, city: city, topBarController: topBarController })

    l.onTimer(new TimeEvent(1))

    assert.equal(1, player.structures[0].produce.callCount)
    assert.equal(1, player.structures[1].produce.callCount)
    assert.equal(1, menuView.redraw.callCount)
    assert.equal(1, topBarController.update.callCount)
  })
})
