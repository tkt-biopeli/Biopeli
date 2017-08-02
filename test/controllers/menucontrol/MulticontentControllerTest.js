const assert = require('assert')
const sinon = require('sinon')
import MulticontentController from '../../../src/controllers/menucontrol/MulticontentController'

describe('Multicontent controller tests', ()=>{
  var controller, contents, startIndex

  beforeEach(()=>{
    contents = [
      { createSections: sinon.spy(), setOwner: sinon.spy()},
      { createSections: sinon.spy(), setOwner: sinon.spy()},
      { createSections: sinon.spy(), setOwner: sinon.spy()},
      { createSections: sinon.spy(), setOwner: sinon.spy()},
      { createSections: sinon.spy(), setOwner: sinon.spy()}
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
    var sectionSpy, buttonSpy

    var mockSectionAndButtonMethods = () => {
      sectionSpy = sinon.spy()
      buttonSpy = sinon.spy()
      controller.section = sectionSpy
      controller.button = buttonSpy
      controller.getOptions = {}
      controller.getLayers = {}
      controller.previousContent = {}
    }

    it('createSections calls the content in contents correctly', ()=>{
      mockSectionAndButtonMethods()
      controller.index = 1
      controller.createSections()
      assert.equal(contents[0].createSections.callCount, 0)
      assert.equal(contents[1].createSections.callCount, 1)
      assert.equal(contents[2].createSections.callCount, 0)
      assert.equal(contents[3].createSections.callCount, 0)
      assert.equal(contents[4].createSections.callCount, 0)
    })

    it('createSections adds a back button if index is bigger than one', ()=>{
      mockSectionAndButtonMethods()
      controller.index = 2
      controller.createSections()
      assert.equal(sectionSpy.lastCall.args[0], 'back')
      assert.equal(buttonSpy.lastCall.args[0], 'Takaisin')
    })

    it('createSections does not add an option button if index is 3 or 4', ()=>{
      mockSectionAndButtonMethods()
      controller.index = 3
      controller.createSections()
      assert.equal(sectionSpy.firstCall.args[0], 'layer')
      assert.equal(buttonSpy.firstCall.args[0], 'Näkymät')
      mockSectionAndButtonMethods()
      controller.index = 4
      controller.createSections()
      assert.equal(sectionSpy.firstCall.args[0], 'back')
      assert.equal(buttonSpy.firstCall.args[0], 'Takaisin')
    })

    it('createSections adds an Back-button if index is bigger than one', ()=>{
      mockSectionAndButtonMethods()
      controller.index = 2
      controller.createSections()
      assert.equal(sectionSpy.lastCall.args[0], 'back')
      assert.equal(buttonSpy.lastCall.args[0], 'Takaisin')
      controller.index = 1
      controller.createSections()
      assert.equal(sectionSpy.lastCall.args[0], 'option')
      assert.equal(buttonSpy.lastCall.args[0], 'Valikko')
      controller.index = 0
      controller.createSections()
      assert.equal(sectionSpy.lastCall.args[0], 'layer')
      assert.equal(buttonSpy.lastCall.args[0], 'Näkymät')
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

  it('getLayers test', ()=>{
    var changeContentSpy = sinon.spy()
    controller.changeContent = changeContentSpy
    controller.getLayers()
    assert(changeContentSpy.calledWith(4))
  })
})