const assert = require('assert')

import * as Functions from '../../../src/models/logic/Functions'

describe('Line Functions tests', () => {
  it('createLine returns null if x-coordinates are the same', ()=>{
    assert(Functions.createLine(77, 1, 77, 2) === null)
  })

  it('createLine returns a constant function if y-coordinates are the same', ()=>{
    var func = Functions.createLine(76, 2, 77, 2)
    assert.equal(func(), 2)
  })

  it('createLine returns a linear function otherwise', ()=>{
    var func = Functions.createLine(3, 2, -3, 0)
    assert.equal(func(9), 4)
    func = Functions.createLine(-3, 2, 3, 0)
    assert.equal(func(9), -2)
  })

  it('initializeLine returns a constant function if slope is zero', ()=>{
    var func = Functions.initializeLine(0, 4)
    assert.equal(func(), 4)
    assert.equal(func(12), 4)
  })

  it('initializeLine returns a linear function otherwise', ()=>{
    var func = Functions.initializeLine(3, 0)
    assert.equal(func(-2), -6)
    func = Functions.initializeLine(3, -4)
    assert.equal(func(1), -1)
  })
})