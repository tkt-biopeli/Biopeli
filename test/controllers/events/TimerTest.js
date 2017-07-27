import Timer from '../../../src/controllers/events/time/Timer'
const assert = require('assert')
const sinon = require('sinon')

describe('Timer tests', () => {

  var timer

  beforeEach(() => {
    timer = new Timer({ interval: 10, currentTime: 0 })
  })

  describe('Constructor tests', () => {

    it('Predetermined values are set', () => {
      var ltimer = new Timer({ name: 'test', interval: 1, currentTime: 4 })

      assert.equal(1, ltimer.interval)
      assert.equal('test', ltimer.name)
      assert.equal(0, ltimer.callTime)
      assert.equal(4, ltimer.lastTime)
      assert.equal(0, ltimer.listeners.size)
    })

    it('If name is not given, it is empty', () => {
      var ltimer = new Timer({ interval: 1, currentTime: 7 })

      assert.equal('', ltimer.name)
    })
  })

  describe('Listener handling works', () => {
    it('Adding listener works', () => {
      timer.addListener(4)

      assert.equal(1, timer.listeners.size)

      timer.addListener(2)

      assert.equal(2, timer.listeners.size)
    })

    it('Removing listener works', () => {
      timer.addListener(1)
      timer.addListener(2)
      timer.addListener(3)

      timer.removeListener(1)

      assert.equal(2, timer.listeners.size)
    })
  })

  describe('Updating works', () => {
    var setMock = function () {
      var spy = sinon.spy()
      timer.callListeners = spy
    }

    it('Listeners aren\'t called when interval hasn\'t passed', () => {
      setMock()

      timer.update(1)

      assert.equal(0, timer.callListeners.callCount)
    })

    it('Update updates when time has passed', () => {
      setMock()

      timer.update(10)

      assert.equal(1, timer.callListeners.callCount)
      assert.equal(1, timer.callTime)
      assert.equal(10, timer.lastTime)

      timer.update(21)

      assert.equal(2, timer.callListeners.callCount)
    })

    it('CallListeners calls all listeners', () => {
      var spy1 = sinon.spy()
      var spy2 = sinon.spy()
      timer.addListener({ onTimer: spy1 })
      timer.addListener({ onTimer: spy2 })

      timer.callListeners()

      assert.equal(1, spy1.callCount)
      assert.equal(1, spy2.callCount)
    })

    it('Listeners are called with timerEvent', () => {
      var spy = sinon.spy()
      timer.createTimeEvent = sinon.stub().onFirstCall().returns(4)
      timer.addListener({ onTimer: spy })

      timer.callListeners()

      assert(spy.calledWith(4))
    })

    it('Timer having name changes the called function', () => {
      var spy = sinon.spy()
      timer.addListener({ onTestTimer: spy })
      timer.name = 'Test'

      timer.callListeners()

      assert.equal(1, spy.callCount)
    })

  })
})
