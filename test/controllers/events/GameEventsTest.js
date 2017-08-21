const assert = require("assert")
const sinon = require("sinon")
import GameEvents from '../../../src/controllers/events/GameEvents'

describe('GameEvents tests', () => {
  var gameState, gEvents, startSpy, config, utils, texts
  var gameLength = 1

  beforeEach(() => {
    startSpy = sinon.spy()
    gameState = {
      player: {
        points: 574
      },
      city: {
        population: 563282
      },
      gameData: 13,
      state: {
        state: {
          start: startSpy
        },
        add: {
          audio: {
            play: () => {},
            stop: () => {},
            fullLoop: () => {}
          }
        }
      },
      music: {
        stop: sinon.spy()
      }
    }
    config = {
      gameSettings: {
        scoreServer: 23
      }
    }
    utils = {}
    texts = {}

    gEvents = new GameEvents({
      gameState: gameState,
      gameLength: gameLength,
      config: config,
      utils: utils,
      texts: texts
    })
  })

  it('Game over checker works', () => {
    var finishSpy = sinon.spy()
    gEvents.finishGame = finishSpy

    gEvents.isGameOver({serialNumber: gameLength})
    assert.equal(1, finishSpy.callCount)

    gEvents.isGameOver({serialNumber: gameLength - 1})
    assert.equal(1, finishSpy.callCount)

    gEvents.isGameOver({serialNumber: gameLength + 1})
    assert.equal(2, finishSpy.callCount)
  })

  it('Game is finished correctly', () => {
    gEvents.finishGame()
    assert.equal(gameState.music.stop.callCount, 1)
    assert(startSpy.calledWith(
      'BeforeGameOver', true, false,
      gameState.player.points, gameState.city.population, gameState.gameData,
      gameState.state, config, utils, texts
    ))
  })
})
