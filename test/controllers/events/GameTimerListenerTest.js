const assert = require('assert')
const sinon = require('sinon')
import GameTimerListener from '../../../src/controllers/events/time/GameTimerListener'
import TimeEvent from '../../../src/controllers/events/time/TimeEvent'

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
      addPoints: countPointsSpy
    }

    city = {
      buyTurnips: () => 1
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
    countProdStub.withArgs(timerEvent).returns(37)
    var doTransactionSpy = sinon.spy()
    var redrawControllersSpy = sinon.spy()
    
    gtListener.countProductionFromStructures = countProdStub
    gtListener.doTransaction = doTransactionSpy
    gtListener.redrawControllers = redrawControllersSpy
    gtListener.checkBuildingRuining = sinon.spy()
    gtListener.onTimer(timerEvent)
    
    assert(doTransactionSpy.calledWith(37, timerEvent))
    assert(redrawControllersSpy.calledWith())
    assert(isGameOverSpy.calledWith(timerEvent))
    assert(gtListener.checkBuildingRuining.calledWith(timerEvent))
  })

  it('countProductionFromStructures works correctly', () => {
    var timerEvent = 4
    var str = { produce: function (timerEvent) {return 3 + timerEvent}, structureType : {name: "not a farm"}}
    var structures = [str, str, str]
    player.structures = structures
    
    var result = gtListener.countProductionFromStructures(timerEvent)
    assert.equal(21, result)
  })

  it('Ruining calls ruinign functions', ()=>{
    var str = {healthManager: {checkRuin: sinon.spy()}}
    player.structures = [str, str, str]

    gtListener.checkBuildingRuining(1)
    assert.equal(3, str.healthManager.checkRuin.callCount)
    assert(str.healthManager.checkRuin.calledWith(1))
  })

  it('doTransaction works correctly', () => {
    gtListener.doTransaction(6, {endOfTheYear: true})
    assert(countPointsSpy.calledWith(1))
    assert.equal(789, player.cash)
  })

  it('redrawControllers works correctly', () => {
    gtListener.redrawControllers()
    assert(mcRedrawSpy.calledWith())
    assert(tbcRedrawSpy.calledWith())
  })
})
