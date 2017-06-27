import City from '../../src/game/City'
import config from '../../src/config'
const assert = require('assert')

describe('City tests', () => {

  var city

  before(() => {
    city = new City({ name: 'test' })
  })

  it('Constructor works', () => {
    assert.equal(city.name, 'test')
  })

  it('Initial demand, population and turnips are set correctly', () => {
    assert.equal(city.demand, config.cityInitialDemand)
    assert.equal(city.turnips, config.cityInitialTurnips)
    assert.equal(city.population, config.cityInitialPopulation)
  })

  it('Demand is increased correctly', () => {
    city.increaseDemand(100)
    assert.equal(city.demand, 200)
  })

  it('Population is increased correctly', () => {
    city.increasePopulation(1)
    assert.equal(city.population, 100001)
  })


  it('Receiving and reseting turnips works', () => {
    city.receiveTurnips(20)
    assert.equal(city.turnips, 20)
    city.resetTurnips()
    assert.equal(city.turnips, 0)
  })

  it('City pays money to player according to satisfaction level', () => {
    // test here
  })
})
