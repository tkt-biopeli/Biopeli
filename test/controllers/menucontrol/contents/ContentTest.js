const assert = require('assert')
const sinon = require('sinon')
import Content from '../../../../src/controllers/menucontrol/contents/Content'

describe('Content tests', ()=>{
  var content, spy

  beforeEach(()=>{
    spy = sinon.spy()
    content = new Content()
  })

  it('Adding a component to the owner works', () => {
    content.owner = {add: spy}
    content.add(127)
    assert(spy.calledWith(127))
  })

  it('Adding a section to the owner works', () => {
    content.owner = {addSection: spy}
    content.addSection(127)
    assert(spy.calledWith(127))
  })

  it('Adding sections to the owner works', () => {
    content.owner = {addSections: spy}
    content.addSections(127)
    assert(spy.calledWith(127))
  })
})