const assert = require('assert')
const sinon = require('sinon')
import EventController from '../../../src/controllers/events/EventController'

describe('Event controller tests', ()=>{
  var controller

  beforeEach(()=>{
    controller = new EventController()
  })

  it('Constructor works', ()=>{
    assert.equal(1, controller.events.size)
    assert(controller.events.get('structureBuilt') !== null)
  })

  it('Adding event works', ()=>{
    controller.addEvent('test')
    assert(controller.events.get('test') !== null)
  })

  it('Adding listener works', ()=>{
    controller.addListener('structureBuilt', 1, 2)
    var f = controller.events.get('structureBuilt')[0]

    assert.equal(1, f.callback)
    assert.equal(2, f.context)
  })

  it('Calling the event works', ()=>{
    var spy = sinon.spy()
    controller.addListener('structureBuilt', spy, null)
    controller.event('structureBuilt')

    assert.equal(1, spy.callCount)
    assert.equal(controller.event('foobar'), null)
  })
})