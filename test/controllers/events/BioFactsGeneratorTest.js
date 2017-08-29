const assert = require('assert')
const sinon = require('sinon')
import BioFactsGenerator from '../../../src/controllers/events/BioFactsGenerator'

describe('BioFacts generator tests', ()=>{
  var telegramStorage, bioFacts, randomWithBounds, randomEventSettings
  var bioFactsGen

  beforeEach(()=>{
    telegramStorage = {addBioFact: () => {}}
    bioFacts = ['foo', 'bar', 'huuhaa']
    randomWithBounds = sinon.spy()
    randomEventSettings = {bioFactFrequencyMinMax: 23}
    bioFactsGen = new BioFactsGenerator({
      telegramStorage: telegramStorage,
      bioFacts: bioFacts,
      randomWithBounds: randomWithBounds,
      randomEventSettings: randomEventSettings
    })
  })

  it('Constructor test', ()=>{
    assert.equal(bioFactsGen.bioFacts, bioFacts)
    bioFactsGen = new BioFactsGenerator({
      telegramStorage: telegramStorage,
      randomWithBounds: randomWithBounds,
      randomEventSettings: randomEventSettings
    })
    assert.equal(bioFactsGen.bioFacts.length, 0)
  })
})