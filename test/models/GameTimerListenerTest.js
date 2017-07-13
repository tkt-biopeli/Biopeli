const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../src/models/GameTimerListener'
import TimeEvent from '../../src/view/TimeEvent'

describe('Game timer listener tests', () => {
  var gtListener, player, menuController, topBarController, city, gameEvents
  var isGameOverSpy, tbcRedrawSpy, mcRedrawSpy, countPointsSpy
  
  beforeEach(() => {
    isGameOverSpy = sinon.spy()
    tbcRedrawSpy = sinon.spy()
    mcRedrawSpy = sinon.spy()
    countPointsSpy = sinon.spy()

    menuController = {
      redraw: mcRedrawSpy
    }
    
    topBarController = {
      redraw: tbcRedrawSpy
    }
    
    gameEvents = {
      isGameOver: isGameOverSpy
    }

    player = {
      structures: 74,
      cash: 788,
      countPoints: countPointsSpy
    }

    city = {
      buyTurnips: {}
    }

    gtListener = new GameTimerListener({
      player: player,
      menuController: menuController,
      city: city,
      topBarController: topBarController,
      gameEvents: gameEvents
    })
  })

  it('Constructor works', () => {
    assert.equal(player, gtListener.player)
    assert.equal(menuController, gtListener.menuController)
    assert.equal(city, gtListener.city)
    assert.equal(topBarController, gtListener.topBarController)
    assert.equal(gameEvents, gtListener.gameEvents)
  })

  it('onTimer works correctly', () => {
    var timerEvent = { year: 2 }
    var countProdStub = sinon.stub()
    countProdStub.withArgs(74, timerEvent).returns(37)
    var doTransactionSpy = sinon.spy()
    var redrawControllersSpy = sinon.spy()
    
    gtListener.countProductionFromStructures = countProdStub
    gtListener.doTransaction = doTransactionSpy
    gtListener.redrawControllers = redrawControllersSpy
    gtListener.onTimer(timerEvent)
    
    assert(doTransactionSpy.calledWith(37))
    assert(redrawControllersSpy.calledWith())
    assert(isGameOverSpy.calledWith(timerEvent))
  })

  it('countProductionFromStructures works correctly', () => {
    var timerEvent = 4
    var str = { produce: function (timerEvent) {return 3 + timerEvent}, structureType : {name: "not a farm"}}
    var structures = [str, str, str]
    
    var result = gtListener.countProductionFromStructures(structures, timerEvent)
    assert.equal(21, result.weekly)
  })

  it('doTransaction works correctly', () => {
    var mockTransaction = {
      percentage: 6,
      earnings: 8
    }
    var buyTurnipsStub = sinon.stub()
    buyTurnipsStub.withArgs(53).returns(mockTransaction)
    city.buyTurnips = buyTurnipsStub

    gtListener.doTransaction(53)
    assert(countPointsSpy.calledWith(6))
    assert.equal(796, player.cash)
  })

  it('redrawControllers works correctly', () => {
    gtListener.redrawControllers()
    assert(mcRedrawSpy.calledWith())
    assert(tbcRedrawSpy.calledWith())
  })
})
