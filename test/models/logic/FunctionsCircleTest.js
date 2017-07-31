const assert = require('assert')

import {createCircle} from '../../../src/models/logic/Functions'

describe('Circle Functions tests', () => {
  var floatCheck = (value, wanted) => {
    assert(value > wanted - 0.01 && value < wanted + 0.01, 'Value: '+value+", Wanted: "+wanted)
  }

  it('Circle is created when function is called', ()=>{
    assert(createCircle(0, 0, 1, true) != null)
  })
  
  it('Unit circle with upper works', ()=>{
    var circle = createCircle(0, 0, 1, true)
    floatCheck(circle(0), 1)
    floatCheck(circle(1), 0)
    floatCheck(circle(0.5), 0.86602540378)
  })

  it('Unit circle with lower works', ()=>{
    var circle = createCircle(0, 0, 1, false)
    floatCheck(circle(0), -1)
    floatCheck(circle(1), 0)
    floatCheck(circle(0.5), -0.86602540378)
  })

  it('Bigger circle works', ()=>{
    var circle = createCircle(0, 0, 2, true)
    floatCheck(circle(0), 2)
    floatCheck(circle(2), 0)
    floatCheck(circle(1), 1.73205080757)
  })

  it('X offset works', ()=>{
    var circle = createCircle(1, 0, 1, true)
    floatCheck(circle(0), 0)
    floatCheck(circle(1), 1)
    floatCheck(circle(0.5), 0.86602540378)
    floatCheck(circle(1.5), 0.86602540378)
  })

  it('Y offset works', ()=>{
    var circle = createCircle(0, 1, 1, true)
    floatCheck(circle(0), 2)
    floatCheck(circle(1), 1)
    floatCheck(circle(0.5), 1.86602540378)
  })

  it('Combinations work', ()=>{
    var circle = createCircle(-1, 2, 2, false)
    floatCheck(circle(-1), 0)
    floatCheck(circle(1), 2)
    floatCheck(circle(0), 0.26794919243)
  })

  it('If value is off the circle, 0 is given', ()=>{
    var circle = createCircle(0, 0, 1, true)
    floatCheck(circle(1.01), 0)
    floatCheck(circle(1100), 0)
    floatCheck(circle(-7), 0)

    circle = createCircle(3, 0, 1, true)
    floatCheck(circle(1.99), 0)
    floatCheck(circle(4.01), 0)
  })
})