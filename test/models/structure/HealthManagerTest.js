const assert = require('assert')
const sinon = require('sinon')
import HealthManager from '../../../src/models/structure/health/HealthManager'

describe('Health manager tests', () => {
  var manager, health, min, max

  beforeEach(()=>{
    min = 1
    max = 5

    health = {
      fill: sinon.spy(),
      loseOne: sinon.spy()
    }

    manager = new HealthManager({
      health: health,
      maxRuinTime: max,
      minRuinTime: min
    })
  })

  it('Constructor test', ()=>{
    assert.equal(health, manager.health)
    assert.equal(min, manager.min)
    assert.equal(max - min, manager.difference)
  })

  it('Next ruining is calculated correctly', ()=>{
    manager.rand = () => 0.5 
    manager.calculateNextRuin({serialNumber: 0})

    assert.equal(3, manager.nextRuin)
    manager.calculateNextRuin({serialNumber: 2})
    assert.equal(5, manager.nextRuin)

    manager.rand = () => 0.99
    manager.calculateNextRuin({serialNumber: 0})
    assert.equal(5, manager.nextRuin)
  })

  it('Checking next ruin works', ()=>{
    manager.calculateNextRuin = sinon.spy()

    manager.nextRuin = 5

    manager.checkRuin({serialNumber: 0})
    assert.equal(0, manager.calculateNextRuin.callCount)
    assert.equal(0, health.loseOne.callCount)

    manager.checkRuin({serialNumber: 4})
    assert.equal(0, manager.calculateNextRuin.callCount)
    assert.equal(0, health.loseOne.callCount)

    manager.checkRuin({serialNumber: 5})
    assert.equal(1, manager.calculateNextRuin.callCount)
    assert.equal(1, health.loseOne.callCount)

    manager.checkRuin({serialNumber: 24234})
    assert.equal(2, manager.calculateNextRuin.callCount)
    assert.equal(2, health.loseOne.callCount)
  })

  it('Fix works', ()=>{
    manager.calculateNextRuin = sinon.spy()

    manager.fix()

    assert.equal(1, manager.calculateNextRuin.callCount)
    assert.equal(1, health.fill.callCount)
  })
})