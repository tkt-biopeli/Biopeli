const assert = require('assert')
const sinon = require('sinon')
import DemandFunction from '../../../src/models/city/DemandFunction'

describe('DemandFunction tests', () => {

  var city
  var demandF

  before(() => {
    city = { population: 100 }
    demandF = new DemandFunction({ city: city, popularityPct: 50, slope: 2 })
  })

  it('Constructor works', () => {
    let df = new DemandFunction({ city: 'testname', popularityPct: 55, slope: 2 })
    assert.equal(df.city, 'testname')
    assert.equal(df.popularityPct, 55)
    assert.equal(df.slope, 2)
  })

  it('customers calculated correctly', () => {
    assert.equal(demandF.customers(), (100 * 50 / 100))
  })

  it('Price is set correctly', () => {
    let p = (50 - 25) / 2
    assert.equal(demandF.price(25), p)
    assert.equal(demandF.price(51), 0)
  })

  it('Correct object returned after calculations', () => {
    let props = demandF.calculate(50)
    assert.equal(props.percentage, 100)
    assert.equal(props.earnings, 0)
    props = demandF.calculate(12.5)
    assert.equal(props.percentage, 50)
    assert.equal(props.earnings, 12.5 * (50 - 12.5) / 2)
  })
})