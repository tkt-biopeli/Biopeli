const assert = require('assert')
const sinon = require('sinon')
import CityEffect from '../../../../src/controllers/events/random/effects/CityEffect'

describe('City effect tests', ()=>{
  it('Effect works', ()=>{
    var city = {population: 100}
    var effect = new CityEffect({
      gameState: {city: city},
      json: {populationChange: 2}
    })

    effect.happen()
    assert.equal(200, city.population)

    effect.happen()
    assert.equal(400, city.population)
  })
})