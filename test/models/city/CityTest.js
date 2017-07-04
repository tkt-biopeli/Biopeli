import City from '../../../src/models/city/City'
import config from '../../../src/config'
import DemandFunction from '../../../src/models/city/DemandFunction'
const assert = require('assert')

describe('City tests', () => {

  var city, demandFn

  before(() => {
    city = new City({ name: 'test' })
    demandFn = new DemandFunction({
      city: city, 
      popularityPct: 10, 
      slope:10
    })
  })

  it('Constructor works', () => {
    assert.equal(city.name, 'test')
  })

  it('Initial demand, population and turnips are set correctly', () => {
/*    assert.equal(city.demand, config.cityInitialDemand)
    assert.equal(city.turnips, config.cityInitialTurnips)*/
    assert.equal(city.population, config.cityInitialPopulation)
  })

  it('Demand is increased correctly', () => {
/*    city.increaseDemand(100)
    assert.equal(city.demand, 200)*/
  })

  it('Population is increased correctly', () => {
    let population = city.population
    city.increasePopulation(1)
    assert.equal(city.population, population + 1)
  })


  it('Receiving and reseting turnips works', () => {
/*    city.receiveTurnips(20)
    assert.equal(city.turnips, 20)
    city.resetTurnips()
    assert.equal(city.turnips, 0)*/
  })

  it('City pays money to player according to satisfaction level', () => {
    // test here
  })

  it('Buy turnips returns a valid number', () => {
	  var ret = city.buyTurnips(10)
    assert(typeof ret == 'number')
    assert(ret != NaN)
  })
})
