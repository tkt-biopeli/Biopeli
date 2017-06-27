import Timer from '../../src/view/Timer.js'
import TimeEvent from '../../src/view/TimeEvent.js'

const assert = require("assert")

describe('TimeEvent tests', function () {
  it('Constructor works', function () {
    var timer = new Timer({ name: 'test', interval: 1, currentTime: 4 })
    var event = new TimeEvent({ callTime: timer.callTime })
    assert.equal(event.getSerialNumber(), 0)
    assert.equal(event.getMonth(), 1)
    assert.equal(event.getYear(), 1980)
    assert.equal(event.getWeek(), 1)
  })

  it('ToString works', function () {
    var timer = new Timer({ name: 'test', interval: 1, currentTime: 4 })
    var event = new TimeEvent({ callTime: timer.callTime })
    assert.equal(event.toString(), '1980/1/1')
  })
})
