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
    contents[1].test = 77
    assert.equal(controller.current().test, 77)
  })

  it('getContentIndex-test', ()=>{
    assert.equal(controller.getContentIndex('foo'), -1)
    contents[2].name = 'huuhaa'
    assert.equal(controller.getContentIndex('huuhaa'), 2)
  })

  it('changeContent does nothing if called with current index', ()=>{
      controller.index = 67
      assert.equal(controller.changeContent(67), null)
  })

  it('callExtraFunction does nothing if extraFunction is null', ()=>{
      assert.equal(controller.callExtraFunction(null, 99), null)
  })
})
