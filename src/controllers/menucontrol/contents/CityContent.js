import Content from './Content'

export default class CityContent extends Content {
  constructor ({ city, gameEvents, texts, telegramStorage }) {
    super() /* istanbul ignore next */
    this.name = 'city'
    this.city = city
    this.gameEvents = gameEvents
    this.texts = texts.cityContentTexts
    this.telegramStorage = telegramStorage
    this.telegramIndex = 0
    
    this.telegramStorage.addTelegram('', this.texts.welcomeTelegram, '', 'telegram_fact')    
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

    if (this.telegramStorage.notEmpty()) this.telegramSection()
  }

  telegramSection () {
    this.section('telegrams')
    this.upButton()
    this.telegramMessage()
    this.downButton()
  }

  upButton () {
    let i = this.telegramIndex
    let lenght = this.telegramStorage.telegrams.length - 1
    let asset = i < lenght ? 'arrow_up' : 'arrow_unup'
    let call = i < lenght ? this.nextTelegram : () => { }
    this.button('', call, this, asset)
  }

  downButton () {
    let asset = this.telegramIndex > 0 ? 'arrow_down' : 'arrow_undown'
    let call = this.telegramIndex > 0 ? this.previousTelegram : () => { }
    this.button('', call, this, asset)
  }

  telegramMessage () {
    let telegram = this.telegramStorage.getTelegram(this.telegramIndex)
    let text = telegram.date + '\n' + telegram.topic + '\n' + telegram.text
    this.labeledImage(text, telegram.asset)    
  }

  previousTelegram () {
    this.telegramIndex--
    this.owner.redraw()
  }

  nextTelegram () {
    this.telegramIndex++
    this.owner.redraw()
  }
}
