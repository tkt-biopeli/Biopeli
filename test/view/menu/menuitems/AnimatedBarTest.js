const assert = require("assert")
const sinon = require('sinon')
import AnimatedBar from '../../../../src/view/menu/menuitems/AnimatedBar'

describe('Animated bar tests', () => {
  var abar, game, group
  var addBMPDataStub, createStub

  beforeEach(() => {
    addBMPDataStub = sinon.stub()
    createStub = sinon.stub()

    var bmap = {
      ctx: {
        fillStyle: 1,
        beginPath: () => {},
        rect: () => {},
        fill: () => {}
      }
    }

    game = {
      add: {
        bitmapData: addBMPDataStub
      }
    }

    group = {
      create: createStub
    }

    addBMPDataStub.withArgs(367, 283).returns(bmap)
    createStub.withArgs(43, 23, bmap, null, group).returns({height: 1, width: 1})

    abar = new AnimatedBar({
      game: game,
      group: group,
      vertical: 373,
      width: 367,
      height: 283,
      x: 43,
      y: 23,
      percent: 61
    })
  })

  it('Constructor works properly', () => {
    assert.equal(abar.type, 'bar')
    assert.equal(abar.game, game)
    assert.equal(abar.group, group)
    assert.equal(abar.vertical, 373)
    assert.equal(abar.width, 367)
    assert.equal(abar.height, 283)
    assert.equal(abar.x, 43)
    assert.equal(abar.y, 23)
    assert.equal(abar.percent, 61)
  })

  it('Destroy method works properly', () => {
    var barDestroySpy = sinon.spy()
    var bgDestroySpy = sinon.spy()
    abar.bar = {destroy: barDestroySpy}
    abar.background = {destroy: bgDestroySpy}
    
    abar.destroy()
    assert.equal(barDestroySpy.callCount, 1)
    assert.equal(bgDestroySpy.callCount, 1)
  })

  it('setPercentage method works properly', () => {
    var addTweenSpy = sinon.spy()
    abar.game.add.tween = sinon.stub().returns({to: addTweenSpy})
    // horizontal bar
    abar.vertical = false
    abar.setPercentage(1.0)
    assert(addTweenSpy.calledWith({width: 367}, abar.duration, 'Linear', true))
    abar.setPercentage(2)
    assert.equal(addTweenSpy.lastCall.args[0].width, 367)    
    abar.setPercentage(0.8)
    assert.equal(addTweenSpy.lastCall.args[0].width, 293.6)
    // vertical bar
    abar.vertical = true
    abar.setPercentage(1.0)
    assert(addTweenSpy.calledWith({height: 283}, abar.duration, 'Linear', true))
    abar.setPercentage(2)
    assert.equal(addTweenSpy.lastCall.args[0].height, 283)
    abar.setPercentage(0.4)
    assert.equal(addTweenSpy.lastCall.args[0].height, 113.2)
  })
})