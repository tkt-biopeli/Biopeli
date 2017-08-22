const assert = require('assert')
const sinon = require('sinon')
import HealthManager from '../../../src/models/structure/health/HealthManager'

describe('Health manager tests', () => {
  var manager, health, purchaseManager, min, max

  beforeEach(()=>{
    min = 1
    max = 5

    health = {
      fill: sinon.spy(),
      loseOne: sinon.spy(),
      percent: () => 1,
      warn: () => false
    }

    purchaseManager = {
      purchase: () => true,
      hasCash: () => true
    }

    manager = new HealthManager({
      purchaseManager: purchaseManager,
      health: health,
      maxRuinTime: max,
      minRuinTime: min,
      buildingCost: 5,
      priceMultiplier: 1,
      currentTime: {serialNumber: 0}
    })
  })

  it('Constructor test', ()=>{
    assert.equal(health, manager.health)
    assert.equal(purchaseManager, manager.purchaseManager)
    assert.equal(5, manager.maxCost)
    assert(manager.priceFunction != null)
  })

  it('Checking next ruin works', ()=>{
    manager.timeWindow.next = 5

    manager.checkRuin({serialNumber: 0})
    assert.equal(0, health.loseOne.callCount)

    manager.checkRuin({serialNumber: 4})
    assert.equal(0, health.loseOne.callCount)

    manager.checkRuin({serialNumber: 5})
    assert.equal(1, health.loseOne.callCount)

    let warn = manager.checkRuin({serialNumber: 24234})
    assert.equal(2, health.loseOne.callCount)
    assert.equal(false, warn)
  })

  it('Fix works', ()=>{
    manager.fix()

    assert.equal(1, health.fill.callCount)

    purchaseManager.purchase = () => false

    manager.fix()

    assert.equal(1, health.fill.callCount)
  })

  it('Fix price works', ()=>{
    manager.priceFunction = () => 1
    assert.equal(5, manager.fixPrice())
  })
})