const chai = require('chai')

var assert = chai.assert,
    expect = chai.expect

describe('Chai demo', () => {

  it('Chai works', () => {
    var foo = 'bar'

    assert.typeOf(foo, 'string')
    expect(foo).to.be.a('string')
  })

})