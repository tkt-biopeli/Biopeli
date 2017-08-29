import TelegramStorage from '../../../../src/controllers/events/time/TelegramStorage'
const assert = require('assert')
const sinon = require('sinon')

describe('Telegram storage tests', () => {
  var telegramStorage

  beforeEach(() => {
    telegramStorage = new TelegramStorage({ telegramTexts: {hintTopic: 'foo'} })
  })

  it('addStructureHint works', () => {
    var addTelegramSpy = sinon.spy()
    telegramStorage.addTelegram = addTelegramSpy
    telegramStorage.addStructureHint('bar')
    assert.equal(addTelegramSpy.callCount, 1)
    telegramStorage.hints = false
    telegramStorage.addStructureHint('bar')
    assert.equal(addTelegramSpy.callCount, 1)
  })
})
