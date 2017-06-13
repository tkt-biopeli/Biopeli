import GameStub from './helpers/GameStub'
import GameState from '../../src/game/GameState'
import config from '../../src/config'
const assert = require('assert')

describe('The game is initialized properly when started', ()=>{

  var game
  var gameState

  before(() =>{
    game = new GameStub({width: config.gameWidth, height: config.gameHeight})

    gameState = new GameState({
      state: game,
      mapWidth: config.mapWidth,
      mapHeight: config.mapHeight,
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
      menuWidth: config.menuWidth
    })
  })

  it('Game is initialized', ()=>{
    
  })
})
