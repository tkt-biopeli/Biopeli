const assert = require('assert')
const sinon = require('sinon')
import DemandFunction from '../../../src/models/city/DemandFunction'

describe('DemandFunction tests', () => {

  var city
  var demand

  beforeEach(() => {
    city = { population: 100 }
    demand = new DemandFunction({ city: city, popularityPct: 1, startConstantPrice: 2, demandRandomVariance: 0.2 })
  })

  it('Constructor works', () => {
    assert.equal(demand.city, city)
    assert.equal(demand.popularityPct, 1)
    assert.equal(demand.constantPrice, 2)
    assert.equal(0.2, demand.demandRandomVariance)
  })

  it('Setting yearly demand works', ()=>{
    demand.demandedAmount = () => 1

    demand.calculateYearlyDemand()

    assert.equal(0, demand.collectedSupply)
    assert.equal(2, demand.wholeDemand)
    assert.equal(1, demand.yearDemand)
    assert.equal(-2, demand.slope)
  })

  it('Calculating the demand works', ()=>{
    demand.random = () => 0.5

    assert.equal(100, demand.demandedAmount())

    city.population = 500

    assert.equal(500, demand.demandedAmount())

    demand.random = () => 1

    assert.equal(550, demand.demandedAmount())

    demand.demandRandomVariance = 1

    assert.equal(750, demand.demandedAmount())
  })

  it('Weekly works', ()=>{
    demand.pay = () => 3

    assert.equal(3, demand.weekly(1))
    assert.equal(1, demand.collectedSupply)

    assert.equal(3, demand.weekly(1))
    assert.equal(2, demand.collectedSupply)
  })

  it('Percentagle supplied is correct', ()=>{
    demand.collectedSupply = 5
    demand.yearDemand = 10

    assert.equal(0.5, demand.percentageSupplied())
  })

  describe('Calculating money gotten from the supply works', ()=>{
    it('Price at under 100% works', ()=>{
      demand.yearDemand = 10

      assert.equal(2, demand.priceAt(0))
      assert.equal(2, demand.priceAt(2.6))
      assert.equal(2, demand.priceAt(10))
    })

    it('Price between 100 and 200 % is right', ()=>{
      demand.yearDemand = 10
      demand.constantPrice = 100
      demand.slope = - demand.constantPrice / demand.yearDemand

      assert.equal(50, demand.priceAt(15))
      assert.equal(20, demand.priceAt(18))
      assert.equal(90, demand.priceAt(11))
    })

    it('Price over 200% is 0', ()=>{
      demand.yearDemand = 10
      demand.slope = - demand.constantPrice / demand.yearDemand

      assert.equal(0, demand.priceAt(20))
      assert.equal(0, demand.priceAt(500000))
      assert.equal(0, demand.priceAt(21))
    })

    it('Pay between constant prices', ()=>{
      demand.yearDemand = 10
      demand.constantPrice = 100
      demand.slope = - demand.constantPrice / demand.yearDemand

      assert.equal(1000, demand.pay(10))

      demand.collectedSupply = 0

      assert.equal(500, demand.pay(5))
    })

    it('Pay with only sloped prices', ()=>{
      demand.yearDemand = 10
      demand.constantPrice = 100
      demand.collectedSupply = 10
      demand.slope = - demand.constantPrice / demand.yearDemand

      assert.equal(500, demand.pay(10))

      demand.collectedSupply = 15

      assert.equal(125, demand.pay(5))

      demand.collectedSupply = 10

      assert.equal(375, demand.pay(5))
    })

    it('Pay with both price types works', ()=>{
      demand.yearDemand = 10
      demand.constantPrice = 100
      demand.collectedSupply = 5
      demand.slope = - demand.constantPrice / demand.yearDemand

      assert.equal(875, demand.pay(10))

      demand.collectedSupply = 8

      assert.equal(575, demand.pay(7))
    })

    it('If pay is called with between 1 and 2 and over 2 works', ()=>{
      demand.yearDemand = 10
      demand.wholeDemand = 20
      demand.constantPrice = 100
      demand.collectedSupply = 15
      demand.slope = - demand.constantPrice / demand.yearDemand

      assert.equal(125, demand.pay(10))
    })
  })
})