import Content from './Content'

export default class CityContent extends Content {
  constructor ({city, gameEvents, texts}) {
    super()
    this.city = city
    this.gameEvents = gameEvents
    this.texts = texts.cityContentTexts

    
    // viite listaan jossa kaikki pelaajalle halutut viestit tapahtumista
    this.eventTelegrams = [
      {date: '1.1.1999', topic: 'rutto', asset: 'telegram', text: 'kaupungissa rutto'},
      {date: '2.1.1999', topic: 'paiserutto', asset: 'telegram', text: 'kaupungissa paiserutto'},
      {date: '3.1.1999', topic: 'metsäpalo', asset: 'telegram', text: 'maastopalo tuhosi metsät'}
    ]
    // näytettävä eventti, uusi saapunut viesti pitäisi siirtää osoittimen listan loppuun
    this.currentTelegram = 0
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

    this.eventSection()
  }

  eventSection() {    
    this.section('events')
    this.text('Uutissähkeet')
    this.button('ylös', this.eventsUp, this)
    this.eventToDraw()
    this.button('alas', this.eventsDown, this)
    
    this.eventTelegrams[0].call
  }

  // voisi näyttää myös useamman kuin yhden kerrallaan
  eventToDraw() {
    let event = this.eventTelegrams[this.currentTelegram]
    // rivitys ratkaistava jossain
    let text = event.date + "\n" + event.topic + "\n" + event.text
    this.labeledImage(text, event.asset)    
  }

  eventsUp() {
    this.currentTelegram--
    if (this.currentTelegram < 0) this.currentTelegram = 0    
    this.owner.redraw()    
  }

  eventsDown() {
    this.currentTelegram++
    if (this.currentTelegram >= this.eventTelegrams.length) this.currentTelegram = this.eventTelegrams.length - 1
    this.owner.redraw()    
  }
}
