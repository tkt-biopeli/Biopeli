import Content from './Content'

export default class CityContent extends Content {
  constructor ({city, gameEvents, texts}) {
    super()
    this.city = city
    this.gameEvents = gameEvents
    this.texts = texts.cityContentTexts
  }

  createSections () {
    this.sectionName('city')
    this.text(this.texts.city + ': ' + this.city.name)
    this.text(this.texts.population + ': ' + this.city.population)
    this.text(this.texts.yearlyDemand + ': ' + this.city.turnipDemand.yearDemand)
    this.text(
      this.texts.demandFulfilled + ': ' +
      this.format(this.city.turnipDemand.collectedSupply)
    )
    this.text(
      this.texts.turnipPrice + ': ' +
      this.format(this.city.turnipDemand.currentPrice(), 2)
    )
  }
}
