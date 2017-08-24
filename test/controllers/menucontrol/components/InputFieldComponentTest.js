const assert = require('assert')
const sinon = require('sinon')
import InputFieldComponent from '../../../../src/controllers/menucontrol/components/InputFieldComponent'

describe('Input field component tests', ()=>{
  var component

  beforeEach(()=>{
    component = new InputFieldComponent()
  })

  it('Constructor test', ()=>{
    var component2 = new InputFieldComponent('')
    assert.equal(component2.type, 'inputField')
    assert.equal(component2.parameters.constructor, Object)
    assert.equal(Object.keys(component2.parameters).length, 0)
  })

  it('isNotObject functioning correctly', ()=>{
    assert.equal(component.isNotObject(), true)
    assert.equal(component.isNotObject(null), true)
    assert.equal(component.isNotObject([]), true)
    assert.equal(component.isNotObject({}), false)
  })

  it('widthAndHeightUpdateChecker functioning correctly', ()=>{
    var parameters = {width: 13, height: 23}
    // default case
    component.width = 73
    component.height = 79
    assert.equal(component.widthAndHeightUpdateChecker('huuhaa'), null)
    assert.equal(component.width, 73)
    assert.equal(component.height, 79)
    // width
    component.widthAndHeightUpdateChecker('width', parameters)
    assert.equal(component.width, 13)
    assert.equal(component.height, 79)
    // height
    component.width = 73
    component.widthAndHeightUpdateChecker('height', parameters)
    assert.equal(component.width, 73)
    assert.equal(component.height, 23)
  })

  it('validateParameters functioning correctly', ()=>{
    var checkSpy = sinon.spy()
    var parameters = {
      x: 13,
      y: 23,
      foo: 79,
      width: 43,
      huuhaa: 73,
      pla: 7
    }
    component.widthAndHeightUpdateChecker = checkSpy
    // the 'is not object' check
    component.isNotObject = sinon.stub().returns(true)
    var result = component.validateParameters(parameters)
    assert.equal(Object.keys(result).length, 0)
    assert.equal(checkSpy.callCount, 0)
    // the rest of the method
    component.isNotObject = sinon.stub().returns(false)
    result = component.validateParameters(parameters)
    assert.equal(Object.keys(result).length, 3)
    assert(checkSpy.calledWith('x', parameters))
    assert(checkSpy.calledWith('y', parameters))
    assert(checkSpy.calledWith('width', parameters))
  })
})
