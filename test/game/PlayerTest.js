import Player from '../../src/game/Player.js';
const assert = require("assert");

describe('Player tests', function () {
  it('Player should have 0 points in the beginning', function () {
    var p = new Player();
    assert.equal(0, p.getPoints());
    assert.equal(0, p.structures.size)
  })

  var p
  beforeEach(() => {
    p = new Player()
  })

  it('Points are added correctly', function () {
    p.addPoints(5);
    assert.equal(5, p.getPoints());
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
