const assert = require('assert')
const tileTypeCreator = require('../src/models/TileType')

describe('TileType test', () =>{
  it('Forest tile type is created correctly', () =>{
    var tileTypes = tileTypeCreator();
    var forest = tileTypes.forest;

    assert.equal(forest != undefined);
    assert.equals(forest.name == 'forest');
    assert.equals(forest.asset == 'forest');
  })

  it('Water tile type is created correctly', () =>{
    var tileTypes = tileTypeCreator();
    var water = tileTypes.water;

    assert.equal(water != undefined);
    assert.equals(water.name == 'forest');
    assert.equals(water.asset == 'forest');
  })
})
