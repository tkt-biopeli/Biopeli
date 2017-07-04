const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../src/models/GameTimerListener'
import TimeEvent from '../../src/view/TimeEvent'

describe('Game timer listener tests', () => {
  it('Constructor works', () => {
    var l = new GameTimerListener({ player: 0, menuController: 2, city: 3, topBarController: 4, gameEvents: 5 })

    assert.equal(0, l.player)
    assert.equal(2, l.menuController)
    assert.equal(3, l.city)
    assert.equal(4, l.topBarController)
    assert.equal(5, l.gameEvents)
  })

  it('onTimer calls all necessary functions', () => {
    var player = {
      addPoints: function (p) { },
      structures: [
        { produce: sinon.spy(), produceSeason: sinon.spy() },
        { produce: sinon.spy(), produceSeason: sinon.spy() }
      ],
    }

    var menuController = {
      redraw: sinon.spy()
    }

    var city = {
      buyTurnips: sinon.stub()
    }
    city.buyTurnips.withArgs().returns({
      earnings: 50,
      percentage: 50
    })

    var topBarController = {
      redraw: sinon.spy()
    }

    var gameEvents = {
      isGameOver: sinon.stub()
    }

    var l = new GameTimerListener({
      player: player,
      menuController: menuController,
      city: city,
      topBarController: topBarController,
      gameEvents: gameEvents
    })

    var event = new TimeEvent(1)
    l.onTimer(event)

    assert.equal(1, player.structures[0].produce.callCount)
    assert.equal(1, player.structures[1].produce.callCount)
    assert.equal(1, menuController.redraw.callCount)
    assert.equal(1, topBarController.redraw.callCount)
    assert.equal(1, gameEvents.isGameOver.callCount)
    assert(player.structures[0].produce.calledWith(event))
    assert(player.structures[1].produce.calledWith(event))
    assert(menuController.redraw.calledWith(event))
    assert(topBarController.redraw.calledWith(event))
  })
})
