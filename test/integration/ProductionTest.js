import GameTimeListener from '../../src/models/GameTimeListener'
import Player from '../../src/game/Player'
import TimeEvent from '../../src/view/TimeEvent'
import StructureType from '../../src/models/map/StructureType'

describe('Production tests', () => {

  var listener, tile, factory, structureTypes, player

  before(function () {
    player = new Player
    listener = new GameTimeListener({
      player: player,
      menuView: {redraw: function(){}}
    })

    structureTypes = StructureType()

    tile = new Tile({ 
      x: 1, 
      y: 1, 
      type: structureTypes.farm, 
      structure: undefined
    })

    factory = new StructureFactory({ 
      tile: tile, 
      structureTypes: structureTypes, 
      gameTimer: undefined, 
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

  it('constant production works', () => {
    factory.build.farm()
  })

  it('Seasonal production works', () => {
    factory.build.farm()
  })
})