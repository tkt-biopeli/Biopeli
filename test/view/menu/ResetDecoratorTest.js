const assert = require('assert')
const sinon = require('sinon')
import ResetDecorator from '../../../src/view/menu/ResetDecorator'

describe('Reset decorator tests', () =>{
  it('Constructor test', () =>{
    var dec = new ResetDecorator({action: 1, menu: 0})

    assert.equal(1, dec.action)
    assert.equal(0, dec.menu)
  })

  it('Decorator calls action right', () =>{
    var spy = sinon.spy()
    var action = {function: spy, context: 2}
    var decor = new ResetDecorator({action: action, menu: {reset: function(){}}})
    decor.act()

    assert.equal(1, spy.callCount)
    assert(spy.calledWith())
  })

  it('Reset is called', () =>{
    var spy = sinon.spy()
    var menuView = {reset: spy}
    var decor = new ResetDecorator({action: {function: function(){}, context: 0}, menu: menuView})
    decor.act()

    assert.equal(1, spy.callCount)
    assert(spy.calledWith())
  })
})
