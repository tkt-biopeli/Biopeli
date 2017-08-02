import Content from './Content'

export default class CityContent extends Content {
  constructor ({city}) {
    super()
    this.city = city
  }

  createSections () {
    this.sectionName('city')
    this.text('Kaupunki: ' + this.city.name)
    this.text('Väkiluku: ' + this.city.population)
    this.text('Vuosittainen kysyntä: ' + this.city.turnipDemand.yearDemand)
    this.text(
      'Kysyntään vastattu: ' +
      this.format(this.city.turnipDemand.collectedSupply)
    )
    this.text(
      'Nauriin hinta: ' +
      this.format(this.city.turnipDemand.currentPrice(), 2)
    )
  }
}
