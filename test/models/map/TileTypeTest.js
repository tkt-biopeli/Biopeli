const assert = require('assert')
import tileTypeCreator from '../../../src/models/map/TileType'

describe('TileType test', () => {
  it('Forest tile type is created correctly', () => {
    var tileTypes = tileTypeCreator()
    var forest = tileTypes.forest

    assert(forest != null)
    assert(forest.name == 'forest')
    assert(forest.asset == 'forest')
  })

  it('Water tile type is created correctly', () => {
    var tileTypes = tileTypeCreator()
    var water = tileTypes.water

    assert(water != null)
    assert(water.name == 'water')
    assert(water.asset == 'water')
  })
})
