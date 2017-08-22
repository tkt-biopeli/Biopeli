export default class TelegramStorage {
  constructor () {
    this.telegrams = []
    this.unread = 0
  }

  addRandomEvent (timeEvent, randomEvent) {
    let date = timeEvent.toString()
    let topic = randomEvent.name
    let text = randomEvent.description
    this.addTelegram(date, topic, text, 'telegram_revent')
  }

  addStructureHint(hint) {
    this.addTelegram('Tiesithän?', '', hint, 'telegram_hint')
  }

  addRuinWarning(timeEvent, structure) {
    let date = timeEvent.toString()
    let topic = structure.ownerName + ' hädässä!'
    let text = structure.structureName + ' on puolikuntoinen!'
    this.addTelegram(date, topic, text, 'telegram_revent')    
  }

  addTelegram (date, topic, text, asset) {
    this.telegrams.push({ date: date, topic: topic, text: text, new: true, asset: asset})
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
