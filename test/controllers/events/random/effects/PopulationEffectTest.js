const assert = require('assert')
const sinon = require('sinon')
import PopulationEffect from '../../../../../src/controllers/events/random/effects/PopulationEffect'

describe('Population effect tests', ()=>{
  var city, effect

  beforeEach(() => {
    city = {population: 4000}
    effect = new PopulationEffect({
      gameState: {city: city},
      json: {changePercentage: 0.125}
    })
  })

  it('realizeEvent functioning', ()=>{
    effect.realizeEvent()
    assert.equal(city.population, 500)

    effect.realizeEvent()
    assert.equal(city.population, 62)
  })
})