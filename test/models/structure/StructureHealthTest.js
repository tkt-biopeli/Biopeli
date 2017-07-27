const assert = require('assert')
const sinon = require('sinon')
import StructureHealth from '../../../src/models/structure/health/StructureHealth'

describe('Structure health tests', () => {
  var health
  
  beforeEach(()=>{
    health = new StructureHealth({maxHealth: 5})
  })

  it('Constructor test', ()=>{
    assert.equal(5, health.maxHealth)
    assert.equal(5, health.currentHealth)
  })

  it('Fill works', ()=>{
    health.currentHealth = 0
    health.fill()

    assert.equal(health.maxHealth, health.currentHealth)
  })

  it('Removing works', ()=>{
    health.loseHealth(2)
    assert.equal(3, health.currentHealth)

    health.loseOne()
    assert.equal(2, health.currentHealth)

    health.loseHealth(4)
    assert.equal(0, health.currentHealth)
  })
})