import City from '../../../src/models/city/City'
const assert = require('assert')
const sinon = require('sinon')

describe('City tests', () => {

  var city

  beforeEach(() => {
    city = new City({ 
      name: 'test',
      startPopulation: 100,
      startPrice: 10,
      popularityPct: 11,
      increaseAtOne: 1.25,
      increaseAtTwo: 2.25
    })
  })

  it('Constructor works', () => {
    assert.equal(city.name, 'test')
    assert.equal(city.population, 100)
    assert.equal(city.turnipDemand.city, city)
    assert.equal(city.turnipDemand.popularityPct, 11)
    assert.equal(city.turnipDemand.constantPrice, 10)
  })

  it('buyTurnips gives correct amount of cash', ()=>{
    city.turnipDemand = {weekly: () => 5 }
    city.endOfTheYear = sinon.spy()

    assert.equal(5, city.buyTurnips(1, false))
    assert.equal(0, city.endOfTheYear.callCount)
  })

  it('Endoftheyear is called at the end of the year', ()=>{
    city.turnipDemand = {weekly: () => 5 }
    city.endOfTheYear = sinon.spy()

    city.buyTurnips(1, true)
    assert.equal(1, city.endOfTheYear.callCount)
  })

  it('Endoftheyear works', ()=>{
    city.turnipDemand = {calculateYearlyDemand: sinon.spy(), percentageSupplied: () => 1}
    city.increasePopulation = sinon.spy()

    city.endOfTheYear()

    assert.equal(1, city.turnipDemand.calculateYearlyDemand.callCount)
    assert.equal(1, city.increasePopulation.callCount)
    assert(city.increasePopulation.calledWith(1))
  })

  describe('Population growth', ()=>{
    it('50% supply does nothing', ()=>{
      city.increasePopulation(0.5)
      assert.equal(100, city.population)
    })

    it('Under 50% decreases correctly', ()=>{
      city.increasePopulation(0)
      assert.equal(75, city.population)

      city.population = 100
      city.increasePopulation(0.3)
      assert.equal(90, city.population)

      city.population = 100
      city.increasePopulation(0.1)
      assert.equal(80, city.population)
    })

    it('Between 50 and 100% increaes correctly', ()=>{
      city.increasePopulation(1)
      assert.equal(125, city.population)

      city.population = 100
      city.increasePopulation(0.8)
      assert.equal(115, city.population)

      city.population = 100
      city.increasePopulation(0.6)
      assert.equal(105, city.population)
    })

    it('Over 100% increases correctly', ()=>{
      city.increasePopulation(2)
      assert.equal(225, city.population)

      city.population = 100
      city.increasePopulation(1.5)
      assert.equal(175, city.population)

      city.population = 100
      city.increasePopulation(3)
      assert.equal(325, city.population)
    })

    it('Changing increaseAtWorks', ()=>{
      city = new City({ 
        name: 'test',
        startPopulation: 100,
        startPrice: 10,
        popularityPct: 11,
        increaseAtOne: 10,
        increaseAtTwo: 20
      })

      city.increasePopulation(1)
      assert.equal(1000, city.population)

      city.population = 100
      city.increasePopulation(2)
      assert.equal(2000, city.population)

      city.population = 100
      city.increasePopulation(0.5)
      assert.equal(100, city.population)

      city.population = 100
      city.increasePopulation(0)
      assert.equal(-800, city.population)
    })
  })
})
