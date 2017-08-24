const assert = require('assert')
const sinon = require('sinon')
import MoneyEffect from '../../../../../src/controllers/events/random/effects/MoneyEffect'

describe('Money effect tests', ()=>{
  it('Effect works', ()=>{
    var player = {cash: 0}
    var effect = new MoneyEffect({
      gameState: {player: player},
      json: {change: 10}
    })

    effect.realizeEvent()
    assert.equal(10, player.cash)

    effect.realizeEvent()
    assert.equal(20, player.cash)
  })
})