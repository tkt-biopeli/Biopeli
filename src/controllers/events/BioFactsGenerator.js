import TimeWindowRandomizer from '../../models/logic/TimeWindowRandomizer'

/**
 * Chooses random facts for the game to show.
 */
export default class BioFactsGenerator {
  constructor ({telegramStorage, bioFacts, randomWithBounds, randomEventSettings}) {
    this.telegramStorage = telegramStorage
    this.bioFacts = bioFacts == null ? [] : bioFacts
    this.randomWithBounds = randomWithBounds  
    this.timer = new TimeWindowRandomizer({
      min: randomEventSettings.bioFactFrequencyMinMax,
      max: randomEventSettings.bioFactFrequencyMinMax
    })
    this.timer.calculateNext({serialNumber: 0})
  }

  getFact () {
    return this.bioFacts[this.randomWithBounds(0, this.bioFacts.length)]   
  }

  sendTelegram () {
    this.telegramStorage.addBioFact(this.getFact())
  }
}
