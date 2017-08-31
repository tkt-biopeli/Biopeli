const assert = require("assert")
const sinon = require("sinon")
import utils from '../src/utils'

describe('Tests for utility functions', () => {
  var xhr
  var openSpy, setRequestSpy, sendSpy

  beforeEach(()=>{
    openSpy = sinon.spy()
    setRequestSpy = sinon.spy()
    sendSpy = sinon.spy()

    xhr = {
      open: openSpy,
      setRequestHeader: setRequestSpy,
      send: sendSpy,
      responseText: '[1, 7, 4]'
    }
  })

  it('centerGameObjects works', () => {
    var setToSpy = sinon.spy()
    var object = {
      anchor: {
        setTo: setToSpy
      }
    }
    var objects = [object, object, object, object]
    utils.centerGameObjects(objects)
    assert.equal(setToSpy.withArgs(0.5).callCount, 4)
  })

  it('submitScore works', () => {
    var body = {bla: 'bla'}
    utils.submitScore(body, 'foo', xhr)
    assert(openSpy.calledWith('POST', 'foo/submit_score', true))
    assert(setRequestSpy.calledWith('Content-Type', 'application/json'))
    assert(sendSpy.calledWith('{"bla":"bla"}'))
  })

  it('fetchScores works', () => {
    var result = utils.fetchScores('foo/', xhr)
    assert(openSpy.calledWith('GET', 'foo/scores.json', false))
    assert.equal(sendSpy.callCount, 1)
    assert.equal(result.length, 3)
    // server is not found
    xhr.send = () => {throw err}
    result = utils.fetchScores('foo/', xhr)
    assert.equal(result.length, 0)
  })

  it('wakeHeroku works', () => {
    utils.wakeHeroku('foo/', xhr)
    assert(openSpy.calledWith('GET', 'foo/scores.json', true))
    assert.equal(sendSpy.callCount, 1)
  })
})