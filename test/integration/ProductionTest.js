import GameTimerListener from '../../src/models/GameTimerListener'
import Player from '../../src/game/Player'
import TimeEvent from '../../src/view/TimeEvent'
import StructureType from '../../src/models/map/StructureType'
import TileType from '../../src/models/map/TileType'
import ModelTile from '../../src/models/map/ModelTile'
import StructureFactory from '../../src/models/map/StructureFactory'

const sinon = require('sinon')
const assert = require('assert')

describe('Production tests', () => {

  var listener, tile, factory, structureTypes, player

  before(function () {
    player = new Player()

    listener = new GameTimerListener({
      player: player,
      menuView: {redraw: function(){}}
    })

    structureTypes = StructureType()

    tile = new ModelTile({ 
      x: 1, 
      y: 1, 
      type: TileType().grass, 
      structure: undefined
    })

    factory = new StructureFactory({ 
      tile: tile, 
      structureTypes: structureTypes, 
      gameTimer: {currentTime: {getYear: () => {return 1}}}, 
      player: player
    })
  })

  function createSeasonEvent(){
    return {
      serialNumber:0,
      week:1,
      month:1,
      year:1
    }
  }
  function createNonSeasonEvent(){
    return {
      serialNumber:0,
      week:2,
      month:1,
      year:1
    }
  }

  it('Production works', () => {
    factory.build.farm()

    sinon.spy(tile.structure, 'produceFn')

    listener.onTimer(createNonSeasonEvent())

    assert(tile.structure.produceFn.calledOnce)
  })

  it('Farm production return a number', () => {
    factory.build.farm()
    var production

    production = tile.structure.produce(createNonSeasonEvent())
    assert(typeof production == 'number')
    assert(production != NaN)
  })
})