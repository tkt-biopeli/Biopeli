const assert = require('assert')
const sinon = require('sinon')

import {between} from '../../../src/models/logic/Between'

describe('Between tests', () => {
  it('between is functioning as expected', () => {
    // min, max, value
    // min and max are null
    assert.equal(between(null, null, 20), true)
    // max is checked
    assert.equal(between(null, 20, 20), true)
    assert.equal(between(null, 20, 21), false)
    // min is checked
    assert.equal(between(20, 40, 20), true)
    assert.equal(between(20, 40, 19), false)
  })
})

