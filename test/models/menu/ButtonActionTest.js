const assert = require('assert')
const sinon = require('sinon')
import ButtonAction from '../../../src/models/menu/ButtonAction'

describe('ButtonAction tests', () => {

  it('Constructor test', () => {
    var testBA = new ButtonAction({
      name: 'name',
      functionToCall: 'func',
      context: 'con'
    })
    assert.equal('name', testBA.name)
    assert.equal('con', testBA.context)
  })
})