import TimeWindowRandomizer from '../../models/logic/TimeWindowRandomizer'
export default class BioFactsGenerator {
  constructor ({telegramStorage, bioFacts, randomWithBounds}) {
    this.telegramStorage = telegramStorage
    this.bioFacts = bioFacts ? bioFacts : []
    this.randomWithBounds = randomWithBounds  
    this.timer = new TimeWindowRandomizer({
      min: 48,
      max: 48
    })
    this.timer.calculateNext({serialNumber: 0})
  }
  
  getFact() {
    return this.bioFacts[this.randomWithBounds(0, this.bioFacts.length)]   
  }
  sendTelegram() {
    this.telegramStorage.addBioFact(this.getFact())
  }

}
