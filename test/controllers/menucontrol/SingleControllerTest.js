const assert = require('assert')
const sinon = require('sinon')
import SingleController from '../../../src/controllers/menucontrol/SingleController'

describe('Single controller tests', ()=>{
  var content, c

  beforeEach(()=>{
    content = {createSections: sinon.spy(), setOwner: sinon.spy()}
    c = new SingleController({
      content: content
    })
  })

  it('Constructor works', ()=>{
    assert.equal(content, c.content)
    assert.equal(1, content.setOwner.callCount)
  })

  it('Create sections calls right', ()=>{
    c.createSections()
    assert.equal(1, content.createSections.callCount)
  })
})