const assert = require('assert')
const sinon = require('sinon')
import ButtonComponent from '../../../../src/controllers/menucontrol/components/ButtonComponent'

describe('ButtonComponent tests', () => {
  var buttonComponent, func

  beforeEach(() => {
    func = {}

    buttonComponent = new ButtonComponent({
      name: 'name',
      functionToCall: func,
      context: 'con',
      height: 67,
      width: 97,
      fontSize: 14,
      asset: 'foobar'
    })
  })

  it('Constructor test', () => {
    assert.equal(buttonComponent.type, 'button')
    assert.equal(buttonComponent.name, 'name')
    assert.equal(buttonComponent.function, func)
    assert.equal(buttonComponent.context, 'con')
    assert.equal(buttonComponent.height, 67)
    assert.equal(buttonComponent.width, 97)
    assert.equal(buttonComponent.fontSize, 14)
    assert.equal(buttonComponent.asset, 'foobar')
  })
})