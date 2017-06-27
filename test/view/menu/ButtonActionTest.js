const assert = require('assert')
const sinon = require('sinon')
import ButtonComponent from '../../../src/view/menu/ButtonComponent'

describe('ButtonAction tests', () =>{
  it('Constructor test', () =>{
    var testBA = new ButtonComponent({
        name: 'name',
        functionToCall: 'func',
        context: 'con'
    })
    assert.equal('name', testBA.name)
    assert.equal('con', testBA.context)
  })
})