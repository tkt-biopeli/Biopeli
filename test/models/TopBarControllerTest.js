import TopBarController from '../../src/models/topbar/TopBarControllerDemo'
const assert = require('assert')
const sinon = require('sinon')

describe('Time text test', () => {
  it('Model and View called correctly', () => {
    var topbar = {
      setValueOf: sinon.spy()
    }
    var topbarView = {
      update: sinon.spy()
    }


    var c = new TopBarController({
      topBar: topbar,
      topBarView: topbarView
    })

    c.update({ time: "time", score: "score", cash: "cash", fulfilledPct: "fulfilledPct" })
    assert(topbar.setValueOf.calledWith('time', 'time'))
    assert(topbar.setValueOf.calledWith('score', 'score'))
    assert(topbar.setValueOf.calledWith('cash', 'cash'))
    assert(topbar.setValueOf.calledWith('turnip', 'fulfilledPct'))
    assert.equal(1, topbarView.update.callCount)

  })
})