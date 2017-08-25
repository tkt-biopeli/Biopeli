const assert = require('assert')
const sinon = require('sinon')
import PopulationEffect from '../../../../../src/controllers/events/random/effects/PopulationEffect'

describe('Population effect tests', ()=>{
  it('Effect works', ()=>{
    var city = {population: 100}
    var effect = new PopulationEffect({
      gameState: {city: city},
      json: {changePercentage: 2}
    })

    effect.realizeEvent()
    assert.equal(200, city.population)

    effect.realizeEvent()
    assert.equal(400, city.population)
  })
})