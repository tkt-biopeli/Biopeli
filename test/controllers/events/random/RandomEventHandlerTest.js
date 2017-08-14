const assert = require('assert')
const sinon = require('sinon')
import RandomEventHandler from '../../../../src/controllers/events/random/RandomEventHandler'

describe('Random event handler tests', ()=>{
  it('Choosing random event works and happens only when meant', ()=>{
    var spy = sinon.spy()
    var eventRandomizer = {getRandomEvent: (spy => () => ({happen: spy}))(spy)}
    var handler = new RandomEventHandler({
      eventRandomizer: eventRandomizer,
      menuController: {},
      randomEventSettings: {
        minTime: 3,
        maxTime: 3,
        maxSearched: 7
      }
    })

    handler.randomEventCheck({serialNumber: 0})
    assert.equal(0, spy.callCount)

    handler.randomEventCheck({serialNumber: 7})
    assert(1, spy.callCount)
  })
})