const assert = require('assert')
const sinon = require('sinon')
import MulticontentController from '../../../src/controllers/menucontrol/MulticontentController'

describe('Multicontent controller tests', ()=>{
  var controller, contents, startIndex

  beforeEach(()=>{
    contents = [
      {
        createSections: sinon.spy(),
        setOwner: sinon.spy()
      },
      {
        createSections: sinon.spy(),
        setOwner: sinon.spy()
      }
    ]

    startIndex = 1

    controller = new MulticontentController({
      game: {},
      style: {},
      menuView: {},
      contents: contents,
      startIndex: startIndex
    })
  })

  it('Constructor initializes class object right', ()=>{
    assert.equal(contents, controller.contents)
    for(let content of contents){
      assert.equal(1, content.setOwner.callCount)
    }

    assert.equal(startIndex, controller.startIndex)
    assert.equal(startIndex, controller.index)

    controller = new MulticontentController({
      game: {},
      style: {},
      menuView: {},
      contents: contents
    })

    assert.equal(0, controller.startIndex)
    assert.equal(0, controller.index)
  })

  it('Current-test', ()=>{
    contents[1].test = 1
    assert.equal(1, controller.current().test)
  })

  describe('Section creation', ()=>{
    it('Right content creates the content of the menu', ()=>{
      controller.createSections()
      assert.equal(1, contents[1].createSections.callCount)
      controller.index = 0
      controller.createSections()
      assert.equal(1, contents[0].createSections.callCount)
      assert.equal(1, contents[1].createSections.callCount)
    })

    it('Return button is created when and only when menu isn\'t in the beginning', ()=>{
      controller.section = sinon.spy()
      controller.button = sinon.spy()

      controller.createSections()

      assert.equal(0, controller.section.callCount)
      assert.equal(0, controller.button.callCount)

      controller.getStack.push(1)

      controller.createSections()

      assert.equal(1, controller.section.callCount)
      assert.equal(1, controller.button.callCount)
      assert(controller.button.calledWith('Takaisin', controller.previousContent, controller))
    })
  })

  describe('Content changing tests', ()=>{
    it('Changing to new content works', ()=>{
      controller.redraw = sinon.spy()
      controller.changeContent(0)
      assert.equal(1, controller.getStack.length)
      assert.equal(startIndex, controller.getStack[0])
      assert.equal(0, controller.index)
      assert.equal(1, controller.redraw.callCount)

      controller.changeContent(1)
      assert.equal(2, controller.getStack.length)
      assert.equal(0, controller.getStack[1])
      assert.equal(1, controller.index)
      assert.equal(2, controller.redraw.callCount)
    })

    it('Going to previous content works', ()=>{
      controller.redraw = sinon.spy()
      controller.changeContent(0)
      controller.previousContent()
      assert.equal(0, controller.getStack.length)
      assert.equal(1, controller.index)
      assert.equal(2, controller.redraw.callCount)
    })
  })

  it('Reset test', ()=>{
    controller.redraw = () => {}
    controller.changeContent(0)

    controller.reset()

    assert.equal(0, controller.getStack.length)
    assert.equal(startIndex, controller.index)
  })
})