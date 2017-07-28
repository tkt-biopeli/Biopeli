const assert = require("assert")
const sinon = require('sinon')
import Icon from '../../../../src/view/menu/menuitems/Icon'

describe('Icon tests', () => {
  var icon, createSpy

  beforeEach(() => {
    createSpy = sinon.spy()
    icon = new Icon({
      game: 1,
      group: {
        create: createSpy
      },
      x: 3,
      y: 4,
      asset: 5
    })
    icon.icon = {
      x: 0,
      y: 0
    }
  })

  it('Constructor works properly', () => {
    assert.equal(icon.type, 'icon')
    assert(createSpy.calledWith(3, 4, 5))
    assert.equal(icon.x, 3)
    assert.equal(icon.y, 4)
  })

  it('Update method works properly', () => {
    icon.update(88, 77)
    assert.equal(icon.icon.x, 88)
    assert.equal(icon.icon.y, 77)
  })

  it('Destroy method works properly', () => {
    var destroySpy = sinon.spy()
    icon.icon.destroy = destroySpy
    assert.equal(destroySpy.callCount, 0)
    icon.destroy()
    assert.equal(destroySpy.callCount, 1)
  })
})