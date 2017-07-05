import StackingLayout from '../../../../src/view/menu/layouts/StackingLayout'
const assert = require('assert')

describe ('Stacking layout tests', ()=>{

  var menuRect = {x: 0, y: 0, width: 100, height: 100}
  var linePadding = 7,
  var sectionPadding = 11
  var vertical = true

  var layout

  function createLayout() {
    layout = new StackingLayout({
      menuRect: menuRect,
      linePadding: linePadding,
      sectionPadding: sectionPadding,
      vertical: vertical
    })
  }

  beforeEach(() =>{
    
  })

  it('Constructor works', ()=>{

  })
})