const assert = require('assert')
const sinon = require('sinon')
import AllStructureFilter from '../../../../../../src/controllers/events/random/filters/structure/AllStructureFilter'

describe('All structure filter and tile tile filter tests', ()=>{
  it('Filter works', ()=>{
    var player = {
      structures: {values: [1, 2, 3]}
    }
    var filter = new AllStructureFilter({
      gameState: {player: player}
    })

    var affected = filter.affected()
    assert.equal(3, affected.length)
    assert.equal(filter.player, player)
  })
})