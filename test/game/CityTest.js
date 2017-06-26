import City from '../../src/game/City'
import config from '../../src/config'
const assert = require('assert')

describe('City tests', () => {
  it('Constructor works when name is defined', () => {
    var city = new City('test')
    assert.equal(city.getName(), 'test')
  })
  it('Constructor works when name is undefined', () => {
    var city = new City()
    assert.equal(city.getName(), 'City')
  })
  it('Initial demand and turnips are set correctly', () => {
    var city = new City('test')
    assert.equal(city.getDemand(), config.cityInitialDemand)
    assert.equal(city.getTurnips(), config.cityInitialTurnips)
  })
  it('Demand is increased correctly', () => {
    var city = new City('test')
    city.increaseDemand(100)
    assert.equal(city.getDemand(), 200)
  })
  it('Receiving and reseting turnips works', () => {
    var city = new City('test')
    city.receiveTurnips(20)
    assert.equal(city.getTurnips(), 20)
    city.resetTurnips()
    assert.equal(city.getTurnips(), 0)
  })
  it('City pays money to player according to satisfaction level', () => {
    // test here
  })
})
