export default class TelegramStorage {
  constructor ({ }) {
    this.telegrams = []
    this.unread = 0
  }

  addRandomEvent (timeEvent, randomEvent) {
    let date = timeEvent.toString()
    let topic = randomEvent.name
    let text = randomEvent.description
    this.addTelegram(date, topic, text)
  }

  addTelegram (date, topic, text) {
    this.telegrams.push({ date: date, topic: topic, text: text, new: true })
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