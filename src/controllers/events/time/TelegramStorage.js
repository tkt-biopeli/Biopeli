/**
 * Messaging service that is used to store and send
 * messages to player
 * 
 * @export
 * @class TelegramStorage
 */
export default class TelegramStorage {
  constructor ({ telegramTexts }) {
    this.texts = telegramTexts
    this.telegrams = []
    this.unread = 0
    this.hints = true
  }
  
  // Add random event message
  addRandomEvent (timeEvent, randomEvent) {
    let date = timeEvent.toString()
    let topic = randomEvent.name
    let text = randomEvent.description
    this.addTelegram(date, topic, text, 'telegram_revent')
  }

  // Add hint related to a structure
  addStructureHint (hint) {
    if (this.hints) {
      this.addTelegram('', this.texts.hintTopic, hint, 'telegram_hint')
    }
  }

  // Add fact type message
  addBioFact (fact) {
    this.addTelegram('', this.texts.factTopic, fact, 'telegram_fact')
  }

  // Add warning message about structure ruinage
  addRuinWarning (timeEvent, structure) {
    let date = timeEvent.toString()
    let topic = structure.ownerName + this.texts.ruinTopic
    let text = structure.structureName + this.texts.ruinText
    this.addTelegram(date, topic, text, 'telegram_revent')
  }

  /**
   * Generic add to storage, all other messages should use this
   * Date, topic, text really mean only different rows in the display,
   * no other formatting   
   * 
   * @param {any} date 
   * @param {any} topic 
   * @param {any} text 
   * @param {any} asset 
   * @memberof TelegramStorage
   */
  addTelegram (date, topic, text, asset) {
    this.telegrams.push({ date: date, topic: topic, text: text, new: true, asset: asset })
    this.unread++
  }

  /**
   * Retrieve a message with index number from storage
   * If message was unread previously, mark it as read
   * 
   * @param {any} i 
   * @returns 
   * @memberof TelegramStorage
   */
  getTelegram (i) {
    let telegram = this.telegrams[i]
    if (telegram.new) {
      telegram.new = false
      this.unread--
    }
    return telegram
  }

  /**
   * Used to identify if there are messages the player has not read yet   
   * 
   * @returns 
   * @memberof TelegramStorage
   */
  notificate () {
    return this.unread > 0
  }

  notEmpty () {
    return this.telegrams.length > 0
  }
}
