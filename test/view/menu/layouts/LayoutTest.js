import Layout from '../../../../src/view/menu/layouts/Layout'
const assert = require('assert')
const sinon = require('sinon')

describe ('Stacking layout tests', ()=>{
  var menuRect
  var vertical

  var layout

  var createLayout = function() {
    layout = new Layout(menuRect, vertical)
  }

  beforeEach(() =>{
    menuRect = {x: 0, y: 1, width: 100, height: 90}
    vertical = true
    createLayout()
  })

  it('Layout constructor initializes values', ()=>{
    assert.equal(true, layout.vertical)
    assert.equal(menuRect, layout.menuRect)
    assert.equal(100, layout.perpendicularSize)
    assert.equal(90, layout.parallelSize)
    assert.equal(1, layout.parallelStart)

    vertical = false

    createLayout()

    assert.equal(90, layout.perpendicularSize)
    assert.equal(100, layout.parallelSize)
    assert.equal(0, layout.parallelStart)
  })

  it('nextComponent location works right', () =>{
    layout.coordinates = sinon.stub()
    layout.coordinates.returns(4)

    layout.addComponentPadding = sinon.spy()

    assert.equal(4, layout.nextComponentLocation('asd'))
    assert(1, layout.addComponentPadding.callCount)
  })

  it('Component parallel size gives right axis', ()=>{
    var c = {height: 0, width: 1}

    assert.equal(0, layout.componentParallelSize(c))

    vertical = false
    createLayout()

    assert.equal(1, layout.componentParallelSize(c))
  })

  describe('Coordinate giver works', ()=>{

    it('Non-text gives right values', ()=>{
      layout.currentDrawLocation = sinon.stub()
      layout.currentDrawLocation.returns(0)
      var component = {width: 50, height: 100}

      var coords = layout.coordinates(component)

      assert.equal(25, coords.x)
      assert.equal(1, coords.y)

      vertical = false
      createLayout()
      layout.currentDrawLocation = sinon.stub()
      layout.currentDrawLocation.returns(0)

      coords = layout.coordinates(component)

      assert.equal(0, coords.x)
      assert.equal(-4, coords.y)
    })

    it('Text gives right value', ()=>{
      layout.currentDrawLocation = sinon.stub()
      layout.currentDrawLocation.returns(1)
      var component = {type: 'text', width: 50, height: 100}

      var coords = layout.coordinates(component)

      assert.equal(50, coords.x)

      vertical = false
      createLayout()
      layout.currentDrawLocation = sinon.stub()
      layout.currentDrawLocation.returns(0)

      coords = layout.coordinates(component)

      assert.equal(46, coords.y)
    })
  })
})