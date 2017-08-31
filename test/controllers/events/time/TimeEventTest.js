import Timer from '../../../../src/controllers/events/time/Timer'
import TimeEvent from '../../../../src/controllers/events/time/TimeEvent'

const assert = require("assert")

describe('TimeEvent tests', function () {
  it('Constructor works', function () {
    var event = new TimeEvent({ callTime: 0, startYear: 1980 })
    assert.equal(event.serialNumber, 0)
    assert.equal(event.month, 1)
    assert.equal(event.year, 1980)
    assert.equal(event.week, 1)
  })

  it('ToString works', function () {
    var event = new TimeEvent({ callTime: 0, startYear: 1980 })
    assert.equal(event.toString(), '1980 / 01 / 1')
  })
})
