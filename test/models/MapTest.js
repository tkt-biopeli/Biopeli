const assert = require("assert")
const sinon = require('sinon')
import Map from '../../src/models/map/Map'
import TileType from '../../src/models/map/TileType'


describe('Map tests', () => {
  var game
  var map

  before(function () {
    game = { world: { setBounds: function () { } } }

    map = new Map({
      game: game,
      gridSizeX: 100,
      gridSizeY: 100,
      tileWidth: 128,
      tileHeight: 128
    })
  })

  it('Constructor test', () => {

    var mock = sinon.mock(game.world)
    mock.expects("setBounds").once().withArgs(0, 0, 100 * 128, 100 * 128)

    assert.equal(map.gridSizeX, 100)
    assert.equal(map.gridSizeY, 100)
    assert.equal(map.tileHeight, 128)
    assert.equal(map.tileWidth, 128)

  })

  it('Tile is added and returned with grid coordinates', () => {
    var tileType = TileType().forest
    map.addTileWithGridCoordinates(1, 1, tileType)
    assert.equal(map.getTileWithGridCoordinates(1, 1).tileType, tileType)
  })

  it('Tile is added and returned with pixel coordinates', () => {
    var tileType = TileType().water
    map.addTileWithPixelCoordinates(1, 1, tileType)
    assert.equal(map.getTileWithPixelCoordinates(1, 1).tileType, tileType)
  })

  it('Tile is removed with grid coordinates', () => {
    assert.notEqual(map.getTileWithGridCoordinates(1, 1), undefined)
    map.removeTileWithGridCoordinates(1, 1)
    assert.equal(map.getTileWithGridCoordinates(1, 1), undefined)
  })


})
