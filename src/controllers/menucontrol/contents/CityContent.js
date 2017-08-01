import Content from './Content'

export default class CityContent extends Content {
  constructor ({city}) {
    super()
    this.city = city
  }

  createSections () {
    this.sectionName('city')
    this.text('City: ' + this.city.name)
    this.text('Population: ' + this.city.population)
    this.text('Yearly demand: ' + this.city.turnipDemand.yearDemand)
    this.text('Demand supplied: ' + this.format(this.city.turnipDemand.collectedSupply))
    this.text('Current turnip price: ' + this.format(this.city.turnipDemand.currentPrice(), 2))
  }
}
