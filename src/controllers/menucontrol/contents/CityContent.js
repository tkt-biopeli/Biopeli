import Content from './Content'

export default class CityContent extends Content {
  constructor ({city, gameEvents}) {
    super()
    this.city = city
    this.gameEvents = gameEvents
  }

  createSections () {
    this.sectionName('city')
    this.text('City: ' + this.city.name)
    this.text('Population: ' + this.city.population)
    this.text('Yearly demand: ' + this.city.turnipDemand.yearDemand)
    this.text('Demand supplied: ' + this.format(this.city.turnipDemand.collectedSupply))
    this.text('Current turnip price: ' + this.city.turnipDemand.currentPrice())
    this.button('Lopeta', this.gameEvents.finishGame, this.gameEvents)
  }
}
