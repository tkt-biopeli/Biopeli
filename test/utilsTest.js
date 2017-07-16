const assert = require("assert")
const sinon = require("sinon")
import utils from '../src/utils'

describe('Tests for utility functions', () => {
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
})