import TopBarController from '../../src/models/topbar/TopBarControllerDemo'
const assert = require('assert')
const sinon = require('sinon')

describe('Time text test', () => {
  it('TimerEvent updates time text', () => {
    var topbarspy = sinon.spy()
    var timerStub = { toString: () => 'sd' }

    var c = new TopBarController({
      player: { addPoints: () => { }, getPoints: () => 0 },
      topBar: { setValueOf: topbarspy },
      topBarView: { update: () => { } }
    })

    c.onTimer(timerStub)

    assert(topbarspy.calledWith('time', 'sd'))

  })
})