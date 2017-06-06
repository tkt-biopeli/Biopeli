import Player from '../../src/game/Player.js';
const assert = require("assert");

describe('Player tests', function(){
  it('Player should have 0 points in the beginning', function(){
    var p = new Player();
    assert.equal(0, p.getPoints());
  })
  it('Points are added correctly', function(){
    var p = new Player();
    p.addPoints(5);
    assert.equal(5, p.getPoints());
	})
})
