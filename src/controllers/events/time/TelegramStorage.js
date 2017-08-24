export default class TelegramStorage {
  constructor ({ telegramTexts }) {
    this.texts = telegramTexts
    this.telegrams = []
    this.unread = 0
    this.hints = true
  }

  addRandomEvent (timeEvent, randomEvent) {
    let date = timeEvent.toString()
    let topic = randomEvent.name
    let text = randomEvent.description
    this.addTelegram(date, topic, text, 'telegram_revent')
  }

  addStructureHint (hint) {
    if (this.hints) {
      this.addTelegram('', this.texts.hintTopic, hint, 'telegram_hint')
    }
  }

  addBioFact (fact) {
    this.addTelegram('', this.texts.factTopic, fact, 'telegram_hint')

  }

  addRuinWarning (timeEvent, structure) {
    let date = timeEvent.toString()
    let topic = structure.ownerName + this.texts.ruinTopic
    let text = structure.structureName + this.texts.ruinText
    this.addTelegram(date, topic, text, 'telegram_revent')
  }

  addTelegram (date, topic, text, asset) {
    this.telegrams.push({ date: date, topic: topic, text: text, new: true, asset: asset })
    this.unread++
  }

  getTelegram (i) {
    let telegram = this.telegrams[i]
    if (telegram.new) {
      telegram.new = false
      this.unread--
    }
    return telegram
  }

  notificate () {
    return this.unread > 0
  }

  notEmpty () {
    return this.telegrams.length > 0
  }
}
