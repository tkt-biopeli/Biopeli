const assert = require('assert')

import Money from '../../src/models/Money'

describe('Money tests', () => {
  var currency, money

  beforeEach(() => {
    currency = 'testCurrency'
    money = new Money({currency: currency})
  })

  it('Constructor works', () => {
    assert.equal(money.currency, currency)
    assert.equal(money.amount, 0)
  })

  it('Amount of less than thousand is shown in correct format', () => {
    assert.equal(money.toString(), '0 ' + currency.toString())
    money.amount = 999
    assert.equal(money.toString(), '999 ' + currency.toString())
  })

  it('Thousands are shown in correct format', () => {
    money.amount = 1000
    assert.equal(money.toString(), '1.0k ' + currency.toString())
    money.amount = 999949
    assert.equal(money.toString(), '999.9k ' + currency.toString())
  })

  it('Millions are shown in correct format', () => {
    money.amount = 999950
    assert.equal(money.toString(), '1.0M ' + currency.toString())
    money.amount = 1000000
    assert.equal(money.toString(), '1.0M ' + currency.toString())
    money.amount = 999949999
    assert.equal(money.toString(), '999.9M ' + currency.toString())
  })

  it('Billions are shown in correct format', () => {
    money.amount = 999950000
    assert.equal(money.toString(), '1.0G ' + currency.toString())
    money.amount = 1000000000
    assert.equal(money.toString(), '1.0G ' + currency.toString())
    money.amount = 999999999999
    assert.equal(money.toString(), '1000.0G ' + currency.toString())
  })

  it('Amounts of more than a 1000 billion are shown in correct format', () => {
    money.amount = 1000000000000
    assert.equal(money.toString(), '1+T ' + currency.toString())
    money.amount = 2900000000000
    assert.equal(money.toString(), '1+T ' + currency.toString())
  })
})