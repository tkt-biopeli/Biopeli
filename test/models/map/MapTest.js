const assert = require("assert")
const sinon = require('sinon')
import Map from '../../../src/models/map/Map'
import StaticTypes from '../../../src/models/StaticTypes'


describe('Map tests', () => {
  var game
  var map
  var Noise = class Noise{perlin2(){return 1}}

  before(function () {
    game = { world: { setBounds: function () { } } }

    map = new Map({
      game: game,
      width: 100,
      height: 100
    })
  })

  it('Constructor test', () => {

    /*    var mock = sinon.mock(game.world)
        mock.expects("setBounds").once().withArgs(0, 0, 100 * 128, 100 * 128)*/

    assert.equal(map.gridSizeX, 100)
    assert.equal(map.gridSizeY, 100)

  })

  it('Tile is added and returned with grid coordinates', () => {
    var tileType = StaticTypes.tileTypes.forest
    map.addTileWithGridCoordinates(1, 1, tileType)
    assert.equal(map.getTileWithGridCoordinates(1, 1).tileType, tileType)
  })

  it('Tile is added and returned with pixel coordinates', () => {
    var tileType = StaticTypes.tileTypes.water
    map.addTileWithPixelCoordinates(1, 1, tileType)
    assert.equal(map.getTileWithPixelCoordinates(1, 1).tileType, tileType)
  })

  it('Tile is removed with grid coordinates', () => {
    assert.notEqual(map.getTileWithGridCoordinates(1, 1), undefined)
    map.removeTileWithGridCoordinates(1, 1)
    assert.equal(map.getTileWithGridCoordinates(1, 1), undefined)
  })

  it('tile is removed with pixel coordinates', () => {
    assert.notEqual(map.getTileWithPixelCoordinates(1, 1), undefined)
    map.removeTileWithPixelCoordinates(1, 1)
    assert.equal(map.getTileWithPixelCoordinates(1, 1), undefined)
  })

  it('Pixel-Grid-Pixel conversions work correctly', () => {
    assert.equal(map.pixelsToGridX(300), 2)
    assert.equal(map.pixelsToGridY(300), 2)
    assert.equal(map.gridToPixelsX(2), 256)
    assert.equal(map.gridToPixelsY(2), 256)
  })

  it('Map generation works', () => {
    map.createMap()
    for(var x = 0; x < map.gridSizeX; x++)
      for(var y = 0; y < map.gridSizeY; y++)
        assert(map.getTileWithGridCoordinates(x,y) != undefined)
  })

})