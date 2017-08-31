import GameAdvancer from './helpers/GameAdvancer'
const assert = require('assert')

describe('Integration test: Random event occurrence tests', () => {
  var gameAdvancer, gameState, gameStateChecker

  beforeEach(() => {
    gameAdvancer = new GameAdvancer()
    gameAdvancer.deactivateRandomEvents()

    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Random event does not occur if its conditions are not met', () => {
    // random events do not occur
    gameAdvancer.setPopulation(100)
    gameAdvancer.updateSeveralTimes(5, 1000)
    gameStateChecker.checkRandomEventOccurred('Pakolaiskriisi', false)
    // the condition of the first event is not met;
    // the last event occurs (one with no conditions)
    gameAdvancer.activateRandomEvents()
    gameAdvancer.update(1000)
    gameStateChecker.checkRandomEventOccurred('Pakolaiskriisi', true) 
    gameStateChecker.checkRandomEventOccurred('Rutto', false)
  })

  it('Random event occurs when its conditions are met', () => {
    // the first event does not occur due to the population being too low
    gameAdvancer.activateRandomEvents()
    gameAdvancer.setPopulation(699)
    gameAdvancer.update(1000)
    gameStateChecker.checkRandomEventOccurred('Rutto', false)
    // the condition of the first event is met; the first event occurs
    gameAdvancer.setPopulation(700)
    gameAdvancer.update(1000)
    gameStateChecker.checkRandomEventOccurred('Rutto', true)
  })

  it('Only one random event occurs in one update', () => {
    gameAdvancer.activateRandomEvents()
    gameAdvancer.setPopulation(700)
    gameAdvancer.update(1000)
    gameStateChecker.checkRandomEventOccurred('Rutto', true)
    gameStateChecker.checkRandomEventOccurred('Pakolaiskriisi', false)
  })

  it('Random event causes an effect', () => {
    gameAdvancer.activateRandomEvents()
    gameAdvancer.setPopulation(700)
    gameAdvancer.update(1000)
    gameStateChecker.checkRandomEventOccurred('Rutto', true)
    gameStateChecker.checkPopulation(560)
  })
})