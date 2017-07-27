import Player from '../../src/game/Player';
const assert = require("assert");

describe('Player tests', function () {
  var p
  var startMoney = 1
  
  beforeEach(() => {
    p = new Player({startMoney: startMoney})
  })
  
  it('Player should have 0 points in the beginning', function () {
    assert.equal(0, p.points)
    assert.equal(0, p.structures.size)
    assert.equal(startMoney, p.cash)
  })

  it('Points are added correctly', function () {
    p.addPoints(5);
    assert.equal(5, p.points);
  })

  it('Adding structure works', () => {
    p.addStructure(1)
    p.addStructure(2)
    assert.equal(2, p.structures.size)
  })

  it('Removing structures works', () => {
    p.addStructure(1)
    assert.equal(1, p.structures.size)
    p.removeStructure(1)
    assert.equal(0, p.structures.size)
  })
})
