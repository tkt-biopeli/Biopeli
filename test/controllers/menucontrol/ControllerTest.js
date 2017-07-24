const assert = require('assert')
const sinon = require('sinon')
import Controller from '../../../src/controllers/menucontrol/Controller'

describe('Controller tests', ()=>{
  var controller, menuView, game, style, m

  var cs = () => controller.currentSection.components[controller.currentSection.components.length -1]

  beforeEach(()=>{
    m = {
      draw: () => {}
    }
    menuView = sinon.mock(m)

    style = {
      smallFont: 1,
      mediumFont: 2,
      largeFont: 3,
      buttonHeight: 4,
      buttonWidth: 5
    }

    game = {
      cache: {
        getImage: () => ({
          width: 10,
          height: 11
        })
      }
    }

    controller = new Controller(game, style, m)

    controller.initialize()
  })

  it('Constructor works', () => {
    assert.equal(game, controller.game)
    assert.equal(m, controller.menuView)
    assert.equal(style, controller.style)
    assert(controller.state != null)
  })

  it('Redrawing works', ()=>{
    menuView.expects('draw').once().withArgs(21)
    controller.buildSections = () => 21

    controller.redraw()

    menuView.verify()
  })

  it('Initialization and section works', ()=>{
    controller.initialize()

    assert.equal(1, controller.sections.length)
    assert(controller.currentSection.components)
  })

  it('Finish works', ()=>{
    menuView.expects('draw').once().withArgs(13)
    controller.sections = 13

    controller.finish()

    menuView.verify()
  })

  describe('Component adding', ()=>{
    it('Adding ready components and sections works', ()=>{
      controller.initialize()
      controller.add(4)

      assert.equal(4, controller.currentSection.components[0])
      assert.equal(1, controller.currentSection.components.length)

      controller.addSection({components: [2]})
      assert.equal(2, controller.sections.length)
      assert.equal(2, controller.currentSection.components[0])

      controller.addSections([{components: [1]}, {components: [3]}])
      assert.equal(4, controller.sections.length)
      assert.equal(3, controller.currentSection.components[0])
    })

    it('Adding text works', ()=> {
      controller.text('asd')

      var text = cs()
      assert.equal('asd', text.text)
      assert.equal(style.mediumFont, text.fontSize)

      controller.text('sf', 'small')

      text = cs()
      assert.equal('sf', text.text)
      assert.equal(style.smallFont, text.fontSize)
    })

    it('Adding icon works', ()=>{
      controller.icon('asdasd')

      var icon = cs()
      assert.equal('asdasd', icon.asset)
      assert.equal(10, icon.width)
      assert.equal(11, icon.height)
    })

    it('Adding animated bar works', ()=>{
      controller.animatedBar(1, 2, true, 1)

      var bar = cs()
      assert.equal(1, bar.width)
      assert.equal(2, bar.height)
      assert.equal(true, bar.vertical)
      assert.equal(1, bar.percent)
    })

    it('Adding button works', ()=>{
      controller.button('test', 1, 2)

      var button = cs()
      assert.equal('test', button.name)
      assert.equal(1, button.function)
      assert.equal(2, button.context)
      assert.equal('emptyButton', button.asset)

      controller.button('ad', 0, 0, 'sd')

      button = cs()
      assert.equal('sd', button.asset)
    })
  })

  describe('Wrapping and special functions', ()=>{
    var helpf = (a, b, c) => a+b+c
    it('Function wrappers wrap', ()=>{
      assert.equal(6, controller.wrapFunction(helpf, null, 1, 2, 3)())
      assert.equal(7, controller.wrapFunctionValueArray(helpf, null, [1, 2, 4])())
    })

    it('Wrapped button calls right function', ()=>{
      controller.wrappedButton('asd', null, helpf, null, 1, 0, 2)

      var b = cs()
      assert.equal('asd', b.name)
      assert.equal('emptyButton', b.asset)
      assert.equal(3, b.function.call(b.context))
    })

    it('Add state button works', ()=>{
      controller.wrappedButton = sinon.spy()
      controller.addStateButton('asd', 'asd', 'asd', 'asd')

      assert.equal(1, controller.wrappedButton.callCount)
    })

    it('Decorating works', ()=>{
      controller.wrapFunctionValueArray = () => 1
      controller.resetDecoratedButton('name')

      var b = cs()
      assert.equal('name', b.name)
      assert.equal(b.function, b.context.act)
      assert.equal(1, b.context.action.function)
    })
  })
})