const assert = require("assert")
const sinon = require('sinon')
import TileFinder from '../../../src/models/map/TileFinder'

describe('Tile finder tests', () => {
  var multipliers = {
    grass: 1,
    forest: 2,
    water: 5
  }

  var map = {
    tiles: [
      {tileType: {name: 'grass'}, x: 0, y: 0},
      {tileType: {name: 'grass'}, x: 1, y: 0},
      {tileType: {name: 'grass'}, x: 2, y: 0},
      {tileType: {name: 'grass'}, x: 3, y: 0},
      {tileType: {name: 'grass'}, x: 4, y: 0},

      {tileType: {name: 'grass'}, x: 0, y: 1},
      {tileType: {name: 'grass'}, x: 1, y: 1},
      {tileType: {name: 'grass'}, x: 2, y: 1},
      {tileType: {name: 'grass'}, x: 3, y: 1},
      {tileType: {name: 'grass'}, x: 4, y: 1},

      {tileType: {name: 'grass'}, x: 0, y: 2},
      {tileType: {name: 'grass'}, x: 1, y: 2},
      {tileType: {name: 'grass'}, x: 2, y: 2},
      {tileType: {name: 'grass'}, x: 3, y: 2},
      {tileType: {name: 'grass'}, x: 4, y: 2},

      {tileType: {name: 'water'}, x: 0, y: 3},
      {tileType: {name: 'water'}, x: 1, y: 3},
      {tileType: {name: 'water'}, x: 2, y: 3},
      {tileType: {name: 'water'}, x: 3, y: 3},
      {tileType: {name: 'water'}, x: 4, y: 3},

      {tileType: {name: 'grass'}, x: 0, y: 4},
      {tileType: {name: 'forest'}, x: 1, y: 4},
      {tileType: {name: 'grass'}, x: 2, y: 4},
      {tileType: {name: 'forest'}, x: 3, y: 4},
      {tileType: {name: 'grass'}, x: 4, y: 4},

      {tileType: {name: 'grass'}, x: 0, y: 5},
      {tileType: {name: 'grass'}, x: 1, y: 5},
      {tileType: {name: 'grass'}, x: 2, y: 5},
      {tileType: {name: 'forest'}, x: 3, y: 5},
      {tileType: {name: 'grass'}, x: 4, y: 5}
    ],
    getTileWithGridCoordinates: function(x, y) {
      return this.tiles[x + 5 * y]
    },
    gridSizeX: 5,
    gridSizeY: 6
  }

  var tileFinder

  before(()=>{
    tileFinder = new TileFinder({map: map, multipliers: multipliers})
  })

  it('Constructor tests', ()=>{
    assert.equal(map, tileFinder.map)
    assert.equal(multipliers, tileFinder.multipliers)
    assert.equal(map.gridSizeX, tileFinder.width)
    assert.equal(map.gridSizeY, tileFinder.height)
  })

  it('Only valid coordinates work on isInMap', ()=>{
    assert(tileFinder.isInMap(0, 0))
    assert(tileFinder.isInMap(3, 3))
    assert(tileFinder.isInMap(4, 5))
    assert(!tileFinder.isInMap(-1, 0))
    assert(!tileFinder.isInMap(0, -1))
    assert(!tileFinder.isInMap(5, 0))
    assert(!tileFinder.isInMap(0, 6))
    assert(!tileFinder.isInMap(5, 6))
    assert(!tileFinder.isInMap(-777, 287))
  })

  describe('Tiles next to tests', ()=>{
    it('Add tile to list works', ()=>{
      var list = []
      tileFinder.addTileToList(-1, 0, list)
      assert.equal(0, list.length)

      tileFinder.addTileToList(0, 0, list)
      assert.equal(map.tiles[0], list[0])

      tileFinder.addTileToList(1, 1, list)
      assert.equal(2, list.length)
    })

    it('Tiles next to gives tiles next to the tile', ()=>{
      var list = tileFinder.tilesNextTo({x: 1, y: 1})

      assert(list.includes(map.tiles[1]))
      assert(list.includes(map.tiles[5]))
      assert(list.includes(map.tiles[7]))
      assert(list.includes(map.tiles[11]))
      assert.equal(4, list.length)
    })

    it('TilesNextTo gives only tiles on map', ()=>{
      assert.equal(2, tileFinder.tilesNextTo({x: 0, y: 0}).length)
      assert.equal(3, tileFinder.tilesNextTo({x: 3, y: 0}).length)
    })
  })

  describe('Finding tiles in reach tests', ()=>{
    var hasTilesInVector = (set, ...values) => {
      var list = []
      for(let i = 0 ; i < values.length ; i += 2){
        list.push({x: values[i], y: values[i+1]})
      }

      hasTiles(set, list)
    }

    var hasTiles = (set, tiles) => {
      for(let capsule of set.values()){
        for(let i = 0 ; i < tiles.length ; i++){
          let tile = tiles[i]
          if(capsule.tile.x === tile.x && capsule.tile.y === tile.y){
            tiles.splice(i, i+1)
            break
          }
        }
      }

      assert.equal(0, tiles.length, 'Not found: '+tiles)
    }

    it('Encapsuling works', ()=>{
      var capsuled = tileFinder.encapsule(1, 2)
      assert.equal(1, capsuled.tile)
      assert.equal(2, capsuled.distance)
    })

    it('Distance one gives correct with no obstructions', ()=>{
      var found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(2, 0), 1)

      hasTilesInVector(found, 1, 0, 2, 1, 3, 0)
      assert.equal(3, found.size)

      found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(4, 0), 1)

      hasTilesInVector(found, 4, 1, 3, 0)
      assert.equal(2, found.size)

      found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(2, 1), 1)

      hasTilesInVector(found, 1, 1, 2, 0, 2, 2, 3, 1)
      assert.equal(4, found.size)
    })

    it('Distance gives correct with over one and no obstructions', ()=>{
      var found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(2, 0), 2)

      hasTilesInVector(found, 0, 0, 1, 0, 1, 1, 2, 1, 2, 2, 3, 0, 3, 1, 4, 0)
      assert.equal(8, found.size)
    })

    it('If the cost is too high, the tile is not added', ()=>{
      var found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(2, 2), 1)

      hasTilesInVector(found, 1, 2, 2, 1, 3, 2)
      assert.equal(3, found.size)

      found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(0, 4), 1)
      hasTilesInVector(found, 0, 5)
      assert.equal(1, found.size)
    })

    it('Works in complex situations', ()=>{
      var found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(4, 4), 5)
      
      assert.equal(8, found.size)

      found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(2, 2), 6)
      
      assert.equal(18, found.size)

      found = tileFinder.findTilesInDistanceOf(map.getTileWithGridCoordinates(0, 0), 3)

      assert.equal(8, found.size)
    })
  })
})