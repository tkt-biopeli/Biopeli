const assert = require('assert')

import PurchaseManager from '../../src/models/PurchaseManager'

describe('Purchase manager tests', () => {
  var manager, player

  beforeEach(() =>{
    player = {
      cash: 10
    }
    manager = new PurchaseManager({player: player})
  })

  it('Cosntructor', ()=>{
    assert.equal(player, manager.player)
  })

  it('HasCash checks the money correctly', ()=>{
    assert(manager.hasCash(0))
    assert(manager.hasCash(2))
    assert(manager.hasCash(10))
    assert(!manager.hasCash(11))
    assert(!manager.hasCash(12312))
  })

  it('purchase reduces the money and returns correct answer', ()=>{
    assert(!manager.purchase(11))
    assert.equal(10, player.cash)

    assert(manager.purchase(1))
    assert.equal(9, player.cash)

    assert(manager.purchase(9))
    assert.equal(0, player.cash)
  })
})